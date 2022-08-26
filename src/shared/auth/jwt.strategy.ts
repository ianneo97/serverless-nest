import { AuthConfig } from './auth.config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface AuthorityContext {
    sub?: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private config: AuthConfig) {
        super({
            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `${config.authority}/.well-known/jwks.json`,
            }),

            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            audience: config.clientId,
            issuer: config.authority,
            algorithms: ['RS256'],
        });
    }

    public async validate(payload: AuthorityContext): Promise<boolean> {
        return !!payload.sub;
    }
}
