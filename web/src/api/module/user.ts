import http from '../requrest';

export interface LoginParam {
  username: string;
  password: string;
}
type LoginResult = {
  accessToken: string;
  freshToken: string;
};
const URL = '/auth';
export const Login = (data: LoginParam) =>
  http.post<LoginResult>({
    url: `${URL}/login`,
    data,
  });
