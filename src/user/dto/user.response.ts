import { UserModel, UsersModel } from './../model/user.model';
import { createZodDto } from '@anatine/zod-nestjs';

export class GetUserDto extends createZodDto(UserModel) {}
export class GetUsersDto extends createZodDto(UsersModel) {}
