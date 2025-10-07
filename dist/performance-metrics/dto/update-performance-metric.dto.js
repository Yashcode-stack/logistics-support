"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePerformanceMetricDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_performance_metric_dto_1 = require("./create-performance-metric.dto");
class UpdatePerformanceMetricDto extends (0, mapped_types_1.PartialType)(create_performance_metric_dto_1.CreatePerformanceMetricDto) {
}
exports.UpdatePerformanceMetricDto = UpdatePerformanceMetricDto;
//# sourceMappingURL=update-performance-metric.dto.js.map