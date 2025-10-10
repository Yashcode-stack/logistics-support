"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryPartnersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const delivery_partner_entity_1 = require("./entities/delivery-partner.entity");
const mongoose_2 = require("mongoose");
let DeliveryPartnersService = class DeliveryPartnersService {
    deliveryPartnerModel;
    constructor(deliveryPartnerModel) {
        this.deliveryPartnerModel = deliveryPartnerModel;
    }
    create(createDeliveryPartnerDto) {
        return 'This action adds a new deliveryPartner';
    }
    async getPartnerNames(uniqueIds) {
        const allPartners = await this.deliveryPartnerModel.find();
        const details = [];
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
    findOne(id) {
        return `This action returns a #${id} deliveryPartner`;
    }
    update(id, updateDeliveryPartnerDto) {
        return `This action updates a #${id} deliveryPartner`;
    }
    remove(id) {
        return `This action removes a #${id} deliveryPartner`;
    }
};
exports.DeliveryPartnersService = DeliveryPartnersService;
exports.DeliveryPartnersService = DeliveryPartnersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(delivery_partner_entity_1.DeliveryPartner.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DeliveryPartnersService);
//# sourceMappingURL=delivery-partners.service.js.map