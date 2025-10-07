import { PartnerLocationsService } from '../partner-locations/partner-locations.service';
export declare class ServiceabilityService {
    private readonly partnerLocationService;
    constructor(partnerLocationService: PartnerLocationsService);
    checkServiceability(body: any): Promise<void>;
}
