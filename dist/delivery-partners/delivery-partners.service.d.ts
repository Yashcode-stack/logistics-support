import { CreateDeliveryPartnerDto } from './dto/create-delivery-partner.dto';
import { UpdateDeliveryPartnerDto } from './dto/update-delivery-partner.dto';
import { DeliveryPartner } from './entities/delivery-partner.entity';
import { Model } from 'mongoose';
export declare class DeliveryPartnersService {
    private readonly deliveryPartnerModel;
    constructor(deliveryPartnerModel: Model<DeliveryPartner>);
    create(createDeliveryPartnerDto: CreateDeliveryPartnerDto): string;
    getPartnerNames(uniqueIds: Set<string>): Promise<any[]>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, DeliveryPartner, {}, {}> & DeliveryPartner & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findOne(id: number): string;
    update(id: number, updateDeliveryPartnerDto: UpdateDeliveryPartnerDto): string;
    remove(id: number): string;
}
