import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig } from 'axios';
import { XimilarRequest } from 'src/integration/dto/ximilar.request';
import { XimilarResponse } from 'src/integration/dto/ximilar.response';
import { Logger } from 'src/shared/logger/logger.service';
import { FujikoDynamoClient } from '../dynamodb/dynamodb.client';

@Injectable()
export class XimilarClient {
    constructor(
        private readonly logger: Logger,
        private readonly config: ConfigService,
        private readonly service: HttpService,
        private readonly client: FujikoDynamoClient,
    ) {}

    private initConfig(): AxiosRequestConfig {
        const token = this.config.get('ximilar.token');

        return {
            headers: {
                Authorization: `Token ${token}`,
            },
        };
    }

    async detectTags(request: XimilarRequest): Promise<XimilarResponse> {
        const url = this.config.get('ximilar.url');
        const config = this.initConfig();

        const response = await this.service.axiosRef.post<XimilarResponse>(
            url,
            request,
            config,
        );

        // const command = new PutItemCommand({
        //     TableName: process.env.XIMILAR_TABLE,
        //     Item: {
        //         id: { S: response.data.status.request_id },
        //         statusCode: { N: response.data.status.code.toString() },
        //         response: { S: JSON.stringify(response.data) },
        //     },
        // });

        // await this.client.query(command, false);

        return response.data;
    }
}
