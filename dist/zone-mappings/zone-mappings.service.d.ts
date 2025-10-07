import { CreateZoneMappingDto } from './dto/create-zone-mapping.dto';
import { UpdateZoneMappingDto } from './dto/update-zone-mapping.dto';
export declare class ZoneMappingsService {
    create(createZoneMappingDto: CreateZoneMappingDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateZoneMappingDto: UpdateZoneMappingDto): string;
    remove(id: number): string;
}
