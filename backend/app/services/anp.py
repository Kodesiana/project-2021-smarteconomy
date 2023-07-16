import os
import tempfile

import numpy as np
import pandas as pd

from sklearn.preprocessing import MinMaxScaler

from app.services.helpers import safe_delete

FACTOR_COUNT = {"F1": 4, "F2": 2, "F3": 2, "F4": 2, "F5": 6}


def parse_string(s):
    if type(s) == str:
        parts = s.split("/")
        return float(parts[0]) / float(parts[1])

    return s


def preprocess_matrix(mat):
    # get the upper diagonal
    upper_diag = np.triu(mat, 0)

    # convert to float
    upper_diag = np.vectorize(parse_string)(upper_diag)

    # flip and rotate the upper diagonal
    lower_diag = np.rot90(np.fliplr(upper_diag))

    # calculate the reciprocal of the lower diagonal
    lower_diag = np.where(lower_diag == 0, -1, lower_diag)
    lower_diag = 1 / lower_diag
    lower_diag = np.tril(lower_diag, 0)

    # sum the two diagonals
    complete_mat = upper_diag + lower_diag

    # make sure main diagonal is 1
    remover = np.diag(np.array([1] * complete_mat.shape[0]))
    upper_diag_sum = complete_mat - remover

    return upper_diag_sum


def internal_process_ahp(filename: str, factor: str):
    # load factor vs factor comparison
    p_crit = pd.read_excel(filename, sheet_name=factor,
                           engine='openpyxl').iloc[:, 1:].values

    # load factor vs alternative comparison and multiply them
    p_alts = None
    for i in range(1, FACTOR_COUNT[factor] + 1):
        df = pd.read_excel(filename, sheet_name=f"F{factor[1]}.{i}")
        current_alts = preprocess_matrix(df.iloc[:6, 1:7].values)

        if p_alts is None:
            p_alts = current_alts
        else:
            p_alts = p_alts * current_alts

    # calculate eigenvalue
    scaler = MinMaxScaler()
    results = scaler.fit_transform(p_alts)

    # calculate mean
    return results.mean(axis=1)


def calculate_ahp(fileContents: bytes):
    # delete previously created file
    temp_file = os.path.join(tempfile.gettempdir(), "ahp_temp.xlsx")
    safe_delete(temp_file)

    # save bytes
    with open(temp_file, "wb") as f:
        f.write(fileContents)

    # process all factors
    ranks = []
    for factor in ["F1", "F2", "F3", "F4", "F5"]:
        ranks.append(internal_process_ahp(temp_file, factor))

    # run geometric mean score
    master_matrix = np.array(ranks)
    master_matrix[master_matrix == 0] = 0.000001

    # calculate CM
    RI = 1.12
    CM = master_matrix.prod(axis=1) / master_matrix.mean(axis=1)
    # CI = np.abs((CM.mean() - 5) / (5 - 1)) # CM.mean() = lambda_max
    CI = CM.mean()  # CM.mean() = lambda_max
    CR = CI / RI

    # solve for ranks
    final_rank = master_matrix.prod(axis=0)**(1 / master_matrix.shape[0])

    # divide by it's sum to scale it to 1
    final_rank = final_rank / final_rank.sum()

    # factor weights
    factor_weights = np.array(ranks).mean(axis=1)

    return {
        "cr": CR,
        "alternatives": {
            "as1": final_rank[0],
            "as2": final_rank[1],
            "as3": final_rank[2],
            "as4": final_rank[3],
            "as5": final_rank[4],
            "as6": final_rank[5],
        },
        "factors": {
            "f1": factor_weights[0],
            "f2": factor_weights[1],
            "f3": factor_weights[2],
            "f4": factor_weights[3],
            "f5": factor_weights[4],
        }
    }
