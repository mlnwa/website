import http from '../requrest';
import { PageParams, Pagination } from '../type';

const URL = '/category';

export interface Category {
  id: number;
  name: string;
  description: string;
  createAt: string;
  updateAt: string;
  number: number;
}
interface CreateCategoryData {
  name: string;
  description?: string;
}
interface UpdateCategoryData extends Partial<CreateCategoryData> {}
interface QueryCategoryListParams extends PageParams {}
export const QueryCategoryList = (params: QueryCategoryListParams) =>
  http.get<Pagination<Category>>({
    url: `${URL}/list`,
    params,
  });

export const CreateCategory = (data: CreateCategoryData) =>
  http.post<boolean>({
    url: `${URL}`,
    data,
  });

export const DeleteCategory = (id: number) =>
  http.delete<boolean>({
    url: `${URL}/${id}`,
  });

export const UpdateCategory = (id: number, data: UpdateCategoryData) =>
  http.put<boolean>({
    url: `${URL}/${id}`,
    data,
  });
