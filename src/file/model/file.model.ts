import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const FileModel = extendApi(
    z.object({
        fileName: z.string(),
        presignedUrl: z.string().optional(),
    }),
);
