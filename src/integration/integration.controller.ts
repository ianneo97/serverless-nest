import {
    EcwidCreateProductRequest,
    EcwidCreateProductResponse,
    EcwidUploadImageRequest,
} from 'src/integration/dto/ecwid.request';
import { Body, Controller, Param, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { XimilarRequest } from './dto/ximilar.request';
import { XimilarResponse } from './dto/ximilar.response';
import { IntegrationService } from './integration.service';

@Controller('integration')
@ApiTags('Integration Module')
export class IntegrationController {
    constructor(private readonly service: IntegrationService) {}

    @Post('/ximilar/detect')
    @ApiOkResponse({ type: XimilarResponse })
    @ApiBody({ type: XimilarRequest })
    async detectTags(
        @Body() request: XimilarRequest,
    ): Promise<XimilarResponse> {
        const response = await this.service.detectTags(request);

        return response;
    }

    @Post('/ecwid/product')
    @ApiOkResponse({ type: EcwidCreateProductResponse })
    @ApiBody({ type: EcwidCreateProductRequest })
    async create(
        @Body() request: EcwidCreateProductRequest,
    ): Promise<EcwidCreateProductResponse> {
        const response = await this.service.create(request);

        return response;
    }

    @Post('/ecwid/product/image/:id')
    @ApiBody({ type: EcwidUploadImageRequest })
    @ApiQuery({
        name: 'id',
        required: true,
        description: 'Product ID',
    })
    async uploadImage(
        @Param() { id }: { id: string },
        @Body() request: EcwidUploadImageRequest,
    ): Promise<void> {
        await this.service.uploadImage(id, request);
    }

    @Post('/ecwid/product/gallery')
    @ApiBody({ type: EcwidUploadImageRequest })
    @ApiQuery({
        name: 'id',
        required: true,
        description: 'Product ID',
    })
    async uploadGallery(
        @Query() { id }: { id: string },
        @Body() request: EcwidUploadImageRequest,
    ): Promise<void> {
        await this.service.uploadGallery(id, request);
    }
}
