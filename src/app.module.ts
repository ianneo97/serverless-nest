import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { Logger } from './lib/logger';

@Module({
    imports: [],
    controllers: [UserController],
    providers: [
        UserService,
        Logger,
        { provide: APP_PIPE, useClass: ZodValidationPipe },
    ],
})
export class AppModule {}
