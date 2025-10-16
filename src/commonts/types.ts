export interface ServiceabilityCheckType {
  originPincodes: string[];
  destinationPincodes: string[];
}

export interface Location {
  _id?: string;
  pincode?: number;
  cityName?: string;
  state?: string;
  deliveryPartnerId?: string;
}

export interface Partner {
  originLocations: Location[];
  destinationLocations: Location[];
}
