from typing import Union
from starlette import status
from sqlalchemy.orm import Session
from fastapi import APIRouter, HTTPException, BackgroundTasks, Depends

from app.api.dependencies import get_jwt_user, get_db
from app.models import Village, SynthesisCitizenScience, SynthesisInfrastructure, SynthesisCooperation, RecommendationFactors

from app.api.analysis.dto import SemplsDetailedDto, SemplsSummaryDto, SpatialScoringDto, CooperationDto, RecommendationDto
from app.api.analysis.schemas import BackfillMode, CitizenScienceMode, CitizenScienceModel, SpatialScoringModel, CooperationModel, RecommendationModel, BackfillModel
from app.api.analysis.service_cooperation import coop_single, coop_summarize
from app.api.analysis.service_recommendation import rec_quartile, rec_ime
from app.api.analysis.service_citizen_science import sempls_summary, sempls_detailed
from app.api.analysis.bg_task import backfill_infra, backfill_citizen_science

router = APIRouter()


@router.post(
    "/citizen_science",
    response_model=Union[SemplsDetailedDto, SemplsSummaryDto],
    responses={status.HTTP_202_ACCEPTED: {
        "model": list[SemplsSummaryDto]
    }})
async def citizen_science(model: CitizenScienceModel,
                          db: Session = Depends(get_db),
                          _: str = Depends(get_jwt_user)):
    # load data
    query = db.query(SynthesisCitizenScience) \
        .filter(SynthesisCitizenScience.sempls_order == model.order) \

    # check if we have villageId
    if model.villageId:
        query = query.filter(
            SynthesisCitizenScience.village_id == model.villageId)

    # fetch data
    data = query.all()

    # if data is empty, raise error
    if len(data) == 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Data tidak ditemukan")

    # process data
    if model.mode == CitizenScienceMode.summary:
        return sempls_summary(data)

    return sempls_detailed(data)


@router.post("/spatial_score", response_model=SpatialScoringDto)
async def spatial_score(model: SpatialScoringModel,
                        db: Session = Depends(get_db),
                        _: str = Depends(get_jwt_user)):
    # find village
    village: Village = db.query(Village) \
        .filter(Village.id == model.villageId) \
        .first()

    # check if village exists
    if not village:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Desa tidak ditemukan")

    # get spatial scoring
    spatialScoring: SynthesisInfrastructure = db.query(SynthesisInfrastructure) \
        .filter(SynthesisInfrastructure.village_id == village.id) \
        .first()

    # check if village exists
    if not spatialScoring:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Data spasial tidak ditemukan")

    return SpatialScoringDto(
        id=spatialScoring.id,
        villageId=village.id,
        villageName=village.name,
        potential=spatialScoring.potential,
        objectId=spatialScoring.object_id,
        index=spatialScoring.village_index,
        market=spatialScoring.market,
        roads=spatialScoring.roads,
        schools=spatialScoring.schools,
        internet=spatialScoring.internet,
        socialMedia=spatialScoring.social_media,
        irigation=spatialScoring.irrigation,
        banks=spatialScoring.banks,
        cooperation=spatialScoring.cooperation,
        umkm=spatialScoring.umkm,
        community=spatialScoring.community,
        tradition=spatialScoring.tradition,
        university=spatialScoring.university,
        regulation=spatialScoring.regulation,
    )


@router.post("/cooperation", response_model=CooperationDto)
async def cooperation(model: CooperationModel,
                      db: Session = Depends(get_db),
                      _: str = Depends(get_jwt_user)):
    # if kerjaSamaId is provided, return single data
    if model.kerjaSamaId:
        # get single cooperation by kerjaSamaId
        coop_one = db.query(SynthesisCooperation) \
            .filter(SynthesisCooperation.id == model.kerjaSamaId) \
            .first()

        # check if data exists
        if not coop_one:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                                detail="Data tidak ditemukan")

        # return single data
        return coop_single(coop_one)

    if model.villageId:
        # get single cooperation by villageId
        coop_village = db.query(SynthesisCooperation) \
            .filter(SynthesisCooperation.village_id == model.villageId) \
            .all()

        # check if data exists
        if not coop_village:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                                detail="Data tidak ditemukan")

        # return single data
        return coop_summarize(coop_village)

    # process for summary data
    coop_kecamatan = db.query(SynthesisCooperation).all()

    # check if data exists
    if not coop_kecamatan:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Data tidak ditemukan")

    # return summary data
    return coop_summarize(coop_kecamatan)


@router.post("/recommendation/quartile", response_model=RecommendationDto)
async def recommendation_statistics(model: RecommendationModel,
                                    db: Session = Depends(get_db),
                                    _: str = Depends(get_jwt_user)):
    # load data
    data = db.query(RecommendationFactors).all()

    # check if data exists
    if not data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Data tidak ditemukan")

    # process data
    return rec_quartile(model.villageId, data)


@router.post("/recommendation/ime")
async def recommendation_ime(model: RecommendationModel,
                             db: Session = Depends(get_db),
                             _: str = Depends(get_jwt_user)):
    # load data
    data = db.query(RecommendationFactors).all()

    # check if data exists
    if not data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Data tidak ditemukan")

    # process data
    return rec_ime(model.villageId, data)


@router.post("/backfill")
async def backfill(model: BackfillModel,
                   background_tasks: BackgroundTasks,
                   db: Session = Depends(get_db),
                   _: str = Depends(get_jwt_user)):
    # fill data
    if model.kind == BackfillMode.citizen_science:
        background_tasks.add_task(backfill_citizen_science, model.id, db)
    elif model.kind == BackfillMode.infrastructure:
        background_tasks.add_task(backfill_infra, db)
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Mode tidak didukung")

    return None
