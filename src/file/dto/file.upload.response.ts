import { createZodDto } from '@anatine/zod-nestjs';
import { FileModel, FilePresignedModel } from '../model/file.model';

export class FilePresignedResponseDto extends createZodDto(
    FilePresignedModel,
) {}

export class FileResponseDto extends createZodDto(FileModel) {}

export class UpdatedFileResponseDto extends createZodDto(
    FileModel.pick({ sku_id: true, main_file: true, updated_time: true }),
) {}

export class CreatedFileResponseDto extends createZodDto(
    FileModel.pick({ sku_id: true }),
) {}
