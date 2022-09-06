import { registerAs } from '@nestjs/config';

export default registerAs('s3', () => ({
    bucket: 'fujiko-fashion-backend-dev-bucket',
    region: process.env.REGION || 'ap-southeast-1',
}));
