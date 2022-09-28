import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const schema = extendApi(
    z.object({
        records: z.array(
            z.object({
                _base64: z.string(),
                'Top Category': z.string().optional(),
                Category: z.string().optional(),
            }),
        ),
    }),
);

export class XimilarRequest extends createZodDto(schema) {}
