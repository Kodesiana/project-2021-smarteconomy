from sqlalchemy import Boolean, Column, String, SmallInteger

from app.db.base_class import Base


class User(Base):
    __tablename__ = "users"

    @staticmethod
    def get_id_prefix():
        return "uid"

    id = Column(String(30), primary_key=True)
    full_name = Column(String(255))
    username = Column(String(255), nullable=False)
    hashed_password = Column(String(60), nullable=False)
    role_code = Column(SmallInteger)
    is_protected = Column(Boolean)
