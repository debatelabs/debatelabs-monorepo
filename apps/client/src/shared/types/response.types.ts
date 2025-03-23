import { AxiosError, AxiosResponse } from 'axios';

export interface BaseResponseDTO {
  success: boolean;
}

export type ResponseDTO<T extends object> = AxiosResponse<T> & BaseResponseDTO;

export type ErrorResponseDTO = Pick<
  AxiosError,
  'config' | 'isAxiosError' | 'status' | 'name' | 'message'
> &
  BaseResponseDTO;
