import { forwardRef, Module } from '@nestjs/common';
import { ServiceabilityService } from './serviceability.service';
import { ServiceabilityController } from './serviceability.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Serviceability,
  ServiceabiltySchema,
} from './entities/serviceability.entity';
import { PartnerLocationsModule } from '../partner-locations/partner-locations.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Serviceability.name, schema: ServiceabiltySchema },
    ]),
    forwardRef(() => PartnerLocationsModule),
  ],
  controllers: [ServiceabilityController],
  providers: [ServiceabilityService],
})
export class ServiceabilityModule {}
