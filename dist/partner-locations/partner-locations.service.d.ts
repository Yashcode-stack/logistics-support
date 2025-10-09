import { AnyKeys, FilterQuery, Model } from 'mongoose';
import { PartnerLocation } from './entities/partner-location.entity';
import { CreatePartnerLocationDto } from './dto/create-partner-location.dto';
import { UpdatePartnerLocationDto } from './dto/update-partner-location.dto';
export declare class PartnerLocationsService {
    private readonly partnerLocationModel;
    create(createPartnerLocationDto: CreatePartnerLocationDto): void;
    remove(arg0: number): void;
    update(arg0: number, updatePartnerLocationDto: UpdatePartnerLocationDto): void;
    findOne(arg0: number): void;
    findAll(): void;
    constructor(partnerLocationModel: Model<PartnerLocation>);
    getAll(query: FilterQuery<PartnerLocation>, projection: AnyKeys<PartnerLocation>, page: number, limit: number): Promise<(import("mongoose").Document<unknown, {}, PartnerLocation, {}, {}> & PartnerLocation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
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
