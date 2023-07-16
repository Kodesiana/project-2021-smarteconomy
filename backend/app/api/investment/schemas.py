from pydantic import BaseModel


class UpdateModel(BaseModel):
    kesiapanWarga: float
    kerjaSama: float
    infrastruktur: float
