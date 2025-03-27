import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios';
import { BASE_URL } from '~/shared/configs/api-url.config';
import applicationMapper from '~/infrastructure/mappers/application.mapper';
import { ResponseDTO } from '~/shared/types/application.types';
import responseMapper from '~/infrastructure/mappers/response.mapper';

type ApiClientMethodsReturnType<T> = Promise<ResponseDTO<T>>;

export class ApiClient {
  private readonly axiosInstance: AxiosInstance;

  constructor(
    private readonly appMapper = applicationMapper,
    private readonly resMapper = responseMapper
  ) {
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      withCredentials: true
    });
    this.axiosInstance.interceptors.response.use(
      this.responseInterceptor,
      this.responseErrorInterceptor
    );
  }

  private responseInterceptor = (response: AxiosResponse) =>
    this.resMapper.toDTO(response);

  private responseErrorInterceptor = (error: AxiosError) => {
    return error?.response
      ? this.resMapper.toDTO(error.response)
      : this.appMapper.toFailDTO(error);
  };

  get<T extends object>(
    url: string,
    config?: AxiosRequestConfig
  ): ApiClientMethodsReturnType<T> {
    return this.axiosInstance.get(url, config);
  }

  post<T extends object>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): ApiClientMethodsReturnType<T> {
    return this.axiosInstance.post(url, data, config);
  }

  put<T extends object>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): ApiClientMethodsReturnType<T> {
    return this.axiosInstance.put(url, data, config);
  }

  patch<T extends object>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): ApiClientMethodsReturnType<T> {
    return this.axiosInstance.patch(url, data, config);
  }

  delete(
    url: string,
    config?: AxiosRequestConfig
  ): ApiClientMethodsReturnType<Record<string, unknown>> {
    return this.axiosInstance.delete(url, config);
  }
}

const apiClient = new ApiClient();

export default apiClient;
