import { Test, TestingModule } from "@nestjs/testing";
import { OdPairsController } from "./od-pairs.controller";
import { OdPairsService } from "./od-pairs.service";

describe("OdPairsController", () => {
  let controller: OdPairsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OdPairsController],
      providers: [OdPairsService],
    }).compile();

    controller = module.get<OdPairsController>(OdPairsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
