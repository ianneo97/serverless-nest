import { ExpressAdapter } from '@nestjs/platform-express';
import { patchNestjsSwagger } from '@anatine/zod-nestjs';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import express from 'express';
import {
    Handler,
    APIGatewayProxyEvent,
    Context,
    Callback,
    APIGatewayProxyResult,
} from 'aws-lambda';
import { configure as serverlessExpress } from '@vendia/serverless-express';
import { INestApplication } from '@nestjs/common';
import yaml from 'yaml';
import { writeFileSync } from 'fs';
import { ConfigService } from '@nestjs/config';

let cachedServer: Handler;

function setupSwagger(nestApp: INestApplication): void {
    const config = new DocumentBuilder()
        .setTitle('Swagger API')
        .setDescription('Swagger APIs for application')
        .setVersion('1.0.0')
        .build();

    patchNestjsSwagger();

    const document = SwaggerModule.createDocument(nestApp, config);

    const isServerless = process.env.SERVERLESS_MODE;
    if (!isServerless) {
        const ymlString = yaml.stringify(document, {});
        writeFileSync('./openapi.yml', ymlString);
    }

    SwaggerModule.setup('api', nestApp, document);
}

async function bootstrap(): Promise<Handler> {
    if (!cachedServer) {
        const expressApp = express();
        const nestApp = await NestFactory.create(
            AppModule,
            new ExpressAdapter(expressApp),
        );

        const DEFAULT_BASE_PREFIX = 'api';
        nestApp.setGlobalPrefix(DEFAULT_BASE_PREFIX);
        nestApp.enableCors();

        const configService = nestApp.get(ConfigService);

        setupSwagger(nestApp);

        await nestApp.init();
        await nestApp.listen(configService.get('app.port'));

        cachedServer = serverlessExpress({
            app: expressApp,
            eventSourceRoutes: {
                AWS_EVENTBRIDGE: '/api/file',
            },
        });
    }

    return cachedServer;
}

export const handler = async (
    event: APIGatewayProxyEvent,
    context: Context,
    callback: Callback,
): Promise<APIGatewayProxyResult> => {
    if (!cachedServer) {
        cachedServer = await bootstrap();
        if (event.path === '/api') {
            event.path = '/api/';
        }
        event.path = event.path.includes('swagger-ui')
            ? `/api${event.path}`
            : event.path;
    }

    return cachedServer(event, context, callback);
};

bootstrap();
