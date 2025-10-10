import { Injectable } from '@nestjs/common';
import { CreateZoneMappingDto } from './dto/create-zone-mapping.dto';
import { UpdateZoneMappingDto } from './dto/update-zone-mapping.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ZoneMapping } from './entities/zone-mapping.entity';
import { AnyKeys, FilterQuery, Model } from 'mongoose';

@Injectable()
export class ZoneMappingsService {
  async aggregateCouriers(pipeline : any[]) {
    return await this.zoneMappingModel.aggregate(pipeline);
  }

  constructor(@InjectModel(ZoneMapping.name)
   private readonly zoneMappingModel : Model<ZoneMapping>
  ){}
  create(createZoneMappingDto: CreateZoneMappingDto) {
    return 'This action adds a new zoneMapping';
  }
  async findAll(){
     return 'This action needs to be added in zoneMapping';
  }
   async findZone(
     query: FilterQuery<ZoneMapping>,
     projection: AnyKeys<ZoneMapping>
   ) {
    console.log(query)
     const result =  await this.zoneMappingModel
       .find(query,projection)
       return result
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
