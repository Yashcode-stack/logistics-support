import { PartnerLocationsService } from './partner-locations.service';
import { CreatePartnerLocationDto } from './dto/create-partner-location.dto';
import { UpdatePartnerLocationDto } from './dto/update-partner-location.dto';
export declare class PartnerLocationsController {
    private readonly partnerLocationsService;
    constructor(partnerLocationsService: PartnerLocationsService);
    create(createPartnerLocationDto: CreatePartnerLocationDto): void;
    findAll(): void;
    findOne(id: string): void;
    update(id: string, updatePartnerLocationDto: UpdatePartnerLocationDto): void;
    remove(id: string): void;
}
