import { registerAs } from '@nestjs/config';

export default registerAs('s3', () => ({
    bucket: process.env.S3_BUCKET || 'nestjs-serverless-dev-bucket',
    region: process.env.REGION || 'ap-southeast-1',
}));
