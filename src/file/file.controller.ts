import { Controller, Get, Param, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Logger } from 'src/shared/logger/logger.service';
import { FileService } from './file.service';
import { FileUploadResponseDto } from './dto/file.upload.response';

@Controller('file')
@UsePipes(ZodValidationPipe)
@ApiTags('File Module')
export class FileController {
    constructor(
        private readonly service: FileService,
        private readonly logger: Logger,
    ) {}

    @Get(':fileName')
    @ApiOkResponse({ type: FileUploadResponseDto })
    @ApiParam({
        name: 'fileName',
        required: true,
        description: 'File Name',
    })
    async generateUploadUrl(
        @Param() { fileName }: { fileName: string },
    ): Promise<FileUploadResponseDto> {
        const response = await this.service.generateUploadUrl(fileName);

        return response;
    }
}
