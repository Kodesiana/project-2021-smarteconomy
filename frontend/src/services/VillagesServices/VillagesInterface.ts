export type VillagesNameRequest = {
  name: string;
}

export type VillagesIdRequest = {
  id: string;
};

export type VillagesParamsRequest = {
  q?: string;
  sort_by?: string;
  sort_order?: "Default" | "Ascending" | "Descending";
  page?: number;
  page_size?: number;
};

export type MetaProps = {
  totalData: number;
  totalDataOnPage: number;
  currentPage: number;
  pageSize: number;
  totalPage: number;
};

export type VillagesPaginationResponse<T = unknown[]> = {
  meta: MetaProps;
  data: T;
};

export type VillagesDropListResponse = {
  id: string;
  name: string;
};