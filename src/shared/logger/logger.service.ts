import { Injectable, LoggerService, Scope } from '@nestjs/common';
import winston from 'winston';
import { getContext } from '../context';

@Injectable({ scope: Scope.TRANSIENT })
export class Logger implements LoggerService {
    private context = getContext();

    private logger = winston.createLogger({
        level: process.env.LOG_LEVEL || 'info',
        transports: [new winston.transports.Console()],
        defaultMeta: {
            requestId: this.context.context?.awsRequestId || 'localhost',
        },
    });

    log(message: unknown): void {
        this.logger.info(message);
    }

    error(message: unknown): void {
        this.logger.error(message);
    }

    warn(message: unknown): void {
        this.logger.warn(message);
    }

    debug(message: unknown): void {
        this.logger.debug(message);
    }
}
