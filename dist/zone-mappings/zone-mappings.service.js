"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoneMappingsService = void 0;
const common_1 = require("@nestjs/common");
let ZoneMappingsService = class ZoneMappingsService {
    create(createZoneMappingDto) {
        return 'This action adds a new zoneMapping';
    }
    findAll() {
        return `This action returns all zoneMappings`;
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
    (0, common_1.Injectable)()
], ZoneMappingsService);
//# sourceMappingURL=zone-mappings.service.js.map