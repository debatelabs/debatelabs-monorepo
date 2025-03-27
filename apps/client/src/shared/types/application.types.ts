import { AxiosResponse } from 'axios';

export interface AppErrorDTO {
  message: string;
}

export type BaseDTO<T = Record<string, unknown>> = {
  success: boolean;
  data: T;
  status?: number;
  statusText?: string;
  message?: string;
  code?: string;
};

export interface ResponseDTO<T> extends AxiosResponse<T> {
  success: boolean;
}
