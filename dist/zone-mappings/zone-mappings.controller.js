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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoneMappingsController = void 0;
const common_1 = require("@nestjs/common");
const zone_mappings_service_1 = require("./zone-mappings.service");
const create_zone_mapping_dto_1 = require("./dto/create-zone-mapping.dto");
const update_zone_mapping_dto_1 = require("./dto/update-zone-mapping.dto");
let ZoneMappingsController = class ZoneMappingsController {
    zoneMappingsService;
    constructor(zoneMappingsService) {
        this.zoneMappingsService = zoneMappingsService;
    }
    create(createZoneMappingDto) {
        return this.zoneMappingsService.create(createZoneMappingDto);
    }
    findAll() {
        return this.zoneMappingsService.findAll();
    }
    findOne(id) {
        return this.zoneMappingsService.findOne(+id);
    }
    update(id, updateZoneMappingDto) {
        return this.zoneMappingsService.update(+id, updateZoneMappingDto);
    }
    remove(id) {
        return this.zoneMappingsService.remove(+id);
    }
};
exports.ZoneMappingsController = ZoneMappingsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_zone_mapping_dto_1.CreateZoneMappingDto]),
    __metadata("design:returntype", void 0)
], ZoneMappingsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ZoneMappingsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ZoneMappingsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_zone_mapping_dto_1.UpdateZoneMappingDto]),
    __metadata("design:returntype", void 0)
], ZoneMappingsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ZoneMappingsController.prototype, "remove", null);
exports.ZoneMappingsController = ZoneMappingsController = __decorate([
    (0, common_1.Controller)('zone-mappings'),
    __metadata("design:paramtypes", [zone_mappings_service_1.ZoneMappingsService])
], ZoneMappingsController);
//# sourceMappingURL=zone-mappings.controller.js.map