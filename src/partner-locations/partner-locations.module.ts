import { forwardRef, Module } from '@nestjs/common';
import { PartnerLocationsService } from './partner-locations.service';
import { PartnerLocationsController } from './partner-locations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PartnerLocation,
  PartnerLocationSchema,
} from './entities/partner-location.entity';
import {ServiceabilityModule} from "../serviceability/serviceability.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PartnerLocation.name,
        schema: PartnerLocationSchema,
      },
    ]),
    forwardRef(() => ServiceabilityModule),
  ],
  controllers: [PartnerLocationsController],
  providers: [PartnerLocationsService],
})
export class PartnerLocationsModule {}
