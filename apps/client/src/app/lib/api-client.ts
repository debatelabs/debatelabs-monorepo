import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios';
import { ResponseDTO } from '~/shared/types/response.types';
import responseMapper from '~/infrastructure/mappers/response.mapper';
import { BASE_URL } from '~/shared/configs/api-url.config';

type AsyncResponse<T extends object> = Promise<ResponseDTO<T>>;

export class ApiClient {
  private readonly axiosInstance: AxiosInstance;

  constructor(private readonly mapper = responseMapper) {
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      withCredentials: true
    });
    this.axiosInstance.interceptors.response.use(
      this.responseInterceptor,
      this.responseErrorInterceptor
    );
  }

  private responseInterceptor = (response: AxiosResponse) => {
    return this.mapper.toDTO(response);
  };

  private responseErrorInterceptor = (error: AxiosError) => {
    return error?.response
      ? this.mapper.toDTO(error.response)
      : this.mapper.toErrorDTO(error);
  };

  get<T extends object>(url: string, config?: AxiosRequestConfig): AsyncResponse<T> {
    return this.axiosInstance.get(url, config);
  }

  post<T extends object>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): AsyncResponse<T> {
    return this.axiosInstance.post(url, data, config);
  }

  put<T extends object>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): AsyncResponse<T> {
    return this.axiosInstance.put(url, data, config);
  }

  patch<T extends object>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): AsyncResponse<T> {
    return this.axiosInstance.patch(url, data, config);
  }

  delete(
    url: string,
    config?: AxiosRequestConfig
  ): AsyncResponse<Record<string, unknown>> {
    return this.axiosInstance.delete(url, config);
  }
}

const apiClient = new ApiClient();

export default apiClient;
