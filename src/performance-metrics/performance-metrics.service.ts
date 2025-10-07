import { Injectable } from '@nestjs/common';
import { CreatePerformanceMetricDto } from './dto/create-performance-metric.dto';
import { UpdatePerformanceMetricDto } from './dto/update-performance-metric.dto';

@Injectable()
export class PerformanceMetricsService {
  create(createPerformanceMetricDto: CreatePerformanceMetricDto) {
    return 'This action adds a new performanceMetric';
  }

  findAll() {
    return `This action returns all performanceMetrics`;
  }

  findOne(id: number) {
    return `This action returns a #${id} performanceMetric`;
  }

  update(id: number, updatePerformanceMetricDto: UpdatePerformanceMetricDto) {
    return `This action updates a #${id} performanceMetric`;
  }

  remove(id: number) {
    return `This action removes a #${id} performanceMetric`;
  }
}
