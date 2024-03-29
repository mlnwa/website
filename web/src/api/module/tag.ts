import http from '../requrest';
import { PageParams, Pagination } from '../type';

const URL = '/tag';
export interface Tag {
  id: number;
  name: string;
  number: number;
  createAt: string;
  updataAt: string;
}

interface CreateTagData {
  name: string;
  description: string;
}
interface UpdateTagData extends Partial<CreateTagData> {}
interface QueryTagListParams extends PageParams {}

export const QueryTagList = (params: QueryTagListParams) =>
  http.get<Pagination<Tag>>({
    url: `${URL}/list`,
    params,
  });

export const CreateTag = (data: CreateTagData) =>
  http.post<boolean>({
    url: `${URL}`,
    data,
  });

export const UpdateTag = (id: number, data: UpdateTagData) =>
  http.put<boolean>({
    url: `${URL}/${id}`,
    data,
  });

export const DeleteTag = (id: number) =>
  http.delete<boolean>({
    url: `${URL}/${id}`,
  });
