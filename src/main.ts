import { ExpressAdapter } from '@nestjs/platform-express';
import { HttpExceptionFilter } from './lib/http-exception.filters';
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

let cachedServer: Handler;

function setupSwagger(nestApp: INestApplication): void {
    const config = new DocumentBuilder()
        .setTitle('Swagger API')
        .setDescription('Swagger APIs for application')
        .setVersion('1.0.0')
        .build();

    patchNestjsSwagger();

    const document = SwaggerModule.createDocument(nestApp, config);

    SwaggerModule.setup('api', nestApp, document);
}

async function bootstrap(): Promise<Handler> {
    if (!cachedServer) {
        const expressApp = express();
        const nestApp = await NestFactory.create(
            AppModule,
            new ExpressAdapter(expressApp),
            // {
            //     logger: new Logger(),
            // },
        );

        const DEFAULT_BASE_PREFIX = 'api';
        nestApp.useGlobalFilters(new HttpExceptionFilter());
        nestApp.setGlobalPrefix(DEFAULT_BASE_PREFIX);
        nestApp.enableCors();

        setupSwagger(nestApp);

        await nestApp.init();
        await nestApp.listen(3000);

        cachedServer = serverlessExpress({
            app: expressApp,
        });
    }

    return cachedServer;
}

export const handler = async (
    event: APIGatewayProxyEvent,
    context: Context,
    callback: Callback,
): Promise<APIGatewayProxyResult> => {
    const server = await bootstrap();
    if (event.path === '/api') {
        event.path = '/api/';
    }
    event.path = event.path.includes('swagger-ui')
        ? `/api${event.path}`
        : event.path;

    return server(event, context, callback);
};

bootstrap();
