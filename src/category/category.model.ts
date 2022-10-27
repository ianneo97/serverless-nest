import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const CategoryModal = extendApi(
    z.object({
        id: z.number().default(0),
        category: z.string().default(''),
        subcategory: z.string().default(''),
        minPrice: z.number().default(0),
    }),
);

export class CategoryDto extends createZodDto(CategoryModal) {}
