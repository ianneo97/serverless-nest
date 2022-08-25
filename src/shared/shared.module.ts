import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionFilter } from './filters/exception.filters';
import { LoggingInterceptor } from './interceptors/logger.interceptor';
import { LoggerModule } from './logger/logger.module';

@Module({
    imports: [LoggerModule],
    providers: [
        { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
        {
            provide: APP_FILTER,
            useClass: AllExceptionFilter,
        },
    ],
    exports: [LoggerModule],
})
export class SharedModule {}
