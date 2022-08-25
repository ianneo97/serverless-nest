import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { UserService } from './user/user.service';
import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { UserModule } from './user/user.module';

@Module({
    imports: [UserModule],
    controllers: [],
    providers: [
        UserService,
        { provide: APP_PIPE, useClass: ZodValidationPipe },
    ],
})
export class AppModule {}
