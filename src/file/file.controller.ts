import {
    Controller,
    Get,
    Param,
    Post,
    Put,
    Query,
    UploadedFile,
    UseInterceptors,
    UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import {
    ApiBody,
    ApiConsumes,
    ApiOkResponse,
    ApiParam,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { FileService } from './file.service';
import {
    FilePresignedResponseDto,
    FileResponseDto,
    UpdatedFileResponseDto,
} from './dto/file.upload.response';
import { FileInterceptor } from '@nestjs/platform-express';
import { PutObjectCommandOutput } from '@aws-sdk/client-s3';

@Controller('file')
@UsePipes(ZodValidationPipe)
@ApiTags('File Module')
export class FileController {
    constructor(private readonly service: FileService) {}

    @Post('/upload')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
    ): Promise<PutObjectCommandOutput> {
        return await this.service.uploadFile(file);

        // return response;
    }

    @Get('/download')
    @ApiOkResponse({ type: FilePresignedResponseDto })
    @ApiQuery({
        name: 'fileName',
        required: true,
        description: 'File Name',
    })
    async generateDownloadUrl(
        @Query() { fileName }: { fileName: string },
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
