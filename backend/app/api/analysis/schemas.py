from enum import Enum

from typing import Optional
from pydantic import BaseModel, validator

from app.models import Village, SynthesisCooperation


class CitizenScienceMode(str, Enum):
    summary = "summary"
    detailed = "detailed"


class CitizenScienceModel(BaseModel):
    mode: CitizenScienceMode
    order: int
    villageId: Optional[str]

    @validator("order")
    def order_must_be_one_or_two(cls, v):
        if v not in [1, 2]:
            raise ValueError("order must be 1 or 2")
        return v

    @validator("villageId")
    def villageId_must_be_valid(cls, v):
        if v is not None and len(v) != 30:
            raise ValueError("villageId must be null or 30 characters long")

        if v is not None and not v.startswith(Village.get_id_prefix()):
            raise ValueError("villageId must not starts with " +
                             Village.get_id_prefix())

        return v


class SpatialScoringModel(BaseModel):
    villageId: str


class CooperationModel(BaseModel):
    villageId: str | None
    kerjaSamaId: str | None

    @validator("villageId")
    def villageId_must_be_valid(cls, v):
        if v is not None and len(v) != 30:
            raise ValueError("villageId must be null or 30 characters long")

        if v is not None and not v.startswith(Village.get_id_prefix()):
            raise ValueError("villageId must not starts with " +
                             Village.get_id_prefix())

        return v

    @validator("kerjaSamaId")
    def kerjaSamaId_must_be_valid(cls, v):
        if v is not None and len(v) != 30:
            raise ValueError("kerjaSamaId must be null or 30 characters long")

        if v is not None and not v.startswith(
                SynthesisCooperation.get_id_prefix()):
            raise ValueError("kerjaSamaId must not starts with " +
                             SynthesisCooperation.get_id_prefix())

        return v

    @validator("kerjaSamaId", "villageId", always=True)
    def either_villageId_or_kerjaSamaId_must_be_filled(cls, v, values):
        if "villageId" in values and "kerjaSamaId" in values:
            raise ValueError(
                "either villageId or kerjaSamaId must be filled, not both")

        return v


class RecommendationModel(BaseModel):
    villageId: str


class BackfillMode(str, Enum):
    citizen_science = "citizen_science"
    infrastructure = "infrastructure"


class BackfillModel(BaseModel):
    id: str | None
    kind: BackfillMode

    @validator("id")
    def id_must_starts_with_village_prefix(cls, v):
        if v is not None and len(v) != 30:
            raise ValueError("villageId must be null or 30 characters long")

        if v is not None and not v.startswith(Village.get_id_prefix()):
            raise ValueError("id must starts with " + Village.get_id_prefix())
        return v

    @validator("kind")
    def id_must_available_when_kind_is_citizen_science(cls, v, values):
        if v == BackfillMode.citizen_science and values["id"] is None:
            raise ValueError("id must be filled when kind is citizen_science")
        return v
