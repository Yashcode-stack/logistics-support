import { HydratedDocument } from 'mongoose';
export type PartnerLocationDocument = HydratedDocument<PartnerLocation>;
export declare class PartnerLocation {
    deliveryPartnerId: string;
    cityName: string;
    state: string;
    pincode: string;
}
export declare const PartnerLocationSchema: import("mongoose").Schema<PartnerLocation, import("mongoose").Model<PartnerLocation, any, any, any, import("mongoose").Document<unknown, any, PartnerLocation, any, {}> & PartnerLocation & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PartnerLocation, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<PartnerLocation>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<PartnerLocation> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
