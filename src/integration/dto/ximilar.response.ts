import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const schema = extendApi(
    z.object({
        records: z.array(
            z.object({
                _url: z.string(),
                'Top Category': z.string(),
                _status: z.object({
                    code: z.number(),
                    text: z.string(),
                    request_id: z.string(),
                }),
                _id: z.string(),
                _width: z.number(),
                _height: z.number(),
                _objects: z.array(
                    z.union([
                        z.object({
                            name: z.string(),
                            id: z.string(),
                            bound_box: z.array(z.number()),
                            prob: z.number(),
                            area: z.number(),
                            expand_by_bound_box: z.array(z.number()),
                            'Top Category': z.string(),
                            Category: z.string(),
                            'pre-filled': z.boolean(),
                            _tags: z.object({
                                Category: z.array(
                                    z.object({
                                        name: z.string(),
                                        prob: z.number(),
                                        id: z.string(),
                                        'pre-filled': z.boolean(),
                                    }),
                                ),
                                Color: z.array(
                                    z.object({
                                        prob: z.number(),
                                        name: z.string(),
                                        id: z.string(),
                                    }),
                                ),
                                Style: z.array(
                                    z.object({
                                        prob: z.number(),
                                        name: z.string(),
                                        id: z.string(),
                                    }),
                                ),
                                Subcategory: z.array(
                                    z.union([
                                        z.object({
                                            name: z.string(),
                                            prob: z.number(),
                                        }),
                                        z.object({
                                            prob: z.number(),
                                            name: z.string(),
                                            id: z.string(),
                                        }),
                                    ]),
                                ),
                                Gender: z.array(
                                    z.object({
                                        prob: z.number(),
                                        name: z.string(),
                                        id: z.string(),
                                    }),
                                ),
                                Material: z.array(
                                    z.object({
                                        prob: z.number(),
                                        name: z.string(),
                                        id: z.string(),
                                    }),
                                ),
                                Length: z.array(
                                    z.object({
                                        prob: z.number(),
                                        name: z.string(),
                                        id: z.string(),
                                    }),
                                ),
                                Fit: z.array(
                                    z.object({
                                        prob: z.number(),
                                        name: z.string(),
                                        id: z.string(),
                                    }),
                                ),
                                Age: z.array(
                                    z.object({
                                        prob: z.number(),
                                        name: z.string(),
                                        id: z.string(),
                                    }),
                                ),
                                Design: z.array(
                                    z.object({
                                        prob: z.number(),
                                        name: z.string(),
                                        id: z.string(),
                                    }),
                                ),
                                Pattern: z.array(
                                    z.object({
                                        prob: z.number(),
                                        name: z.string(),
                                        id: z.string(),
                                    }),
                                ),
                                Rise: z.array(
                                    z.object({
                                        prob: z.number(),
                                        name: z.string(),
                                        id: z.string(),
                                    }),
                                ),
                                'Top Category': z.array(
                                    z.object({
                                        name: z.string(),
                                        prob: z.number(),
                                        id: z.string(),
                                        'pre-filled': z.boolean(),
                                    }),
                                ),
                            }),
                            _tags_simple: z.array(z.string()),
                        }),
                        z.object({
                            name: z.string(),
                            id: z.string(),
                            bound_box: z.array(z.number()),
                            prob: z.number(),
                            area: z.number(),
                            expand_by_bound_box: z.array(z.number()),
                            'Top Category': z.string(),
                            Category: z.string(),
                        }),
                    ]),
                ),
            }),
        ),
        version: z.string(),
        model_format: z.string(),
        status: z.object({
            code: z.number(),
            text: z.string(),
            request_id: z.string(),
            proc_id: z.string(),
        }),
        statistics: z.object({ 'processing time': z.number() }),
    }),
);

export class XimilarResponse extends createZodDto(schema) {}
