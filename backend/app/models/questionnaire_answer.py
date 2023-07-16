from sqlalchemy import Column, ForeignKey, String, SmallInteger
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class QuestionnaireAnswer(Base):
    __tablename__ = "questionnaire_answer"

    @staticmethod
    def get_id_prefix():
        return "ans"

    id = Column(String(30), primary_key=True)
    name = Column(String(255))
    sex = Column(SmallInteger)
    phone = Column(String(18))
    status = Column(SmallInteger)
    work_class = Column(String(50))
    json_content = Column(String)

    village_id = Column(String(30), ForeignKey("villages.id"))
    village = relationship("Village", back_populates="answers")
