import re
import json

import numpy as np
import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from lime.lime_tabular import LimeTabularExplainer

from app.services.pls_nn import summarize_variables
from app.models import RecommendationFactors, SynthesisCitizenScience, SynthesisCooperation, SynthesisInfrastructure, QuestionnaireAnswer
from app.api.analysis.dto import RecommendationItem, RecommendationDto

FEATURE_NAMES = [
    "Karakter Warga", "Lingkungan", "Dukungan Komunitas", "Keberdayaan Warga",
    "Kewirausahaan", "Inovasi", "Sumber Daya", "Teknologi", "Rantai Nilai",
    "Keberlanjutan", "Institusi", "Warga yang Siap"
]

POTENTIAL_NAMES = ["Potensial", "Cukup Potensial", "Sangat Potensial"]

TREE_INPUT_FEATURES = [
    "c1", "c2", "c3", "c4", "c5", "c6", "f1", "f2", "f3", "f4", "f5", "g1"
]

COOP_STRATEGIES = [
    "Pemberdayaan Koperasi", "Pemodalan", "Pemasaran", "Character Building",
    "Capacity Building", "Kebijakan"
]

COOP_FACTORS = [
    "Sumber Daya",
    "Teknologi",
    "Rantai Nilai",
    "Keberlanjutan",
    "Institusi",
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
                      (df["f1"] + df["f2"] + df["f3"] + df["f4"] + df["f5"]) * df["inv2"] # + df["g1"] * df["inv3"]

    # use qcut from the raw_score to get the final score
    df["final_score"] = pd.qcut(df["raw_score"], 3, labels=False)

    # get rank
    rank = df[df["village_id"] == villageId]["final_score"].values[0]
    return rank


def infra_to_dict(infra: SynthesisInfrastructure) -> dict[str, str]:
    return {
        "pasar": infra.market,
        "panjang jalan": infra.roads,
        "sebaran sekolah": infra.schools,
        "internet": infra.internet,
        "aktivitas medsos": infra.social_media,
        "irigasi": infra.irrigation,
        "bank": infra.banks,
        "koperasi": infra.cooperation,
        "UMKM": infra.umkm,
        "komunitas literasi, TIK, sosial, lingkungan": infra.community,
        "adat": infra.tradition,
        "kerja sama universitas": infra.university,
        "regulasi": infra.regulation,
    }


def list_string_join(prefix: str, l: list[str]) -> str:
    if len(l) == 0:
        return prefix
    elif len(l) == 1:
        return f"{prefix} {l[0]}"

    text = ", ".join(l[:-1]) + " dan " + l[-1]
    return f"{prefix} {text}"


def make_recommendation_description(cs: SynthesisCitizenScience,
                                    coops: list[SynthesisCooperation],
                                    infra: SynthesisInfrastructure):
    text = "<b>Kesiapan warga</b><br>"

    # kesiapan warga
    cs_json = json.loads(cs.json_result)
    cs_1 = []
    cs_2 = []
    cs_3 = []
    for isum in cs_json["inner_summary"]:
        if isum["r_squared"] < 0.1:
            cs_1.append(isum["index"].lower().replace("_", " "))
        elif isum["r_squared"] <= 0.4:
            cs_2.append(isum["index"].lower().replace("_", " "))
        else:
            cs_3.append(isum["index"].lower().replace("_", " "))

    text += list_string_join("Segera lakukan penguatan peran", cs_1) + ". "
    text += list_string_join("Lakukan penguatan peran", cs_2) + ". "
    text += list_string_join("Pertahankan peran", cs_3) + ". "

    # kerja sama
    coop_alts = np.mean(
        [list(json.loads(coop.json_alternatives).values()) for coop in coops])
    coop_factors = np.mean(
        [list(json.loads(coop.json_factors).values()) for coop in coops])

    coop_best = COOP_STRATEGIES[np.argmax(coop_alts)].lower()
    coop_poor = COOP_FACTORS[np.argmin(coop_factors)].lower()

    text += "<br><br><b>Kerja Sama</b><br>"
    text += f"Lakukan peningkatan {coop_best} untuk memperkuat {coop_poor}. "

    # infrastruktur
    infra_dict = infra_to_dict(infra)
    infra_better = [k for k, v in infra_dict.items() if v == 1]

    text += "<br><br><b>Infrastruktur</b><br>"
    text += list_string_join("Lakukan penguatan", infra_better) + ". "

    return text

def calc_warga_yang_siap(query: list[QuestionnaireAnswer]) -> float:
    # load into dataframe
    df_raw = pd.DataFrame([vars(x) for x in query])
    df_values = pd.DataFrame([json.loads(answer.json_content) for answer in query])
    count = len(df_raw)

    # summarize each features
    df = pd.DataFrame({
        "village_id": df_raw["village_id"],
        "smart_economy": summarize_variables(df_values, "y2"),
    })

    # calculate rank
    df["rank"] = pd.cut(df["smart_economy"], 3, labels=[1, 2, 3])

    # summarize
    ct = pd.crosstab(df["village_id"], df["rank"]).reset_index()

    # normalize
    ct.iloc[:, 1:] = ct.iloc[:, 1:] / count * 100

    # normalize
    ct["score"] = ct.apply(lambda x: x[1] * 0.2 + x[2] * 0.3 + x[3] * 0.5, axis=1)
    ct["score"] = ct["score"] / ct["score"].max()

    return ct


def rec_quartile(villageId: str, rank_factors: list[RecommendationFactors],
                 cs: SynthesisCitizenScience, coops: SynthesisCooperation,
                 infra: SynthesisInfrastructure, qanswers: list[QuestionnaireAnswer]) -> RecommendationDto:
    # load into dataframe
    df = pd.DataFrame([vars(x) for x in rank_factors])

    # scale down the g1 variable by dividing by 3
    df["g1"] = df["g1"] / 3
    
    # replace g1
    warga_yang_siap = calc_warga_yang_siap(qanswers) 
    df_c = df.copy().merge(warga_yang_siap, on="village_id")
    df["g1"] = df_c["score"]

    # get village rank
    rank = get_rank(villageId, df.copy())

    # drop _sa_instance_state, village_id, inv1, inv2, and inv3
    df = df.drop(columns=["_sa_instance_state", "inv1", "inv2", "inv3"])
    df = df[TREE_INPUT_FEATURES + ["village_id"]]

    # normalize
    num_cols = df.select_dtypes("number").columns
    df[num_cols] /= df[num_cols].sum()

    # calculate mean of all rows
    means_all = df.mean().values
    means_village = df[df["village_id"] == villageId].mean().values

    # calculate quartile
    threshold = np.quantile(np.abs(means_all), [0.25])

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
                           value=means_village[i],
                           text=getText(means_village[i], threshold,
                                        FEATURE_NAMES[i]))
        for i in range(means_village.shape[0])
    ]

    # sort by value, ascending
    items.sort(key=lambda x: x.value)

    # return data
    return RecommendationDto(rank=rank,
                             threshold=threshold,
                             items=items,
                             description=make_recommendation_description(
                                 cs, coops, infra))


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
    return RecommendationDto(rank=rank,
                             threshold=0,
                             items=items,
                             description="TODO")
