import { Injectable } from '@nestjs/common';
import { AnyKeys, FilterQuery, Model } from 'mongoose';
import { PartnerLocation } from './entities/partner-location.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PartnerLocationsService {
  constructor(
    @InjectModel(PartnerLocation.name)
    private readonly partnerLocationModel: Model<PartnerLocation>,
  ) {}

  getAll(
    query: FilterQuery<PartnerLocation>,
    projection: AnyKeys<PartnerLocation>,
    page: number,
    limit: number,
  ) {
    return this.partnerLocationModel
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
}
