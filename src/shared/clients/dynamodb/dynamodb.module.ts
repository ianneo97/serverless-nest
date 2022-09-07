import { FujikoDynamoClient } from './dynamodb.client';

import { LoggerModule } from './../../logger/logger.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [LoggerModule],
    providers: [FujikoDynamoClient, ConfigService],
    exports: [FujikoDynamoClient],
})
export class DynamoDBModule {}
