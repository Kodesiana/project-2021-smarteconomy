from sqlalchemy import Column, String, Integer, Numeric
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class QuestionnaireDashboard(Base):
    __tablename__ = "questionnaire_dashboard"

    id = Column(String(30), primary_key=True)
    village_id = Column(String(30))
    village_name = Column(String(255))

    pekerjaan = Column(Integer)
    kepemilikan_lahan = Column(Integer)
    pengeluaran_bulanan = Column(Numeric)

    motivasi_1 = Column(Integer)
    motivasi_2 = Column(Integer)
    motivasi_3 = Column(Integer)

    tik_1 = Column(Integer)
    tik_2 = Column(Integer)
    tik_3 = Column(Integer)
    tik_4 = Column(Integer)
    tik_5 = Column(Integer)
    tik_6 = Column(Integer)

    informasi_1 = Column(Integer)
    informasi_2 = Column(Integer)
    informasi_3 = Column(Integer)
    informasi_4 = Column(Integer)
    informasi_5 = Column(Integer)
