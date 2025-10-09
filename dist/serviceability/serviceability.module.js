"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceabilityModule = void 0;
const common_1 = require("@nestjs/common");
const serviceability_service_1 = require("./serviceability.service");
const serviceability_controller_1 = require("./serviceability.controller");
const mongoose_1 = require("@nestjs/mongoose");
const serviceability_entity_1 = require("./entities/serviceability.entity");
const partner_locations_module_1 = require("../partner-locations/partner-locations.module");
const delivery_partners_module_1 = require("../delivery-partners/delivery-partners.module");
const zone_mappings_module_1 = require("../zone-mappings/zone-mappings.module");
let ServiceabilityModule = class ServiceabilityModule {
};
exports.ServiceabilityModule = ServiceabilityModule;
exports.ServiceabilityModule = ServiceabilityModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: serviceability_entity_1.Serviceability.name, schema: serviceability_entity_1.ServiceabiltySchema },
            ]),
            (0, common_1.forwardRef)(() => partner_locations_module_1.PartnerLocationsModule),
            delivery_partners_module_1.DeliveryPartnersModule,
            zone_mappings_module_1.ZoneMappingsModule
        ],
        controllers: [serviceability_controller_1.ServiceabilityController],
        providers: [serviceability_service_1.ServiceabilityService],
    })
], ServiceabilityModule);
//# sourceMappingURL=serviceability.module.js.map