import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import envConfig from "~/configs/env.config";
import { ResponseDTO } from "~/types/response.types";
import ResponseMapper from "~/mappers/response.mapper";

type AsyncResponse<T extends object> = Promise<ResponseDTO<T>>;

class ApiClient {
  private readonly axiosInstance: AxiosInstance;

  constructor(private readonly responseMapper = new ResponseMapper()) {
    this.axiosInstance = axios.create({
      baseURL: envConfig.API_BASE_URL,
      withCredentials: true
    });
    this.axiosInstance.interceptors.response.use(
      this.responseInterceptor,
      this.responseErrorInterceptor
    );
  }

  private responseInterceptor(response: AxiosResponse) {
    return this.responseMapper.toDTO(response);
  }

  private responseErrorInterceptor(error: AxiosError) {
    return error?.response
      ? this.responseMapper.toDTO(error.response)
      : this.responseMapper.toErrorDTO(error);
  }

  get<T extends object>(url: string, config = {}): AsyncResponse<T> {
    return this.axiosInstance.get(url, config);
  }

  post<T extends object>(url: string, data?: unknown, config = {}): AsyncResponse<T> {
    return this.axiosInstance.post(url, data, config);
  }

  put<T extends object>(url: string, data?: unknown, config = {}): AsyncResponse<T> {
    return this.axiosInstance.put(url, data, config);
  }

  patch<T extends object>(url: string, data?: unknown, config = {}): AsyncResponse<T> {
    return this.axiosInstance.patch(url, data, config);
  }

  delete(url: string, config = {}): AsyncResponse<Record<string, unknown>> {
    return this.axiosInstance.delete(url, config);
  }
}

export default ApiClient;
