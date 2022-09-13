import { registerAs } from '@nestjs/config';

export default registerAs('ximilar', () => ({
    url:
        process.env.XIMILAR_URL ||
        'https://api.ximilar.com/tagging/fashion/v2/detect_tags',
    token: process.env.XIMILAR_TOKEN || '',
}));
