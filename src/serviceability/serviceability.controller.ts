import { Controller, Post, Body } from '@nestjs/common';
import { ServiceabilityService } from './serviceability.service';

@Controller('serviceability')
export class ServiceabilityController {
  constructor(private readonly serviceabilityService: ServiceabilityService) {}

  @Post('/check')
  checkServiceability(@Body() body: any) {
    return body;
  }
}
