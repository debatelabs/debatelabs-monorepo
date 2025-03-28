import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios';
import { BASE_URL } from '~/core/configs/api-url.config';
import applicationMapper from '~/infrastructure/mappers/application.mapper';
import { ResponseDTO } from '~/core/types/application.types';
import responseMapper from '~/infrastructure/mappers/response.mapper';
import { store } from '~/core/store/redux/store';
import { refreshSession } from '~/features/session';
import logger from '~/core/utils/logger';
import ERRORS from '../constants/errors';

interface InternalAxiosRequestConfigExtended extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

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

  private responseErrorInterceptor = async (error: AxiosError) => {
    if (!error?.response) return Promise.reject(this.appMapper.toFailDTO(error));
    const response = this.resMapper.toDTO(error.response);

    const authResChecked = await this.checkAuthAndRefresh(error, response);
    const checkSuccess =
      authResChecked && 'success' in authResChecked && authResChecked.success === true;
    if (checkSuccess) return authResChecked;

    return Promise.reject(authResChecked);
  };

  private async checkAuthAndRefresh(error: AxiosError, response: ResponseDTO<unknown>) {
    try {
      const originalRequest = error.config as InternalAxiosRequestConfigExtended;

      if (response.status !== 401 || originalRequest._retry) return response;
      originalRequest._retry = true;

      const { isAuthorized } = store.getState().session;
      if (!isAuthorized) return response;

      const refreshSessionResponse = await refreshSession();
      if (!refreshSessionResponse.success || !originalRequest) return response;

      return await this.axiosInstance(originalRequest);
    } catch (err) {
      logger.error(err);
      return this.appMapper.toFailDTO({
        message: err instanceof Error ? err.message : ERRORS.unknown
      });
    }
  }

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
