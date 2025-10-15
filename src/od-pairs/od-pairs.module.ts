import { Module } from "@nestjs/common";
import { OdPairsService } from "./od-pairs.service";
import { OdPairsController } from "./od-pairs.controller";

@Module({
  controllers: [OdPairsController],
  providers: [OdPairsService],
})
export class OdPairsModule {}
