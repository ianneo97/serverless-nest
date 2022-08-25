import { LoggerService } from '@nestjs/common';
import winston from 'winston';
import { getContext } from './context';

export class Logger implements LoggerService {
    private context = getContext();

    private logger = winston.createLogger({
        level: process.env.LOG_LEVEL || 'info',
        format: winston.format.combine(
            winston.format.splat(),
            winston.format.simple(),
        ),
        transports: [new winston.transports.Console()],
        defaultMeta: { requestId: this.context.context?.awsRequestId },
    });

    log(message: string, ...optionalParams: unknown[]): void {
        this.logger.info(message, ...optionalParams);
    }

    error(message: string, ...optionalParams: unknown[]): void {
        this.logger.error(message, ...optionalParams);
    }

    warn(message: string, ...optionalParams: unknown[]): void {
        this.logger.warn(message, ...optionalParams);
    }

    debug(message: string, ...optionalParams: unknown[]): void {
        this.logger.debug(message, ...optionalParams);
    }
}
