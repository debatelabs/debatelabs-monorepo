export interface AppErrorDTO {
  message: string;
}

export interface AppErrorStore extends AppErrorDTO {
  id: string;
}

export interface SuccessDTO<T extends object> {
  success: true;
  data: T;
}

export interface FailDTO<T extends object = AppErrorDTO> {
  success: false;
  data: T;
}

export type BaseDTO<T extends object> = SuccessDTO<T> | FailDTO;
