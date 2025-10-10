import { CreateZoneMappingDto } from './dto/create-zone-mapping.dto';
import { UpdateZoneMappingDto } from './dto/update-zone-mapping.dto';
import { ZoneMapping } from './entities/zone-mapping.entity';
import { AnyKeys, FilterQuery, Model } from 'mongoose';
export declare class ZoneMappingsService {
    private readonly zoneMappingModel;
    aggregateCouriers(arg0: {
        $facet: {
            delhivery: ({
                $match: {
                    partnerName: string;
                    originCity: string;
                };
            } | {
                $project: {
                    _id: number;
                    zone: number;
                    originCity: number;
                    destinationCity: number;
                };
            })[];
            xpressbees: ({
                $match: {
                    partnerName: string;
                    pincode: {
                        $exists: boolean;
                    };
                };
            } | {
                $project: {
                    _id: number;
                    zone: number;
                    pincode: number;
                };
            })[];
            ekart: ({
                $match: {
                    partnerName: string;
                    region: string;
                };
            } | {
                $project: {
                    _id: number;
                    zone: number;
                    region: number;
                };
            })[];
            shadowfox: ({
                $match: {
                    partnerName: string;
                    metro: string;
                };
            } | {
                $project: {
                    _id: number;
                    zone: number;
                    originState: number;
                    destinationState: number;
                };
            })[];
        };
    }[]): void;
    constructor(zoneMappingModel: Model<ZoneMapping>);
    create(createZoneMappingDto: CreateZoneMappingDto): string;
    findAll(): Promise<string>;
    findZone(query: FilterQuery<ZoneMapping>, projection: AnyKeys<ZoneMapping>): Promise<(import("mongoose").Document<unknown, {}, ZoneMapping, {}, {}> & ZoneMapping & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findOne(id: number): string;
    update(id: number, updateZoneMappingDto: UpdateZoneMappingDto): string;
    remove(id: number): string;
}
