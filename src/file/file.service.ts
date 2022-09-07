import { EventBridgeEvent, S3NotificationEvent } from 'aws-lambda';
import { getCurrentInvoke } from '@vendia/serverless-express';
import { PutItemCommand, PutItemCommandOutput } from '@aws-sdk/client-dynamodb';
import { FujikoDynamoClient } from './../shared/clients/dynamodb/dynamodb.client';
import { FileResponseDto } from './dto/file.upload.response';
import { Injectable } from '@nestjs/common';
import { FujikoS3Client } from 'src/shared/clients/s3/s3.client';
import { Logger } from 'src/shared/logger/logger.service';
import {
    InvalidFileExtensionException,
    InvalidFileNameException,
} from './exceptions/file.exceptions';
import moment from 'moment';

interface S3Notification
    extends EventBridgeEvent<
        S3NotificationEvent['detail-type'],
        S3NotificationEvent['detail']
    > {
    source: 'aws.s3';
}

@Injectable()
export class FileService {
    constructor(
        private readonly logger: Logger,
        private readonly s3Service: FujikoS3Client,
        private readonly dynamoDbService: FujikoDynamoClient,
    ) {}

    async generateUploadUrl(fileName: string): Promise<FileResponseDto> {
        this.validateFileName(fileName);
        const url = await this.s3Service.generateUploadUrl(fileName);

        this.logger.log({
            message: 'Generated upload presigned url',
            url: url,
        });

        return { fileName: fileName, presignedUrl: url };
    }

    async generateDownloadUrl(fileName: string): Promise<FileResponseDto> {
        this.validateFileName(fileName);
        const url = await this.s3Service.generateDownloadUrl(fileName);

        this.logger.log({
            message: 'Generated download presigned url',
            url: url,
        });

        return { fileName: fileName, presignedUrl: url };
    }

    async insertFile(): Promise<PutItemCommandOutput> {
        const context = await getCurrentInvoke();
        const event = context.event as S3Notification;

        const metadata = event.detail.object.key.split('/');

        const command = new PutItemCommand({
            TableName: process.env.SKU_DYNAMODB_TABLE,
            Item: {
                sku_id: { S: metadata[0] },
                files: { L: [{ S: metadata[1] }] },
                created_time: { S: moment().format() },
                updated_time: { S: moment().format() },
            },
        });

        this.logger.log(command);

        const response = await this.dynamoDbService.query(command);

        return response;
    }

    private validateFileName(fileName: string): void {
        const result = /\.(jpe?g|png)$/i.test(fileName);

        if (!result) {
            throw new InvalidFileExtensionException();
        }

        if (fileName.split['/'].length !== 1) {
            throw new InvalidFileNameException();
        }
    }
}
