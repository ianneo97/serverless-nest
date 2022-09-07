import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'src/shared/logger/logger.service';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

@Injectable()
export class FujikoDynamoClient {
    constructor(
        private readonly logger: Logger,
        private readonly config: ConfigService,
    ) {}

    region = this.config.get('app.region');
    client = new DynamoDBClient({ region: this.region });

    async query(command: never): Promise<unknown> {
        const response = await this.client.send(command);

        return response;
    }
}
