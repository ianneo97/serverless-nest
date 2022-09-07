import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const FileModel = extendApi(
    z.object({
        fileName: z.string().default('image.png'),
        presignedUrl: z.string().optional().default('www.google.com'),
    }),
);
