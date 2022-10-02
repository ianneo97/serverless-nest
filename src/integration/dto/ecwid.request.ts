import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

const createSchemaRequest = extendApi(
    z.object({
        name: z.string(),
        sku: z.string(),
        quantity: z.number(),
        price: z.number(),
        unlimited: z.boolean().optional(),
        isShippingRequired: z.boolean().optional(),
        weight: z.number().optional(),
        enabled: z.boolean(),
        shipping: z
            .object({
                type: z.string().default('GLOBAL_METHODS'),
            })
            .default({
                type: 'GLOBAL_METHODS',
            }),
        attributes: z.array(
            z.object({
                id: z.number().optional(),
                name: z.string().optional(),
                value: z.string().default(''),
            }),
        ),
        description: z.string().optional(),
        defaultCategoryId: z.number().optional(),
        showOnFrontpage: z.number().optional(),
        discountsAllowed: z.boolean().optional(),
        nameYourPriceEnabled: z.boolean().optional(),
    }),
);

const createSchemaResponse = extendApi(z.object({ id: z.string() }));

const uploadImageSchema = extendApi(
    z.object({
        file_name: z.string().optional(),
        url: z.string().optional(),
        width: z.number().optional(),
        height: z.number().optional(),
    }),
);

export class EcwidCreateProductRequest extends createZodDto(
    createSchemaRequest,
) {}

export class EcwidCreateProductResponse extends createZodDto(
    createSchemaResponse,
) {}

export class EcwidUploadImageRequest extends createZodDto(uploadImageSchema) {}
