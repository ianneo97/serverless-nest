import { APIGatewayProxyEvent, Context } from 'aws-lambda';

const lambdaHandler = async (
    event: APIGatewayProxyEvent,
    context: Context,
): Promise<void> => {
    console.log('hello');
};

export const handler = lambdaHandler;
