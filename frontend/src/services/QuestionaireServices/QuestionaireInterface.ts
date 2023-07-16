export type QuestionaireParams = {

  name: string;
  sex: string;
  phone: string;
  status: string;
  workClass: string;
  villageName: string;
};

export type IdRequest = {
  id: string;
};

export type ParamsRequest = {
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

export type PaginationResponse<T = unknown[]> = {
  meta: MetaProps;
  data: T;
};

export type DropListResponse = {
  id: string;
  name: string;
};