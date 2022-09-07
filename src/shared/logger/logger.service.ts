import { Injectable, LoggerService, Scope } from '@nestjs/common';
import { getCurrentInvoke } from '@vendia/serverless-express';

import winston from 'winston';
@Injectable({ scope: Scope.TRANSIENT })
export class Logger implements LoggerService {
    private logger = winston.createLogger({
        level: process.env.LOG_LEVEL || 'info',
        transports: [new winston.transports.Console()],
    });

    log(message: unknown): void {
        this.logger.info({
            message,
            meta: {
                requestId:
                    getCurrentInvoke().context?.awsRequestId || 'localhost',
            },
        });
    }

    error(message: unknown): void {
        this.logger.error({
            message,
            meta: {
                requestId:
                    getCurrentInvoke().context?.awsRequestId || 'localhost',
            },
        });
    }

    warn(message: unknown): void {
        this.logger.warn({
            message,
            meta: {
                requestId:
                    getCurrentInvoke().context?.awsRequestId || 'localhost',
            },
        });
    }

    debug(message: unknown): void {
        this.logger.debug({
            message,
            meta: {
                requestId:
                    getCurrentInvoke().context?.awsRequestId || 'localhost',
            },
        });
    }
}
