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

  async batchCheckServiceability(odPairs: { origin: string; destination: string }[]) {
  const BATCH_SIZE = 10;
  const results:any = [];

  console.log(odPairs)
  for (let i = 0; i < odPairs.length; i += BATCH_SIZE) {
    const batch = odPairs.slice(i, i + BATCH_SIZE);

    const batchResults = await Promise.allSettled(
      batch.map(async (pair) => {
        try {
          return await this.checkServiceability(pair);
        } catch (err) {
          return {
            origin: pair.origin,
            destination: pair.destination,
            error: err.message || 'Unknown error',
          };
        }
      })
    );

    results.push(...batchResults);
  }

  return results;
}




  async checkServiceability(body: any) {
    const { origin, destination } = body;
    // const originLocations = await this.partnerLocationService.getAll(
    //   { pincode: origin },
    //   {},
    //   1,
    //   100,
    // );

    // const destinationLocations = await this.partnerLocationService.getAll(
    //   { pincode: destination },
    //   {},
    //   1,
    //   100,
    // );

    // const uniquePartnerIds = new Set<string>(
    //   originLocations.map((loc) => loc?.deliveryPartnerId),
    // );

    // if (uniquePartnerIds.size === 0) {
    //   throw new HttpException(
    //     `Service is not available for this pincode: ${origin}`,
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }

    // const partnerDetails = await this.deliveryPartnerService.getPartnerNames(uniquePartnerIds);


      // const availablePartners = await this.calculateZoneForEachCarrier(
    //   originLocations, 
    //   destinationLocations,
    //   partnerDetails,
    // );


    // return {
    //   origin:origin,
    //   destination:destination,
    //   availablePartners
    // };

const pipline = [
  {
    $facet: {
      originGrouped: [
        { $match: { pincode: origin.toString() } },
        {
          $lookup: {
            from: 'delivery_partners',
            localField: 'deliveryPartnerId',
            foreignField: '_id',
            as: 'partner',
          },
        },
        { $unwind: { path: '$partner', preserveNullAndEmptyArrays: true } },
        {
          $group: {
            _id: '$partner.name',
            originLocations: {
              $push: {
                _id: '$_id',
                pincode: '$pincode',
                cityName: '$cityName',
                state: '$state',
                deliveryPartnerId: '$deliveryPartnerId',
              },
            },
          },
        },
      ],
      destinationGrouped: [
        { $match: { pincode: destination.toString() } },
        {
          $lookup: {
            from: 'delivery_partners',
            localField: 'deliveryPartnerId',
            foreignField: '_id',
            as: 'partner',
          },
        },
        { $unwind: { path: '$partner', preserveNullAndEmptyArrays: true } },
        {
          $group: {
            _id: '$partner.name',
            destinationLocations: {
              $push: {
                _id: '$_id',
                pincode: '$pincode',
                cityName: '$cityName',
                state: '$state',
                deliveryPartnerId: '$deliveryPartnerId',
              },
            },
          },
        },
      ],
    },
  },

  {
    $project: {
      merged: {
        $map: {
          input: {
            $setUnion: [
              { $map: { input: '$originGrouped', as: 'o', in: '$$o._id' } },
              { $map: { input: '$destinationGrouped', as: 'd', in: '$$d._id' } },
            ],
          },
          as: 'partnerName',
          in: {
            partnerName: '$$partnerName',
            originLocations: {
              $let: {
                vars: {
                  origin: {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: '$originGrouped',
                          cond: { $eq: ['$$this._id', '$$partnerName'] },
                        },
                      },
                      0,
                    ],
                  },
                },
                in: { $ifNull: ['$$origin.originLocations', []] },
              },
            },
            destinationLocations: {
              $let: {
                vars: {
                  dest: {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: '$destinationGrouped',
                          cond: { $eq: ['$$this._id', '$$partnerName'] },
                        },
                      },
                      0,
                    ],
                  },
                },
                in: { $ifNull: ['$$dest.destinationLocations', []] },
              },
            },
          },
        },
      },
    },
  },

  {
    $replaceRoot: {
      newRoot: {
        $arrayToObject: {
          $map: {
            input: '$merged',
            as: 'm',
            in: { k: '$$m.partnerName', v: { originLocations: '$$m.originLocations', destinationLocations: '$$m.destinationLocations' } },
          },
        },
      },
    },
  },
]


  const partnerDetails = await this.partnerLocationService.aggregate(pipline)

  
// return partnerDetails

    const availablePartners = await this.buildZoneAggregationPipeline(
 
      partnerDetails[0],
    );
    
    return {
      origin,destination,
      availablePartners
    }

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


