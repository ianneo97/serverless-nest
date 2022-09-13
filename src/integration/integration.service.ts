import { XimilarClient } from './../shared/clients/ximilar/ximilar.client';
import { Injectable } from '@nestjs/common';
import { Logger } from 'src/shared/logger/logger.service';
import { XimilarResponse } from './dto/ximilar.response';
import { XimilarRequest } from './dto/ximilar.request';

@Injectable()
export class IntegrationService {
    constructor(
        private readonly logger: Logger,
        private readonly ximilar: XimilarClient,
    ) {}

    async detectTags(request: XimilarRequest): Promise<XimilarResponse> {
        return await this.ximilar.detectTags(request);
    }
}
