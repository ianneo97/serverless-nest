import { Injectable } from '@nestjs/common';
import { Logger } from 'src/shared/logger/logger.service';

@Injectable()
export class IntegrationService {
    constructor(private readonly logger: Logger) {}
}
