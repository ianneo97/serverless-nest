import { Controller, Post } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { FileService } from './file.service';

@Controller('file/event')
export class FileEventController {
    constructor(private readonly service: FileService) {}

    @Post()
    @ApiExcludeEndpoint()
    async onFileUploaded(): Promise<void> {
        await this.service.insertFile();
    }
}
