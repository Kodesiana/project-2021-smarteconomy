import json

import pandas as pd
from ulid import ULID
from sqlalchemy.orm import Session

from app.core.logger import logger
from app.services import infrastructure, pls_sem, pls_nn
from app.models import Village, QuestionnaireAnswer, SynthesisInfrastructure, SynthesisCitizenScience


def backfill_infra(db: Session):
    logger.info("Running backfill for infrastructure")

    # load infrastructure
    infra = infrastructure.load_infra_data()

    # for each data, save into DB
    for data in infra:
        # get village by name
        village: Village = db.query(Village) \
            .filter(Village.name == data["village_name"]) \
            .first()

        # if village is not found, skip
        if not village:
            continue

        # get the infra synthesis
        infra_synthesis: SynthesisInfrastructure = db.query(SynthesisInfrastructure) \
            .filter(SynthesisInfrastructure.village_id == village.id) \
            .first()

        # if infra synthesis is not found, create new
        if not infra_synthesis:
            infra_synthesis = SynthesisInfrastructure(
                id=f"{SynthesisInfrastructure.get_id_prefix()}_{ULID()}",
                village_id=village.id)

        # update synthesis
        infra_synthesis.object_id = data["object_id"]
        infra_synthesis.village_index = data["village_index"]
        infra_synthesis.potential = data["potential"]
        infra_synthesis.market = data["market"]
        infra_synthesis.roads = data["roads"]
        infra_synthesis.schools = data["schools"]
        infra_synthesis.internet = data["internet"]
        infra_synthesis.social_media = data["social_media"]
        infra_synthesis.irrigation = data["irrigation"]
        infra_synthesis.banks = data["banks"]
        infra_synthesis.cooperation = data["cooperation"]
        infra_synthesis.umkm = data["umkm"]
        infra_synthesis.community = data["community"]
        infra_synthesis.tradition = data["tradition"]
        infra_synthesis.university = data["university"]
        infra_synthesis.regulation = data["regulation"]

        # save to DB
        db.add(infra_synthesis)

    # commit after all data is saved
    db.commit()

    logger.info("Backfill for infrastructure is done")


def backfill_citizen_science(villageId: str, db: Session):
    logger.info("Running backfill for citizen science")

    # process global citizen science
    process_sempls(1, None, db)
    process_sempls(2, None, db)

    # get the village
    village: Village = db.query(Village) \
        .filter(Village.id == villageId) \
        .first()

    # if village is not found, skip
    if not village:
        # commit changes
        db.commit()

        logger.info(
            "Backfill for global citizen science is done, village is skipped because it is not found"
        )
        return

    # process village citizen science
    logger.info("Running backfill for citizen science, villageId=" + villageId)
    process_sempls(1, village.id, db)
    process_sempls(2, village.id, db)

    # commit changes
    db.commit()

    logger.info("Backfill for village citizen science is done")


def process_sempls(order: int, villageId: str | None, db: Session):
    logger.info(f"Analysis for order {order} and villageId {villageId}")

    # get the data
    answers = db.query(QuestionnaireAnswer)

    # if villageId is not None, filter by village
    if villageId:
        answers = answers.filter(QuestionnaireAnswer.village_id == villageId)

    # load into dataframe
    df = pd.DataFrame(
        [json.loads(answer.json_content) for answer in answers.all()])

    # run SEM-PLS calculation
    df_sem = df.copy()
    sempls_result = pls_sem.calculate_sempls(df_sem, order)

    # run PLS-NN calculation
    df_nn = df.copy()
    plsnn_result = pls_nn.calculate_pls_nn(df_nn)

    # find existing synthesis
    synthesis = db.query(SynthesisCitizenScience) \
        .filter(SynthesisCitizenScience.village_id == villageId) \
        .filter(SynthesisCitizenScience.sempls_order == order) \
        .first()

    # if synthesis is not found, create new
    if not synthesis:
        synthesis = SynthesisCitizenScience(
            id=f"{SynthesisCitizenScience.get_id_prefix()}_{ULID()}",
            village_id=villageId,
            sempls_order=order,
            status=1)

    # update synthesis
    synthesis.json_result = json.dumps({
        **sempls_result, "sensitivity":
        plsnn_result
    })

    # save to DB
    db.add(synthesis)
