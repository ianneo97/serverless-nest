import { registerAs } from '@nestjs/config';

export default registerAs('ximilar', () => ({
    url:
        process.env.XIMILAR_URL ||
        'https://api.ximilar.com/tagging/fashion/v2/detect_tags',
    token:
        process.env.XIMILAR_TOKEN || '89de880c44751e7c776742d5aecc3aec9fe0db3f',
}));
