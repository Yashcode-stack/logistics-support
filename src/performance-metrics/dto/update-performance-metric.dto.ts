import { PartialType } from '@nestjs/mapped-types';
import { CreatePerformanceMetricDto } from './create-performance-metric.dto';

export class UpdatePerformanceMetricDto extends PartialType(CreatePerformanceMetricDto) {}
