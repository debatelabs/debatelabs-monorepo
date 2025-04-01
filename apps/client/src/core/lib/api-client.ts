import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios';
import { BASE_URL } from '~/core/constants/api-url';
import applicationMapper from '~/infrastructure/mappers/application.mapper';
import { BaseDTO, ResponseDTO } from '~/core/types/application.types';
import responseMapper from '~/infrastructure/mappers/response.mapper';
import { refreshSession, logout } from '~/features/session';
import logger from '~/core/utils/logger';
import ERRORS from '~/core/constants/errors';
import ROUTES from '~/core/constants/routes';
import checkEnvAndRedirectTo from '~/core/utils/env-based-redirect';

interface AxiosRequestConfigExtended extends AxiosRequestConfig {
  skipAuthCheck?: boolean;
}

type InternalAxiosRequestConfigExtended = AxiosRequestConfigExtended &
  InternalAxiosRequestConfig & {
    _retry?: boolean;
  };

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
    let response: ResponseDTO<unknown> | BaseDTO<unknown> = this.resMapper.toDTO(
      error.response
    );

    const originalRequest = error.config as InternalAxiosRequestConfigExtended;

    switch (response.status) {
      case 401:
        response = await this.checkAndRefreshAuth(originalRequest, response);
        if (response && 'success' in response && response.success === true)
          return response;
        break;
    }

    return Promise.reject(response);
  };

  private async checkAndRefreshAuth(
    originalRequest: InternalAxiosRequestConfigExtended,
    response: ResponseDTO<unknown> | BaseDTO<unknown>
  ) {
    try {
      if (originalRequest._retry || originalRequest.skipAuthCheck) return response;

      originalRequest._retry = true;

      const refreshSessionResponse = await refreshSession();
      if (!refreshSessionResponse.success || !originalRequest) {
        await logout();
        await checkEnvAndRedirectTo(ROUTES.login);
        return response;
      }

      return (await this.axiosInstance(originalRequest)) as
        | ResponseDTO<unknown>
        | BaseDTO<unknown>;
    } catch (err) {
      logger.error(err);
      return this.appMapper.toFailDTO({
        message: err instanceof Error ? err.message : ERRORS.unknown
      });
    }
  }

  get<T extends object>(
    url: string,
    config?: AxiosRequestConfigExtended
  ): ApiClientMethodsReturnType<T> {
    return this.axiosInstance.get(url, config);
  }

  post<T extends object>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfigExtended
  ): ApiClientMethodsReturnType<T> {
    return this.axiosInstance.post(url, data, config);
  }

  put<T extends object>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfigExtended
  ): ApiClientMethodsReturnType<T> {
    return this.axiosInstance.put(url, data, config);
  }

  patch<T extends object>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfigExtended
  ): ApiClientMethodsReturnType<T> {
    return this.axiosInstance.patch(url, data, config);
  }

  delete(
    url: string,
    config?: AxiosRequestConfigExtended
  ): ApiClientMethodsReturnType<Record<string, unknown>> {
    return this.axiosInstance.delete(url, config);
  }
}

const apiClient = new ApiClient();

export default apiClient;
