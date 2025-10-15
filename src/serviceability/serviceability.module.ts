import { forwardRef, Module } from '@nestjs/common';
import { ServiceabilityService } from './serviceability.service';
import { ServiceabilityController } from './serviceability.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Serviceability,
  ServiceabiltySchema,
} from './entities/serviceability.entity';
import { PartnerLocationsModule } from '../partner-locations/partner-locations.module';
import { DeliveryPartnersModule } from 'src/delivery-partners/delivery-partners.module';
import { ZoneMappingsModule } from 'src/zone-mappings/zone-mappings.module';
import { UploadModule } from 'src/upload/upload.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Serviceability.name, schema: ServiceabiltySchema },
    ]),
    forwardRef(() => PartnerLocationsModule),
    DeliveryPartnersModule,
    ZoneMappingsModule,UploadModule
  ],
  controllers: [ServiceabilityController],
  providers: [ServiceabilityService],
})
export class ServiceabilityModule {}
