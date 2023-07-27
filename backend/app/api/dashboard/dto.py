from typing import Union

from pydantic import BaseModel


class SummariesModel(BaseModel):
    villageCount: int = 0
    answersCount: int = 0


class QuestionnaireModel(BaseModel):
    village_name: str
    count: int = 0


class JobModel(BaseModel):
    village_name: str
    tani: int = 0
    ternak: int = 0
    nelayan: int = 0
    pns: int = 0
    lainnya: int = 0


class LandOwnershipModel(BaseModel):
    village_name: str
    milik_sendiri: int = 0
    parohan: int = 0
    lainnya: int = 0


class MotivationModel(BaseModel):
    village_name: str
    tik: int = 0
    kerja_sama: int = 0
    pariwisata: int = 0


class ExpensesModel(BaseModel):
    mapping: dict[str, str]
    data: list[dict[str, Union[int, str]]]

    class Config:
        smart_union = True


class TIKModel(BaseModel):
    village_name: str
    lapangan_pekerjaan: int = 0
    penghasilan: int = 0
    memberdayakan_warga: int = 0
    mendatangkan_turis: int = 0
    akses_pasar: int = 0
    promosi_komoditas: int = 0


class InformationModel(BaseModel):
    village_name: str
    aparat_desa: int = 0
    tokoh: int = 0
    pemda_kab: int = 0
    pemda_pusat: int = 0
    lainnya: int = 0


class PLSNNModel(BaseModel):
    village_name: str
    rank_1: float
    rank_2: float
    rank_3: float
