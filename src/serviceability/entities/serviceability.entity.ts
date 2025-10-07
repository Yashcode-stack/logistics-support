import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ServiceabilityDocument = HydratedDocument<Serviceability>;

@Schema({ timestamps: true, collection: 'serviceability' })
export class Serviceability {
  @Prop()
  deliveryPartnerId: string;

  @Prop()
  partnerLocationId: string;

  @Prop()
  cod: boolean;

  @Prop()
  reversePickup: boolean;

  @Prop()
  pickup: boolean;
}

export const ServiceabiltySchema = SchemaFactory.createForClass(Serviceability);
