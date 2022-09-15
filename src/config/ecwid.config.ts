import { registerAs } from '@nestjs/config';

export default registerAs('ecwid', () => ({
    url: process.env.ECWID_URL || '',
    token: process.env.ECWID_PUBLIC_TOKEN || '',
    secret: process.env.ECWID_PRIVATE_TOKEN || '',
}));
