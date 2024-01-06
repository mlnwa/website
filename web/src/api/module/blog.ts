import http from '../requrest';
import { Pagination, PageParams } from '../type';
const URL = '/blog';
export enum BlogStatus {
  DRAFT,
  PUBLISHED,
  ARCHIVED,
}
export enum BlogFromStatus {
  SELF,
  REPRODUCED,
  TRANSLATED,
}
interface Blog {
  id: number;
  publishId: number;
  title: string;
  content?: string;
  createAt: string;
  updateAt: string;
  status: BlogStatus;
  fromStatus: BlogFromStatus;
  categoryId: number;
  categoryName: string;
  tagIds: number[];
  tagNames: string[];
  columnId: number;
  columnName: string;
  userName: string;
  viewCount: number;
}

interface QueryBlogListParams extends PageParams {
  status?: BlogStatus;
  title?: string;
}
interface QueryPublishedBlogList extends PageParams {}
interface CreateBlogData {
  title: string;
  content: string;
  categoryId: number;
  tagIds?: string;
  columnId?: number;
  status?: BlogStatus;
  fromStatus: BlogFromStatus;
}
interface UpdateBlogData extends Partial<CreateBlogData> {}

export const QueryBlogList = (params: QueryBlogListParams) =>
  http.get<Pagination<Blog>>({
    url: `${URL}/list`,
    params,
  });

export const QueryPublishedBlogList = (params: QueryPublishedBlogList) =>
  http.get<Pagination<Blog>>({ url: `${URL}/list/published`, params });

export const QueryBlogDetail = (id: number) => http.get<Blog>({ url: `${URL}/detail/${id}` });

export const CreateBlog = (data: CreateBlogData) =>
  http.post<boolean>({
    url: `${URL}`,
    data,
  });

export const DeleteBlog = (id: number) =>
  http.delete<boolean>({
    url: `${URL}/${id}`,
  });

export const UpdateBlog = (id: number, data: UpdateBlogData) =>
  http.put<boolean>({
    url: `${URL}/${id}`,
    data,
  });

export const PublishBlog = (id: number, data: UpdateBlogData) =>
  http.put<boolean>({
    url: `${URL}/publish/${id}`,
    data,
  });
