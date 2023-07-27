import json

import pandas as pd
from sqlalchemy import func, select
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends

from app.models import Village, QuestionnaireAnswer, QuestionnaireDashboard
from app.api.dependencies import get_db, get_jwt_user
from app.services.pls_nn import summarize_variables

from app.api.dashboard.dto import (SummariesModel, QuestionnaireModel,
                                   JobModel, LandOwnershipModel,
                                   MotivationModel, MotivationModel, TIKModel,
                                   InformationModel, ExpensesModel, PLSNNModel)

router = APIRouter()


@router.get("/summaries", response_model=SummariesModel)
async def summaries(db: Session = Depends(get_db),
                    _: dict[str, str] = Depends(get_jwt_user)):
    # build query
    villageCount = db.query(Village).count()
    answersCount = db.query(QuestionnaireAnswer).count()

    return {"villageCount": villageCount, "answersCount": answersCount}


@router.get("/questionnaire-chart", response_model=list[QuestionnaireModel])
async def questionnaire_chart(db: Session = Depends(get_db),
                              _: dict[str, str] = Depends(get_jwt_user)):
    # build query
    query = db.query(QuestionnaireDashboard) \
        .group_by(QuestionnaireDashboard.village_name) \
        .with_entities(QuestionnaireDashboard.village_name, func.count(QuestionnaireDashboard.id))

    # get stats
    data = [
        QuestionnaireModel(village_name=item[0], count=item[1])
        for item in query.all()
    ]

    return data


@router.get("/jobs-chart", response_model=list[JobModel])
async def jobs_chart(db: Session = Depends(get_db),
                     _: dict[str, str] = Depends(get_jwt_user)):
    # build query
    query = db.query(QuestionnaireDashboard) \
        .group_by(QuestionnaireDashboard.village_name, QuestionnaireDashboard.pekerjaan) \
        .with_entities(QuestionnaireDashboard.village_name,
                       QuestionnaireDashboard.pekerjaan,
                       func.count(QuestionnaireDashboard.pekerjaan))

    # make dataframe
    df = pd.DataFrame(query.all(),
                      columns=["village_name", "pekerjaan", "count"])

    # change column names
    df["pekerjaan"] = df["pekerjaan"].map({
        1: "tani",
        2: "ternak",
        3: "nelayan",
        4: "pns",
        5: "lainnya"
    })

    # summarize data
    df = pd.pivot_table(df,
                        values="count",
                        index=["village_name"],
                        columns=["pekerjaan"],
                        aggfunc=sum,
                        fill_value=0).reset_index()

    return df.to_dict(orient="records")


@router.get("/land-ownership-chart", response_model=list[LandOwnershipModel])
async def land_ownership_chart(db: Session = Depends(get_db),
                               _: dict[str, str] = Depends(get_jwt_user)):
    # build query
    query = db.query(QuestionnaireDashboard) \
        .group_by(QuestionnaireDashboard.village_name, QuestionnaireDashboard.kepemilikan_lahan) \
        .with_entities(QuestionnaireDashboard.village_name,
                       QuestionnaireDashboard.kepemilikan_lahan,
                       func.count(QuestionnaireDashboard.kepemilikan_lahan))

    # make dataframe
    df = pd.DataFrame(query.all(),
                      columns=["village_name", "kepemilikan_lahan", "count"])

    # change column names
    df["kepemilikan_lahan"] = df["kepemilikan_lahan"].map({
        1: "milik_sendiri",
        2: "parohan",
        3: "lainnya"
    })

    # summarize data
    df = pd.pivot_table(df,
                        values="count",
                        index=["village_name"],
                        columns=["kepemilikan_lahan"],
                        aggfunc=sum,
                        fill_value=0).reset_index()

    return df.to_dict(orient="records")


@router.get("/expenses-chart", response_model=ExpensesModel)
async def expenses_chart(db: Session = Depends(get_db),
                         _: dict[str, str] = Depends(get_jwt_user)):
    # build query
    query = db.query(QuestionnaireDashboard) \
        .with_entities(QuestionnaireDashboard.village_name,
                       QuestionnaireDashboard.pengeluaran_bulanan)

    # column formatter
    def normalize_pengeluaran(x):
        # remove brackets and split on interval
        values = x.strip("()[]").split(", ")

        # convert to float and remove zeros
        v1, v2 = max(float(values[0]), 0.0), max(float(values[1]), 0.0)

        # format to string with thousands separator
        f1, f2 = f"{v1:,}"[:-2], f"{v2:,}"[:-2]

        # return formatted string
        return f"{f1} - {f2}".replace(",", ".")

    # constants
    bins = 5

    # make dataframe
    df = pd.DataFrame(query.all(),
                      columns=["village_name", "pengeluaran_bulanan"])

    # convert to float
    df["pengeluaran_bulanan"] = df["pengeluaran_bulanan"].astype(float)

    # group by village and pengeluaran_bulanan (binned)
    df = df.groupby(['village_name', pd.cut(df["pengeluaran_bulanan"], bins=bins)]) \
        .size() \
        .reset_index()

    # change column names
    df["pengeluaran_bulanan"] = df["pengeluaran_bulanan"] \
        .astype(str) \
        .apply(normalize_pengeluaran)

    # rename count column
    df = df.rename(columns={0: "count"})

    # generate cut interval names
    cat_mapping = {
        k: v
        for k, v in zip(range(bins), df["pengeluaran_bulanan"].unique())
    }
    cat_mapping_rev = {k: v for k, v in zip(cat_mapping.values(), range(bins))}

    # summarize data
    df = pd.pivot_table(df,
                        values="count",
                        index=["village_name"],
                        columns=["pengeluaran_bulanan"],
                        aggfunc=sum,
                        fill_value=0).reset_index()

    # rename columns based on interval name
    df = df.rename(columns=cat_mapping_rev)

    return ExpensesModel(mapping=cat_mapping,
                         data=df.to_dict(orient="records"))


