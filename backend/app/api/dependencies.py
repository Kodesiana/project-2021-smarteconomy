import math
from enum import Enum
from typing import Generator

from jose import ExpiredSignatureError

from fastapi import Depends
from fastapi.security import HTTPBasic, HTTPBasicCredentials, HTTPBearer, HTTPAuthorizationCredentials

from starlette import status
from starlette.exceptions import HTTPException

from pydantic import BaseModel

from app.core.logger import logger
from app.db.session import SessionLocal
from app.core.security import verify_basic_user, decode_access_token

security_jwt = HTTPBearer()
security_httpbasic = HTTPBasic()


class PaginationMetaModel(BaseModel):
    totalData: int
    totalDataOnPage: int
    currentPage: int
    pageSize: int
    totalPage: int


class SortModel(str, Enum):
    asc = "asc"
    desc = "desc"


def get_db() -> Generator:
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


def get_basic_user(user: HTTPBasicCredentials = Depends(security_httpbasic)):
    if not verify_basic_user(user.username, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Basic"},
        )

    return user.username


def get_jwt_user(token: HTTPAuthorizationCredentials = Depends(security_jwt)):
    try:
        if not token.scheme == "Bearer":
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail="Invalid authentication scheme.")

        payload = decode_access_token(token.credentials)
        return payload
    except ExpiredSignatureError as err:
        logger.error(err)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token is expired",
        )
    except Exception as err:
        logger.error(err)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
        )


def get_pagination_meta(total: int, count: int, page: int, page_size: int):
    return PaginationMetaModel(
        totalData=total,
        totalDataOnPage=count,
        currentPage=page,
        pageSize=page_size,
        totalPage=math.ceil(float(total) / float(page_size)),
    )
