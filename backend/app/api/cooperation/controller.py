import json
from typing import Annotated

from ulid import ULID
from starlette import status
from sqlalchemy.orm import Session
from fastapi import APIRouter, HTTPException, UploadFile, Depends, Form, File

from app.services import anp
from app.models import SynthesisCooperation, Village
from app.api.dependencies import SortModel, get_db, get_jwt_user, get_pagination_meta

from app.api.cooperation.dto import SYNTHESIS_STATUS, SYNTHESIS_STATUS_INV, CooperationDto, ListCooperationModel

router = APIRouter()


@router.post("/", response_model=CooperationDto)
async def upload(file: Annotated[UploadFile,
                                 File(media_type="multipart/form-data")],
                 expertName: Annotated[str,
                                       Form(media_type="multipart/form-data")],
                 villageId: Annotated[str,
                                      Form(media_type="multipart/form-data")],
                 db: Session = Depends(get_db),
                 _: str = Depends(get_jwt_user)):
    # check if villageId is exists in Villages
    village = db.query(Village) \
        .filter(Village.id == villageId) \
        .first()

    if not village:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Desa tidak ditemukan",
        )

    # check if expertName and villageId already exists
    coop = db.query(SynthesisCooperation) \
        .filter(
            SynthesisCooperation.expert_name == expertName,
            SynthesisCooperation.village_id == villageId,
        ) \
        .first()

    if coop:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Pakar dan desa sudah pernah digunakan",
        )

    try:
        # load weights file
        weightsFile = await file.read()

        # run AHP calculation
        ahp_data = anp.calculate_ahp(weightsFile)

        # create coop synthesis
        coop = SynthesisCooperation(
            id=f"{SynthesisCooperation.get_id_prefix()}_{ULID()}",
            expert_name=expertName,
            status=SYNTHESIS_STATUS_INV["Selesai"],
            cr=ahp_data["cr"],
            json_factors=json.dumps(ahp_data["factors"]),
            json_alternatives=json.dumps(ahp_data["alternatives"]),
            village_id=villageId,
        )

        # add
        db.add(coop)
    except:
        # create coop synthesis
        coop = SynthesisCooperation(
            id=f"{SynthesisCooperation.get_id_prefix()}_{ULID()}",
            expert_name=expertName,
            status=SYNTHESIS_STATUS_INV["Gagal"],
            cr=0,
            json_factors="",
            json_alternatives="",
            village_id=villageId,
        )

        # add
        db.add(coop)

    # commit
    db.commit()
    db.refresh(coop)

    return CooperationDto(
        id=coop.id,
        expertName=coop.expert_name,
        villageId=village.id,
        villageName=village.name,
        status=SYNTHESIS_STATUS[coop.status],
    )


@router.get("/", response_model=ListCooperationModel)
async def list_all(q: str | None = None,
                   sort_by: str = "id",
                   sort_order: SortModel = SortModel.asc,
                   page: int = 1,
                   page_size: int = 10,
                   db: Session = Depends(get_db),
                   _: str = Depends(get_jwt_user)):
    # build query
    query = db.query(SynthesisCooperation) \
        .join(Village)

    # search by keyword
    if q:
        query = query.filter(SynthesisCooperation.expert_name.like(f"%{q}%"))

    # create sorting
    if sort_by == "id":
        if sort_order == SortModel.asc:
            query = query.order_by(SynthesisCooperation.id.asc())
        else:
            query = query.order_by(SynthesisCooperation.id.desc())
    elif sort_by == "villageName":
        if SortModel == SortModel.asc:
            query = query.order_by(Village.name.asc())
        else:
            query = query.order_by(Village.name.desc())
    elif sort_by == "villageId":
        if SortModel == SortModel.asc:
            query = query.order_by(Village.id.asc())
        else:
            query = query.order_by(Village.id.desc())
    elif sort_by == "expertName":
        if SortModel == SortModel.asc:
            query = query.order_by(SynthesisCooperation.expert_name.asc())
        else:
            query = query.order_by(SynthesisCooperation.expert_name.desc())
    elif sort_by == "status":
        if SortModel == SortModel.asc:
            query = query.order_by(SynthesisCooperation.status.asc())
        else:
            query = query.order_by(SynthesisCooperation.status.desc())

    # get total
    total = query.count()

    # get data
    data = query.offset((page - 1) * page_size) \
        .limit(page_size) \
        .all()

    data = [
        CooperationDto(id=item.id,
                       expertName=item.expert_name,
                       villageId=item.village.id,
                       villageName=item.village.name,
                       status=SYNTHESIS_STATUS[item.status]) for item in data
    ]

    return {
        "meta": get_pagination_meta(total, len(data), page, page_size),
        "data": data,
    }


@router.get("/droplist", response_model=list[CooperationDto])
async def drop_list(villageId: str,
                    db: Session = Depends(get_db),
                    _: str = Depends(get_jwt_user)):
    # find data
    data = db.query(SynthesisCooperation) \
        .join(Village) \
        .filter(SynthesisCooperation.village_id == villageId) \
        .order_by(SynthesisCooperation.expert_name.asc()) \
        .all()

    # map data
    data = [
        CooperationDto(id=item.id,
                       expertName=item.expert_name,
                       villageId=item.village.id,
                       villageName=item.village.name,
                       status=SYNTHESIS_STATUS[item.status]) for item in data
    ]

    return data


@router.delete("/{id}")
async def delete(id: str,
                 db: Session = Depends(get_db),
                 _: str = Depends(get_jwt_user)):
    # find data
    coop: SynthesisCooperation = db.query(SynthesisCooperation) \
        .filter(SynthesisCooperation.id == id) \
        .first()

    # check if village exists
    if not coop:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Data tidak ditemukan")

    # delete village
    db.delete(coop)
    db.commit()

    return None
