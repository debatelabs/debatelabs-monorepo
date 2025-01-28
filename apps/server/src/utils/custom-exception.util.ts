import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomExceptionUtil extends HttpException {
  constructor(status: HttpStatus | number, message: string) {
    super(message, status);
  }
}
