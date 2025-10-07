import { AnyKeys, FilterQuery, Model } from 'mongoose';
import { PartnerLocation } from './entities/partner-location.entity';
export declare class PartnerLocationsService {
    private readonly partnerLocationModel;
    constructor(partnerLocationModel: Model<PartnerLocation>);
    getAll(query: FilterQuery<PartnerLocation>, projection: AnyKeys<PartnerLocation>, page: number, limit: number): import("mongoose").Query<(import("mongoose").Document<unknown, {}, PartnerLocation, {}, {}> & PartnerLocation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, PartnerLocation, {}, {}> & PartnerLocation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, PartnerLocation, "find", {}>;
    getOne(query: FilterQuery<PartnerLocation>, projection: AnyKeys<PartnerLocation>): import("mongoose").Query<(import("mongoose").Document<unknown, {}, PartnerLocation, {}, {}> & PartnerLocation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, PartnerLocation, {}, {}> & PartnerLocation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, PartnerLocation, "findOne", {}>;
}
