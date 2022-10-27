import { FujikoDynamoClient } from './../shared/clients/dynamodb/dynamodb.client';
import { Injectable } from '@nestjs/common';
import { Logger } from 'src/shared/logger/logger.service';
import { ScanCommand } from '@aws-sdk/client-dynamodb';
import { RatingDto } from './rating.model';

@Injectable()
export class RatingService {
    constructor(
        private readonly logger: Logger,
        private readonly client: FujikoDynamoClient,
    ) {}

    async getRatings(): Promise<RatingDto[]> {
        const command = new ScanCommand({
            TableName: process.env.RATING_TABLE,
        });

        const response = await this.client.query(command);

        return response.Items.map((item) => ({
            id: Number(item.id.N),
            multiplier: Number(item.multiplier.N),
            name: item.name.S,
        }));
    }
}
