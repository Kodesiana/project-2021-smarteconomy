from starlette import status
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException

from app.models import VillageInvestment, Village
from app.api.dependencies import SortModel, get_db, get_jwt_user, get_pagination_meta

from app.api.investment.dto import InvestmentDto, ListInvestmentDto
from app.api.investment.schemas import UpdateModel

router = APIRouter()


@router.get("/", response_model=ListInvestmentDto)
async def list_all(q: str | None = None,
                   sort_by: str = "id",
                   sort_order: SortModel = SortModel.asc,
                   page: int = 1,
                   page_size: int = 10,
                   db: Session = Depends(get_db),
                   _: str = Depends(get_jwt_user)):
    # build query
    query = db.query(VillageInvestment).join(Village)

    # search by keyword
    if q:
        query = query.filter(Village.name.like(f"%{q}%"))

    # create sorting
    if sort_by == "id":
        if SortModel == SortModel.asc:
            query = query.order_by(VillageInvestment.id.asc())
        else:
            query = query.order_by(VillageInvestment.id.desc())
    elif sort_by == "villageName":
        if SortModel == SortModel.asc:
            query = query.order_by(Village.name.asc())
        else:
            query = query.order_by(Village.name.desc())
    elif sort_by == "kesiapanWarga":
        if SortModel == SortModel.asc:
            query = query.order_by(VillageInvestment.kesiapan_warga.asc())
        else:
            query = query.order_by(VillageInvestment.kesiapan_warga.desc())
    elif sort_by == "kerjaSama":
        if SortModel == SortModel.asc:
            query = query.order_by(VillageInvestment.kerja_sama.asc())
        else:
            query = query.order_by(VillageInvestment.kerja_sama.desc())
    elif sort_by == "infrastruktur":
        if SortModel == SortModel.asc:
            query = query.order_by(VillageInvestment.infrastruktur.asc())
        else:
            query = query.order_by(VillageInvestment.infrastruktur.desc())

    # get total
    total = query.count()

    # get villages
    data = query.offset((page - 1) * page_size) \
        .limit(page_size) \
        .all()

    data = [
        InvestmentDto(
            id=investment.id,
            villageId=investment.village.id,
            villageName=investment.village.name,
            kesiapanWarga=investment.kesiapan_warga,
            kerjaSama=investment.kerja_sama,
            infrastruktur=investment.infrastruktur,
        ) for investment in data
    ]

    return ListInvestmentDto(
        meta=get_pagination_meta(total, len(data), page, page_size),
        data=data,
    )


@router.get("/{id}", response_model=InvestmentDto)
async def get(id: str,
              db: Session = Depends(get_db),
              _: str = Depends(get_jwt_user)):
    # find village
    investment: VillageInvestment = db.query(VillageInvestment) \
        .join(Village) \
        .filter(VillageInvestment.id == id) \
        .first()

    # check if village exists
    if not investment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Investasi desa tidak ditemukan")

    return InvestmentDto(
        id=investment.id,
        villageId=investment.village.id,
        villageName=investment.village.name,
        kesiapanWarga=investment.kesiapan_warga,
        kerjaSama=investment.kerja_sama,
        infrastruktur=investment.infrastruktur,
    )


@router.put("/{id}", response_model=InvestmentDto)
async def update(id: str,
                 model: UpdateModel,
                 db: Session = Depends(get_db),
                 _: str = Depends(get_jwt_user)):
    # find village
    investment: VillageInvestment = db.query(VillageInvestment) \
        .filter(VillageInvestment.id == id) \
        .first()

    # check if village exists
    if not investment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Investasi desa tidak ditemukan")

    # update village
    investment.kesiapan_warga = model.kesiapanWarga
    investment.kerja_sama = model.kerjaSama
    investment.infrastruktur = model.infrastruktur

    # save to database
    db.add(investment)
    db.commit()
    db.refresh(investment)

    return InvestmentDto(
        id=investment.id,
        kesiapanWarga=investment.kesiapan_warga,
        kerjaSama=investment.kerja_sama,
        infrastruktur=investment.infrastruktur,
    ).dict(exclude_none=True)
