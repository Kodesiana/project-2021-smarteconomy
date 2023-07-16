from sqlalchemy import Column, String
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class Village(Base):
    __tablename__ = "villages"

    @staticmethod
    def get_id_prefix():
        return "vid"

    id = Column(String(30), primary_key=True)
    name = Column(String(255))

    answers = relationship("QuestionnaireAnswer",
                           back_populates="village",
                           cascade="all")
    investment = relationship("VillageInvestment",
                              back_populates="village",
                              cascade="all")
    cooperations = relationship("SynthesisCooperation",
                                back_populates="village",
                                cascade="all")
    infrastructure = relationship("SynthesisInfrastructure",
                                  back_populates="village",
                                  cascade="all")
    citizen_sciences = relationship("SynthesisCitizenScience",
                                    back_populates="village",
                                    cascade="all")
