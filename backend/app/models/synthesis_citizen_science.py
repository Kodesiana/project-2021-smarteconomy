from sqlalchemy import Column, ForeignKey, String, SmallInteger
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class SynthesisCitizenScience(Base):
    __tablename__ = "synthesis_citizen_science"

    @staticmethod
    def get_id_prefix():
        return "csi"

    id = Column(String(30), primary_key=True)
    sempls_order = Column(SmallInteger)
    status = Column(SmallInteger)
    json_result = Column(String)

    village_id = Column(String(30), ForeignKey("villages.id"))
    village = relationship("Village", back_populates="citizen_sciences")
