import { ScanCommand } from '@aws-sdk/client-dynamodb';
import { FujikoDynamoClient } from './../shared/clients/dynamodb/dynamodb.client';
import { Injectable } from '@nestjs/common';
import { Logger } from 'src/shared/logger/logger.service';

@Injectable()
export class BrandService {
    constructor(
        private readonly logger: Logger,
        private readonly client: FujikoDynamoClient,
    ) {}

    async getBrands(): Promise<unknown> {
        const command = new ScanCommand({
            TableName: process.env.BRAND_TABLE,
        });

        const response = await this.client.query(command);

        return response.Items.map((item) => ({
            id: Number(item.id.N),
            name: item.name.S,
            multiplier: Number(item.multiplier.N),
        }));
    }
}
