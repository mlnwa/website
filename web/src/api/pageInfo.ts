import { Pagination } from './type';

export class PageInfo<T> implements Pagination<T> {
  constructor() {}
  pageIndex: number;
  pageSize: number;
  prePage: number;
  nextPage: number;
  pages: number;
  total: number = 0;
  isLastPage: boolean;
  isFirstPage: boolean;
  hasNextPage: boolean;
  hasPrePage: boolean;
  list: T[] = [];
}
