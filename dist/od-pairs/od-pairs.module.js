"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OdPairsModule = void 0;
const common_1 = require("@nestjs/common");
const od_pairs_service_1 = require("./od-pairs.service");
const od_pairs_controller_1 = require("./od-pairs.controller");
let OdPairsModule = class OdPairsModule {
};
exports.OdPairsModule = OdPairsModule;
exports.OdPairsModule = OdPairsModule = __decorate([
    (0, common_1.Module)({
        controllers: [od_pairs_controller_1.OdPairsController],
        providers: [od_pairs_service_1.OdPairsService],
    })
], OdPairsModule);
//# sourceMappingURL=od-pairs.module.js.map