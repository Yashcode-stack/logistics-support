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
        const allPartners = await this.deliveryPartnerService.findAll();
        const partnerDetails = this.mapPartnerDetails(uniquePartnerIds, allPartners);
        const availablePartners = await this.calculateZoneForEachCarrier(originLocations, destinationLocations, partnerDetails);
        return {
            origin: origin,
            destination: destination,
            availablePartners
        };
    }
    mapPartnerDetails(uniqueIds, allPartners) {
        const details = [];
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
    async calculateZoneForEachCarrier(originData, destinationData, partners) {
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
        const result = await this.zoneMappingService.findZone({
            deliveryPartnerId: new mongoose_1.Types.ObjectId(origin.deliveryPartnerId),
            originCity: new RegExp(`^${origin.cityName}$`, 'i'),
            destinationCity: new RegExp(`^${destination.cityName}$`, 'i'),
            originState: new RegExp(`^${origin.state}$`, 'i'),
            destinationState: new RegExp(`^${destination.state}$`, 'i'),
        }, {});
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
        if (originZone.originCity === destinationZone.originCity)
            return 'Zone A';
        if (originZone.region === destinationZone.region)
            return 'Zone B';
        if (originZone.metro === 'Yes' && destinationZone.metro === 'Yes')
            return 'Zone C';
        if ((originZone.region === 'North East and Special states' ||
            destinationZone.region === 'North East and Special states' || originZone.region == "North East and J&K" || destinationZone.region == "North East and J&K"))
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