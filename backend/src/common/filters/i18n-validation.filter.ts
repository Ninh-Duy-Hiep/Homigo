import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { I18nValidationException } from 'nestjs-i18n';
import { ValidationError } from 'class-validator';
import { Response } from 'express';

@Catch(I18nValidationException)
export class I18nValidationExceptionFilter implements ExceptionFilter {
  catch(exception: I18nValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const formatError = (errors: ValidationError[]) => {
      return errors.map((err) => {
        const errorMsg = Object.values(err.constraints || {})[0];
        return {
          field: err.property,
          error: errorMsg,
        };
      });
    };

    const errors = formatError(exception.errors);

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: errors,
      error: 'Bad Request',
    });
  }
}
