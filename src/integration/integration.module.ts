import { IntegrationService } from './integration.service';
import { IntegrationController } from './integration.controller';

import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthModule } from 'src/shared/auth/auth.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
    imports: [SharedModule, AuthModule],
    controllers: [IntegrationController],
    providers: [IntegrationService, ConfigService],
})
export class IntegrationModule {}
