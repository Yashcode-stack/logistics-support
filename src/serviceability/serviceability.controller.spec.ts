import { Test, TestingModule } from "@nestjs/testing";
import { ServiceabilityController } from "./serviceability.controller";
import { ServiceabilityService } from "./serviceability.service";

describe("ServiceabilityController", () => {
  let controller: ServiceabilityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceabilityController],
      providers: [ServiceabilityService],
    }).compile();

    controller = module.get<ServiceabilityController>(ServiceabilityController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
