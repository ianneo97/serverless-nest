import { DynamoDBModule } from './clients/dynamodb/dynamodb.module';
import { S3Module } from './clients/s3/s3.module';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionFilter } from './filters/exception.filters';
import { LoggingInterceptor } from './interceptors/logger.interceptor';
import { LoggerModule } from './logger/logger.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { XimilarModule } from './clients/ximilar/ximilar.module';

@Module({
    imports: [
        LoggerModule,
        S3Module,
        DynamoDBModule,
        XimilarModule,
        EventEmitterModule.forRoot(),
    ],
    providers: [
        { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
        {
            provide: APP_FILTER,
            useClass: AllExceptionFilter,
        },
    ],
    exports: [LoggerModule, S3Module, DynamoDBModule, XimilarModule],
})
export class SharedModule {}
