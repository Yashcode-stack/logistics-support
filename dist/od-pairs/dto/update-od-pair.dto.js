"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOdPairDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_od_pair_dto_1 = require("./create-od-pair.dto");
class UpdateOdPairDto extends (0, mapped_types_1.PartialType)(create_od_pair_dto_1.CreateOdPairDto) {
}
exports.UpdateOdPairDto = UpdateOdPairDto;
//# sourceMappingURL=update-od-pair.dto.js.map