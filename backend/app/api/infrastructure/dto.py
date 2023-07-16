from pydantic import BaseModel

from app.api.dependencies import PaginationMetaModel


class ListItem(BaseModel):
    id: str
    villageId: str
    villageName: str
    index: float
    potential: str


class ListInfrastructureDto(BaseModel):
    meta: PaginationMetaModel
    data: list[ListItem]
