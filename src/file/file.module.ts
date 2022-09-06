import { ConfigService } from '@nestjs/config';
import { FileController } from './file.controller';
import { Module } from '@nestjs/common';
import { AuthModule } from 'src/shared/auth/auth.module';
import { SharedModule } from 'src/shared/shared.module';
import { FileService } from './file.service';

@Module({
    imports: [SharedModule, AuthModule],
    controllers: [FileController],
    providers: [FileService, ConfigService],
})
export class FileModule {}
