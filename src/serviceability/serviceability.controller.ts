import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ServiceabilityService } from './serviceability.service';

@Controller('serviceability')
export class ServiceabilityController {
  constructor(private readonly serviceabilityService: ServiceabilityService) {}

  @Post('/check')
  @HttpCode(200)
  async checkServiceability(@Body() body: any) {
    return await this.serviceabilityService.checkServiceability(body);
  }
}
