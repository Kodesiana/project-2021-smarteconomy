import useQuery from "@/hooks/useQuery";
import DataServices from "./data.service";
import { SearchRequest } from "./interface";
import { ParamsRequest } from "./QuestionaireServices/QuestionaireInterface";

export const useGetUsers = ({ q, page = 1, page_size = 10, sort_by, sort_order }: SearchRequest) => {
  const { data, status, isFetching } = useQuery({
    key: ['GetUsers', q, page, page_size, sort_by, sort_order],
    fetchAction: async () => DataServices.getUsers({ q, page, page_size, sort_by, sort_order }),
    select: (data) => data?.data ?? { data: [], meta: {} },
    placeholderData: { data: { data: [], meta: {} } },
  });

  return { data, status, isFetching };
};

export const useGetInfra = (params: ParamsRequest, enabled = false) => {
  const { data, status, isFetching } = useQuery({
    key: ['GetInfra', params],
    enabled,
    fetchAction: async () => DataServices.getInfra(params),
    select: (data) => data?.data ?? { data: [], meta: {} },
    placeholderData: { data: { data: [], meta: {} } },
  });

  return { data, status, isFetching };
};

export const useGetInvestasi = ({ q, page = 1, page_size = 10, sort_by, sort_order }: SearchRequest, enabled = false) => {
  const { data, status, isFetching } = useQuery({
    key: ['GetInvestasi', q, page, page_size, sort_by, sort_order],
    fetchAction: async () => DataServices.getInvestasi({ q, page, page_size, sort_by, sort_order }),
    select: (data) => data?.data ?? { data: [], meta: {} },
    placeholderData: { data: { data: [], meta: {} } },
  });

  return { data, status, isFetching };
};

export { useQuery };