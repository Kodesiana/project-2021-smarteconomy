from pydantic import BaseModel

from app.api.dependencies import PaginationMetaModel


class VillageDto(BaseModel):
    id: str
    name: str


class ListVillageDto(BaseModel):
    meta: PaginationMetaModel
    data: list[VillageDto]
