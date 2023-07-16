from pydantic import BaseSettings


class Settings(BaseSettings):
    # App config
    APP_NAME: str = "Smart Economy Analysis API"
    ENVIRONMENT: str = "development"

    # Security config
    JWT_AUD_ISS: str
    JWT_SECRET_KEY: str
    JWT_EXPIRE_IN_DAYS: int

    AUTH_BASIC_USERNAME: str
    AUTH_BASIC_PASSWORD: str

    # Database config
    DB_CONNECTION_STRING: str


settings = Settings()
