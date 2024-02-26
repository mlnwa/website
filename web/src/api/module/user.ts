import http from '../requrest';
import { PageParams, Pagination } from '../type';

export interface LoginParam {
  username: string;
  password: string;
}
export interface User {
  id: number;
  uid: string;
  name: string;
  email: string;
  status: number;
  createAt: string;
  updateAt: string;
}
type LoginResult = {
  accessToken: string;
  freshToken: string;
};
const URL = '/auth';
interface QueryUserListParam extends PageParams {}
interface UpdateUserData extends Partial<User> {}
export const Login = (data: LoginParam) =>
  http.post<LoginResult>({
    url: `${URL}/login`,
    data,
  });

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
