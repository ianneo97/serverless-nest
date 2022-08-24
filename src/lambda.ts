import { configure as serverlessExpress } from '@vendia/serverless-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
    Context,
} from 'aws-lambda';

let cachedServer;

export const handler = async (
    event: APIGatewayProxyEvent,
    context: Context,
): Promise<APIGatewayProxyResult> => {
    if (!cachedServer) {
        const nestApp = await NestFactory.create(AppModule);
        await nestApp.init();
        cachedServer = serverlessExpress({
            app: nestApp.getHttpAdapter().getInstance(),
        });
    }

    return cachedServer(event, context);
};
