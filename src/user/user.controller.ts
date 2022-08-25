import { UserNotFoundException } from './exception/exceptions';
import { UserService } from './user.service';
import { Controller, Get, Inject, Param, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { GetUserDto } from './dto/user.response';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller('user')
@UsePipes(ZodValidationPipe)
@ApiTags('User Module')
export class UserController {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
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
        console.log('its working!');
        throw new UserNotFoundException();

        this.logger.info('Response', response);

        return response;
    }
}
