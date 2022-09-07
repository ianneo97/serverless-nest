import { Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import {
    ApiExcludeEndpoint,
    ApiOkResponse,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import { FileService } from './file.service';
import {
    FilePresignedResponseDto,
    FileResponseDto,
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

    @Post()
    @ApiExcludeEndpoint()
    @ApiOkResponse({ type: FilePresignedResponseDto })
    async onFileUploaded(): Promise<void> {
        await this.service.insertFile();
    }
}
