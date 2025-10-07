"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePartnerLocationDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_partner_location_dto_1 = require("./create-partner-location.dto");
class UpdatePartnerLocationDto extends (0, mapped_types_1.PartialType)(create_partner_location_dto_1.CreatePartnerLocationDto) {
}
exports.UpdatePartnerLocationDto = UpdatePartnerLocationDto;
//# sourceMappingURL=update-partner-location.dto.js.map