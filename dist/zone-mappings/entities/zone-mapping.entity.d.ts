import { HydratedDocument, Types } from "mongoose";
export type ZoneMappingDocument = HydratedDocument<ZoneMapping>;
export declare class ZoneMapping {
    deliveryPartnerId: string;
    originCity: string;
    originState: string;
    destinationCity: string;
    destinationState: string;
    hubState: string;
    pincode: string;
    region: string;
    metro: string;
    zone: string;
}
export declare const ZoneMappingSchema: import("mongoose").Schema<ZoneMapping, import("mongoose").Model<ZoneMapping, any, any, any, import("mongoose").Document<unknown, any, ZoneMapping, any, {}> & ZoneMapping & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ZoneMapping, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ZoneMapping>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<ZoneMapping> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
