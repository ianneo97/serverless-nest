import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const FilePresignedModel = extendApi(
    z.object({
        fileName: z.string().default('image.png'),
        presignedUrl: z.string().optional().default('www.google.com'),
    }),
);

export const FileModel = extendApi(
    z.object({
        sku_id: z.string().default('SK 0001'),
        files: z.array(z.string().default('image.png')),
        main_file: z.string().default('image.png'),
        ecwid_data: z.string().optional(),
        ecwid_id: z.string().optional(),
        created_time: z.string().default('created_time'),
        updated_time: z.string().default('updated_time'),
    }),
);
