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
exports.PartnerLocationsController = void 0;
const common_1 = require("@nestjs/common");
const partner_locations_service_1 = require("./partner-locations.service");
const create_partner_location_dto_1 = require("./dto/create-partner-location.dto");
const update_partner_location_dto_1 = require("./dto/update-partner-location.dto");
let PartnerLocationsController = class PartnerLocationsController {
    partnerLocationsService;
    constructor(partnerLocationsService) {
        this.partnerLocationsService = partnerLocationsService;
    }
    create(createPartnerLocationDto) {
        return this.partnerLocationsService.create(createPartnerLocationDto);
    }
    findAll() {
        return this.partnerLocationsService.findAll();
    }
    findOne(id) {
        return this.partnerLocationsService.findOne(+id);
    }
    update(id, updatePartnerLocationDto) {
        return this.partnerLocationsService.update(+id, updatePartnerLocationDto);
    }
    remove(id) {
        return this.partnerLocationsService.remove(+id);
    }
};
exports.PartnerLocationsController = PartnerLocationsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_partner_location_dto_1.CreatePartnerLocationDto]),
    __metadata("design:returntype", void 0)
], PartnerLocationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PartnerLocationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PartnerLocationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_partner_location_dto_1.UpdatePartnerLocationDto]),
    __metadata("design:returntype", void 0)
], PartnerLocationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PartnerLocationsController.prototype, "remove", null);
exports.PartnerLocationsController = PartnerLocationsController = __decorate([
    (0, common_1.Controller)('partner-locations'),
    __metadata("design:paramtypes", [partner_locations_service_1.PartnerLocationsService])
], PartnerLocationsController);
//# sourceMappingURL=partner-locations.controller.js.map