import { Injectable } from '@nestjs/common';
import { CreateServiceabilityDto } from './dto/create-serviceability.dto';
import { UpdateServiceabilityDto } from './dto/update-serviceability.dto';
import { PartnerLocationsService } from '../partner-locations/partner-locations.service';

@Injectable()
export class ServiceabilityService {
  constructor(
    private readonly partnerLocationService: PartnerLocationsService,
  ) {}

  async checkServiceability(body: any) {
    const { origin, destination } = body;
    const originDelieveryPartnerToPincodesData =
      await this.partnerLocationService.getAll(
        {
          pincode: origin,
        },
        {},
        0,
        100,
      );

    const destinationDelieveryPartnerToPincodesData =
      await this.partnerLocationService.getAll(
        {
          pincode: destination,
        },
        {},
        0,
        100,
      );

    const uniqueDeliveryPartners = new Set<string>(
      originDelieveryPartnerToPincodesData?.map(
        (item) => item?.deliveryPartnerId,
      ),
    );
  }
}
