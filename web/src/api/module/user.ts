import http from '../requrest';

export interface LoginParam {
  username: string;
  password: string;
}
type LoginInfo = {
  accessToken: string;
  freshToken: string;
};
const URL = '/auth';
export const Login = (data: LoginParam) =>
  http.post<LoginInfo>({
    url: `${URL}/login`,
    data,
  });
