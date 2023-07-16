import secrets
from datetime import datetime, timedelta

from jose import jwt
from passlib.context import CryptContext

from app.core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

ALGORITHM = "HS256"


def create_access_token(userId: str, role: str) -> str:
    expire = datetime.utcnow() + timedelta(
        days=settings.JWT_EXPIRE_IN_DAYS)
    to_encode = {
        "exp": expire,
        "sub": userId,
        "iss": settings.JWT_AUD_ISS,
        "aud": settings.JWT_AUD_ISS,
        "role": role,
    }

    encoded_jwt = jwt.encode(to_encode,
                             settings.JWT_SECRET_KEY,
                             algorithm=ALGORITHM)
    return encoded_jwt


def decode_access_token(token: str) -> dict[str, str]:
    return jwt.decode(token,
                      settings.JWT_SECRET_KEY,
                      audience=settings.JWT_AUD_ISS,
                      issuer=settings.JWT_AUD_ISS,
                      algorithms=[ALGORITHM])


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def verify_basic_user(username: str, password: str) -> bool:
    username_correct = secrets.compare_digest(
        username.encode("utf8"), settings.AUTH_BASIC_USERNAME.encode("utf8"))
    password_correct = secrets.compare_digest(
        password.encode("utf8"), settings.AUTH_BASIC_PASSWORD.encode("utf8"))

    return username_correct and password_correct
