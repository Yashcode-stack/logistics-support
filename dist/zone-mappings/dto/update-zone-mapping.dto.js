"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateZoneMappingDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_zone_mapping_dto_1 = require("./create-zone-mapping.dto");
class UpdateZoneMappingDto extends (0, mapped_types_1.PartialType)(create_zone_mapping_dto_1.CreateZoneMappingDto) {
}
exports.UpdateZoneMappingDto = UpdateZoneMappingDto;
//# sourceMappingURL=update-zone-mapping.dto.js.map