import { HydratedDocument } from 'mongoose';
export type ServiceabilityDocument = HydratedDocument<Serviceability>;
export declare class Serviceability {
    deliveryPartnerId: string;
    partnerLocationId: string;
    cod: boolean;
    reversePickup: boolean;
    pickup: boolean;
}
export declare const ServiceabiltySchema: import("mongoose").Schema<Serviceability, import("mongoose").Model<Serviceability, any, any, any, import("mongoose").Document<unknown, any, Serviceability, any, {}> & Serviceability & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Serviceability, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Serviceability>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Serviceability> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
