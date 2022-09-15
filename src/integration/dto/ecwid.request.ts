import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

const createSchemaRequest = extendApi(
    z.object({
        name: z.string(),
        sku: z.string(),
        quantity: z.number(),
        price: z.number(),
    }),
);

const createSchemaResponse = extendApi(z.object({ id: z.string() }));

const uploadImageSchema = extendApi(
    z.object({
        url: z.string(),
        width: z.number(),
        height: z.number(),
    }),
);

export class EcwidCreateProductRequest extends createZodDto(
    createSchemaRequest,
) {}

export class EcwidCreateProductResponse extends createZodDto(
    createSchemaResponse,
) {}

export class EcwidUploadImageRequest extends createZodDto(uploadImageSchema) {}
