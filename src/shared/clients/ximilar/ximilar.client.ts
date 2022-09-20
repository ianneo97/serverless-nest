import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig } from 'axios';
import { XimilarRequest } from 'src/integration/dto/ximilar.request';
import { XimilarResponse } from 'src/integration/dto/ximilar.response';
import { Logger } from 'src/shared/logger/logger.service';

@Injectable()
export class XimilarClient {
    constructor(
        private readonly logger: Logger,
        private readonly config: ConfigService,
        private readonly service: HttpService,
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

        return response.data;
    }
}
