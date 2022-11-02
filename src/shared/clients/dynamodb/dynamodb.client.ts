import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'src/shared/logger/logger.service';
import {
    DynamoDBClient,
    ServiceInputTypes,
    ServiceOutputTypes,
} from '@aws-sdk/client-dynamodb';
import { Command, HttpHandlerOptions } from '@aws-sdk/types';
import { SmithyResolvedConfiguration } from '@aws-sdk/smithy-client';

@Injectable()
export class FujikoDynamoClient {
    constructor(
        private readonly logger: Logger,
        private readonly config: ConfigService,
    ) {}

    region = this.config.get('app.region');
    client = new DynamoDBClient({ region: this.region });

    async query<
        InputType extends ServiceInputTypes,
        OutputType extends ServiceOutputTypes,
    >(
        command: Command<
            ServiceInputTypes,
            InputType,
            ServiceOutputTypes,
            OutputType,
            SmithyResolvedConfiguration<HttpHandlerOptions>
        >,
        toLog = true,
    ): Promise<OutputType> {
        if (toLog) {
            this.logger.log({ command: command });
        }

        return await this.client.send(command);
    }
}
