"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryPartnersService = void 0;
const common_1 = require("@nestjs/common");
let DeliveryPartnersService = class DeliveryPartnersService {
    create(createDeliveryPartnerDto) {
        return 'This action adds a new deliveryPartner';
    }
    findAll() {
        return `This action returns all deliveryPartners`;
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
    (0, common_1.Injectable)()
], DeliveryPartnersService);
//# sourceMappingURL=delivery-partners.service.js.map