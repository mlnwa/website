import { message } from 'antd';
import axios, { AxiosHeaders, AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults, Method } from 'axios';
import { IMessage } from '../components/IMessage';
const WhiteCodeList: (string | number)[] = [1101];
type ResultModel<T> = {
  success: boolean;
  result: T;
  code: number | string;
  msg: string;
};

const HttpRequest = class {
  instance: AxiosInstance;
  constructor(config?: CreateAxiosDefaults) {
    const defaultConfigs = {
      timeout: 5000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      baseURL: '/api',
    };
    if (config) {
      config = {
        ...defaultConfigs,
        ...config,
      };
    } else {
      config = defaultConfigs;
    }
    this.instance = axios.create(config);
    this.interceptors();
  }
  create(config: CreateAxiosDefaults) {
    return new HttpRequest(config);
  }
  /**
   * request repsonse interceptors
   */
  private interceptors() {
    this.instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
    this.instance.interceptors.response.use(
      (response) => {
        const data = response.data as ResultModel<any>;
        if (data.success !== true && !WhiteCodeList.includes(data.code)) {
          IMessage.error(data.msg);
        }
        if (data.msg) {
          IMessage.success(data.msg);
        }
        return response;
      },
      (error) => {
        if (error.response) {
          const data = error.response.data as ResultModel<any>;
          if (data.msg) {
            IMessage.error(data.msg);
            return Promise.reject(data);
          }
        }
        return Promise.reject(error);
      },
    );
  }
  private request<T>(data: Partial<AxiosRequestConfig>, method: Method) {
    const token = localStorage.getItem('access_token') || '';
    return new Promise<ResultModel<T>>((resolve, reject) => {
      this.instance
        .request<ResultModel<T>>({
          method,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          ...data,
        })
        .then((res) => {
          const data = res.data;
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  post<T>(data?: Partial<AxiosRequestConfig>) {
    return this.request<T>(data, 'POST');
  }
  get<T>(data?: Partial<AxiosRequestConfig>) {
    return this.request<T>(data, 'GET');
  }
  delete<T>(data?: Partial<AxiosRequestConfig>) {
    return this.request<T>(data, 'DELETE');
  }
  put<T>(data?: Partial<AxiosRequestConfig>) {
    return this.request<T>(data, 'PUT');
  }
};

const http = new HttpRequest();
export default http;
