import {
    GetObjectCommand,
    PutObjectCommand,
    PutObjectCommandOutput,
    S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'src/shared/logger/logger.service';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { lookup } from 'mime-types';

@Injectable()
export class FujikoS3Client {
    constructor(
        private readonly logger: Logger,
        private readonly config: ConfigService,
    ) {}

    region = this.config.get('s3.region');
    bucket = this.config.get('s3.bucket');
    client = new S3Client({ region: this.region });

    async generateUploadUrl(fileName: string): Promise<string> {
        const command = new PutObjectCommand({
            Bucket: this.bucket,
            Key: fileName,
            ContentType: lookup(fileName),
        });

        this.logger.log({ command });

        return await getSignedUrl(this.client, command, {
            expiresIn: 3600,
        });
    }

    async uploadFile(
        file: Express.Multer.File,
        filePath: string,
    ): Promise<PutObjectCommandOutput> {
        const command = new PutObjectCommand({
            Bucket: this.bucket,
            Key: `${filePath}/${file.originalname}`,
            Body: file.buffer,
            ContentType: lookup(file.originalname),
        });

        return await this.client.send(command);
    }

    async generateDownloadUrl(fileName: string): Promise<string> {
        const command = new GetObjectCommand({
            Bucket: this.bucket,
            Key: fileName,
        });

        this.logger.log({ command });

        return await getSignedUrl(this.client, command, { expiresIn: 3600 });
    }
}
