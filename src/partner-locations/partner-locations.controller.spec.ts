import { Test, TestingModule } from '@nestjs/testing';
import { PartnerLocationsController } from './partner-locations.controller';
import { PartnerLocationsService } from './partner-locations.service';

describe('PartnerLocationsController', () => {
  let controller: PartnerLocationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartnerLocationsController],
      providers: [PartnerLocationsService],
    }).compile();

    controller = module.get<PartnerLocationsController>(PartnerLocationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
