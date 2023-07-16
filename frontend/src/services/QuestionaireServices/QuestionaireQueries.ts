
import useQuery from "@/hooks/useQuery";
import { ParamsRequest } from "./QuestionaireInterface";
import QuestionaireServices from "./QuestionaireServices";
export const useGetQuesionare = (params: ParamsRequest,enabled = false) => {
    return useQuery({
        key: ["questionaire", params],
        enabled,
        fetchAction: () => QuestionaireServices.getQuestionaire({ page: 1, page_size: 10, ...params }),
        select: (data) => data?.data ?? { data: [], meta: {} },
        placeholderData: { data: { data: [], meta: {pageSize: 10, page: 1 } } },

    });
};