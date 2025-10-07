import { Test, TestingModule } from '@nestjs/testing';
import { PerformanceMetricsController } from './performance-metrics.controller';
import { PerformanceMetricsService } from './performance-metrics.service';

describe('PerformanceMetricsController', () => {
  let controller: PerformanceMetricsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerformanceMetricsController],
      providers: [PerformanceMetricsService],
    }).compile();

    controller = module.get<PerformanceMetricsController>(PerformanceMetricsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
