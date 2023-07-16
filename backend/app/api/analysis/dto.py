from pydantic import BaseModel, Field

# ---- citizen science


class DetailedEffectModel(BaseModel):
    index: str
    var_from: str = Field(..., alias="from")
    var_to: str = Field(..., alias="to")
    direct: float
    indirect: float
    total: float

    class Config:
        allow_population_by_field_name = True


class DetailedInnerSummaryModel(BaseModel):
    index: str
    type: str
    r_squared: float
    r_squared_adj: float
    block_communality: float
    mean_redundancy: float
    average: float


class DetailedInnerModelModel(BaseModel):
    index: str
    var_from: str = Field(..., alias="from")
    var_to: str = Field(..., alias="to")
    estimate: float
    std_error: float
    t_value: float
    p_value: float

    class Config:
        allow_population_by_field_name = True


class DetailedSensitivityModel(BaseModel):
    variable: str
    sensitivity: float


class SemplsDetailedDto(BaseModel):
    effects: list[DetailedEffectModel]
    inner_summary: list[DetailedInnerSummaryModel]
    inner_model: list[DetailedInnerModelModel]
    sensitivity: list[DetailedSensitivityModel]


class SummarySemplsModel(BaseModel):
    index: str
    estimate: float
    p_value: float
    r_squared: float


class SummarySensitivityModel(BaseModel):
    variable: str
    sensitivity: float


class SemplsSummaryDto(BaseModel):
    inner_summary: list[SummarySemplsModel]
    sensitivity: list[SummarySensitivityModel]


# ---- spatial scoring


class SpatialScoringDto(BaseModel):
    id: str
    villageName: str
    villageId: str
    potential: str
    objectId: int
    index: int
    market: int
    roads: int
    schools: int
    internet: int
    socialMedia: int
    irrigation: int
    banks: int
    cooperation: int
    umkm: int
    community: int
    tradition: int
    university: int
    regulation: int


# ---- cooperation


class CooperationAlternatives(BaseModel):
    as1: float
    as2: float
    as3: float
    as4: float
    as5: float
    as6: float


class CooperationFactor(BaseModel):
    f1: float
    f2: float
    f3: float
    f4: float
    f5: float


class CooperationDto(BaseModel):
    id: str
    expertName: str
    status: str
    cr: float
    alternatives: CooperationAlternatives
    factors: CooperationFactor


# ---- recommendation


class RecommendationItem(BaseModel):
    code: str
    variable: str
    value: float
    text: str


class RecommendationDto(BaseModel):
    rank: int
    threshold: float
    items: list[RecommendationItem]
