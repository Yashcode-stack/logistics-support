import { Module } from "@nestjs/common";
import { ZoneMappingsService } from "./zone-mappings.service";
import { ZoneMappingsController } from "./zone-mappings.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { ZoneMapping, ZoneMappingSchema } from "./entities/zone-mapping.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ZoneMapping.name,
        schema: ZoneMappingSchema,
      },
    ]),
  ],
  controllers: [ZoneMappingsController],
  providers: [ZoneMappingsService],
  exports: [ZoneMappingsService],
})
export class ZoneMappingsModule {}
