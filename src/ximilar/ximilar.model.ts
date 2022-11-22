import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const XimilarModal = extendApi(
    z.object({
        id: z.string().default(''),
        sku_id: z.string().default(''),
        differences: z.string().default(''),
    }),
);

export class CreateXimilarDto extends createZodDto(
    XimilarModal.pick({
        sku_id: true,
        differences: true,
    }),
) {}

export class ListXimilarDto extends createZodDto(
    XimilarModal.pick({
        id: true,
        sku_id: true,
        differences: true,
    }),
) {}
