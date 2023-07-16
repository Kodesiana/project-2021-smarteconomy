import re

import numpy as np
import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from lime.lime_tabular import LimeTabularExplainer

from app.models import RecommendationFactors
from app.api.analysis.dto import RecommendationItem, RecommendationDto

FEATURE_NAMES = [
    "Karakter Warga", "Lingkungan", "Dukungan Komunitas", "Keberdayaan Warga",
    "Kewirausahaan", "Inovasi", "Sumber Daya", "Teknologi", "Rantai Nilai",
    "Keberlanjutan", "Institusi", "Indeks Smart Community"
]

POTENTIAL_NAMES = ["Potensial", "Cukup Potensial", "Sangat Potensial"]

TREE_INPUT_FEATURES = [
    "c1", "c2", "c3", "c4", "c5", "c6", "f1", "f2", "f3", "f4", "f5", "g1"
]


def get_rank(villageId: str, df: pd.DataFrame):
    # drop _sa_instance_state
    df = df.drop(columns=["_sa_instance_state"])

    # convert inv1, inv2, and inv3 to float
    df[["inv1", "inv2", "inv3"]] = df[["inv1", "inv2", "inv3"]].astype(float)

    # group by village_id and get the mean
    df = df.groupby("village_id").mean().reset_index()

    # calculate raw score by this formula: sum(c1-c6) * inv1 + sum(f1-f5) * inv2 + g1 * inv3
    df["raw_score"] = (df["c1"] + df["c2"] + df["c3"] + df["c4"] + df["c5"] + df["c6"]) * df["inv1"] + \
                      (df["f1"] + df["f2"] + df["f3"] + df["f4"] + df["f5"]) * df["inv2"] + \
                      df["g1"] * df["inv3"]

    # use qcut from the raw_score to get the final score
    df["final_score"] = pd.qcut(df["raw_score"], 3, labels=False)

    # get rank
    rank = df[df["village_id"] == villageId]["final_score"].values[0]
    return rank


def rec_quartile(villageId: str, model: list[RecommendationFactors]) -> RecommendationDto:
    # load into dataframe
    df = pd.DataFrame([vars(x) for x in model])

    # scale down the g1 variable by dividing by 3
    df["g1"] = df["g1"] / 3

    # get village rank
    rank = get_rank(villageId, df.copy())

    # drop _sa_instance_state, village_id, inv1, inv2, and inv3
    df = df.drop(
        columns=["_sa_instance_state", "village_id", "inv1", "inv2", "inv3"])

    # calculate mean of all rows
    d = df.mean().values

    # calculate quartile
    threshold = np.quantile(np.abs(d), [0.25])

    # create formatter
    def getText(value, threshold, feature_name):
        if value > threshold:
            return f"{feature_name} sudah baik"
        else:
            return f"{feature_name} perlu ditingkatkan"

    # create recommendation items using list comprehension
    items = [
        RecommendationItem(code=f"item{i}",
                           variable=FEATURE_NAMES[i],
                           value=d[i],
                           text=getText(d[i], threshold, FEATURE_NAMES[i]))
        for i in range(d.shape[0])
    ]

    # sort by value, ascending
    items.sort(key=lambda x: x.value)

    # return data
    return RecommendationDto(rank=rank, threshold=threshold, items=items)


def rec_ime(villageId: str,
            model: list[RecommendationFactors]) -> RecommendationDto:
    # load into dataframe
    df = pd.DataFrame([vars(x) for x in model])

    # scale down the g1 variable by dividing by 3
    df["g1"] = df["g1"] / 3

    # get village rank
    rank = get_rank(villageId, df.copy())

    # drop _sa_instance_state
    df = df.drop(columns=["_sa_instance_state"])

    # convert inv1, inv2, and inv3 to float
    df[["inv1", "inv2", "inv3"]] = df[["inv1", "inv2", "inv3"]].astype(float)

    # group by village_id and get the mean
    df = df.groupby("village_id").mean().reset_index()

    # calculate raw score by this formula: sum(c1-c6) * inv1 + sum(f1-f5) * inv2 + g1 * inv3
    df["raw_score"] = (df["c1"] + df["c2"] + df["c3"] + df["c4"] + df["c5"] + df["c6"]) * df["inv1"] + \
                      (df["f1"] + df["f2"] + df["f3"] + df["f4"] + df["f5"]) * df["inv2"] + \
                      df["g1"] * df["inv3"]

    # use qcut from the raw_score to get the final score
    df["final_score"] = pd.qcut(df["raw_score"], 3, labels=False)

    # get the X from c1-g1 and y from final_score
    X = df[TREE_INPUT_FEATURES].values
    y = df["final_score"].values

    # create decision tree classifier
    clf = DecisionTreeClassifier()
    clf.fit(X, y)

    # create explainer
    explainer = LimeTabularExplainer(X,
                                     feature_names=FEATURE_NAMES,
                                     class_names=POTENTIAL_NAMES)

    # explain instance by villageId
    villageIdx = df[df["village_id"] == villageId].index[0]
    exp = explainer.explain_instance(X[villageIdx],
                                     clf.predict_proba,
                                     num_features=len(FEATURE_NAMES))

    # get and sort the explanation
    scores = sorted(exp.as_list(), key=lambda x: x[1])

    # create formatter
    def getText(value, feature_name):
        if value < 0:
            return f"{feature_name} perlu ditingkatkan"
        else:
            return f"{feature_name} sudah baik"

    def getFeatureName(s):
        return "".join(re.findall("[a-zA-Z ]+", s)).strip()

    # create recommendation items using list comprehension
    items = [
        RecommendationItem(code=f"item{i}",
                           variable=getFeatureName(feature_name),
                           value=value,
                           text=getText(value, getFeatureName(feature_name)))
        for i, (feature_name, value) in enumerate(scores)
    ]

    # return data
    return RecommendationDto(rank=rank, threshold=0, items=items)
