from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends

from app.models import SynthesisInfrastructure, Village
from app.api.dependencies import SortModel, get_db, get_jwt_user, get_pagination_meta

from app.api.infrastructure.dto import ListItem, ListInfrastructureDto

router = APIRouter()


@router.get("/")
async def list(q: str | None = None,
               sort_by: str = "id",
               sort_order: SortModel = SortModel.asc,
               page: int = 1,
               page_size: int = 10,
               db: Session = Depends(get_db),
               _: str = Depends(get_jwt_user)):
    # build query
    query = db.query(SynthesisInfrastructure) \
        .join(Village)

    # search by keyword
    if q:
        query = query.filter(Village.name.like(f"%{q}%"))

    # create sorting
    if sort_by == "id":
        if SortModel == SortModel.asc:
            query = query.order_by(SynthesisInfrastructure.id.asc())
        else:
            query = query.order_by(SynthesisInfrastructure.id.desc())
    elif sort_by == "villageName":
        if SortModel == SortModel.asc:
            query = query.order_by(Village.name.asc())
        else:
            query = query.order_by(Village.name.desc())
    elif sort_by == "villageId":
        if SortModel == SortModel.asc:
            query = query.order_by(SynthesisInfrastructure.village.Id.asc())
        else:
            query = query.order_by(SynthesisInfrastructure.village.Id.desc())
    elif sort_by == "index":
        if SortModel == SortModel.asc:
            query = query.order_by(SynthesisInfrastructure.village_index.asc())
        else:
            query = query.order_by(
                SynthesisInfrastructure.village_index.desc())
    elif sort_by == "potential":
        if SortModel == SortModel.asc:
            query = query.order_by(SynthesisInfrastructure.potential.asc())
        else:
            query = query.order_by(SynthesisInfrastructure.potential.desc())

    # get total
    total = query.count()

    # get villages
    data = query.offset((page - 1) * page_size) \
        .limit(page_size) \
        .all()

    data = [
        ListItem(id=item.id,
                 villageId=item.village.id,
                 villageName=item.village.name,
                 index=item.village_index,
                 potential=item.potential) for item in data
    ]

    return ListInfrastructureDto(
        meta=get_pagination_meta(total, len(data), page, page_size),
        data=data,
    )
