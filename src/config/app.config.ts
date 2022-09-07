import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
    port: 8081,
    region: process.env.REGION || 'ap-southeast-1',
}));
