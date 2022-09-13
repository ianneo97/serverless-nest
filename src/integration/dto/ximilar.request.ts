import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const schema = extendApi(
    z.object({
        records: z.array(
            z.object({
                _url: z.string(),
                'Top Category': z.string(),
                Category: z.string(),
            }),
        ),
    }),
);

export class XimilarRequest extends createZodDto(schema) {}
