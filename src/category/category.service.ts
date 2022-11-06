import { FujikoDynamoClient } from './../shared/clients/dynamodb/dynamodb.client';
import { ScanCommand } from '@aws-sdk/client-dynamodb';
import { Injectable } from '@nestjs/common';
import { Logger } from 'src/shared/logger/logger.service';
import { CategoryDto } from './category.model';

@Injectable()
export class CategoryService {
    constructor(
        private readonly logger: Logger,
        private readonly client: FujikoDynamoClient,
    ) {}

    async getSubCategories(): Promise<CategoryDto[]> {
        const command = new ScanCommand({
            TableName: process.env.SUBCATEGORY_TABLE,
        });

        const response = await this.client.query(command);

        return response.Items.map((item) => ({
            id: Number(item.id.N),
            category: item.category.S,
            subcategory: item.subcategory.S,
            minPrice: Number(item.minPrice.N),
        }));
    }
}
