import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { Controller, Get, UsePipes } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RatingDto } from './rating.model';
import { RatingService } from './rating.service';

@Controller('ratings')
@UsePipes(ZodValidationPipe)
@ApiTags('Rating Module')
export class RatingController {
    constructor(private readonly service: RatingService) {}

    @Get()
    @ApiOkResponse({ type: [RatingDto] })
    async getRatings(): Promise<RatingDto[]> {
        return this.service.getRatings();
    }
}
