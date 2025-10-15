import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ZoneMappingsService } from "./zone-mappings.service";
import { CreateZoneMappingDto } from "./dto/create-zone-mapping.dto";
import { UpdateZoneMappingDto } from "./dto/update-zone-mapping.dto";

@Controller("zone-mappings")
export class ZoneMappingsController {
  constructor(private readonly zoneMappingsService: ZoneMappingsService) {}

  @Post()
  create(@Body() createZoneMappingDto: CreateZoneMappingDto) {
    return this.zoneMappingsService.create(createZoneMappingDto);
  }

  @Get()
  findAll() {
    return this.zoneMappingsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.zoneMappingsService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateZoneMappingDto: UpdateZoneMappingDto,
  ) {
    return this.zoneMappingsService.update(+id, updateZoneMappingDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.zoneMappingsService.remove(+id);
  }
}
