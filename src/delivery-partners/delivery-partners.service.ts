import { Injectable } from "@nestjs/common";
import { CreateDeliveryPartnerDto } from "./dto/create-delivery-partner.dto";
import { UpdateDeliveryPartnerDto } from "./dto/update-delivery-partner.dto";
import { InjectModel } from "@nestjs/mongoose";
import { DeliveryPartner } from "./entities/delivery-partner.entity";
import { Model } from "mongoose";

@Injectable()
export class DeliveryPartnersService {
  constructor(
    @InjectModel(DeliveryPartner.name)
    private readonly deliveryPartnerModel: Model<DeliveryPartner>,
  ) {}
  create(createDeliveryPartnerDto: CreateDeliveryPartnerDto) {
    return "This action adds a new deliveryPartner";
  }

  async getPartnerNames(uniqueIds: Set<string>) {
    const allPartners = await this.deliveryPartnerModel.find();
    const details: any[] = [];
    for (const id of uniqueIds) {
      const match = allPartners.find((p) => p._id.toString() === id);
      if (match) {
        details.push({
          deliveryPartnerId: id,
          name: match.name,
          status: match.status,
        });
      }
    }
    return details;
  }

  async findAll() {
    return await this.deliveryPartnerModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} deliveryPartner`;
  }

  update(id: number, updateDeliveryPartnerDto: UpdateDeliveryPartnerDto) {
    return `This action updates a #${id} deliveryPartner`;
  }

  remove(id: number) {
    return `This action removes a #${id} deliveryPartner`;
  }
}
