import { PartialType } from "@nestjs/mapped-types";
import { CreateServiceabilityDto } from "./create-serviceability.dto";

export class UpdateServiceabilityDto extends PartialType(
  CreateServiceabilityDto,
) {}
