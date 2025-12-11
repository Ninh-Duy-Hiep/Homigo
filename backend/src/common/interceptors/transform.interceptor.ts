import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  success: boolean;
  message: string | null;
  data: T;
  error: null;
  validationErrors: null;
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}

interface PaginatedResult {
  data: unknown;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  Response<T> | Response<unknown>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T> | Response<unknown>> {
    return next.handle().pipe(
      map((data: unknown) => {
        if (this.isPaginated(data)) {
          const { data: resultData, meta } = data;
          return {
            success: true,
            message: 'success',
            error: null,
            validationErrors: null,
            data: resultData,
            ...meta,
          };
        }

        return {
          success: true,
          message: 'success',
          error: null,
          validationErrors: null,
          data: data as T,
        };
      }),
    );
  }

  private isPaginated(data: unknown): data is PaginatedResult {
    return (
      typeof data === 'object' &&
      data !== null &&
      'data' in data &&
      'meta' in data &&
      typeof (data as PaginatedResult).meta === 'object'
    );
  }
}
