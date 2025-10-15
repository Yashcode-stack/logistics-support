import { Injectable } from '@nestjs/common';
import { AnyKeys, FilterQuery, Model } from 'mongoose';
import { PartnerLocation } from './entities/partner-location.entity';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePartnerLocationDto } from './dto/create-partner-location.dto';
import { UpdatePartnerLocationDto } from './dto/update-partner-location.dto';

@Injectable()
export class PartnerLocationsService {
  create(createPartnerLocationDto: CreatePartnerLocationDto) {
    throw new Error('Method not implemented.');
  }
  // GET one
  remove(arg0: number) {
    throw new Error('Method not implemented.');
  }
  update(arg0: number, updatePartnerLocationDto: UpdatePartnerLocationDto) {
    throw new Error('Method not implemented.');
  }
  findOne // GET one
    (arg0: number) {
      throw new Error('Method not implemented.');
  }
  findAll() {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel(PartnerLocation.name)
    private readonly partnerLocationModel: Model<PartnerLocation>,
  ) {}

  async getAll(
    query: FilterQuery<PartnerLocation>,
    projection: AnyKeys<PartnerLocation>,
    page: number,
    limit: number,
  ) {
    return await this.partnerLocationModel
      .find(query, projection)
      .skip((page - 1) * limit)
      .limit(limit);
  }

  

  // GET one
  getOne(
    query: FilterQuery<PartnerLocation>,
    projection: AnyKeys<PartnerLocation>,
  ) {
    return this.partnerLocationModel.findOne(query, projection);
  }

  async aggregate(pipeline : any[]){
    return await this.partnerLocationModel.aggregate(pipeline)
  }



}
