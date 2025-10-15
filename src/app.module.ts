import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { CONFIG_VARIABLE } from './config/config';
import { ServiceabilityModule } from './serviceability/serviceability.module';
import { DeliveryPartnersModule } from './delivery-partners/delivery-partners.module';
import { OdPairsModule } from './od-pairs/od-pairs.module';
import { PartnerLocationsModule } from './partner-locations/partner-locations.module';
import { PerformanceMetricsModule } from './performance-metrics/performance-metrics.module';
import { ZoneMappingsModule } from './zone-mappings/zone-mappings.module';
import { UploadModule } from './upload/upload.module';
@Module({
  imports: [
    MongooseModule.forRoot(CONFIG_VARIABLE.db.mongodburl),
    ServiceabilityModule,
    DeliveryPartnersModule,
    OdPairsModule,
    PartnerLocationsModule,
    PerformanceMetricsModule,
    ZoneMappingsModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
