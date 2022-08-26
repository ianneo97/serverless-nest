import { Controller } from '@nestjs/common';
import { Logger } from 'src/shared/logger/logger.service';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
    constructor(
        private readonly service: FileService,
        private readonly logger: Logger,
    ) {}
}
