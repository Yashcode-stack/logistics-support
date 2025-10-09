import { ZoneMappingsService } from './zone-mappings.service';
import { CreateZoneMappingDto } from './dto/create-zone-mapping.dto';
import { UpdateZoneMappingDto } from './dto/update-zone-mapping.dto';
export declare class ZoneMappingsController {
    private readonly zoneMappingsService;
    constructor(zoneMappingsService: ZoneMappingsService);
    create(createZoneMappingDto: CreateZoneMappingDto): string;
    findAll(): Promise<string>;
    findOne(id: string): string;
    update(id: string, updateZoneMappingDto: UpdateZoneMappingDto): string;
    remove(id: string): string;
}
