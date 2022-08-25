import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { UserModule } from './user/user.module';

@Module({
    imports: [UserModule],
    controllers: [],
    providers: [{ provide: APP_PIPE, useClass: ZodValidationPipe }],
})
export class AppModule {}
