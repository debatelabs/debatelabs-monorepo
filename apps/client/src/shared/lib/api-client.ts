import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios';
import { BASE_URL } from '~/shared/config/constants/api-url';
import applicationMapper from '~/shared/model/mappers/application.mapper';
import { BaseDTO, ResponseDTO } from '~/shared/model/types/application.types';
import responseMapper from '~/shared/model/mappers/response.mapper';
import { sessionEvents } from '~/shared/lib/session-events';
import logger from '~/shared/lib/utils/logger';
import ERRORS from '~/shared/config/constants/errors';
import ROUTES from '~/shared/config/constants/routes';
import checkEnvAndRedirectTo from '~/shared/lib/utils/env-based-redirect';

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
        if (response?.success === true) return response;
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

      const refreshSessionResponse = await sessionEvents.emitRefreshSession();
      if (!refreshSessionResponse?.success || !originalRequest) {
        await sessionEvents.emitLogout();
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
