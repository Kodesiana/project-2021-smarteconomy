from pydantic import BaseModel

from app.api.dependencies import PaginationMetaModel

SYNTHESIS_STATUS = {
    0: "Diproses",
    1: "Selesai",
    2: "Gagal",
}

SYNTHESIS_STATUS_INV = {v: k for k, v in SYNTHESIS_STATUS.items()}


class CooperationDto(BaseModel):
    id: str
    expertName: str
    villageId: str
    villageName: str
    status: str


class ListCooperationModel(BaseModel):
    meta: PaginationMetaModel
    data: list[CooperationDto]
