import json
import itertools

import pandas as pd
from starlette import status
from fastapi import HTTPException

from app.models import SynthesisCitizenScience
from app.api.analysis.dto import (SemplsSummaryDto, SummarySemplsModel,
                                  SummarySensitivityModel, SemplsDetailedDto,
                                  DetailedEffectModel,
                                  DetailedInnerSummaryModel,
                                  DetailedInnerModelModel,
                                  DetailedSensitivityModel)


def aggregate_var(data, variable_name: str,
                  grouping_cols: list[str]) -> pd.DataFrame:
    flat_vars = [entry[variable_name] for entry in data]
    flat_vars = itertools.chain.from_iterable(flat_vars)
    df = pd.DataFrame(flat_vars)
    df = df.groupby(grouping_cols)

    return df.mean().reset_index()


def sempls_detailed(data: list[SynthesisCitizenScience]) -> SemplsDetailedDto:
    # load all JSON data
    all_data = [
        json.loads(d.json_result) for d in data if len(d.json_result) > 5
    ]

    # if data is empty, raise error
    if len(all_data) == 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Data tidak ditemukan")

    # aggregate effects
    effects_agg = aggregate_var(all_data, "effects", ["index", "from", "to"])
    effects = [
        DetailedEffectModel(
            index=effect["index"],
            var_from=effect["from"],
            var_to=effect["to"],
            direct=effect["direct"],
            indirect=effect["indirect"],
            total=effect["total"],
        ) for effect in effects_agg.to_dict(orient="records")
    ]

    # aggregate inner summary
    inner_summary_agg = aggregate_var(all_data, "inner_summary",
                                      ["index", "type"])
    inner_summary = [
        DetailedInnerSummaryModel(
            index=summary["index"],
            type=summary["type"],
            r_squared=summary["r_squared"],
            r_squared_adj=summary["r_squared_adj"],
            block_communality=summary["block_communality"],
            mean_redundancy=summary["mean_redundancy"],
            average=summary["ave"],
        ) for summary in inner_summary_agg.to_dict(orient="records")
    ]

    # aggregate inner model
    inner_model_agg = aggregate_var(all_data, "inner_model",
                                    ["index", "from", "to"])
    inner_model = [
        DetailedInnerModelModel(
            index=model["index"],
            var_from=model["from"],
            var_to=model["to"],
            estimate=model["estimate"],
            std_error=model["std error"],
            t_value=model["t"],
            p_value=model["p>|t|"],
        ) for model in inner_model_agg.to_dict(orient="records")
    ]

    # aggregate sensitivity
    sensitivity_agg = aggregate_var(all_data, "sensitivity", ["variable"])
    sensitivity = [
        DetailedSensitivityModel(
            variable=sens["variable"],
            sensitivity=sens["sensitivity"],
        ) for sens in sensitivity_agg.to_dict(orient="records")
    ]

    return SemplsDetailedDto(
        effects=effects,
        inner_summary=inner_summary,
        inner_model=inner_model,
        sensitivity=sensitivity,
    )


def sempls_summary(data: list[SynthesisCitizenScience]) -> SemplsSummaryDto:
    # load all JSON data
    all_data = [
        json.loads(d.json_result) for d in data if len(d.json_result) > 5
    ]

    # if data is empty, raise error
    if len(all_data) == 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Data tidak ditemukan")

    # aggreate models and summaries
    models = aggregate_var(all_data, "inner_model", ["index", "from", "to"])
    summaries = aggregate_var(all_data, "inner_summary", ["index", "type"])

    # join models and summaries
    joined = pd.merge(models, summaries, left_on="from", right_on="index")
    joined = joined[["index_x", "estimate", "p>|t|", "r_squared"]]

    # build summary list
    summary = [
        SummarySemplsModel(
            index=summary["index_x"],
            estimate=summary["estimate"],
            p_value=summary["p>|t|"],
            r_squared=summary["r_squared"],
        ) for summary in joined.to_dict(orient="records")
    ]

    # aggregate sensitivity
    sensitivity_agg = aggregate_var(all_data, "sensitivity", ["variable"])
    sensitivity = [
        SummarySensitivityModel(
            variable=sens["variable"],
            sensitivity=sens["sensitivity"],
        ) for sens in sensitivity_agg.to_dict(orient="records")
    ]

    return SemplsSummaryDto(
        inner_summary=summary,
        sensitivity=sensitivity,
    )
