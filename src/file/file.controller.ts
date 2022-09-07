import { Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { FileService } from './file.service';
import { FileResponseDto } from './dto/file.upload.response';

@Controller('file')
@UsePipes(ZodValidationPipe)
@ApiTags('File Module')
export class FileController {
    constructor(private readonly service: FileService) {}

    @Get('/upload/:fileName')
    @ApiOkResponse({ type: FileResponseDto })
    @ApiParam({
        name: 'fileName',
        required: true,
        description: 'File Name',
    })
    async generateUploadUrl(
        @Param() { fileName }: { fileName: string },
    ): Promise<FileResponseDto> {
        const response = await this.service.generateUploadUrl(fileName);

        return response;
    }

    @Get('/download/:fileName')
    @ApiOkResponse({ type: FileResponseDto })
    @ApiParam({
        name: 'fileName',
        required: true,
        description: 'File Name',
    })
    async generateDownloadUrl(
        @Param() { fileName }: { fileName: string },
    ): Promise<FileResponseDto> {
        const response = await this.service.generateDownloadUrl(fileName);

        return response;
    }

    @Post()
    @ApiOkResponse({ type: FileResponseDto })
    async test(): Promise<string> {
        // const response = await this.service.generateDownloadUrl(fileName);

        return 'Hello world';
    }
}
