import { Module } from '@nestjs/common';
import { AuthModule } from 'src/shared/auth/auth.module';
import { SharedModule } from 'src/shared/shared.module';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
    imports: [SharedModule, AuthModule],
    controllers: [FileController],
    providers: [FileService],
})
export class FileModule {}
