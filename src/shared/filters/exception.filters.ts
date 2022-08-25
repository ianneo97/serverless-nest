import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { getContext } from '../context';
import { Logger } from '../logger/logger.service';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    constructor(private readonly logger: Logger) {}

    catch(exception: unknown, host: ArgumentsHost): unknown {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const context = getContext();

        if (exception instanceof HttpException) {
            const status = exception.getStatus();
            const errorMessage = exception.getResponse() as HttpException;

            const responseObject = {
                statusCode: status,
                timestamp: new Date().toISOString(),
                url: request.url,
                error: exception.name,
                errorMessage: errorMessage,
            };

            this.logger.warn('HttpException', responseObject);
            return response.status(status).json(responseObject);
        }

        const status = HttpStatus.INTERNAL_SERVER_ERROR;
        const responseObject = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            url: request.url,
        };

        if (exception instanceof Error) {
            this.logger.error('Unknown Error', exception);
            responseObject['error'] = exception.name;
            responseObject['message'] = exception.message;
        } else {
            this.logger.error('Internal Server Error', exception);
            responseObject['error'] = 'Internal Server Error';
        }

        this.logger.warn('Internal Server Error', {
            status,
            requestId: context.context?.awsRequestId,
            responseObject,
        });
        return response.status(status).json(responseObject);
    }
}
