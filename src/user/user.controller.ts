import { UserService } from './user.service';
import { Controller, Get, Param, UseGuards, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { GetUserDto } from './dto/user.response';
import { Logger } from 'src/shared/logger/logger.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@UsePipes(ZodValidationPipe)
@ApiTags('User Module')
export class UserController {
    constructor(
        private readonly service: UserService,
        private readonly logger: Logger,
    ) {}

    @Get(':id')
    @ApiOkResponse({ type: GetUserDto })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'User ID',
    })
    @UseGuards(AuthGuard('jwt'))
    async findOne(@Param() { id }: { id: string }): Promise<GetUserDto> {
        const response = this.service.findOne(id);

        this.logger.log(response);

        return response;
    }
}
