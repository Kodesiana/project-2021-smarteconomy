from ulid import ULID
from starlette import status
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException

from app.models import Village, VillageInvestment
from app.api.dependencies import SortModel, get_db, get_jwt_user, get_pagination_meta

from app.api.villages.dto import VillageDto, ListVillageDto
from app.api.villages.schemas import CreateModel, UpdateModel

router = APIRouter()


@router.post("/", response_model=VillageDto)
async def create(model: CreateModel,
                 db: Session = Depends(get_db),
                 _: str = Depends(get_jwt_user)):
    # find village
    village: Village = db.query(Village) \
        .filter(Village.name == model.name.upper()) \
        .first()

    # check if village exists
    if village:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Desa dengan nama yang sama sudah ada")

    # create new village
    village = Village(id=f"{Village.get_id_prefix()}_{ULID()}",
                      name=model.name.upper())

    # create village investment
    village_investment = VillageInvestment(
        id=f"{VillageInvestment.get_id_prefix()}_{ULID()}",
        village_id=village.id,
        kesiapan_warga=0,
        kerja_sama=0,
        infrastruktur=0)

    # save to database
    db.add(village)
    db.add(village_investment)
    db.commit()
    db.refresh(village)

    # return token
    return VillageDto(id=village.id, name=village.name)


@router.get("/", response_model=ListVillageDto)
async def list_all(q: str | None = None,
                   sort_by: str = "id",
                   sort_order: SortModel = SortModel.asc,
                   page: int = 1,
                   page_size: int = 10,
                   db: Session = Depends(get_db),
                   _: str = Depends(get_jwt_user)):
    # build query
    query = db.query(Village)

    # search by keyword
    if q:
        query = query.filter(Village.name.like(f"%{q}%"))

    # create sorting
    if sort_by == "id":
        if SortModel == SortModel.asc:
            query = query.order_by(Village.id.asc())
        else:
            query = query.order_by(Village.id.desc())
    elif sort_by == "name":
        if SortModel == SortModel.asc:
            query = query.order_by(Village.name.asc())
        else:
            query = query.order_by(Village.name.desc())

    # get total
    total = query.count()

    # get villages
    data = query.offset((page - 1) * page_size) \
        .limit(page_size) \
        .all()

    data = [VillageDto(id=village.id, name=village.name) for village in data]

    return ListVillageDto(
        meta=get_pagination_meta(total, len(data), page, page_size),
        data=data,
    )


@router.get("/droplist", response_model=list[VillageDto])
async def drop_list(db: Session = Depends(get_db),
                    _: str = Depends(get_jwt_user)):
    # find village
    villages = db.query(Village) \
        .order_by(Village.name.asc()) \
        .all()

    data = [
        VillageDto(id=village.id, name=village.name) for village in villages
    ]

    return data


@router.get("/{id}", response_model=VillageDto)
async def get(id: str,
              db: Session = Depends(get_db),
              _: str = Depends(get_jwt_user)):
    # find village
    village: Village = db.query(Village) \
        .filter(Village.id == id) \
        .first()

    # check if village exists
    if not village:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Desa tidak ditemukan")

    return VillageDto(id=village.id, name=village.name)


@router.put("/{id}", response_model=VillageDto)
async def update(id: str,
                 model: UpdateModel,
                 db: Session = Depends(get_db),
                 _: str = Depends(get_jwt_user)):
    # find village
    village: Village = db.query(Village) \
        .filter(Village.id == id) \
        .first()

    # check if village exists
    if not village:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Desa tidak ditemukan")

    # update village
    village.name = model.name.upper()

    # save to database
    db.add(village)
    db.commit()
    db.refresh(village)

    return VillageDto(id=village.id, name=village.name)


@router.delete("/{id}")
async def delete(id: str,
                 db: Session = Depends(get_db),
                 _: str = Depends(get_jwt_user)):
    # find village
    village: Village = db.query(Village) \
        .filter(Village.id == id) \
        .first()

    # check if village exists
    if not village:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Desa tidak ditemukan")

    # delete village
    db.delete(village)
    db.commit()

    return None
