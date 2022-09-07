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
import { Injectable } from '@nestjs/common';
import { FujikoS3Client } from 'src/shared/clients/s3/s3.client';
import { Logger } from 'src/shared/logger/logger.service';
import {
    FileNotFoundException,
    InvalidFileExtensionException,
    InvalidFileNameException,
} from './exceptions/file.exceptions';
import moment from 'moment';
import {
    FilePresignedResponseDto,
    FileResponseDto,
    UpdatedFileResponseDto,
} from './dto/file.upload.response';

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

    async generateUploadUrl(
        fileName: string,
    ): Promise<FilePresignedResponseDto> {
        this.validateFileName(fileName);
        const url = await this.s3Service.generateUploadUrl(fileName);

        this.logger.log({
            message: 'Generated upload presigned url',
            url: url,
        });

        return { fileName: fileName, presignedUrl: url };
    }

    async generateDownloadUrl(
        fileName: string,
    ): Promise<FilePresignedResponseDto> {
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
            ? await this.updateFileList(metadata[0], metadata[1])
            : await this.putItem(metadata[0], metadata[1]);
    }

    async getFile(id: string): Promise<FileResponseDto> {
        const item = await this.getItem(id);

        if (!item.Item) {
            throw new FileNotFoundException();
        }

        return {
            sku_id: item.Item?.sku_id?.S,
            main_file: item.Item?.main_file?.S,
            updated_time: item.Item?.updated_time?.S,
        };
    }

    async updateMainImage(
        id: string,
        mainFile: string,
    ): Promise<UpdatedFileResponseDto> {
        const command = new UpdateItemCommand({
            TableName: process.env.SKU_DYNAMODB_TABLE,
            Key: {
                sku_id: { S: id },
            },
            ExpressionAttributeNames: {
                '#mainFile': 'main_file',
                '#time': 'updated_time',
            },
            ExpressionAttributeValues: {
                ':main_file': { S: mainFile },
                ':updated_time': { S: moment().format() },
            },
            UpdateExpression: 'SET #mainFile=:main_file, #time = :updated_time',
        });

        await this.dynamoDbService.query(command);

        return {
            sku_id: id,
            main_file: mainFile,
            updated_time: moment().format(),
        };
    }

    private async getItem(id: string): Promise<GetItemCommandOutput> {
        const command = new GetItemCommand({
            TableName: process.env.SKU_DYNAMODB_TABLE,
            Key: {
                sku_id: { S: id },
            },
            ProjectionExpression: 'sku_id, main_file, updated_time',
        });

        return await this.dynamoDbService.query(command);
    }

    private async putItem(
        id: string,
        file: string,
        main_file?: string,
    ): Promise<PutItemCommandOutput> {
        const command = new PutItemCommand({
            TableName: process.env.SKU_DYNAMODB_TABLE,
            Item: {
                sku_id: { S: id },
                main_file: { S: main_file },
                files: { L: [{ S: file }] },
                created_time: { S: moment().format() },
                updated_time: { S: moment().format() },
            },
        });

        return await this.dynamoDbService.query(command);
    }

    private async updateFileList(
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
                '#time': 'updated_time',
            },
            ExpressionAttributeValues: {
                ':file': { L: [{ S: file }] },
                ':empty_list': { L: [] },
                ':updated_time': { S: moment().format() },
            },
            UpdateExpression:
                'SET #files = list_append(if_not_exists(#files, :empty_list), :file), #time = :updated_time',
        });

        return await this.dynamoDbService.query(command);
    }

    private validateFileName(fileName: string): void {
        const result = /\.(jpe?g|png)$/i.test(fileName);

        if (!result) {
            throw new InvalidFileExtensionException();
        }

        if (fileName.split('/').length !== 2) {
            throw new InvalidFileNameException();
        }
    }
}
