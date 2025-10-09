import { DeliveryPartnersService } from './delivery-partners.service';
import { CreateDeliveryPartnerDto } from './dto/create-delivery-partner.dto';
import { UpdateDeliveryPartnerDto } from './dto/update-delivery-partner.dto';
export declare class DeliveryPartnersController {
    private readonly deliveryPartnersService;
    constructor(deliveryPartnersService: DeliveryPartnersService);
    create(createDeliveryPartnerDto: CreateDeliveryPartnerDto): string;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./entities/delivery-partner.entity").DeliveryPartner, {}, {}> & import("./entities/delivery-partner.entity").DeliveryPartner & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findOne(id: string): string;
    update(id: string, updateDeliveryPartnerDto: UpdateDeliveryPartnerDto): string;
    remove(id: string): string;
}
