import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

interface HttpExceptionResponse {
  statusCode: number;
  message: string | string[] | Record<string, any>;
  error: string;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: 'Internal Server Error' };

    let error = 'Internal Server Error';
    let message: string | string[] | Record<string, any> = 'An error occurred';
    let validationErrors: unknown = null;

    if (exception instanceof HttpException) {
      error = exception.name;

      const isObjectResponse =
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null &&
        'message' in exceptionResponse &&
        'error' in exceptionResponse;

      if (status === (HttpStatus.BAD_REQUEST as number) && isObjectResponse) {
        const responseBody = exceptionResponse as HttpExceptionResponse;

        if (
          Array.isArray(responseBody.message) &&
          responseBody.error === 'Bad Request'
        ) {
          message = 'Invalid input data';
          validationErrors = responseBody.message;
        } else {
          message = responseBody.message;
        }
      } else {
        message =
          typeof exceptionResponse === 'string'
            ? exceptionResponse
            : (exceptionResponse as HttpExceptionResponse).message ||
              exception.message;
      }
    } else {
      this.logger.error(exception);
    }

    response.status(status).json({
      success: false,
      message: message,
      data: null,
      error: error,
      validationErrors: validationErrors,
    });
  }
}
