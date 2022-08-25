import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { getContext } from '../context';
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
        const requestId = getContext().context?.awsRequestId;

        this.logger.log('Intercepted Request', {
            method,
            requestId,
            url,
        });

        const now = Date.now();

        return next.handle().pipe(
            tap(() => {
                const response = context.switchToHttp().getResponse();
                const statusCode = response.statusCode;

                const responseTime = Date.now() - now;
                this.logger.log('Returned Response', {
                    method,
                    requestId,
                    url,
                    statusCode,
                    responseTime,
                });
            }),
        );
    }
}
