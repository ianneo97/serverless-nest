import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WinstonModule } from 'nest-winston';
import winston from 'winston';

@Module({
    imports: [
        WinstonModule.forRoot({
            level: process.env.LOG_LEVEL || 'info',
            format: winston.format.json(),
            transports: [new winston.transports.Console()],
        }),
    ],
    controllers: [UserController, AppController],
    providers: [UserService, AppService],
})
export class AppModule {}
