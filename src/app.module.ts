import { IntegrationModule } from './integration/integration.module';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { FileModule } from './file/file.module';
import appConfig from './config/app.config';
import s3Config from './config/s3.config';
import ximilarConfig from './config/ximilar.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [appConfig, s3Config, ximilarConfig],
        }),
        FileModule,
        IntegrationModule,
    ],
    controllers: [],
    providers: [{ provide: APP_PIPE, useClass: ZodValidationPipe }],
})
export class AppModule {}
