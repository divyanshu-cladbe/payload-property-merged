// types/property/base.ts
import type {
  PropertySegment,
  PropertyType,
  PossessionStatus,
  PropertyStatus,
  PropertyTag,
} from "./enums";
export interface PropertyMedia {
  images: string[];
  videos?: string[];
  threeSixtyView?: string;
  brochureUrl?: string;
}

export interface PropertyDistance {
  distance: number;
  landmark: string;
  time?: string;
  type?: "metro" | "market" | "hospital" | "school" | "bus" | "other";
}

export interface Dimensions {
  masterBedroom?: string;
  otherBedrooms?: string[];
  kitchen: string;
  livingRoom: string;
  balcony?: string;
  bathrooms?: string[];
  study?: string;
  pooja?: string;
  servant?: string;
}

export interface FloorPlan {
  id: string;
  bhk?: number;
  size?: number;
  price?: number;
  image?: string;
  isAvailable: boolean;
  dimensions: Dimensions;
}

export interface LegalClearance {
  status: "cleared" | "pending" | "issues";
  documents: string[];
  validUntil?: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  summary?: string;
  address: string;
  street?: string;
  city: string;
  state: string;
  pincode: string;
  region?: string;
  googlePlaceId?: string;
  legalEntity?: string;
  reraId?: string;
  reraLink?: string;
  authorityApprovals?: string[];
  authorityLink?: string[];
  approvalFile?: string | null;
  tags?: string[];
  tagsType: PropertyTag;
  images?: PropertyImage[];
  videos?: PropertyVideo[];
  files?: PropertyFile[];
  similarPropertiesID?: string[];
  propertySize?: string;
  noOfUnits?: number;
  noOfTowers?: number;
  launchedOn?: string;
  reraCompletionDate?: string;
  targetCompletionDate?: string;
  brochureLimit?: number;
  projectPlan?: string | null;
  blockPlan?: string | null;
  location?: PropertyLocation;
  price?: string;
  areaInSqmt?: string;
  areaInSqft?: string;
  possessionStatus?: string;
  builder: PropertyBuilder;
  amenities?: PropertyAmenity[];
  nearbyLocations?: NearbyLocation[];
  unitSpecifications?: UnitSpecification[];
  popularPlaces?: PopularPlace[];
  quotations?: Quotation[];
  createdAt: string;
  updatedAt: string;
  isBoosted?: boolean;
  boostInfo?: {
    type: "premium" | "featured" | "sponsored";
    priority: number;
    boostedUntil: string;
  };
}

export interface PropertyImage {
  url: string;
  caption: string;
}

export interface PropertyVideo {
  url: string;
  caption: string;
}

export interface PropertyFile {
  url: string;
  caption: string;
}

export interface PropertyLocation {
  coordinates: {
    lng: number;
    lat: number;
  };
}

export interface PropertyBuilder {
  id: string;
  legalName: string;
  bondName: string;
  logo: string;
  email: string;
  phoneNo: string;
  whatsAppNo: string;
  vintage: string;
  yearsOfExperience: number;
  rating: string;
  summary: string;
  about: string;
}

export interface PropertyAmenity {
  id: string;
  name: string;
  description: string;
  icon: string;
  image?: string | null;
  video?: string | null;
  isSharedAmenity: boolean;
  capacity?: number;
  capacityDetails?: string | null;
  tags?: string | null;
  files?: string | null;
}

export interface PropertyUnitType {
  type?: string;
  size?: number;
  price?: number;
  isAvailable?: boolean;
  specifications?: UnitSpecifications;
}

export interface UnitSpecifications {
  bathrooms: number;
  balconies?: number;
  floorNumber?: number;
  facing?: "North" | "South" | "East" | "West";
  furnishing?: "Unfurnished" | "Semi-Furnished" | "Fully-Furnished";
  parkingSpots: number;
}

export interface NearbyLocation {
  id: string;
  category: string;
  categoryDisplayName: string;
  places: Place[];
  searchRadius: string;
  lastUpdated: string;
  dataSource: string;
  isActive: boolean;
  metadata: Record<string, any>;
}

export interface Place {
  name: string;
  rating: number;
  address: string;
  distance: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface UnitSpecification {
  id: string;
  noOfRooms: number;
  noOfWashrooms: number;
  noOfBalconies: number;
  noOfLivingRooms: number;
  noOfKitchens: number;
  noOfUnits: number;
  plotArea?: string | null;
  superBuiltUpArea: string;
  coveredArea: string;
  carpetArea: string;
  front: string;
  images?: string | null;
  videos?: string | null;
  threeDModels?: string | null;
  floorPlan?: string | null;
  vr?: string | null;
  walkthrough?: string | null;
  UnitSpecification?: string | null;
  unitConfigs: UnitConfig[];
}

export interface UnitConfig {
  id: string;
  category: string;
  type: string;
  config: {
    brand: string;
    model: string;
  };
  icon: string;
  description: string;
  tag: string;
  files: any[];
}

export interface PopularPlace {
  id: number;
  name: string;
  googlePlaceId: string;
  address: string;
  latitude: string;
  longitude: string;
  rating: string;
  types: string[];
  city: string;
  state: string;
  isActive: boolean;
}

export interface Quotation {
  id: string;
  quotationNumber: string;
  title: string;
  description: string;
  type: string;
  baseAmount: string;
  taxAmount: string;
  discountAmount: string;
  totalAmount: string;
  status: string;
  validFrom: string;
  validUntil: string;
  expressionOfInterest: ExpressionOfInterest;
}

export interface ExpressionOfInterest {
  id: string;
  status: string;
  priority: string;
  interestedAmount: string;
  message: string;
  contactPreference: string;
  preferredContactTime: string;
  expectedDecisionDate: string;
  budgetRange: {
    max: number;
    min: number;
  };
  requirements: Record<string, any>;
  referenceNumber: string;
}
