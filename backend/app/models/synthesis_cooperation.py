from sqlalchemy import Column, ForeignKey, String, Integer, Float
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class SynthesisCooperation(Base):
    __tablename__ = "synthesis_cooperation"

    @staticmethod
    def get_id_prefix():
        return "coi"

    id = Column(String(30), primary_key=True)
    expert_name = Column(String(255))
    status = Column(Integer)
    cr = Column(Float)
    json_factors = Column(String)
    json_alternatives = Column(String)

    village_id = Column(String, ForeignKey("villages.id"))
    village = relationship("Village", back_populates="cooperations")
