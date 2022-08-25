import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WinstonModule } from 'nest-winston';
import winston from 'winston';
import { APP_PIPE } from '@nestjs/core';

@Module({
    imports: [
        WinstonModule.forRoot({
            level: process.env.LOG_LEVEL || 'info',
            format: winston.format.json(),
            transports: [new winston.transports.Console()],
        }),
    ],
    controllers: [UserController, AppController],
    providers: [
        UserService,
        AppService,
        { provide: APP_PIPE, useClass: ZodValidationPipe },
    ],
})
export class AppModule {}
