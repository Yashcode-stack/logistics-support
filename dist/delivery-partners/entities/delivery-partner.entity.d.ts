import { HydratedDocument } from 'mongoose';
export type DeliveryPartnersDocument = HydratedDocument<DeliveryPartner>;
export declare class DeliveryPartner {
    name: string;
    status: string;
}
export declare const DeliveryPartnerSchema: import("mongoose").Schema<DeliveryPartner, import("mongoose").Model<DeliveryPartner, any, any, any, import("mongoose").Document<unknown, any, DeliveryPartner, any, {}> & DeliveryPartner & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DeliveryPartner, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<DeliveryPartner>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<DeliveryPartner> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
