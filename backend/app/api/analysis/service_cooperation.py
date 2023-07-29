import json

import numpy as np
import pandas as pd

from app.models import SynthesisCooperation, PROCESS_STATUS
from app.api.analysis.dto import CooperationAlternatives, CooperationFactor, CooperationDto


def coop_single(model: SynthesisCooperation) -> CooperationDto:
    print(model)
    alts = json.loads(model.json_alternatives)
    factors = json.loads(model.json_factors)

    fmax = np.sum([factors[f"f{i}"] for i in range(1, 6)])

    return CooperationDto(
        id=model.id,
        expertName=model.expert_name,
        status=PROCESS_STATUS[model.status],
        cr=model.cr,
        alternatives=CooperationAlternatives(
            as1=alts["as1"],
            as2=alts["as2"],
            as3=alts["as3"],
            as4=alts["as4"],
            as5=alts["as5"],
            as6=alts["as6"],
        ),
        factors=CooperationFactor(
            f1=factors["f1"] / fmax,
            f2=factors["f2"] / fmax,
            f3=factors["f3"] / fmax,
            f4=factors["f4"] / fmax,
            f5=factors["f5"] / fmax,
        ),
    )


def coop_summarize(model: list[SynthesisCooperation]) -> CooperationDto:
    # load data
    all_crs = [m.cr for m in model]
    all_alts = [json.loads(m.json_alternatives) for m in model]
    all_factors = [json.loads(m.json_factors) for m in model]

    # build dataframe
    all_data = [{
        "cr": cr,
        **alts,
        **factors
    } for cr, alts, factors in zip(all_crs, all_alts, all_factors)]
    df = pd.DataFrame(all_data)

    # get means
    means = df.mean()
    fmax = np.sum([means[f"f{i}"] for i in range(1, 6)])

    return CooperationDto(
        id="",
        expertName="",
        status=PROCESS_STATUS[1],
        cr=means["cr"],
        alternatives=CooperationAlternatives(
            as1=means["as1"],
            as2=means["as2"],
            as3=means["as3"],
            as4=means["as4"],
            as5=means["as5"],
            as6=means["as6"],
        ),
        factors=CooperationFactor(
            f1=means["f1"] / fmax,
            f2=means["f2"] / fmax,
            f3=means["f3"] / fmax,
            f4=means["f4"] / fmax,
            f5=means["f5"] / fmax,
        ),
    )
