import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '../logger/logger.service';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    constructor(private readonly logger: Logger) {}

    catch(exception: HttpException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        // const status = exception.getStatus();

        const error = {
            statusCode: 400,
            timestamp: new Date().toISOString(),
            path: request.url,
            error: exception.message,
            extra: exception.stack,
        };

        this.logger.error(error);
        response.status(400).json(error);
    }
}
