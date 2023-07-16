from pydantic import BaseModel

from app.api.dependencies import PaginationMetaModel


class AnswerItemDetailDto(BaseModel):
    id: str
    name: str
    sex: str
    phone: str
    status: str
    workClass: str
    villageName: str
    content: dict[str, str]


class AnswerItem(BaseModel):
    id: str
    name: str
    sex: str
    phone: str
    status: str
    workClass: str
    villageName: str


class QuestionnaireListResponse(BaseModel):
    meta: PaginationMetaModel
    data: list[AnswerItem]
