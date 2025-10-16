import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PartnerLocationsService } from "../partner-locations/partner-locations.service";
import { DeliveryPartnersService } from "src/delivery-partners/delivery-partners.service";
import { ZoneMappingsService } from "src/zone-mappings/zone-mappings.service";
import { Types } from "mongoose";
import { Partner } from "src/commonts/types";

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

  async checkServiceability(body) {
    let { origin, destination } = body;
    origin = Number(origin);
    destination = Number(destination);
    const pipeline = [
      { $match: { pincode: { $in: [origin, destination] } } },
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
        $project: {
          partnerName: "$partner.name",
          pincode: 1,
          cityName: 1,
          state: 1,
          deliveryPartnerId: 1,
        },
      },
      {
        $group: {
          _id: "$partnerName",
          locations: {
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
      {
        $project: {
          partnerName: "$_id",
          originLocationsArr: {
            $filter: {
              input: "$locations",
              as: "loc",
              cond: { $eq: ["$$loc.pincode", origin] },
            },
          },
          destinationLocationsArr: {
            $filter: {
              input: "$locations",
              as: "loc",
              cond: { $eq: ["$$loc.pincode", destination] },
            },
          },
        },
      },
      {
        $project: {
          partnerName: 1,
          originLocation: { $arrayElemAt: ["$originLocationsArr", 0] },
          destinationLocation: {
            $arrayElemAt: ["$destinationLocationsArr", 0],
          },
        },
      },
      {
        $match: {
          originLocation: { $exists: true, $ne: null },
          destinationLocation: { $exists: true, $ne: null },
        },
      },
      {
        $project: {
          _id: 0,
          partnerName: 1,
          originLocations: [{ $ifNull: ["$originLocation", "$$REMOVE"] }],
          destinationLocations: [
            { $ifNull: ["$destinationLocation", "$$REMOVE"] },
          ],
        },
      },
    ];
    const result = await this.partnerLocationService.aggregate(pipeline);
    const currentISOTime11 = new Date().toISOString();
    const partnerDetails = result.reduce((acc, p) => {
      acc[p.partnerName] = {
        originLocations: p.originLocations,
        destinationLocations: p.destinationLocations,
      };
      return acc;
    }, {});
    const availablePartners =
      await this.buildZoneAggregationPipeline(partnerDetails);
    return { origin, destination, availablePartners };
  }



async buildZoneAggregationPipeline(partnerDetails) {
    try {
      const pipelines: Record<string, any[]> = {};
      const get = (obj, path, fallback = null) => {
        return (
          path.split(".").reduce((acc, part) => acc?.[part], obj) ?? fallback
        );
      };
      if (
        partnerDetails?.Delhivery?.originLocations?.length &&
        partnerDetails?.Delhivery?.destinationLocations?.length
      ) {
        pipelines.Delhivery = [
          {
            $match: {
              deliveryPartnerId: new Types.ObjectId(
                get(
                  partnerDetails,
                  "Delhivery.originLocations.0.deliveryPartnerId",
                ),
              ),
              originCity: new RegExp(
                `^${get(partnerDetails, "Delhivery.originLocations.0.cityName")}$`,
                "i",
              ),
              destinationCity: new RegExp(
                `^${get(partnerDetails, "Delhivery.destinationLocations.0.cityName")}$`,
                "i",
              ),
            },
          },
          { $limit: 1 },
          { $project: { _id: 0, zone: 1 } },
        ];
      }
      if (
        partnerDetails?.Shadowfox?.originLocations?.length &&
        partnerDetails?.Shadowfox?.destinationLocations?.length
      ) {
        pipelines.Shadowfox = [
          {
            $match: {
              deliveryPartnerId: new Types.ObjectId(
                get(
                  partnerDetails,
                  "Shadowfox.originLocations.0.deliveryPartnerId",
                ),
              ),
              originCity: new RegExp(
                `^${get(partnerDetails, "Shadowfox.originLocations.0.cityName")}$`,
                "i",
              ),
              destinationCity: new RegExp(
                `^${get(partnerDetails, "Shadowfox.destinationLocations.0.cityName")}$`,
                "i",
              ),
              originState: new RegExp(
                `^${get(partnerDetails, "Shadowfox.originLocations.0.state")}$`,
                "i",
              ),
              destinationState: new RegExp(
                `^${get(partnerDetails, "Shadowfox.destinationLocations.0.state")}$`,
                "i",
              ),
            },
          },
          { $limit: 1 },
          { $project: { _id: 0, zone: 1 } },
        ];
      }
      if (Object.keys(pipelines).length === 0) {
        console.warn("No valid partners found for zone pipeline.");
        return null;
      }
      const DelhiveryAndShadowfox =
        await this.zoneMappingService.aggregateCouriers([
          {
            $match: {
              $or: [
                ...(partnerDetails?.Delhivery
                  ? [
                      {
                        originCity:
                          partnerDetails.Delhivery.originLocations[0].cityName.toUpperCase(),
                        destinationCity:
                          partnerDetails.Delhivery.destinationLocations[0].cityName.toUpperCase(),
                      },
                    ]
                  : []),
                ...(partnerDetails?.Shadowfox
                  ? [
                      {
                        originCity:
                          partnerDetails.Shadowfox.originLocations[0].cityName.toUpperCase(),
                        destinationCity:
                          partnerDetails.Shadowfox.destinationLocations[0].cityName.toUpperCase(),
                      },
                    ]
                  : []),
              ],
            },
          },
          { $facet: pipelines },
        ]);
      const pincodePartners = ["Ekart", "Xpressbees"];
      const pincodeIds: any[] = [];
      for (const partner of pincodePartners) {
        const originId = get(
          partnerDetails,
          `${partner}.originLocations.0._id`,
        );
        const destId = get(
          partnerDetails,
          `${partner}.destinationLocations.0._id`,
        );
        if (originId) pincodeIds.push(originId);
        if (destId) pincodeIds.push(destId);
      }
      const aggregatedData = pincodeIds.length
        ? await this.zoneMappingService.aggregateCouriers([
            { $match: { pincode: { $in: pincodeIds } } },
          ])
        : [];
      for (const partner of pincodePartners) {
        const partnerInfo = partnerDetails?.[partner];
        if (
          !partnerInfo?.originLocations?.length ||
          !partnerInfo?.destinationLocations?.length
        )
          continue;
        const originLocation = partnerInfo.originLocations[0];
        const destinationLocation = partnerInfo.destinationLocations[0];
        const originZone = aggregatedData.find(
          (z) =>
            z.pincode.toString() === originLocation._id.toString() &&
            z.deliveryPartnerId.toString() ===
              originLocation.deliveryPartnerId.toString(),
        );
        const destinationZone = aggregatedData.find(
          (z) =>
            z.pincode.toString() === destinationLocation._id.toString() &&
            z.deliveryPartnerId.toString() ===
              destinationLocation.deliveryPartnerId.toString(),
        );
        const zone = this.determineZone(originZone, destinationZone);
        if (!DelhiveryAndShadowfox[0]) DelhiveryAndShadowfox[0] = {};
        DelhiveryAndShadowfox[0][partner] = [{ zone }];
      }
      return DelhiveryAndShadowfox;
    } catch (err) {
      console.error(" Error in buildZoneAggregationPipeline:", err.message);
      return {
        error: true,
        message: "Failed to build zone aggregation pipeline",
        details: err.message,
      };
    }
  }
  private determineZone(originZone: any, destinationZone: any): string {
    if (!originZone || !destinationZone) return "NA";
    const oCity = originZone.originCity?.toLowerCase?.() || "";
    const dCity = destinationZone.originCity?.toLowerCase?.() || "";
    const oRegion = originZone.region?.toLowerCase?.() || "";
    const dRegion = destinationZone.region?.toLowerCase?.() || "";
    const oMetro = originZone.metro?.toLowerCase?.() || "";
    const dMetro = destinationZone.metro?.toLowerCase?.() || "";
    if (oCity === dCity) return "Zone A";
    if (oRegion === dRegion) return "Zone B";
    if (oMetro === "yes" && dMetro === "yes") return "Zone C";
    const specialRegions = [
      "north east and special states",
      "north east and j&k",
    ];
    if (specialRegions.includes(oRegion) || specialRegions.includes(dRegion))
      return "Zone E";
    return "Zone D";
  }
}
