import useQuery from "@/hooks/useQuery";

import VillagesServices from "./VillagesServices";

export const useGetVillagesDropList = () => useQuery({
  key: ['Villages', 'getVillagesDropList'],
  fetchAction: async () => VillagesServices.getVillagesDropList(),
  select: (data) => data?.data ?? [],
});

export const useGetVillages = (params: any, enabled: boolean) => useQuery({
  key: ['Villages', 'getVillages', params],
  enabled,
  fetchAction: async () => VillagesServices.getVillages({ page: 1, page_size: 10, ...params }),
  select: (data) => data?.data ?? { data: [], meta: {} },
  placeholderData: { data: { data: [], meta: {} } },
});