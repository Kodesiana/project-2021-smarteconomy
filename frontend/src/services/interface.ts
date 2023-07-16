export type OrderDirection = 'asc' | 'desc' | undefined;

export type SearchRequest = {
  q?: string;
  sort_by?: string;
  sort_order?: OrderDirection;
  page?: number;
  page_size?: number;
  nik?: string;
};

export type MetaResponse = {
  currentPage: number;
  pageSize: number;
  totalData: number;
  totalDataOnPage: number;
  totalPage: number;
};

export type SearchResponse = {
  address?: string;
  is_dpo: boolean;
  name?: string;
  nik?: string;
  phone?: string;
};

export type UserProps = {
  id?: string;
  fullName?: string;
  username?: string;
  role?: string;
  password?: string;
};
