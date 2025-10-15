import { Test, TestingModule } from "@nestjs/testing";
import { PerformanceMetricsService } from "./performance-metrics.service";

describe("PerformanceMetricsService", () => {
  let service: PerformanceMetricsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PerformanceMetricsService],
    }).compile();

    service = module.get<PerformanceMetricsService>(PerformanceMetricsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
