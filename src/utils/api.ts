import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
}

interface ApiError {
  response?: AxiosResponse;
  request?: any;
  message: string;
}

class Api {
  private instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.instance.interceptors.request.use(
      (config: any) => {
        // 在发送请求之前做些什么，比如添加 token
        // config.headers['Authorization'] = `Bearer ${yourToken}`;
        return config;
      },
      (error: any) => {
        // 对请求错误做些什么
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response: ApiResponse) => {
        // 对响应数据做些什么
        return response.data;
      },
      (error: ApiError) => {
        // 对响应错误做些什么
        if (error.response) {
          // 服务器返回错误状态码
          // 可以根据状态码进行特定处理
          console.error('HTTP Error:', error.response.status, error.response.statusText);
        } else if (error.request) {
          // 请求发送成功，但是没有收到响应
          console.error('No response received');
        } else {
          // 发送请求时发生了一些错误
          console.error('Request Error:', error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get(url, config);
  }

  public post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.post(url, data, config);
  }

  public put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.put(url, data, config);
  }

  public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.delete(url, config);
  }

  // 添加其他HTTP方法，根据需要进行扩展
}

// 替换成您的 API 地址
const baseURL = 'https://api.example.com';

// 创建一个实例
const api = new Api(baseURL);

export default api;
