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

    const partnerDetails = await this.deliveryPartnerService.getPartnerNames(uniquePartnerIds);

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




private async calculateZoneForEachCarrier(
  originData: any[],
  destinationData: any[],
  partners: any[],
) {


  // --------------------------------------------

        //   deliveryPartnerId: new Types.ObjectId(origin.deliveryPartnerId),
        // originCity: new RegExp(`^${origin.cityName}$`, 'i'),
        // destinationCity: new RegExp(`^${destination.cityName}$`, 'i'),


//   const delhivery = [
//         { $match: { partnerName: "Delhivery", originCity: "Delhi NCR" } },
//         { $project: { _id: 0, zone: 1, originCity: 1, destinationCity: 1 } }
//       ]
//   this.zoneMappingService.aggregateCouriers([
//   {
//     $facet: {
//       delhivery: [
//         { $match: { partnerName: "Delhivery", originCity: "Delhi NCR" } },
//         { $project: { _id: 0, zone: 1, originCity: 1, destinationCity: 1 } }
//       ],
//       xpressbees: [
//         { $match: { partnerName: "Xpressbees", pincode: { $exists: true } } },
//         { $project: { _id: 0, zone: 1, pincode: 1 } }
//       ],
//       ekart: [
//         { $match: { partnerName: "Ekart", region: "North" } },
//         { $project: { _id: 0, zone: 1, region: 1 } }
//       ],
//       shadowfox: [
//         { $match: { partnerName: "Shadowfox", metro: "Yes" } },
//         { $project: { _id: 0, zone: 1, originState: 1, destinationState: 1 } }
//       ]
//     }
//   }
// ]);



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

  const results = await Promise.all(promises);

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

    if (originZone.originCity.toLowerCase() === destinationZone.originCity.toLowerCase()) return 'Zone A';
    if (originZone.region.toLowerCase() === destinationZone.region.toLowerCase()) return 'Zone B';
    if (originZone.metro.toLowerCase() === 'yes' && destinationZone.metro.toLowerCase() === 'yes') return 'Zone C';
    const specialRegions = ['North East and Special states', 'North East and J&K']
    if (
      (  specialRegions.includes(originZone.region) ||
        specialRegions.includes(destinationZone.region))
    )
      return 'Zone E';

    return 'Zone D';
  }
}
