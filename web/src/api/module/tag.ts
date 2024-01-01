import http from '../requrest';
import { PageParams, Pagination } from '../type';

const URL = '/tag';
interface Tag {
  id: number;
  name: string;
  createAt: string;
  updataAt: string;
}

interface CreateTagDto {
  name: string;
}

interface QueryTagListParams extends PageParams {}

export const QueryTagList = (params: QueryTagListParams) =>
  http.get<Pagination<Tag>>({
    url: `${URL}/list`,
    params,
  });

export const CreateTag = (data: CreateTagDto) =>
  http.post<boolean>({
    url: `${URL}`,
    data,
  });

export const UpdateTag = (id: number, data: CreateTagDto) =>
  http.put<boolean>({
    url: `${URL}/${id}`,
    data,
  });

export const DeleteTag = (id: number) =>
  http.delete<boolean>({
    url: `${URL}/${id}`,
  });
