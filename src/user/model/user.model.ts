import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const UserModel = extendApi(
    z.object({
        provider: z.string(),
        external_id: z.string(),
        first_name: z.string(),
        last_name: z.string(),
    }),
);

export const UsersModel = extendApi(
    z.object({
        users: z.array(UserModel),
    }),
);
