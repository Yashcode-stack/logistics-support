import { ServiceabilityService } from './serviceability.service';
export declare class ServiceabilityController {
    private readonly serviceabilityService;
    constructor(serviceabilityService: ServiceabilityService);
    checkServiceability(body: any): any;
}
