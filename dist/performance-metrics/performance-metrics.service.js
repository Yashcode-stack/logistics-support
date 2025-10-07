"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceMetricsService = void 0;
const common_1 = require("@nestjs/common");
let PerformanceMetricsService = class PerformanceMetricsService {
    create(createPerformanceMetricDto) {
        return 'This action adds a new performanceMetric';
    }
    findAll() {
        return `This action returns all performanceMetrics`;
    }
    findOne(id) {
        return `This action returns a #${id} performanceMetric`;
    }
    update(id, updatePerformanceMetricDto) {
        return `This action updates a #${id} performanceMetric`;
    }
    remove(id) {
        return `This action removes a #${id} performanceMetric`;
    }
};
exports.PerformanceMetricsService = PerformanceMetricsService;
exports.PerformanceMetricsService = PerformanceMetricsService = __decorate([
    (0, common_1.Injectable)()
], PerformanceMetricsService);
//# sourceMappingURL=performance-metrics.service.js.map