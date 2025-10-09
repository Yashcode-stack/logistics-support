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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoneMappingSchema = exports.ZoneMapping = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ZoneMapping = class ZoneMapping {
    deliveryPartnerId;
    originCity;
    originState;
    destinationCity;
    destinationState;
    hubState;
    pincode;
    region;
    metro;
    zone;
};
exports.ZoneMapping = ZoneMapping;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId }),
    __metadata("design:type", String)
], ZoneMapping.prototype, "deliveryPartnerId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ZoneMapping.prototype, "originCity", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ZoneMapping.prototype, "originState", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ZoneMapping.prototype, "destinationCity", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ZoneMapping.prototype, "destinationState", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ZoneMapping.prototype, "hubState", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId }),
    __metadata("design:type", String)
], ZoneMapping.prototype, "pincode", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ZoneMapping.prototype, "region", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ZoneMapping.prototype, "metro", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ZoneMapping.prototype, "zone", void 0);
exports.ZoneMapping = ZoneMapping = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: "zone_mappings" })
], ZoneMapping);
exports.ZoneMappingSchema = mongoose_1.SchemaFactory.createForClass(ZoneMapping);
//# sourceMappingURL=zone-mapping.entity.js.map