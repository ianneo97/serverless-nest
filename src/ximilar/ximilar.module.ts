import { XimilarController } from './ximilar.controller';
import { AuthModule } from './../shared/auth/auth.module';
import { SharedModule } from './../shared/shared.module';
import { Module } from '@nestjs/common';
import { XimilarService } from './ximilar.service';

@Module({
    imports: [SharedModule, AuthModule],
    controllers: [XimilarController],
    providers: [XimilarService],
})
export class XimilarModule {}
