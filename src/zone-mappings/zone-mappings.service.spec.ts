import { Test, TestingModule } from "@nestjs/testing";
import { ZoneMappingsService } from "./zone-mappings.service";

describe("ZoneMappingsService", () => {
  let service: ZoneMappingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ZoneMappingsService],
    }).compile();

    service = module.get<ZoneMappingsService>(ZoneMappingsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
