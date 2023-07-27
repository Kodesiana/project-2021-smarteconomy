from logging import config

# setup logging
config.fileConfig("logging.conf", disable_existing_loggers=False)

# fastapi
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# internal API
from app.api.router import api_router
from app.core.config import settings

# fastapi app
app = FastAPI(title=settings.APP_NAME)

# https redirection
# if settings.ENVIRONMENT == "production":
#     app.add_middleware(HTTPSRedirectMiddleware)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_origins=[
        "https://smarteconomy.id", "https://www.smarteconomy.id",
        "https://api.smarteconomy.id", "http://localhost:4000"
    ],
)


# home route
@app.get("/")
async def root():
    return f"Welcome to {settings.APP_NAME}! Please contact the developers to get access to this API."


# include api router
app.include_router(api_router)
