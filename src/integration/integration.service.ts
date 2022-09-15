import {
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

@Injectable()
export class IntegrationService {
    constructor(
        private readonly logger: Logger,
        private readonly ximilar: XimilarClient,
        private readonly ecwid: EcwidClient,
    ) {}

    async detectTags(request: XimilarRequest): Promise<XimilarResponse> {
        return await this.ximilar.detectTags(request);
    }

    async create(
        request: EcwidCreateProductRequest,
    ): Promise<EcwidCreateProductResponse> {
        return await this.ecwid.addProduct(request);
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
}
