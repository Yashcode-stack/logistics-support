import { Test, TestingModule } from '@nestjs/testing';
import { OdPairsService } from './od-pairs.service';

describe('OdPairsService', () => {
  let service: OdPairsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OdPairsService],
    }).compile();

    service = module.get<OdPairsService>(OdPairsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
