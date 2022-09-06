import { LoggerModule } from './../../logger/logger.module';
import { Module } from '@nestjs/common';
import { FujikoS3Client } from './s3.client';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [LoggerModule],
    providers: [FujikoS3Client, ConfigService],
    exports: [FujikoS3Client],
})
export class S3Module {}
