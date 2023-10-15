import http from '../requrest';
import { Pagination, PageParams } from '../index.d';
interface Blog {
  id?: number;
  title: string;
  content: string;
  createAt?: string;
  updateAt?: string;
}

interface QueryBlogList extends PageParams {}

type CreateBlog = {};
type DeleteBlog = {};
type EditBlog = {};

export const QueryBlogList = (params: QueryBlogList) => http.get<Pagination<Blog>>(params);

export const CreateBlog = (params: CreateBlog) => http.post<boolean>(params);

export const DeleteBlog = (params: DeleteBlog) => http.delete<boolean>(params);

export const EditBlog = (params: EditBlog) => http.put<boolean>(params);
