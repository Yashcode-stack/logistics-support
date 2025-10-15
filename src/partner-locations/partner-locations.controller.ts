import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PartnerLocationsService } from "./partner-locations.service";
import { CreatePartnerLocationDto } from "./dto/create-partner-location.dto";
import { UpdatePartnerLocationDto } from "./dto/update-partner-location.dto";

@Controller("partner-locations")
export class PartnerLocationsController {
  constructor(
    private readonly partnerLocationsService: PartnerLocationsService,
  ) {}

  @Post()
  create(@Body() createPartnerLocationDto: CreatePartnerLocationDto) {
    return this.partnerLocationsService.create(createPartnerLocationDto);
  }

  @Get()
  findAll() {
    return this.partnerLocationsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.partnerLocationsService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatePartnerLocationDto: UpdatePartnerLocationDto,
  ) {
    return this.partnerLocationsService.update(+id, updatePartnerLocationDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.partnerLocationsService.remove(+id);
  }
}
