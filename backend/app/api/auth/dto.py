from pydantic import BaseModel


class UserDto(BaseModel):
    id: str
    full_name: str
    username: str
    role: str


class LoginDto(BaseModel):
    token: str
    user: UserDto
