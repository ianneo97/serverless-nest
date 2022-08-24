import { configure as serverlessExpress } from '@vendia/serverless-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
    Callback,
    Context,
    Handler,
} from 'aws-lambda';

let cachedServer: Handler;

export const handler = async (
    event: APIGatewayProxyEvent,
    context: Context,
    callback: Callback,
): Promise<APIGatewayProxyResult> => {
    if (event.path === '/api') {
        event.path = '/api/';
    }

    event.path = event.path.includes('swagger-ui')
        ? `/api${event.path}`
        : event.path;

    if (!cachedServer) {
        const nestApp = await NestFactory.create(AppModule);
        await nestApp.init();
        cachedServer = serverlessExpress({
            app: nestApp.getHttpAdapter().getInstance(),
        });
    }

    return cachedServer(event, context, callback);
};
