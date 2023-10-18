import http from '../requrest';

export interface LoginParam {
  username: string;
  password: string;
}
const URL = '/auth';
export const Login = (data: LoginParam) =>
  http.post<string>({
    url: `${URL}/login`,
    data,
  });
