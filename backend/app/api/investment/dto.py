from pydantic import BaseModel

from app.api.dependencies import PaginationMetaModel


class InvestmentDto(BaseModel):
    id: str
    villageId: str | None
    villageName: str | None
    kesiapanWarga: float
    kerjaSama: float
    infrastruktur: float


class ListInvestmentDto(BaseModel):
    meta: PaginationMetaModel
    data: list[InvestmentDto]
