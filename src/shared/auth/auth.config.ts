import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthConfig {
    public userPoolId: string = process.env.COGNITO_USER_POOL_ID;
    public clientId: string = process.env.COGNITO_CLIENT_ID;
    public region: string = process.env.REGION;
    public authority = `https://cognito-idp.${process.env.REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`;
}
