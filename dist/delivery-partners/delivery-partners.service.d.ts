import { CreateDeliveryPartnerDto } from './dto/create-delivery-partner.dto';
import { UpdateDeliveryPartnerDto } from './dto/update-delivery-partner.dto';
export declare class DeliveryPartnersService {
    create(createDeliveryPartnerDto: CreateDeliveryPartnerDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateDeliveryPartnerDto: UpdateDeliveryPartnerDto): string;
    remove(id: number): string;
}
