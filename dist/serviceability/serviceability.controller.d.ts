import { ServiceabilityService } from './serviceability.service';
export declare class ServiceabilityController {
    private readonly serviceabilityService;
    constructor(serviceabilityService: ServiceabilityService);
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
}
