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
  status: BlogStatus;
}

interface CreateBlog {
  title: string;
}
type DeleteBlog = {
  id: number;
};
type EditBlog = {
  id: number;
};

export const QueryBlogList = (data: QueryBlogList) =>
  http.get<Pagination<Blog>>({
    url: `${URL}/${data.status}`,
    data,
  });

export const CreateBlog = (data: CreateBlog) =>
  http.post<boolean>({
    url: `${URL}`,
    data,
  });

export const DeleteBlog = (data: DeleteBlog) =>
  http.delete<boolean>({
    url: `${URL}/${data.id}`,
  });

export const EditBlog = (data: EditBlog) =>
  http.put<boolean>({
    url: URL,
    data,
  });

export const PublishBlog = (data: EditBlog) =>
  http.put<boolean>({
    url: `${URL}/${data.id}`,
    data,
  });
