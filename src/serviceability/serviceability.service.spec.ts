import { Test, TestingModule } from '@nestjs/testing';
import { ServiceabilityService } from './serviceability.service';

describe('ServiceabilityService', () => {
  let service: ServiceabilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceabilityService],
    }).compile();

    service = module.get<ServiceabilityService>(ServiceabilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
