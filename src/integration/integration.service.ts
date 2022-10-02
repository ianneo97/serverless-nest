import {
    EcwidCreateProductRequest,
    EcwidCreateProductResponse,
    EcwidUploadImageRequest,
} from 'src/integration/dto/ecwid.request';
import { EcwidClient } from './../shared/clients/ecwid/ecwid.client';
import { XimilarClient } from './../shared/clients/ximilar/ximilar.client';
import { Injectable } from '@nestjs/common';
import { Logger } from 'src/shared/logger/logger.service';
import { XimilarResponse } from './dto/ximilar.response';
import { XimilarRequest } from './dto/ximilar.request';
import { FujikoDynamoClient } from './../shared/clients/dynamodb/dynamodb.client';
import { UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import moment from 'moment';

@Injectable()
export class IntegrationService {
    constructor(
        private readonly logger: Logger,
        private readonly ximilar: XimilarClient,
        private readonly ecwid: EcwidClient,
        private readonly dbClient: FujikoDynamoClient,
    ) {}

    async detectTags(request: XimilarRequest): Promise<XimilarResponse> {
        return await this.ximilar.detectTags(request);
    }

    async create(
        request: EcwidCreateProductRequest,
    ): Promise<EcwidCreateProductResponse> {
        this.logger.log({ message: 'Creating ECWID Product', request });

        const product = await this.ecwid.addProduct(request);

        const command = new UpdateItemCommand({
            TableName: process.env.SKU_DYNAMODB_TABLE,
            Key: {
                sku_id: { S: request.sku },
            },
            ExpressionAttributeNames: {
                '#ecwid_data': 'ecwid_data',
                '#time': 'updated_time',
            },
            ExpressionAttributeValues: {
                ':ecwid_data': { S: JSON.stringify(request) },
                ':updated_time': { S: moment().format() },
            },
            UpdateExpression:
                'SET #ecwid_data=:ecwid_data, #time=:updated_time',
        });
        await this.dbClient.query(command);

        return product;
    }

    async uploadImage(
        id: string,
        request: EcwidUploadImageRequest,
    ): Promise<void> {
        await this.ecwid.uploadImage(id, request);
    }

    async uploadGallery(
        id: string,
        request: EcwidUploadImageRequest,
    ): Promise<void> {
        await this.ecwid.uploadGallery(id, request);
    }
}
