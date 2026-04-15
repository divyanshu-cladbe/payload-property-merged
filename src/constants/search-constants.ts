import {
  Home,
  Building,
  MapPin,
  Building2,
  Crown,
  Store,
  Warehouse,
  Factory,
  Coffee,
} from "lucide-react";
import { PropertyType } from "@/types/property";

export const PropertyTypeIcons: Record<PropertyType, React.ElementType> = {
  Apartment: Building2,
  Villa: Home,
  // "Independent House": Home,
  Plot: MapPin,
  // Penthouse: Crown,
  // "Office Space": Building,
  // Retail: Store,
  // Warehouse: Warehouse,
  // Industrial: Factory,
  // "Co-working Space": Coffee,
  // "Commercial REIT": Building,
  // "Residential REIT": Building2,
};
