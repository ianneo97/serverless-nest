import { UserService } from './user.service';
import { Controller, Get, Param, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { GetUserDto } from './dto/user.response';
import { Logger } from '../lib/logger';

@Controller('user')
@UsePipes(ZodValidationPipe)
@ApiTags('User Module')
export class UserController {
    constructor(
        private readonly logger: Logger,
        private readonly service: UserService,
    ) {}

    @Get(':id')
    @ApiOkResponse({ type: GetUserDto })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'User ID',
    })
    async findOne(@Param() { id }: { id: string }): Promise<GetUserDto> {
        const response = this.service.findOne(id);

        this.logger.log('hello', response);

        return response;
    }
}
