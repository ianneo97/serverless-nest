import { Controller, Get, Param, Put, Query, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileService } from './file.service';
import {
    FilePresignedResponseDto,
    FileResponseDto,
    UpdatedFileResponseDto,
} from './dto/file.upload.response';

@Controller('file')
@UsePipes(ZodValidationPipe)
@ApiTags('File Module')
export class FileController {
    constructor(private readonly service: FileService) {}

    @Get('/upload/:fileName')
    @ApiOkResponse({ type: FilePresignedResponseDto })
    @ApiParam({
        name: 'fileName',
        required: true,
        description: 'File Name',
    })
    async generateUploadUrl(
        @Param() { fileName }: { fileName: string },
    ): Promise<FilePresignedResponseDto> {
        const response = await this.service.generateUploadUrl(fileName);

        return response;
    }

    @Get('/download/:fileName')
    @ApiOkResponse({ type: FilePresignedResponseDto })
    @ApiParam({
        name: 'fileName',
        required: true,
        description: 'File Name',
    })
    async generateDownloadUrl(
        @Param() { fileName }: { fileName: string },
    ): Promise<FilePresignedResponseDto> {
        const response = await this.service.generateDownloadUrl(fileName);

        return response;
    }

    @Get(':id')
    @ApiOkResponse({ type: FileResponseDto })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'File ID',
    })
    async getFileInfo(
        @Param() { id }: { id: string },
    ): Promise<FileResponseDto> {
        return await this.service.getFile(id);
    }

    @Put(':id')
    @ApiOkResponse({ type: UpdatedFileResponseDto })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'File ID',
    })
    @ApiQuery({
        name: 'mainImage',
        required: true,
        description: 'Main image to be used for Ximilar API',
    })
    async updateMainImage(
        @Param() { id }: { id: string },
        @Query() { mainImage }: { mainImage: string },
    ): Promise<UpdatedFileResponseDto> {
        return await this.service.updateMainImage(id, mainImage);
    }
}
