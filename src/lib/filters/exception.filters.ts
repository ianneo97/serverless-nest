import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { getContext } from '../context';
import { Logger } from '../logger';

@Catch(HttpException)
export class AllExceptionFilter implements ExceptionFilter {
    constructor(private readonly logger: Logger) {}

    catch(exception: HttpException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const context = getContext();

        const error = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            requestId: context.context?.awsRequestId || '',
        };

        this.logger.error('HttpException', error);
        response.status(status).json(error);
    }
}
