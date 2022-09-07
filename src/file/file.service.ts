import { EventBridgeEvent, S3NotificationEvent } from 'aws-lambda';
import { getCurrentInvoke } from '@vendia/serverless-express';
import {
    GetItemCommand,
    GetItemCommandOutput,
    PutItemCommand,
    PutItemCommandOutput,
    UpdateItemCommand,
    UpdateItemCommandOutput,
} from '@aws-sdk/client-dynamodb';
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

    async insertFile(): Promise<void> {
        const context = await getCurrentInvoke();
        const event = context.event as S3Notification;

        const metadata = event.detail.object.key.split('/');

        const existingSku = await this.getItem(metadata[0]);

        existingSku.Item
            ? await this.updateItem(metadata[0], metadata[1])
            : await this.putItem(metadata[0], metadata[1]);
    }

    private async getItem(id: string): Promise<GetItemCommandOutput> {
        const command = new GetItemCommand({
            TableName: process.env.SKU_DYNAMODB_TABLE,
            Key: {
                sku_id: { S: id },
            },
            ProjectionExpression: 'sku_id, updated_time',
        });

        return await this.dynamoDbService.query(command);
    }

    private async putItem(
        id: string,
        file: string,
    ): Promise<PutItemCommandOutput> {
        const command = new PutItemCommand({
            TableName: process.env.SKU_DYNAMODB_TABLE,
            Item: {
                sku_id: { S: id },
                files: { L: [{ S: file }] },
                created_time: { S: moment().format() },
                updated_time: { S: moment().format() },
            },
        });

        return await this.dynamoDbService.query(command);
    }

    private async updateItem(
        id: string,
        file: string,
    ): Promise<UpdateItemCommandOutput> {
        const command = new UpdateItemCommand({
            TableName: process.env.SKU_DYNAMODB_TABLE,
            Key: {
                sku_id: { S: id },
            },
            ExpressionAttributeNames: {
                '#files': 'files',
            },
            ExpressionAttributeValues: {
                ':file': { L: [{ S: file }] },
                ':empty_list': { L: [] },
            },
            UpdateExpression:
                'SET #files = list_append(if_not_exists(#files, :empty_list), :file)',
        });

        return await this.dynamoDbService.query(command);
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
