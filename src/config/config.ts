import { ConfigObject } from '@nestjs/config';

export interface Configuration extends ConfigObject {
    CognitoUserPoolId: string;
    CognitoUserPoolClientId: string;
    Region: string;
}

export default (): Configuration => ({
    CognitoUserPoolId: process.env.COGNITO_USER_POOL_ID || '',
    CognitoUserPoolClientId: process.env.COGNITO_USER_POOL_CLIENT_ID || '',
    Region: process.env.REGION,
});
