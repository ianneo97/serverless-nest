import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { Controller, Get, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BrandService } from './brand.service';

@Controller('brands')
@UsePipes(ZodValidationPipe)
@ApiTags('Brand Module')
export class BrandController {
    constructor(private readonly service: BrandService) {}

    @Get()
    async getBrands(): Promise<unknown> {
        return this.service.getBrands();
    }
}
