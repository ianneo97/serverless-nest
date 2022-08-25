import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Logger } from '../logger/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(private logger: Logger) {}

    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<unknown> {
        const request = context.switchToHttp().getRequest();
        const method = request.method;
        const url = request.originalUrl;

        this.logger.log({
            method,
            url,
        });

        const now = Date.now();

        return next.handle().pipe(
            tap(() => {
                const response = context.switchToHttp().getResponse();
                const statusCode = response.statusCode;

                const responseTime = Date.now() - now;
                this.logger.log({
                    method,
                    url,
                    statusCode,
                    responseTime,
                });
            }),
        );
    }
}
