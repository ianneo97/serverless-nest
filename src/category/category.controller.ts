import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { Controller, Get, UsePipes } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CategoryDto } from './category.model';
import { CategoryService } from './category.service';

@Controller('categories')
@UsePipes(ZodValidationPipe)
@ApiTags('Category Module')
export class CategoryController {
    constructor(private readonly service: CategoryService) {}

    @Get()
    @ApiOkResponse({ type: [CategoryDto] })
    async getCategories(): Promise<CategoryDto[]> {
        return this.service.getCategories();
    }
}
