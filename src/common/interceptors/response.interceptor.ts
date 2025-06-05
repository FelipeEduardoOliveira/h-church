import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        const ctx = context.switchToHttp();
        const res = ctx.getResponse();

        return {
          status: res.statusCode,
          success: res.statusCode < 400,
          message: response.message,
          data: response.data,
        };
      }),
    );
  }
}
