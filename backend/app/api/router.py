from fastapi import APIRouter

from app.api.auth import controller as auth
from app.api.analysis import controller as analysis
from app.api.dashboard import controller as dashboard

from app.api.cooperation import controller as cooperation
from app.api.questionnaire import controller as questionnaire
from app.api.infrastructure import controller as infrastructure

from app.api.investment import controller as investment
from app.api.villages import controller as villages
from app.api.user import controller as users

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(analysis.router,
                          prefix="/analysis",
                          tags=["Analisis"])
api_router.include_router(dashboard.router,
                          prefix="/dashboard",
                          tags=["Dashboard"])

api_router.include_router(cooperation.router,
                          prefix="/cooperation",
                          tags=["Kerja Sama"])
api_router.include_router(questionnaire.router,
                          prefix="/questionaire",
                          tags=["Kuesioner"])
api_router.include_router(infrastructure.router,
                          prefix="/infrastructure",
                          tags=["Infrastruktur"])

api_router.include_router(investment.router,
                          prefix="/investment",
                          tags=["Investasi"])
api_router.include_router(villages.router, prefix="/villages", tags=["Desa"])
api_router.include_router(users.router, prefix="/users", tags=["Pengguna"])
