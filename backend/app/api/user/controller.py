from ulid import ULID
from starlette import status
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException

from app.models import USER_ROLE, USER_ROLE_INV, User
from app.core.security import get_password_hash
from app.api.dependencies import SortModel, get_db, get_jwt_user, get_pagination_meta

from app.api.user.dto import UserDto, ListUserDto
from app.api.user.schemas import CreateModel, UpdateModel, ChangePasswordModel

router = APIRouter()


@router.post("/", response_model=UserDto)
async def create(model: CreateModel,
                 db: Session = Depends(get_db),
                 _: str = Depends(get_jwt_user)):
    # find user
    user: User = db.query(User) \
        .filter(User.username == model.username) \
        .first()

    # check if User exists
    if user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Username sudah terdaftar")

    # create new User
    user = User(id=f"{User.get_id_prefix()}_{ULID()}",
                full_name=model.fullName,
                username=model.username,
                hashed_password=get_password_hash(model.password),
                role_code=USER_ROLE_INV[model.role],
                is_protected=False)

    # save to database
    db.add(user)
    db.commit()
    db.refresh(user)

    # delete user password
    del user.hashed_password

    # return token
    return UserDto(
        id=user.id,
        role=USER_ROLE[user.role_code],
        username=user.username,
        fullName=user.full_name,
    )


@router.get("/", response_model=ListUserDto)
async def list(q: str | None = None,
               sort_by: str = "id",
               sort_order: SortModel = SortModel.asc,
               page: int = 1,
               page_size: int = 10,
               db: Session = Depends(get_db),
               _: str = Depends(get_jwt_user)):
    # build query
    query = db.query(User)

    # search by keyword
    if q:
        query = query.filter(User.full_name.like(f"%{q}%")) \
                     .filter(User.username.like(f"%{q}%")) \

    # create sorting
    if sort_by == "id":
        if SortModel == SortModel.asc:
            query = query.order_by(User.id.asc())
        else:
            query = query.order_by(User.id.desc())
    elif sort_by == "full_name":
        if SortModel == SortModel.asc:
            query = query.order_by(User.full_name.asc())
        else:
            query = query.order_by(User.full_name.desc())
    elif sort_by == "username":
        if SortModel == SortModel.asc:
            query = query.order_by(User.username.asc())
        else:
            query = query.order_by(User.username.desc())
    elif sort_by == "role":
        if SortModel == SortModel.asc:
            query = query.order_by(User.role_code.asc())
        else:
            query = query.order_by(User.role_code.desc())

    # get total
    total = query.count()

    # get users
    data = query.offset((page - 1) * page_size) \
        .limit(page_size) \
        .all()

    # map data
    data = [
        UserDto(
            id=user.id,
            role=USER_ROLE[user.role_code],
            username=user.username,
            fullName=user.full_name,
        ) for user in data
    ]

    return ListUserDto(
        meta=get_pagination_meta(total, len(data), page, page_size),
        data=data,
    )


@router.put("/password/{id}")
async def change_password(id: str,
                          model: ChangePasswordModel,
                          db: Session = Depends(get_db),
                          _: str = Depends(get_jwt_user)):
    # check if the password match
    if model.password != model.confirmPassword:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Password tidak cocok")

    # find user
    user: User = db.query(User) \
        .filter(User.id == id) \
        .first()

    # check if user exists
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Pengguna tidak ditemukan")

    # create new password
    user.hashed_password = get_password_hash(model.password)

    # save to database
    db.add(user)
    db.commit()

    return None


@router.get("/{id}", response_model=UserDto)
async def get(id: str,
              db: Session = Depends(get_db),
              _: str = Depends(get_jwt_user)):
    # find user
    user: User = db.query(User) \
        .filter(User.id == id) \
        .first()

    # check if user exists
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Pengguna tidak ditemukan")

    return UserDto(
        id=user.id,
        role=USER_ROLE[user.role_code],
        username=user.username,
        fullName=user.full_name,
    )


@router.put("/{id}", response_model=UserDto)
async def update(id: str,
                 model: UpdateModel,
                 db: Session = Depends(get_db),
                 _: str = Depends(get_jwt_user)):
    # find user
    user: User = db.query(User) \
        .filter(User.id == id) \
        .first()

    # check if user exists
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Pengguna tidak ditemukan")

    # check if user is protected
    if user.is_protected:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="Pengguna tidak dapat diganti")

    # update user
    user.full_name = model.fullName
    user.role_code = USER_ROLE_INV[model.role]

    # save to database
    db.add(user)
    db.commit()
    db.refresh(user)

    return UserDto(
        id=user.id,
        role=USER_ROLE[user.role_code],
        username=user.username,
        fullName=user.full_name,
    )


@router.delete("/{id}")
async def delete(id: str,
                 db: Session = Depends(get_db),
                 _: str = Depends(get_jwt_user)):
    # find user
    user: User = db.query(User) \
        .filter(User.id == id) \
        .first()

    # check if user exists
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Pengguna tidak ditemukan")

    # check if user is protected
    if user.is_protected:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="Pengguna tidak dapat dihapus")

    # delete User
    db.delete(user)
    db.commit()

    return None
