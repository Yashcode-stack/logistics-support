"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoneMappingsModule = void 0;
const common_1 = require("@nestjs/common");
const zone_mappings_service_1 = require("./zone-mappings.service");
const zone_mappings_controller_1 = require("./zone-mappings.controller");
const mongoose_1 = require("@nestjs/mongoose");
const zone_mapping_entity_1 = require("./entities/zone-mapping.entity");
let ZoneMappingsModule = class ZoneMappingsModule {
};
exports.ZoneMappingsModule = ZoneMappingsModule;
exports.ZoneMappingsModule = ZoneMappingsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{
                    name: zone_mapping_entity_1.ZoneMapping.name,
                    schema: zone_mapping_entity_1.ZoneMappingSchema
                }])],
        controllers: [zone_mappings_controller_1.ZoneMappingsController],
        providers: [zone_mappings_service_1.ZoneMappingsService],
        exports: [zone_mappings_service_1.ZoneMappingsService]
    })
], ZoneMappingsModule);
//# sourceMappingURL=zone-mappings.module.js.map