import { Test, TestingModule } from "@nestjs/testing";
import { PartnerLocationsService } from "./partner-locations.service";

describe("PartnerLocationsService", () => {
  let service: PartnerLocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartnerLocationsService],
    }).compile();

    service = module.get<PartnerLocationsService>(PartnerLocationsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
