import { PartialType } from '@nestjs/mapped-types';
import { CreateOdPairDto } from './create-od-pair.dto';

export class UpdateOdPairDto extends PartialType(CreateOdPairDto) {}
