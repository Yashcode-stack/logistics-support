import { PartnerLocationsService } from './partner-locations.service';
import { CreatePartnerLocationDto } from './dto/create-partner-location.dto';
import { UpdatePartnerLocationDto } from './dto/update-partner-location.dto';
export declare class PartnerLocationsController {
    private readonly partnerLocationsService;
    constructor(partnerLocationsService: PartnerLocationsService);
    create(createPartnerLocationDto: CreatePartnerLocationDto): any;
    findAll(): any;
    findOne(id: string): any;
    update(id: string, updatePartnerLocationDto: UpdatePartnerLocationDto): any;
    remove(id: string): any;
}
