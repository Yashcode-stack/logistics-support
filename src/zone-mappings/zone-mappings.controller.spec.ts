import { Test, TestingModule } from '@nestjs/testing';
import { ZoneMappingsController } from './zone-mappings.controller';
import { ZoneMappingsService } from './zone-mappings.service';

describe('ZoneMappingsController', () => {
  let controller: ZoneMappingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ZoneMappingsController],
      providers: [ZoneMappingsService],
    }).compile();

    controller = module.get<ZoneMappingsController>(ZoneMappingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
