"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDeliveryPartnerDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_delivery_partner_dto_1 = require("./create-delivery-partner.dto");
class UpdateDeliveryPartnerDto extends (0, mapped_types_1.PartialType)(create_delivery_partner_dto_1.CreateDeliveryPartnerDto) {
}
exports.UpdateDeliveryPartnerDto = UpdateDeliveryPartnerDto;
//# sourceMappingURL=update-delivery-partner.dto.js.map