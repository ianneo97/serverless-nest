import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SharedModule } from 'src/shared/shared.module';
import { AuthModule } from './../shared/auth/auth.module';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
    imports: [SharedModule, AuthModule],
    controllers: [CategoryController],
    providers: [CategoryService, ConfigService],
})
export class CategoryModule {}
