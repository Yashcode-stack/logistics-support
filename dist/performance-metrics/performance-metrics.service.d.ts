import { CreatePerformanceMetricDto } from './dto/create-performance-metric.dto';
import { UpdatePerformanceMetricDto } from './dto/update-performance-metric.dto';
export declare class PerformanceMetricsService {
    create(createPerformanceMetricDto: CreatePerformanceMetricDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePerformanceMetricDto: UpdatePerformanceMetricDto): string;
    remove(id: number): string;
}
