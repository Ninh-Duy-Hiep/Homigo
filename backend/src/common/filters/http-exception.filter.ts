import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { I18nValidationException } from 'nestjs-i18n';
import { ValidationError } from 'class-validator';

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

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let error = 'Internal Server Error';
    let message: string | string[] | Record<string, any> = 'An error occurred';
    let validationErrors: unknown = null;

    if (exception instanceof I18nValidationException) {
      status = HttpStatus.BAD_REQUEST;
      error = 'Bad Request';
      message = 'Invalid input data';
      validationErrors = this.formatErrors(exception.errors);
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      error = exception.name;

      const isObjectResponse =
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null &&
        'message' in exceptionResponse &&
        'error' in exceptionResponse;

      if (status === HttpStatus.BAD_REQUEST && isObjectResponse) {
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

  private formatErrors(errors: ValidationError[]) {
    return errors.map((err) => {
      const errorMsg = Object.values(err.constraints || {})[0];
      return {
        field: err.property,
        error: errorMsg,
      };
    });
  }
}
