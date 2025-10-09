"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnerLocationsModule = void 0;
const common_1 = require("@nestjs/common");
const partner_locations_service_1 = require("./partner-locations.service");
const partner_locations_controller_1 = require("./partner-locations.controller");
const mongoose_1 = require("@nestjs/mongoose");
const partner_location_entity_1 = require("./entities/partner-location.entity");
const serviceability_module_1 = require("../serviceability/serviceability.module");
let PartnerLocationsModule = class PartnerLocationsModule {
};
exports.PartnerLocationsModule = PartnerLocationsModule;
exports.PartnerLocationsModule = PartnerLocationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: partner_location_entity_1.PartnerLocation.name,
                    schema: partner_location_entity_1.PartnerLocationSchema,
                },
            ]),
            (0, common_1.forwardRef)(() => serviceability_module_1.ServiceabilityModule),
        ],
        controllers: [partner_locations_controller_1.PartnerLocationsController],
        providers: [partner_locations_service_1.PartnerLocationsService],
        exports: [partner_locations_service_1.PartnerLocationsService]
    })
], PartnerLocationsModule);
//# sourceMappingURL=partner-locations.module.js.map