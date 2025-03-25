import { AppErrorDTO, FailDTO, SuccessDTO } from '~/shared/types/application.types';

export class ApplicationMapper {
  toSuccessDTO<T extends object>(data: T): SuccessDTO<T> {
    return {
      success: true,
      data
    };
  }

  toFailDTO(message: string): FailDTO {
    return {
      success: false,
      data: this.toErrorDTO(message)
    };
  }

  toErrorDTO(errorMsg: string): AppErrorDTO {
    return {
      message: errorMsg
    };
  }
}

const applicationMapper = new ApplicationMapper();

export default applicationMapper;
