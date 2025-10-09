import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PartnerLocationsService } from '../partner-locations/partner-locations.service';
import { DeliveryPartnersService } from 'src/delivery-partners/delivery-partners.service';
import { ZoneMappingsService } from 'src/zone-mappings/zone-mappings.service';
import { Types } from 'mongoose';

@Injectable()
export class ServiceabilityService {
  constructor(
    private readonly partnerLocationService: PartnerLocationsService,
    private readonly deliveryPartnerService: DeliveryPartnersService,
    private readonly zoneMappingService: ZoneMappingsService,
  ) {}


  async checkServiceability(body: any) {
    const { origin, destination } = body;

    const originLocations = await this.partnerLocationService.getAll(
      { pincode: origin },
      {},
      1,
      100,
    );

    const destinationLocations = await this.partnerLocationService.getAll(
      { pincode: destination },
      {},
      1,
      100,
    );

    const uniquePartnerIds = new Set<string>(
      originLocations.map((loc) => loc?.deliveryPartnerId),
    );

    if (uniquePartnerIds.size === 0) {
      throw new HttpException(
        `Service is not available for this pincode: ${origin}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const allPartners = await this.deliveryPartnerService.findAll();
    const partnerDetails = this.mapPartnerDetails(uniquePartnerIds, allPartners);
    const availablePartners = await this.calculateZoneForEachCarrier(
      originLocations, 
      destinationLocations,
      partnerDetails,
    );
    return {
      origin:origin,
      destination:destination,
      availablePartners
    };
  }


  private mapPartnerDetails(uniqueIds: Set<string>, allPartners: any[]) {
    const details: any[] = [];
    for (const id of uniqueIds) {
      const match = allPartners.find((p) => p._id.toString() === id);
      if (match) {
        details.push({
          deliveryPartnerId: id,
          name: match.name,
          status: match.status,
        });
      }
    }
    return details;
  }

private async calculateZoneForEachCarrier(
  originData: any[],
  destinationData: any[],
  partners: any[],
) {
  const promises = partners.map(async (partner) => {
    const originForPartner = originData.filter(
      (d) => d.deliveryPartnerId === partner.deliveryPartnerId,
    );
    const destinationForPartner = destinationData.filter(
      (d) => d.deliveryPartnerId === partner.deliveryPartnerId,
    );

    if (!originForPartner.length || !destinationForPartner.length) {
      console.warn(
        `No origin or destination mapping found for partner: ${partner.name}`,
      );
      return null; 
    }

    switch (partner.name) {
      case 'Delhivery':
        return this.handleDelhivery(
          originForPartner[0],
          destinationForPartner[0],
          partner.status,
        );

      case 'Xpressbees':
        return this.handleXpressbees(
          originForPartner[0],
          destinationForPartner[0],
          partner.status,
        );

      case 'Ekart':
        return this.handleEkart(
          originForPartner[0],
          destinationForPartner[0],
          partner.status,
        );

      case 'Shadowfox':
        return this.handleShadowfox(
          originForPartner[0],
          destinationForPartner[0],
          partner.status,
        );

      default:
        console.log(`No zone calculation defined for: ${partner.name}`);
        return null;
    }
  });

  // Run all promises in parallel
  const results = await Promise.all(promises);

  // Filter out null results
return results.filter(Boolean);
}



  private async handleDelhivery(origin: any, destination: any,status : string) {
    const result = await this.zoneMappingService.findZone(
      {
        deliveryPartnerId: new Types.ObjectId(origin.deliveryPartnerId),
        originCity: new RegExp(`^${origin.cityName}$`, 'i'),
        destinationCity: new RegExp(`^${destination.cityName}$`, 'i'),
      },
      {},
    );

    if(result[0]){
    return {
      deliveryPartnerId: origin.deliveryPartnerId,
      name : "Delhivery",
      status : status,
      zone: result[0].zone
    };

    }
  }

  private async handleXpressbees(origin: any, destination: any,status:string) {
    const [originZone, destinationZone] = await Promise.all([
      this.findZoneByPincode(origin),
      this.findZoneByPincode(destination),
    ]);

    const zone = this.determineZone(originZone, destinationZone);

    return {
      deliveryPartnerId: origin.deliveryPartnerId,
      name : "XpressBees",
      status : status,
      zone: zone
    };
  }

  private async handleEkart(origin: any, destination: any,status:string) {
    const [originZone, destinationZone] = await Promise.all([
      this.findZoneByPincode(origin),
      this.findZoneByPincode(destination),
    ]);

    const zone = this.determineZone(originZone, destinationZone);

    return {
      deliveryPartnerId: origin.deliveryPartnerId,
      name : "Ekart",
      status : status,
      zone: zone
    };
  }

  private async handleShadowfox(origin: any, destination: any,status:string) {
    const result = await this.zoneMappingService.findZone(
      {
        deliveryPartnerId: new Types.ObjectId(origin.deliveryPartnerId),
        originCity: new RegExp(`^${origin.cityName}$`, 'i'),
        destinationCity: new RegExp(`^${destination.cityName}$`, 'i'),
        originState: new RegExp(`^${origin.state}$`, 'i'),
        destinationState: new RegExp(`^${destination.state}$`, 'i'),
      },
      {},
    );
    if(result[0]){
   return{
      deliveryPartnerId: origin.deliveryPartnerId,
      name : "Shadoefox",
      status : status,
      zone: result[0].zone
    };
    }
 
  }



  private async findZoneByPincode(location: any) {
    return (
      await this.zoneMappingService.findZone(
        {
          deliveryPartnerId: new Types.ObjectId(location.deliveryPartnerId),
          originCity: new RegExp(`^${location.cityName}$`, 'i'),
          pincode: new Types.ObjectId(location._id),
        },
        {},
      )
    )[0];
  }

  private determineZone(originZone: any, destinationZone: any): string {
    if (!originZone || !destinationZone) return 'NA';

    if (originZone.originCity === destinationZone.originCity) return 'Zone A';
    if (originZone.region === destinationZone.region) return 'Zone B';
    if (originZone.metro === 'Yes' && destinationZone.metro === 'Yes') return 'Zone C';
    if (
      (originZone.region === 'North East and Special states' ||
      destinationZone.region === 'North East and Special states'||originZone.region == "North East and J&K"  ||destinationZone.region == "North East and J&K" )
    )
      return 'Zone E';

    return 'Zone D';
  }
}
