import { Injectable } from '@nestjs/common';
import { Logger } from 'src/shared/logger/logger.service';
import { GetUserDto } from './dto/user.response';

@Injectable()
export class UserService {
    constructor(private readonly logger: Logger) {}
    getHello(): string {
        return 'Hello World!';
    }

    findOne(id: string): GetUserDto {
        return {
            provider: 'cognito',
            external_id: '1234',
            first_name: 'Ian',
            last_name: id,
        };
    }
}
