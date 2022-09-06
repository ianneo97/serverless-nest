import { FileUploadResponseDto } from './dto/file.upload.response';
import { Injectable } from '@nestjs/common';
import { FujikoS3Client } from 'src/shared/clients/s3/s3.client';
import { Logger } from 'src/shared/logger/logger.service';

@Injectable()
export class FileService {
    constructor(
        private readonly logger: Logger,
        private readonly s3Service: FujikoS3Client,
    ) {}

    async generateUploadUrl(fileName: string): Promise<FileUploadResponseDto> {
        const url = await this.s3Service.generateUploadUrl(fileName);

        this.logger.log({
            message: 'Generated upload presigned url',
            url: url,
        });

        return { imageName: fileName, presignedUrl: url };
    }
}
