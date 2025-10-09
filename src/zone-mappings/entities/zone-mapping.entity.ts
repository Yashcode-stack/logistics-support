import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type ZoneMappingDocument = HydratedDocument<ZoneMapping>;


@Schema({timestamps:true , collection : "zone_mappings"})
export class ZoneMapping {
    @Prop({ type: Types.ObjectId})
    deliveryPartnerId: string;
    
    @Prop()
    originCity: string;

    @Prop()
    originState: string;

    @Prop()
    destinationCity: string;

    @Prop()
    destinationState: string;

    @Prop()
    hubState: string;

    @Prop({ type: Types.ObjectId})
    pincode: string;

    @Prop()
    region: string;

    @Prop()
    metro: string;

    @Prop()
    zone: string;
}

export const ZoneMappingSchema = SchemaFactory.createForClass(ZoneMapping);
