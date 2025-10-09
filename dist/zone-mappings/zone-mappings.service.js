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
exports.ZoneMappingsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const zone_mapping_entity_1 = require("./entities/zone-mapping.entity");
const mongoose_2 = require("mongoose");
let ZoneMappingsService = class ZoneMappingsService {
    zoneMappingModel;
    constructor(zoneMappingModel) {
        this.zoneMappingModel = zoneMappingModel;
    }
    create(createZoneMappingDto) {
        return 'This action adds a new zoneMapping';
    }
    async findAll() {
        return 'This action needs to be added in zoneMapping';
    }
    async findZone(query, projection) {
        const result = await this.zoneMappingModel
            .find(query, projection);
        return result;
    }
    findOne(id) {
        return `This action returns a #${id} zoneMapping`;
    }
    update(id, updateZoneMappingDto) {
        return `This action updates a #${id} zoneMapping`;
    }
    remove(id) {
        return `This action removes a #${id} zoneMapping`;
    }
};
exports.ZoneMappingsService = ZoneMappingsService;
exports.ZoneMappingsService = ZoneMappingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(zone_mapping_entity_1.ZoneMapping.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ZoneMappingsService);
//# sourceMappingURL=zone-mappings.service.js.map