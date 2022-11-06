import {
    EcwidCategoriesResponse,
    EcwidCreateProductRequest,
    EcwidCreateProductResponse,
    EcwidUploadImageRequest,
} from 'src/integration/dto/ecwid.request';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
    ApiBody,
    ApiOkResponse,
    ApiParam,
    ApiQuery,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { XimilarRequest } from './dto/ximilar.request';
import { XimilarResponse } from './dto/ximilar.response';
import { IntegrationService } from './integration.service';
import { Translation } from './model/translation.model';

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
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Product ID',
    })
    async uploadImage(
        @Param() param: { id: string },
        @Body() request: EcwidUploadImageRequest,
    ): Promise<void> {
        await this.service.uploadImage(param.id, request);
    }

    @Post('/ecwid/product/gallery/:id')
    @ApiBody({ type: EcwidUploadImageRequest })
    @ApiQuery({
        name: 'id',
        required: true,
        description: 'Product ID',
    })
    async uploadGallery(
        @Param() { id }: { id: string },
        @Body() request: EcwidUploadImageRequest,
    ): Promise<void> {
        await this.service.uploadGallery(id, request);
    }

    @Get('/ecwid/categories')
    @ApiResponse({ type: EcwidCategoriesResponse })
    async getCategories(): Promise<EcwidCategoriesResponse> {
        return await this.service.getCategories();
    }

    @Get('/translations')
    async getTranslations(): Promise<Translation[]> {
        return await this.service.getTranslations();
    }
}
