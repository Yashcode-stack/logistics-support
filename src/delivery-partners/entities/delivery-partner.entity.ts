import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type DeliveryPartnersDocument = HydratedDocument<DeliveryPartner>;
@Schema({ timestamps: true, collection: "delivery_partners" })
export class DeliveryPartner {
  @Prop()
  name: string;

  @Prop()
  status: string;
}

export const DeliveryPartnerSchema =
  SchemaFactory.createForClass(DeliveryPartner);
