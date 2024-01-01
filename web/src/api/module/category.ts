import http from '../requrest';
import { PageParams, Pagination } from '../type';

const URL = '/category';

interface Category {
  id: number;
  name: string;
  description: string;
}
interface QueryCategoryListParams extends PageParams {}
export const QueryCategoryList = (params: QueryCategoryListParams) =>
  http.get<Pagination<Category>>({
    url: `${URL}`,
    params,
  });
interface AddCategoryParams {
  name: string;
  description?: string;
}
export const AddCategory = (data: AddCategoryParams) =>
  http.post<boolean>({
    url: `${URL}`,
    data,
  });

export const DeleteCategory = (id: number) =>
  http.delete<boolean>({
    url: `${URL}/${id}`,
  });

export const EditCategory = (id: number, data: AddCategoryParams) =>
  http.put<boolean>({
    url: `${URL}/${id}`,
    data,
  });
