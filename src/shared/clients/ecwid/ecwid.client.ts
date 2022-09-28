import {
    ProductAlreadyExistsException,
    MainImageFailedException,
    GalleryImageFailedException,
} from './ecwid.exception';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    EcwidCreateProductRequest,
    EcwidCreateProductResponse,
    EcwidUploadImageRequest,
} from 'src/integration/dto/ecwid.request';
import { Logger } from 'src/shared/logger/logger.service';

@Injectable()
export class EcwidClient {
    constructor(
        private readonly logger: Logger,
        private readonly config: ConfigService,
        private readonly service: HttpService,
    ) {}

    secret = this.config.get('ecwid.secret');
    token = this.config.get('ecwid.token');
    baseUrl = this.config.get('ecwid.url');

    async addProduct(
        request: EcwidCreateProductRequest,
    ): Promise<EcwidCreateProductResponse> {
        try {
            const url = `${this.baseUrl}/products?token=${this.secret}`;

            const response =
                await this.service.axiosRef.post<EcwidCreateProductResponse>(
                    url,
                    request,
                );

            return response.data;
        } catch (err) {
            throw new ProductAlreadyExistsException();
        }
    }

    async uploadImage(
        id: string,
        request: EcwidUploadImageRequest,
    ): Promise<void> {
        try {
            const url = `${this.baseUrl}/products/${id}/image/async?token=${this.secret}`;

            await this.service.axiosRef.post(url, request);
        } catch (err) {
            throw new MainImageFailedException();
        }
    }

    async uploadGallery(
        id: string,
        request: EcwidUploadImageRequest,
    ): Promise<void> {
        try {
            const url = `${this.baseUrl}/products/${id}/gallery/async?token=${this.secret}`;

            await this.service.axiosRef.post(url, request);
        } catch (err) {
            throw new GalleryImageFailedException();
        }
    }
}
