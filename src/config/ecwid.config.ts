import { registerAs } from '@nestjs/config';

export default registerAs('ecwid', () => ({
    url: process.env.ECWID_URL || 'https://app.ecwid.com/api/v3/77182002',
    token:
        process.env.ECWID_PUBLIC_TOKEN ||
        'public_BducHjL5bZ9JB54i1LbzyXREWmesn3bw',
    secret:
        process.env.ECWID_PRIVATE_TOKEN ||
        'secret_yM5b2SZRTjdTw2GmHskmST9B5fhauMTQ',
}));
