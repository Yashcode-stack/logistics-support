import { Injectable } from '@nestjs/common';
import { CreateZoneMappingDto } from './dto/create-zone-mapping.dto';
import { UpdateZoneMappingDto } from './dto/update-zone-mapping.dto';

@Injectable()
export class ZoneMappingsService {
  create(createZoneMappingDto: CreateZoneMappingDto) {
    return 'This action adds a new zoneMapping';
  }

  findAll() {
    return `This action returns all zoneMappings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} zoneMapping`;
  }

  update(id: number, updateZoneMappingDto: UpdateZoneMappingDto) {
    return `This action updates a #${id} zoneMapping`;
  }

  remove(id: number) {
    return `This action removes a #${id} zoneMapping`;
  }
}
