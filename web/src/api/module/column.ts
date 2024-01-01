import http from '../requrest';
import { PageParams, Pagination } from '../type';

const URL = '/column';
interface Column {
  id: number;
  name: string;
  number: number;
  createAt: string;
  updataAt: string;
}

interface CreateColumnData {
  name: string;
}
interface UpdateColumnData extends Partial<CreateColumnData> {}
interface QueryColumnListParams extends PageParams {}

export const QueryColumnList = (params: QueryColumnListParams) =>
  http.get<Pagination<Column>>({
    url: `${URL}/list`,
    params,
  });

export const CreateColumn = (data: CreateColumnData) =>
  http.post<boolean>({
    url: `${URL}`,
    data,
  });

export const UpdateColumn = (id: number, data: UpdateColumnData) =>
  http.put<boolean>({
    url: `${URL}/${id}`,
    data,
  });

export const DeleteColumn = (id: number) =>
  http.delete<boolean>({
    url: `${URL}/${id}`,
  });
