import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  message: string;
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  Response<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    const statusCode: number = context
      .switchToHttp()
      .getResponse<Record<string, number>>().statusCode;
    const path: string = context
      .switchToHttp()
      .getRequest<Record<any, string>>()?.url;

    return next.handle().pipe(
      map((data: T & Record<'message', string>) => ({
        statusCode,
        message: data?.message || 'Operation successful',
        data: data,
        timestamp: new Date().toISOString(),
        path,
      })),
    );
  }
}