@router.get("/motivation-chart", response_model=list[MotivationModel])
async def motivation_chart(db: Session = Depends(get_db),
                           _: dict[str, str] = Depends(get_jwt_user)):
    # build query
    query = db.query(QuestionnaireDashboard) \
        .group_by(QuestionnaireDashboard.village_name) \
        .with_entities(QuestionnaireDashboard.village_name,
                       func.sum(QuestionnaireDashboard.motivasi_1),
                       func.sum(QuestionnaireDashboard.motivasi_2),
                       func.sum(QuestionnaireDashboard.motivasi_3))

    # get stats
    data = [
        MotivationModel(village_name=item[0],
                        tik=item[1],
                        kerja_sama=item[2],
                        pariwisata=item[3]) for item in query.all()
    ]

    return data


@router.get("/tik-chart", response_model=list[TIKModel])
async def tik_chart(db: Session = Depends(get_db),
                    _: dict[str, str] = Depends(get_jwt_user)):
    # build query
    query = db.query(QuestionnaireDashboard) \
        .group_by(QuestionnaireDashboard.village_name) \
        .with_entities(QuestionnaireDashboard.village_name,
                       func.sum(QuestionnaireDashboard.tik_1),
                       func.sum(QuestionnaireDashboard.tik_2),
                       func.sum(QuestionnaireDashboard.tik_3),
                       func.sum(QuestionnaireDashboard.tik_4),
                       func.sum(QuestionnaireDashboard.tik_5),
                       func.sum(QuestionnaireDashboard.tik_6))

    # get stats
    data = [
        TIKModel(village_name=item[0],
                 lapangan_pekerjaan=item[1],
                 penghasilan=item[2],
                 memberdayakan_warga=item[3],
                 mendatangkan_turis=item[4],
                 akses_pasar=item[5],
                 promosi_komoditas=item[6]) for item in query.all()
    ]

    return data


@router.get("/information-chart", response_model=list[InformationModel])
async def information_chart(db: Session = Depends(get_db),
                            _: dict[str, str] = Depends(get_jwt_user)):
    # build query
    query = db.query(QuestionnaireDashboard) \
        .group_by(QuestionnaireDashboard.village_name) \
        .with_entities(QuestionnaireDashboard.village_name,
                       func.sum(QuestionnaireDashboard.informasi_1),
                       func.sum(QuestionnaireDashboard.informasi_2),
                       func.sum(QuestionnaireDashboard.informasi_3),
                       func.sum(QuestionnaireDashboard.informasi_4),
                       func.sum(QuestionnaireDashboard.informasi_5))

    # get stats
    data = [
        InformationModel(village_name=item[0],
                         aparat_desa=item[1],
                         tokoh=item[2],
                         pemda_kab=item[3],
                         pemda_pusat=item[4],
                         lainnya=item[5]) for item in query.all()
    ]

    return data


@router.get("/pls-nn-chart", response_model=list[PLSNNModel])
async def pls_nn_chart(db: Session = Depends(get_db),
                       _: dict[str, str] = Depends(get_jwt_user)):
    # build query
    query = db.execute(
        select(QuestionnaireAnswer.json_content, Village.name) \
        .select_from(QuestionnaireAnswer) \
        .join(Village, Village.id == QuestionnaireAnswer.village_id)).all()

    # load into dataframe
    df_raw = pd.DataFrame(query)
    df_values = pd.DataFrame(
        [json.loads(answer.json_content) for answer in query])
    count = len(df_raw)

    # summarize each features
    df = pd.DataFrame({
        "desa": df_raw["name"],
        "smart_economy": summarize_variables(df_values, "y2"),
    })

    # calculate rank
    df["rank"] = pd.cut(df["smart_economy"], 3, labels=[1, 2, 3])

    # summarize
    ct = pd.crosstab(df["desa"], df["rank"]).reset_index()

    # column mapping
    col_mapping = {
        **{k: f"rank_{k}"
           for k in range(1, 6)}, "desa": "village_name"
    }
    ct = ct.rename(columns=col_mapping)

    # normalize
    ct.iloc[:, 1:] = ct.iloc[:, 1:] / count * 100

    return ct.to_dict(orient="records")
