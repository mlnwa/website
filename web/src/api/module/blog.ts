import http from '../requrest';
import { Pagination, PageParams } from '../type';
export enum BlogStatus {
  PUBLISHED = 1,
  DRAFT = 2,
  ARCHIVED = 3,
}
const URL = '/blog';
interface Blog {
  id: number;
  publishId?: number;
  title: string;
  content: string;
  createAt?: string;
  updateAt?: string;
}

interface QueryBlogList extends PageParams {
  status?: BlogStatus;
  title?: string;
}
interface QueryPublishedBlogList extends PageParams {}
interface CreateBlog {
  title: string;
  content: string;
  categoryId: number;
  status?: BlogStatus;
}
type EditBlog = {
  id: number;
};

export const QueryBlogList = (params: QueryBlogList) =>
  http.get<Pagination<Blog>>({
    url: `${URL}/list`,
    params,
  });

export const QueryPublishedBlogList = (params: QueryPublishedBlogList) =>
  http.get<Pagination<Blog>>({ url: `${URL}/list/published`, params });

export const QueryBlogDetail = (id: number) => http.get<Blog>({ url: `${URL}/detail/${id}` });

export const CreateBlog = (data: CreateBlog) =>
  http.post<boolean>({
    url: `${URL}`,
    data,
  });

export const DeleteBlog = (id: number) =>
  http.delete<boolean>({
    url: `${URL}/${id}`,
  });

export const EditBlog = (data: EditBlog) =>
  http.put<boolean>({
    url: URL,
    data,
  });

export const PublishBlog = ({ id, ...data }: EditBlog) =>
  http.put<boolean>({
    url: `${URL}/${id}`,
    data,
  });
