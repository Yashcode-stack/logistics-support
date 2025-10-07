import { Module } from '@nestjs/common';
import { DeliveryPartnersService } from './delivery-partners.service';
import { DeliveryPartnersController } from './delivery-partners.controller';

@Module({
  controllers: [DeliveryPartnersController],
  providers: [DeliveryPartnersService],
})
export class DeliveryPartnersModule {}
