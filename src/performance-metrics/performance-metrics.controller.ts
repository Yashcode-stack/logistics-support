import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PerformanceMetricsService } from './performance-metrics.service';
import { CreatePerformanceMetricDto } from './dto/create-performance-metric.dto';
import { UpdatePerformanceMetricDto } from './dto/update-performance-metric.dto';

@Controller('performance-metrics')
export class PerformanceMetricsController {
  constructor(private readonly performanceMetricsService: PerformanceMetricsService) {}

  @Post()
  create(@Body() createPerformanceMetricDto: CreatePerformanceMetricDto) {
    return this.performanceMetricsService.create(createPerformanceMetricDto);
  }

  @Get()
  findAll() {
    return this.performanceMetricsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.performanceMetricsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePerformanceMetricDto: UpdatePerformanceMetricDto) {
    return this.performanceMetricsService.update(+id, updatePerformanceMetricDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.performanceMetricsService.remove(+id);
  }
}
