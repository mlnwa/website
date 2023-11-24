export interface Pagination<T> {
  pageIndex: number;
  pageSize: number;
  prePage: number;
  nextPage: number;
  pages: number;
  total: number;

  isLastPage: boolean;
  isFirstPage: boolean;
  hasNextPage: boolean;
  hasPrePage: boolean;

  list: T[];
}

export interface PageParams {
  pageIndex: number;
  pageSize: number;
}
