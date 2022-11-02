import { DynamoDBModule } from './../dynamodb/dynamodb.module';
import { LoggerModule } from './../../logger/logger.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { XimilarClient } from './ximilar.client';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [LoggerModule, HttpModule, DynamoDBModule],
    providers: [ConfigService, XimilarClient],
    exports: [XimilarClient],
})
export class XimilarModule {}
