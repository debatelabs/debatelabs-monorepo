import { AxiosResponse } from 'axios';
import { ResponseDTO } from '~/core/types/application.types';

const responseMapper = {
  toDTO<T>(response: AxiosResponse<T>): ResponseDTO<T> {
    return {
      success: response.status >= 200 && response.status < 300,
      ...response
    };
  }
};

export default responseMapper;
