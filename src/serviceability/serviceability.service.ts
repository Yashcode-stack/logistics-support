import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PartnerLocationsService } from "../partner-locations/partner-locations.service";
import { DeliveryPartnersService } from "src/delivery-partners/delivery-partners.service";
import { ZoneMappingsService } from "src/zone-mappings/zone-mappings.service";
import { Types } from "mongoose";

@Injectable()
export class ServiceabilityService {
  constructor(
    private readonly partnerLocationService: PartnerLocationsService,
    private readonly deliveryPartnerService: DeliveryPartnersService,
    private readonly zoneMappingService: ZoneMappingsService,
  ) {}

  async batchCheckServiceability(
    odPairs: { origin: string; destination: string }[],
  ) {
    const BATCH_SIZE = Number(process.env.BATCH_SIZE) || 20;
    const results: any = [];

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
              error: err.message || "Unknown error",
            };
          }
        }),
      );

      results.push(...batchResults);
    }

    return results;
  }

  async checkServiceability(body: any) {
    const { origin, destination } = body;

    const pipline = [
      {
        $facet: {
          originGrouped: [
            { $match: { pincode: Number(origin) } },
            {
              $lookup: {
                from: "delivery_partners",
                localField: "deliveryPartnerId",
                foreignField: "_id",
                as: "partner",
              },
            },
            { $unwind: { path: "$partner", preserveNullAndEmptyArrays: true } },
            {
              $group: {
                _id: "$partner.name",
                originLocations: {
                  $push: {
                    _id: "$_id",
                    pincode: "$pincode",
                    cityName: "$cityName",
                    state: "$state",
                    deliveryPartnerId: "$deliveryPartnerId",
                  },
                },
              },
            },
          ],
          destinationGrouped: [
            { $match: { pincode: Number(destination)} },
            {
              $lookup: {
                from: "delivery_partners",
                localField: "deliveryPartnerId",
                foreignField: "_id",
                as: "partner",
              },
            },
            { $unwind: { path: "$partner", preserveNullAndEmptyArrays: true } },
            {
              $group: {
                _id: "$partner.name",
                destinationLocations: {
                  $push: {
                    _id: "$_id",
                    pincode: "$pincode",
                    cityName: "$cityName",
                    state: "$state",
                    deliveryPartnerId: "$deliveryPartnerId",
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
                  { $map: { input: "$originGrouped", as: "o", in: "$$o._id" } },
                  {
                    $map: {
                      input: "$destinationGrouped",
                      as: "d",
                      in: "$$d._id",
                    },
                  },
                ],
              },
              as: "partnerName",
              in: {
                partnerName: "$$partnerName",
                originLocations: {
                  $let: {
                    vars: {
                      origin: {
                        $arrayElemAt: [
                          {
                            $filter: {
                              input: "$originGrouped",
                              cond: { $eq: ["$$this._id", "$$partnerName"] },
                            },
                          },
                          0,
                        ],
                      },
                    },
                    in: { $ifNull: ["$$origin.originLocations", []] },
                  },
                },
                destinationLocations: {
                  $let: {
                    vars: {
                      dest: {
                        $arrayElemAt: [
                          {
                            $filter: {
                              input: "$destinationGrouped",
                              cond: { $eq: ["$$this._id", "$$partnerName"] },
                            },
                          },
                          0,
                        ],
                      },
                    },
                    in: { $ifNull: ["$$dest.destinationLocations", []] },
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
                input: "$merged",
                as: "m",
                in: {
                  k: "$$m.partnerName",
                  v: {
                    originLocations: "$$m.originLocations",
                    destinationLocations: "$$m.destinationLocations",
                  },
                },
              },
            },
          },
        },
      },
    ];

    const partnerDetails = await this.partnerLocationService.aggregate(pipline);
    const availablePartners = await this.buildZoneAggregationPipeline(
      partnerDetails[0],
    );
    return {
      origin,
      destination,
      availablePartners,
    };
  }

  async buildZoneAggregationPipeline(partnerDetails) {
    const pipelines: any = {};
    const pipelines2: any = {};

    pipelines.delhivery = [
      {
        $match: {
          deliveryPartnerId: new Types.ObjectId(
            partnerDetails.Delhivery.originLocations[0].deliveryPartnerId,
          ),
          originCity: new RegExp(
            `^${partnerDetails.Delhivery.originLocations[0].cityName}$`,
            "i",
          ),
          destinationCity: new RegExp(
            `^${partnerDetails.Delhivery.destinationLocations[0].cityName}$`,
            "i",
          ),
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

    pipelines.shadowfox = [
      {
        $match: {
          deliveryPartnerId: new Types.ObjectId(
            partnerDetails.Shadowfox.originLocations[0].deliveryPartnerId,
          ),
          originCity: new RegExp(
            `^${partnerDetails.Shadowfox.originLocations[0].cityName}$`,
            "i",
          ),
          destinationCity: new RegExp(
            `^${partnerDetails.Shadowfox.destinationLocations[0].cityName}$`,
            "i",
          ),
          originState: new RegExp(
            `^${partnerDetails.Shadowfox.originLocations[0].state}$`,
            "i",
          ),
          destinationState: new RegExp(
            `^${partnerDetails.Shadowfox.destinationLocations[0].state}$`,
            "i",
          ),
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

    const DelhiveryAndShadowfox =
      await this.zoneMappingService.aggregateCouriers([
        {
          $match: {
            $or: [
              {
                originCity:
                  partnerDetails?.Delhivery?.originLocations?.[0]?.cityName?.toUpperCase(),
                destinationCity:
                  partnerDetails?.Delhivery?.destinationLocations?.[0]?.cityName?.toUpperCase(),
              },
              {
                originCity:
                  partnerDetails?.Shadowfox?.originLocations?.[0]?.cityName?.toUpperCase(),
                destinationCity:
                  partnerDetails?.Shadowfox?.destinationLocations?.[0]?.cityName?.toUpperCase(),
              },
            ],
          },
        },
        {
          $facet: pipelines,
        },
      ]);


        const aggregatedData = await this.zoneMappingService.aggregateCouriers([
      {
        $match: {
          pincode: {
            $in: [
              partnerDetails.Ekart.originLocations[0]._id,
              partnerDetails.Ekart.destinationLocations[0]._id,
              partnerDetails.Xpressbees.originLocations[0]._id,
              partnerDetails.Xpressbees.destinationLocations[0]._id,
              
            ],
          },
        },
      },
    ]);

    const deliveryPartnersWithPincode = ["Ekart", "Xpressbees"];

    for (const partner of deliveryPartnersWithPincode) {
      const partnerInfo = partnerDetails[partner];

      const originLocation = partnerInfo.originLocations[0];
      const destinationLocation = partnerInfo.destinationLocations[0];

      const originZone = aggregatedData.find(
        (zone) =>
          zone.pincode.toString() === originLocation._id.toString() &&
          zone.deliveryPartnerId.toString() ===
            originLocation.deliveryPartnerId.toString() &&
          zone.originCity.toLowerCase() ===
            originLocation.cityName.toLowerCase(),
      );

      const destinationZone = aggregatedData.find(
        (zone) =>
          zone.pincode.toString() === destinationLocation._id.toString() &&
          zone.deliveryPartnerId.toString() ===
            destinationLocation.deliveryPartnerId.toString() &&
          zone.originCity.toLowerCase() ===
            destinationLocation.cityName.toLowerCase(),
      );

      const zone = this.determineZone(originZone, destinationZone);

      DelhiveryAndShadowfox[0][partner] = [{ zone }];

      }

    return DelhiveryAndShadowfox;
  }

  private determineZone(originZone: any, destinationZone: any): string {
    if (!originZone || !destinationZone) return "NA";

    if (
      originZone.originCity.toLowerCase() ===
      destinationZone.originCity.toLowerCase()
    )
      return "Zone A";
    if (
      originZone.region.toLowerCase() === destinationZone.region.toLowerCase()
    )
      return "Zone B";
    if (
      originZone.metro.toLowerCase() === "yes" &&
      destinationZone.metro.toLowerCase() === "yes"
    )
      return "Zone C";
    const specialRegions = [
      "North East and Special states",
      "North East and J&K",
    ];
    if (
      specialRegions.includes(originZone.region) ||
      specialRegions.includes(destinationZone.region)
    )
      return "Zone E";

    return "Zone D";
  }
}
