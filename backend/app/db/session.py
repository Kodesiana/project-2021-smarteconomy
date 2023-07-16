from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

from app.core.config import settings

engine = create_engine(
    settings.DB_CONNECTION_STRING,
    pool_pre_ping=True,
    pool_size=5,
    max_overflow=10,
)
SessionLocal: Session = sessionmaker(autocommit=False,
                                     autoflush=False,
                                     bind=engine)
