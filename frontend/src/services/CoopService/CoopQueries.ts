import { useQuery } from "../queries";
import { ParamsRequest } from "../QuestionaireServices/QuestionaireInterface";
import CoopServices from "./CoopServices";

export const useGetCoop = (params: ParamsRequest, enabled = false) => {
    const { data, error, isFetching } = useQuery({
        key: ["getCoop", params],
        enabled,
        fetchAction: () => CoopServices.getCooperation(params),
        select: (data) => data?.data ?? { data: [], meta: {} },
        placeholderData: { data: { data: [], meta: {} } },
    });

    return {
        data,
        error,
        isFetching,
    };
};

export const useGetCoopDl = (params: {villageId?: string}, enabled = false) => {
    const { data, error, isFetching } = useQuery({
        key: ["getCoop", params],
        enabled,
        fetchAction: () => CoopServices.getCoopDl(params),
        select: (data) => data?.data ?? [],
        placeholderData: [] ,
    });

    return {
        data,
        error,
        isFetching,
    };
};
