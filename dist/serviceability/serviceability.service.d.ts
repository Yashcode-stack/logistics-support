import { PartnerLocationsService } from '../partner-locations/partner-locations.service';
import { DeliveryPartnersService } from 'src/delivery-partners/delivery-partners.service';
import { ZoneMappingsService } from 'src/zone-mappings/zone-mappings.service';
export declare class ServiceabilityService {
    private readonly partnerLocationService;
    private readonly deliveryPartnerService;
    private readonly zoneMappingService;
    constructor(partnerLocationService: PartnerLocationsService, deliveryPartnerService: DeliveryPartnersService, zoneMappingService: ZoneMappingsService);
    checkServiceability(body: any): Promise<{
        origin: any;
        destination: any;
        availablePartners: ({
            deliveryPartnerId: any;
            name: string;
            status: string;
            zone: string;
        } | null | undefined)[];
    }>;
    private calculateZoneForEachCarrier;
    private handleDelhivery;
    private handleXpressbees;
    private handleEkart;
    private handleShadowfox;
    private findZoneByPincode;
    private determineZone;
}
