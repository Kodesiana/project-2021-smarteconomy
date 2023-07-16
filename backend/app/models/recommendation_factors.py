from sqlalchemy import Column, Float, String, Numeric

from app.db.base_class import Base


class RecommendationFactors(Base):
    __tablename__ = "recommendation_factors"

    village_id = Column(String(30), primary_key=True)
    c1 = Column(Float)
    c2 = Column(Float)
    c3 = Column(Float)
    c4 = Column(Float)
    c5 = Column(Float)
    c6 = Column(Float)
    f1 = Column(Float)
    f2 = Column(Float)
    f3 = Column(Float)
    f4 = Column(Float)
    f5 = Column(Float)
    g1 = Column(Float)
    inv1 = Column(Numeric)
    inv2 = Column(Numeric)
    inv3 = Column(Numeric)
