"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceabilityService = void 0;
const common_1 = require("@nestjs/common");
const partner_locations_service_1 = require("../partner-locations/partner-locations.service");
const delivery_partners_service_1 = require("../delivery-partners/delivery-partners.service");
const zone_mappings_service_1 = require("../zone-mappings/zone-mappings.service");
const mongoose_1 = require("mongoose");
let ServiceabilityService = class ServiceabilityService {
    partnerLocationService;
    deliveryPartnerService;
    zoneMappingService;
    constructor(partnerLocationService, deliveryPartnerService, zoneMappingService) {
        this.partnerLocationService = partnerLocationService;
        this.deliveryPartnerService = deliveryPartnerService;
        this.zoneMappingService = zoneMappingService;
    }
    async checkServiceability(body) {
        const { origin, destination } = body;
        const originLocations = await this.partnerLocationService.getAll({ pincode: origin }, {}, 1, 100);
        const destinationLocations = await this.partnerLocationService.getAll({ pincode: destination }, {}, 1, 100);
        const uniquePartnerIds = new Set(originLocations.map((loc) => loc?.deliveryPartnerId));
        if (uniquePartnerIds.size === 0) {
            throw new common_1.HttpException(`Service is not available for this pincode: ${origin}`, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        const partnerDetails = await this.deliveryPartnerService.getPartnerNames(uniquePartnerIds);
        const availablePartners = await this.calculateZoneForEachCarrier(originLocations, destinationLocations, partnerDetails);
        return {
            origin: origin,
            destination: destination,
            availablePartners
        };
    }
    async calculateZoneForEachCarrier(originData, destinationData, partners) {
        const delhivery = [
            { $match: { partnerName: "Delhivery", originCity: "Delhi NCR" } },
            { $project: { _id: 0, zone: 1, originCity: 1, destinationCity: 1 } }
        ];
        this.zoneMappingService.aggregateCouriers([
            {
                $facet: {
                    delhivery: [
                        { $match: { partnerName: "Delhivery", originCity: "Delhi NCR" } },
                        { $project: { _id: 0, zone: 1, originCity: 1, destinationCity: 1 } }
                    ],
                    xpressbees: [
                        { $match: { partnerName: "Xpressbees", pincode: { $exists: true } } },
                        { $project: { _id: 0, zone: 1, pincode: 1 } }
                    ],
                    ekart: [
                        { $match: { partnerName: "Ekart", region: "North" } },
                        { $project: { _id: 0, zone: 1, region: 1 } }
                    ],
                    shadowfox: [
                        { $match: { partnerName: "Shadowfox", metro: "Yes" } },
                        { $project: { _id: 0, zone: 1, originState: 1, destinationState: 1 } }
                    ]
                }
            }
        ]);
        const promises = partners.map(async (partner) => {
            const originForPartner = originData.filter((d) => d.deliveryPartnerId === partner.deliveryPartnerId);
            const destinationForPartner = destinationData.filter((d) => d.deliveryPartnerId === partner.deliveryPartnerId);
            if (!originForPartner.length || !destinationForPartner.length) {
                console.warn(`No origin or destination mapping found for partner: ${partner.name}`);
                return null;
            }
            switch (partner.name) {
                case 'Delhivery':
                    return this.handleDelhivery(originForPartner[0], destinationForPartner[0], partner.status);
                case 'Xpressbees':
                    return this.handleXpressbees(originForPartner[0], destinationForPartner[0], partner.status);
                case 'Ekart':
                    return this.handleEkart(originForPartner[0], destinationForPartner[0], partner.status);
                case 'Shadowfox':
                    return this.handleShadowfox(originForPartner[0], destinationForPartner[0], partner.status);
                default:
                    console.log(`No zone calculation defined for: ${partner.name}`);
                    return null;
            }
        });
        const results = await Promise.all(promises);
        return results.filter(Boolean);
    }
    async handleDelhivery(origin, destination, status) {
        const result = await this.zoneMappingService.findZone({
            deliveryPartnerId: new mongoose_1.Types.ObjectId(origin.deliveryPartnerId),
            originCity: new RegExp(`^${origin.cityName}$`, 'i'),
            destinationCity: new RegExp(`^${destination.cityName}$`, 'i'),
        }, {});
        if (result[0]) {
            return {
                deliveryPartnerId: origin.deliveryPartnerId,
                name: "Delhivery",
                status: status,
                zone: result[0].zone
            };
        }
    }
    async handleXpressbees(origin, destination, status) {
        const [originZone, destinationZone] = await Promise.all([
            this.findZoneByPincode(origin),
            this.findZoneByPincode(destination),
        ]);
        const zone = this.determineZone(originZone, destinationZone);
        return {
            deliveryPartnerId: origin.deliveryPartnerId,
            name: "XpressBees",
            status: status,
            zone: zone
        };
    }
    async handleEkart(origin, destination, status) {
        const [originZone, destinationZone] = await Promise.all([
            this.findZoneByPincode(origin),
            this.findZoneByPincode(destination),
        ]);
        const zone = this.determineZone(originZone, destinationZone);
        return {
            deliveryPartnerId: origin.deliveryPartnerId,
            name: "Ekart",
            status: status,
            zone: zone
        };
    }
    async handleShadowfox(origin, destination, status) {
        console.log(origin, destination);
        const result = await this.zoneMappingService.findZone({
            deliveryPartnerId: new mongoose_1.Types.ObjectId(origin.deliveryPartnerId),
            originCity: new RegExp(`^${origin.cityName}$`, 'i'),
            destinationCity: new RegExp(`^${destination.cityName}$`, 'i'),
            originState: new RegExp(`^${origin.state}$`, 'i'),
            destinationState: new RegExp(`^${destination.state}$`, 'i'),
        }, {});
        console.log(result);
        if (result[0]) {
            return {
                deliveryPartnerId: origin.deliveryPartnerId,
                name: "Shadoefox",
                status: status,
                zone: result[0].zone
            };
        }
    }
    async findZoneByPincode(location) {
        return (await this.zoneMappingService.findZone({
            deliveryPartnerId: new mongoose_1.Types.ObjectId(location.deliveryPartnerId),
            originCity: new RegExp(`^${location.cityName}$`, 'i'),
            pincode: new mongoose_1.Types.ObjectId(location._id),
        }, {}))[0];
    }
    determineZone(originZone, destinationZone) {
        if (!originZone || !destinationZone)
            return 'NA';
        if (originZone.originCity.toLowerCase() === destinationZone.originCity.toLowerCase())
            return 'Zone A';
        if (originZone.region.toLowerCase() === destinationZone.region.toLowerCase())
            return 'Zone B';
        if (originZone.metro.toLowerCase() === 'yes' && destinationZone.metro.toLowerCase() === 'yes')
            return 'Zone C';
        const specialRegions = ['North East and Special states', 'North East and J&K'];
        if ((specialRegions.includes(originZone.region) ||
            specialRegions.includes(destinationZone.region)))
            return 'Zone E';
        return 'Zone D';
    }
};
exports.ServiceabilityService = ServiceabilityService;
exports.ServiceabilityService = ServiceabilityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [partner_locations_service_1.PartnerLocationsService,
        delivery_partners_service_1.DeliveryPartnersService,
        zone_mappings_service_1.ZoneMappingsService])
], ServiceabilityService);
//# sourceMappingURL=serviceability.service.js.map