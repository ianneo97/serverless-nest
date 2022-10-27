import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const RatingModel = extendApi(
    z.object({
        id: z.number(),
        name: z.string().default(''),
        multiplier: z.number().default(0),
    }),
);

export class RatingDto extends createZodDto(RatingModel) {}
