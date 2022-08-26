import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { FileModule } from './api/file/file.module';

@Module({
    imports: [FileModule],
    controllers: [],
    providers: [{ provide: APP_PIPE, useClass: ZodValidationPipe }],
})
export class AppModule {}
