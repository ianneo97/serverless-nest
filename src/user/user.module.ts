import { Module } from '@nestjs/common';
import { AuthModule } from 'src/shared/auth/auth.module';
import { SharedModule } from 'src/shared/shared.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [SharedModule, AuthModule],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
