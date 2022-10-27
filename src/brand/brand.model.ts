import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const BrandModal = extendApi(
    z.object({
        id: z.number().default(0),
        name: z.string().default(''),
        multiplier: z.number().default(0),
    }),
);

export class BrandDto extends createZodDto(BrandModal) {}
