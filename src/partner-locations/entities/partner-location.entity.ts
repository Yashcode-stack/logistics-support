import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PartnerLocationDocument = HydratedDocument<PartnerLocation>;
@Schema({timestamps:true,collection:"partner_locations"})
export class PartnerLocation {
  @Prop()
  deliveryPartnerId: string;

  @Prop()
  cityName: string;

  @Prop()
  state: string;

  @Prop()
  pincode: string;
}

export const PartnerLocationSchema =
  SchemaFactory.createForClass(PartnerLocation);
