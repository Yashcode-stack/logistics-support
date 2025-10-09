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
exports.ServiceabilityController = void 0;
const common_1 = require("@nestjs/common");
const serviceability_service_1 = require("./serviceability.service");
let ServiceabilityController = class ServiceabilityController {
    serviceabilityService;
    constructor(serviceabilityService) {
        this.serviceabilityService = serviceabilityService;
    }
    async checkServiceability(body) {
        return await this.serviceabilityService.checkServiceability(body);
    }
};
exports.ServiceabilityController = ServiceabilityController;
__decorate([
    (0, common_1.Post)('/check'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ServiceabilityController.prototype, "checkServiceability", null);
exports.ServiceabilityController = ServiceabilityController = __decorate([
    (0, common_1.Controller)('serviceability'),
    __metadata("design:paramtypes", [serviceability_service_1.ServiceabilityService])
], ServiceabilityController);
//# sourceMappingURL=serviceability.controller.js.map