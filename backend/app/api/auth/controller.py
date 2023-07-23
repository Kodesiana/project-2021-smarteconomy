from starlette import status
from sqlalchemy.orm import Session
from fastapi import APIRouter, HTTPException, Depends

from app.models import User, USER_ROLE
from app.core.security import verify_password, create_access_token
from app.api.dependencies import get_db, get_basic_user

from app.api.auth.schemas import LoginModel
from app.api.auth.dto import LoginDto, UserDto

router = APIRouter()


@router.post("/login", response_model=LoginDto)
async def login(model: LoginModel,
                db: Session = Depends(get_db)):
    # find user
    user: User = db.query(User).filter(User.username == model.username).first()

    # check if user exists
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Username or password not valid")

    # check if password is valid
    if not verify_password(model.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Username or password not valid")

    # return token
    return LoginDto(token=create_access_token(user.id, user.role_code),
                    user=UserDto(id=user.id,
                                 full_name=user.full_name,
                                 username=user.username,
                                 role=USER_ROLE[user.role_code]))
