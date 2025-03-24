import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly prisma: PrismaService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception.message || 'Something went wrong';
    const stackTrace = exception.stack || null;

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.prisma.logError
        .create({
          data: {
            title: 'ExceptionFilter',
            message,
            stackTrace,
            status,
          },
        })
        .finally(() => console.error('INTERNAL_SERVER_ERROR'));
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
