import { ListXimilarDto, CreateXimilarDto } from './ximilar.model';
import { Injectable } from '@nestjs/common';
import { FujikoDynamoClient } from 'src/shared/clients/dynamodb/dynamodb.client';
import { Logger } from 'src/shared/logger/logger.service';
import { PutItemCommand, ScanCommand } from '@aws-sdk/client-dynamodb';

@Injectable()
export class XimilarService {
    constructor(
        private readonly logger: Logger,
        private readonly client: FujikoDynamoClient,
    ) {}

    async create(request: CreateXimilarDto[]): Promise<CreateXimilarDto[]> {
        await Promise.all(
            request.map(async (item: CreateXimilarDto) => {
                const command = new PutItemCommand({
                    TableName: process.env.XIMILAR_TABLE,
                    Item: {
                        id: { S: item.sku_id },
                        sku_id: { S: item.sku_id },
                        differences: { S: item.differences },
                    },
                });

                await this.client.query(command);
            }),
        );

        return request;
    }

    async list(): Promise<ListXimilarDto[]> {
        const command = new ScanCommand({
            TableName: process.env.XIMILAR_TABLE,
        });

        const response = await this.client.query(command);

        return response.Items.map((item) => ({
            id: item.id.S,
            sku_id: item.sku_id.S,
            differences: item.differences.S,
        }));
    }
}
