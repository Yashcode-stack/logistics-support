import { PartialType } from '@nestjs/mapped-types';
import { CreateZoneMappingDto } from './create-zone-mapping.dto';

export class UpdateZoneMappingDto extends PartialType(CreateZoneMappingDto) {}
