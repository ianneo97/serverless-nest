import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from 'src/shared/auth/auth.module';
import { SharedModule } from 'src/shared/shared.module';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';

@Module({
    imports: [SharedModule, AuthModule],
    controllers: [RatingController],
    providers: [RatingService, ConfigService],
})
export class RatingModule {}
