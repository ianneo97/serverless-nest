import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { XimilarRequest } from './dto/ximilar.request';
import { XimilarResponse } from './dto/ximilar.response';
import { IntegrationService } from './integration.service';

@Controller('integration')
@ApiTags('Integration Module')
export class IntegrationController {
    constructor(private readonly service: IntegrationService) {}

    @Post('/ximilar/detect')
    @ApiOkResponse({ type: XimilarResponse })
    @ApiBody({ type: XimilarRequest })
    async detectTags(
        @Body() request: XimilarRequest,
    ): Promise<XimilarResponse> {
        const response = this.service.detectTags(request);

        return response;
    }
}
