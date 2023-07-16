from sqlalchemy import Column, ForeignKey, String, Numeric
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class VillageInvestment(Base):
    __tablename__ = "village_investment"

    @staticmethod
    def get_id_prefix():
        return "vii"

    id = Column(String(30), primary_key=True)
    kesiapan_warga = Column(Numeric(12, 2))
    kerja_sama = Column(Numeric(12, 2))
    infrastruktur = Column(Numeric(12, 2))

    village_id = Column(String(30), ForeignKey("villages.id"))
    village = relationship("Village", back_populates="investment")
