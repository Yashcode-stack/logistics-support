import { Module } from '@nestjs/common';
import { ZoneMappingsService } from './zone-mappings.service';
import { ZoneMappingsController } from './zone-mappings.controller';

@Module({
  controllers: [ZoneMappingsController],
  providers: [ZoneMappingsService],
})
export class ZoneMappingsModule {}
