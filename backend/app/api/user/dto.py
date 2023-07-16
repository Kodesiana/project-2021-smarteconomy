from pydantic import BaseModel

from app.api.dependencies import PaginationMetaModel


class UserDto(BaseModel):
    id: str
    role: str
    username: str
    fullName: str


class ListUserDto(BaseModel):
    meta: PaginationMetaModel
    data: list[UserDto]
