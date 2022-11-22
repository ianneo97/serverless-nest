import {
    EcwidCategoriesResponse,
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
import { ScanCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import moment from 'moment';
import { Translation } from './model/translation.model';

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

        const product = await this.ecwid.addProduct({
            ...request,
        });

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

    async getTranslations(): Promise<Translation[]> {
        const command = new ScanCommand({
            TableName: process.env.TRANSLATION_TABLE,
        });

        const response = await this.dbClient.query(command);

        return response.Items.map((item) => {
            return {
                ID: item.ID.S,
                Type: item.Type.S,
                TH_Desc: item.TH_Desc.S,
                FF_EN_Desc: item.FF_EN_Desc.S,
                XI_EN_Desc: item.XI_EN_Desc.S,
            } as Translation;
        });
    }

    async getCategories(): Promise<EcwidCategoriesResponse> {
        return this.ecwid.getCategories();
    }
}
