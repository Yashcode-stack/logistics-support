import { DeliveryPartnersService } from './delivery-partners.service';
import { CreateDeliveryPartnerDto } from './dto/create-delivery-partner.dto';
import { UpdateDeliveryPartnerDto } from './dto/update-delivery-partner.dto';
export declare class DeliveryPartnersController {
    private readonly deliveryPartnersService;
    constructor(deliveryPartnersService: DeliveryPartnersService);
    create(createDeliveryPartnerDto: CreateDeliveryPartnerDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateDeliveryPartnerDto: UpdateDeliveryPartnerDto): string;
    remove(id: string): string;
}
