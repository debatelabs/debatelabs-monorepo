import { AppErrorDTO } from '~/shared/types/error.types';

export class ErrorMapper {
  toAppErrorDTO(errorMsg: string): AppErrorDTO {
    return {
      message: errorMsg
    };
  }
}

const errorMapper = new ErrorMapper();

export default errorMapper;
