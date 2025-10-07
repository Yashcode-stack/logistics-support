import { PerformanceMetricsService } from './performance-metrics.service';
import { CreatePerformanceMetricDto } from './dto/create-performance-metric.dto';
import { UpdatePerformanceMetricDto } from './dto/update-performance-metric.dto';
export declare class PerformanceMetricsController {
    private readonly performanceMetricsService;
    constructor(performanceMetricsService: PerformanceMetricsService);
    create(createPerformanceMetricDto: CreatePerformanceMetricDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePerformanceMetricDto: UpdatePerformanceMetricDto): string;
    remove(id: string): string;
}
