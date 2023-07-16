from sqlalchemy import Column, ForeignKey, String, Integer, Float
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class SynthesisInfrastructure(Base):
    __tablename__ = "synthesis_infrastructure"

    @staticmethod
    def get_id_prefix():
        return "vsi"

    id = Column(String(30), primary_key=True)
    object_id = Column(Integer)
    village_index = Column(Float)
    potential = Column(String(255))
    market = Column(Float)
    roads = Column(Float)
    schools = Column(Float)
    internet = Column(Float)
    social_media = Column(Float)
    irrigation = Column(Float)
    banks = Column(Float)
    cooperation = Column(Float)
    umkm = Column(Float)
    community = Column(Float)
    tradition = Column(Float)
    university = Column(Float)
    regulation = Column(Float)

    village_id = Column(String(30), ForeignKey("villages.id"))
    village = relationship("Village", back_populates="infrastructure")
