"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateServiceabilityDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_serviceability_dto_1 = require("./create-serviceability.dto");
class UpdateServiceabilityDto extends (0, mapped_types_1.PartialType)(create_serviceability_dto_1.CreateServiceabilityDto) {
}
exports.UpdateServiceabilityDto = UpdateServiceabilityDto;
//# sourceMappingURL=update-serviceability.dto.js.map