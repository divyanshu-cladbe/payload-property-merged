import { useState, useEffect } from 'react';
import {
  updateFilters,
  selectProperty,
  setProperties
} from '@/store/slices/propertySlice';
import type { Property, PropertyFilters, AreaOfInterest } from '@/types/property';
import { useAppDispatch } from '../useAppDispatch';
import { useAppSelector } from '../useAppSelector';
import { getPropertiesAction } from '@/actions/properties';

export const usePropertyManager = () => {
  const dispatch = useAppDispatch();
  const {
    properties,
    filteredProperties,
    loading,
    error,
    filters,
    selectedProperty,
    apiResponse
  } = useAppSelector(state => state.properties);

  const [hoveredProperty, setHoveredProperty] = useState<Property | null>(null);
  const [areasOfInterest, setAreasOfInterest] = useState<AreaOfInterest[]>([]);

  useEffect(() => {
    // If not already populated, fetch properties directly from Payload Server Action
    const loadProperties = async () => {
      try {
        const docs = await getPropertiesAction();
        dispatch(setProperties(docs));
      } catch (err) {
        console.error("Failed to load properties to propertyManager", err);
      }
    };
    if (properties.length === 0) {
      loadProperties();
    }
  }, [dispatch, properties.length]);

  const handlePropertySelect = (property: Property | null) => {
    dispatch(selectProperty(property));
  };

  const handlePropertyHover = (property: Property | null) => {
    setHoveredProperty(property);
  };

  const handleAreasChange = (areas: AreaOfInterest[]) => {
    setAreasOfInterest(areas);
  };

  const handleFilterChange = (newFilters: Partial<PropertyFilters>) => {
    dispatch(updateFilters(newFilters));
  };

  return {
    properties,
    filteredProperties,
    loading,
    error,
    filters,
    selectedProperty,
    hoveredProperty,
    areasOfInterest,
    handlePropertySelect,
    handlePropertyHover,
    handleAreasChange,
    handleFilterChange,
  };
};