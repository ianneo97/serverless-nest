import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import {
    CurrentInvoke,
    getCurrentInvoke,
} from '@vendia/serverless-express/src/current-invoke';

export function getContext(): Omit<CurrentInvoke, 'event' | 'context'> & {
    event: APIGatewayProxyEvent;
    context: Context;
} {
    const context = getCurrentInvoke();
    console.log('context.ts');
    console.log(context);

    return {
        event: context.event as APIGatewayProxyEvent,
        context: context.context as Context,
    };
}
