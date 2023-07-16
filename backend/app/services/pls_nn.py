import warnings

import numpy as np
import pandas as pd

from SALib.analyze import rbd_fast
from SALib.sample.morris import sample

from sklearn.model_selection import KFold
from sklearn.neural_network import MLPClassifier
from sklearn.preprocessing import MinMaxScaler

SENSITIVITY_VARIABLES = [
    "Karakter Warga", "Lingkungan", "Dukungan Komunitas", "Keberdayaan Warga",
    "Kewirausahaan", "Inovasi"
]

IGNORED_COLS = [
    "x1_29_1",
    "x1_29_2",
    "x1_29_3",
    "x1_29_4",
    "x1_30_1",
    "x1_30_2",
    "x1_30_3",
    "x1_30_4",
]


def summarize_variables(df: pd.DataFrame, var_name: str):
    # pick the column with the var_name prefix and not in ignored columns
    indexes = [
        i for i, col in enumerate(df.columns) if col.startswith(var_name)
        and not col.endswith("_alasan") and not col.endswith("_tahun")
        and not col.endswith("_info") and not col.endswith("_frekuensi")
        and not col.endswith("_lainnya") and col not in IGNORED_COLS
    ]

    # get all row with column indexes
    summarize_df = df.iloc[:, indexes].astype(float).fillna(0)

    # get the mean of each row
    return summarize_df.mean(axis=1)


def analyze_sensitivity(model, features, bounds):
    # create problem space
    problem = {
        "num_vars": len(features),
        "names": features,
        "bounds": bounds,
    }

    # create samples
    param_values = sample(problem,
                          1000,
                          num_levels=4,
                          optimal_trajectories=None,
                          seed=42)

    # run prediction
    preds = model.predict(param_values)

    # run sensitivity analysis
    sens = rbd_fast.analyze(problem,
                            param_values,
                            preds,
                            conf_level=0.95,
                            seed=42)

    return pd.DataFrame(sens, index=sens["names"])


def calculate_pls_nn(df: pd.DataFrame):
    with warnings.catch_warnings():
        warnings.simplefilter("ignore")

        # summarize each features
        df_summarize = pd.DataFrame({
            "X1": summarize_variables(df, "x1"),
            "X2": summarize_variables(df, "x2"),
            "X3": summarize_variables(df, "x3"),
            "X4": summarize_variables(df, "x4"),
            "X5": summarize_variables(df, "x5"),
            "Y1": summarize_variables(df, "y1"),
            "Y2": summarize_variables(df, "y2"),
        })

        # get features and target
        X = df_summarize[["X1", "X2", "X3", "X4", "X5", "Y1"]].values
        y = pd.cut(df_summarize["Y2"].values, 3, labels=[1, 2, 3])

        # to store k-fold data
        fold_nums = []
        sensitivities = []

        # run k-fold
        kfold = KFold(n_splits=5, shuffle=True, random_state=42)
        for i, (train, test) in enumerate(kfold.split(X, y)):
            # get the data
            X_train = X[train]
            y_train = y[train]
            # X_test = X[test]
            # y_test = y[test]

            # build the model
            model = MLPClassifier(max_iter=100,
                                  activation="relu",
                                  hidden_layer_sizes=(20),
                                  alpha=0.001,
                                  solver="adam",
                                  random_state=42)

            # fit model
            model.fit(X_train, y_train)

            # create problem space
            features = ["X1", "X2", "X3", "X4", "X5", "Y1"]
            bounds = [
                [X_train[:, 0].min() - 0.5, X_train[:, 0].max() + 0.5],
                [X_train[:, 1].min() - 0.5, X_train[:, 1].max() + 0.5],
                [X_train[:, 2].min() - 0.5, X_train[:, 2].max() + 0.5],
                [X_train[:, 3].min() - 0.5, X_train[:, 3].max() + 0.5],
                [X_train[:, 4].min() - 0.5, X_train[:, 4].max() + 0.5],
                [X_train[:, 5].min() - 0.5, X_train[:, 5].max() + 0.5],
            ]

            # run sensitivity analysis
            sensi = analyze_sensitivity(model, features, bounds)["S1"].values

            # save run data
            fold_nums.append(i)
            sensitivities.append(sensi)

        # fill nan with 0
        sensi_ori = np.nan_to_num(np.array(sensitivities))

        # scales the output
        scaler = MinMaxScaler()
        sensi_scaled = scaler.fit_transform(sensi_ori)

        # get the mean of each column
        sensi_means = np.mean(sensi_scaled, axis=0)

        # build response
        results = []
        for v, m in zip(SENSITIVITY_VARIABLES, sensi_means.tolist()):
            results.append({"variable": v, "sensitivity": m})

        # return the results
        return results
