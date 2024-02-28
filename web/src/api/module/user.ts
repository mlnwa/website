import http from '../requrest';
import { PageParams, Pagination } from '../type';

export interface User {
  id: number;
  uid: string;
  name: string;
  email: string;
  status: number;
  createAt: string;
  updateAt: string;
}

interface UpdateUserData extends Partial<User> {}
interface QueryUserListParam extends PageParams {}

export const QueryUserList = (params: QueryUserListParam) =>
  http.get<Pagination<User>>({
    url: `${URL}/list`,
    params,
  });

export const DeleteUser = (id: number) =>
  http.delete<boolean>({
    url: `${URL}/${id}`,
  });

export const UpdateUser = (id: number, data: UpdateUserData) =>
  http.put<boolean>({
    url: `${URL}/${id}`,
    data,
  });
