import { AppErrorDTO, BaseDTO } from '~/shared/model/types/application.types';
import ERRORS from '~/shared/config/constants/errors';

const applicationMapper = {
  toBaseDTO<T>(data: Partial<BaseDTO<T>>): BaseDTO<T> {
    const baseDTO: BaseDTO<T> = {
      success: data?.success ?? false,
      data: data?.data as T
    };
    if (data?.status) baseDTO.status = data.status;
    if (data?.statusText) baseDTO.statusText = data.statusText;
    if (data?.message) baseDTO.message = data.message;
    if (data?.code) baseDTO.code = data.code;
    return baseDTO;
  },

  toSuccessDTO<T>(data: Omit<BaseDTO<T>, 'success'>): BaseDTO<T> {
    return this.toBaseDTO({
      data: data.data,
      status: data?.status,
      statusText: data?.statusText,
      success: true
    });
  },

  toFailDTO<T>(data: Partial<Omit<BaseDTO<T>, 'success'>>): BaseDTO<T | null> {
    return this.toBaseDTO({
      data: null,
      status: data?.status || 500,
      statusText: data?.statusText || 'Error',
      message: data?.message || ERRORS.network,
      code: data?.code,
      success: false
    });
  },

  toErrorDTO(error: AppErrorDTO): AppErrorDTO {
    return {
      message: error.message
    };
  }
};

export default applicationMapper;
