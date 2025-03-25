import { AxiosError, AxiosResponse } from 'axios';
import { BaseDTO, FailDTO } from '~/shared/types/application.types';

export type ResponseDTO<T extends object> = AxiosResponse<T> & BaseDTO<T>;

export type ErrorResponseDTO = Pick<
  AxiosError,
  'config' | 'status' | 'name' | 'isAxiosError'
> &
  FailDTO;
