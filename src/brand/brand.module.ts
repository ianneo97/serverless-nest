import { BrandController } from './brand.controller';
import { Module } from '@nestjs/common';
import { AuthModule } from 'src/shared/auth/auth.module';
import { SharedModule } from 'src/shared/shared.module';
import { BrandService } from './brand.service';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [SharedModule, AuthModule],
    controllers: [BrandController],
    providers: [BrandService, ConfigService],
})
export class BrandModule {}
