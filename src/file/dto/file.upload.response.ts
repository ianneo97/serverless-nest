import { createZodDto } from '@anatine/zod-nestjs';
import { FileModel } from '../model/file.model';

export class FileResponseDto extends createZodDto(FileModel) {}
