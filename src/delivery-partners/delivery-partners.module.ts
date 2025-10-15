import { Module } from "@nestjs/common";
import { DeliveryPartnersService } from "./delivery-partners.service";
import { DeliveryPartnersController } from "./delivery-partners.controller";
import { MongooseModule } from "@nestjs/mongoose";
import {
  DeliveryPartner,
  DeliveryPartnerSchema,
} from "./entities/delivery-partner.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DeliveryPartner.name,
        schema: DeliveryPartnerSchema,
      },
    ]),
  ],
  controllers: [DeliveryPartnersController],
  providers: [DeliveryPartnersService],
  exports: [DeliveryPartnersService],
})
export class DeliveryPartnersModule {}
