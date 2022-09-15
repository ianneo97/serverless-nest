import { LoggerModule } from './../../logger/logger.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { EcwidClient } from './ecwid.client';

@Module({
    imports: [LoggerModule, HttpModule],
    providers: [ConfigService, EcwidClient],
    exports: [EcwidClient],
})
export class EcwidModule {}
