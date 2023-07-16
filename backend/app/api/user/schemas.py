from pydantic import BaseModel, validator

from app.models import USER_ROLE


class CreateModel(BaseModel):
    fullName: str
    username: str
    password: str
    role: str

    @validator("role")
    def role_must_be_supported(cls, v):
        if v not in USER_ROLE.values():
            raise ValueError(f"Role must be: {', '.join(USER_ROLE.values())}")
        return v


class UpdateModel(BaseModel):
    fullName: str
    role: str

    @validator("role")
    def role_must_be_supported(cls, v):
        if v not in USER_ROLE.values():
            raise ValueError(f"Role must be: {', '.join(USER_ROLE.values())}")
        return v


class ChangePasswordModel(BaseModel):
    password: str
    confirmPassword: str