// ------------------------------------------------------Optimizing Query
async  buildZoneAggregationPipeline(

  partnerDetails,
) {
  const pipelines:any = {};
  const pipelines2:any = {};
    const time = Date.now()

 pipelines.delhivery = [
  {
    $match: {
      deliveryPartnerId: new Types.ObjectId(partnerDetails.Delhivery.originLocations[0].deliveryPartnerId),
      originCity: new RegExp(`^${partnerDetails.Delhivery.originLocations[0].cityName}$`, 'i'),
      destinationCity: new RegExp(`^${partnerDetails.Delhivery.destinationLocations[0].cityName}$`, 'i'),
    }
  },
  {
    $limit: 1,
  },
  {
    $project: {
      _id: 0,
      zone: 1,
    }
  }
];
  

pipelines.shadowfox = [
  {
    $match: {
      deliveryPartnerId: new Types.ObjectId(partnerDetails.Shadowfox.originLocations[0].deliveryPartnerId),
      originCity: new RegExp(`^${partnerDetails.Shadowfox.originLocations[0].cityName}$`, 'i'),
      destinationCity: new RegExp(`^${partnerDetails.Shadowfox.destinationLocations[0].cityName}$`, 'i'),
      originState: new RegExp(`^${partnerDetails.Shadowfox.originLocations[0].state}$`, 'i'),
      destinationState: new RegExp(`^${partnerDetails.Shadowfox.destinationLocations[0].state}$`, 'i'),
    },
  },
  
  {
    $limit: 1, 
  },
  {
    $project: {
      _id: 0,
      zone: 1,
    },
  },
];
 

  if (Object.keys(pipelines).length === 0) {
    return null;
  }


console.log(JSON.stringify(partnerDetails.Delhivery.originLocations[0].cityName))
  const DelhiveryAndShadowfox = await this.zoneMappingService.aggregateCouriers([
//     {
//   $match: 
//       {
//         originCity: {
//           $in: [
//             partnerDetails.Delhivery.originLocations[0].cityName.toUpperCase(),
//             partnerDetails.Shadowfox.originLocations[0].cityName.toUpperCase()
//           ]
//         }
//       }
// },
{
  $match: {
    $or: [
      {
        originCity: partnerDetails.Delhivery.originLocations[0].cityName.toUpperCase(),
        destinationCity: partnerDetails.Delhivery.destinationLocations[0].cityName.toUpperCase()
      },
      {
        originCity: partnerDetails.Shadowfox.originLocations[0].cityName.toUpperCase(),
        destinationCity: partnerDetails.Shadowfox.destinationLocations[0].cityName.toUpperCase()
      }
    ]
  }
},
    {
      $facet: pipelines,
    },
  ]);

//  const [originZone, destinationZone] = await Promise.all([
//       this.findZoneByPincode(origin),
//       this.findZoneByPincode(destination),
//     ]);

//     const zone = this.determineZone(originZone, destinationZone);

//     return {
//       deliveryPartnerId: origin.deliveryPartnerId,
//       name : "Ekart",
//       status : status,
//       zone: zone
//     };


  const aggregatedData = await this.zoneMappingService.aggregateCouriers([
    {
  $match: {
        pincode: {
          $in: [
            parseInt(partnerDetails.Ekart.originLocations[0].pincode),
            parseInt(partnerDetails.Ekart.destinationLocations[0].pincode),
            parseInt(partnerDetails.Xpressbees.originLocations[0].pincode),
            parseInt(partnerDetails.Xpressbees.destinationLocations[0].pincode),
          ]
        }
      }
}
  ]);

const deliveryPartnersWithPincode = ['Ekart', 'Xpressbees' ]
for (const partner of deliveryPartnersWithPincode) {
  const partnerInfo = partnerDetails[partner];

  const originLocation = partnerInfo.originLocations[0];
  const destinationLocation = partnerInfo.destinationLocations[0];
 
  const originZone = aggregatedData.find((zone) =>zone.pincodeId.toString() === originLocation._id.toString()  &&
    zone.deliveryPartnerId.toString() === originLocation.deliveryPartnerId.toString()  &&
    zone.originCity.toLowerCase() === originLocation.cityName.toLowerCase());

  // Match destination zone
  const destinationZone = aggregatedData.find((zone) =>
    zone.pincodeId.toString() === destinationLocation._id.toString()  &&
    zone.deliveryPartnerId.toString() === destinationLocation.deliveryPartnerId.toString()  &&
    zone.originCity.toLowerCase() === destinationLocation.cityName.toLowerCase()
  );

  const zone = this.determineZone(originZone, destinationZone);

  DelhiveryAndShadowfox.push({
     [partner] :[{
      zone
     }]
  });
}

  console.log(time - Date.now())

return DelhiveryAndShadowfox
 
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
