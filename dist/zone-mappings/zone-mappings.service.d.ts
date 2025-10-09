import { CreateZoneMappingDto } from './dto/create-zone-mapping.dto';
import { UpdateZoneMappingDto } from './dto/update-zone-mapping.dto';
import { ZoneMapping } from './entities/zone-mapping.entity';
import { AnyKeys, FilterQuery, Model } from 'mongoose';
export declare class ZoneMappingsService {
    private readonly zoneMappingModel;
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
