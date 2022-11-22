import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateXimilarDto, ListXimilarDto } from './ximilar.model';
import { XimilarService } from './ximilar.service';

@Controller('ximilar')
@UsePipes(ZodValidationPipe)
@ApiTags('Ximilar Module')
export class XimilarController {
    constructor(private readonly service: XimilarService) {}

    @Post()
    @ApiOkResponse({ type: [CreateXimilarDto] })
    @ApiBody({ type: [CreateXimilarDto] })
    async create(
        @Body() request: CreateXimilarDto[],
    ): Promise<CreateXimilarDto[]> {
        return this.service.create(request);
    }

    @Get()
    @ApiOkResponse({ type: [ListXimilarDto] })
    async list(): Promise<ListXimilarDto[]> {
        return this.service.list();
    }
}
