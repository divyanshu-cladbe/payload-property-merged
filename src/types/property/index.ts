// types/property/index.ts

export type {
  Property,
  PropertyBuilder,
  PropertyAmenity,
  PropertyUnitType,
  UnitSpecifications,
  PropertyMedia,
  PropertyDistance,
  Dimensions,
  FloorPlan,
  LegalClearance,
} from "./base";

export type {
  Coordinates,
  Location,
  PropertyLocation,
  PropertyPrice,
} from "./common";

export {
  PropertySegments,
  PropertyTypes,
  PossessionStatuses,
  PropertyStatuses,
  SortOptions,
  type PropertySegment,
  type PropertyType,
  type PossessionStatus,
  type PropertyStatus,
  type SortOption,
} from "./enums";

export type { PropertyFilters, AreaOfInterest } from "./filter";

export type { PropertyState, LocationState, UIState } from "./state";

// Type Guards
import {
  PropertyTypes,
  PossessionStatuses,
  PropertyStatuses,
  SortOptions,
} from "./enums";
import type {
  PropertyType,
  PossessionStatus,
  PropertyStatus,
  SortOption,
} from "./enums";

export const isValidPropertyType = (type: string): type is PropertyType => {
  return Object.values(PropertyTypes).includes(type as PropertyType);
};

export const isValidPossessionStatus = (
  status: string
): status is PossessionStatus => {
  return Object.values(PossessionStatuses).includes(status as PossessionStatus);
};

export const isValidPropertyStatus = (
  status: string
): status is PropertyStatus => {
  return Object.values(PropertyStatuses).includes(status as PropertyStatus);
};

export const isValidSortOption = (sort: string): sort is SortOption => {
  return Object.values(SortOptions).includes(sort as SortOption);
};
