import { AxiosError, AxiosResponse } from 'axios';

export interface ResponseDTO<T extends object> extends AxiosResponse<T> {
  success: boolean;
}

export interface ErrorResponseDTO
  extends Pick<AxiosError, 'config' | 'isAxiosError' | 'status' | 'message' | 'name'> {
  success: false;
}
