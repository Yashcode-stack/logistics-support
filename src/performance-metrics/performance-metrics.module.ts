import { Module } from "@nestjs/common";
import { PerformanceMetricsService } from "./performance-metrics.service";
import { PerformanceMetricsController } from "./performance-metrics.controller";

@Module({
  controllers: [PerformanceMetricsController],
  providers: [PerformanceMetricsService],
})
export class PerformanceMetricsModule {}
