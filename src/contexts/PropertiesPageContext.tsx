"use client";

import React, { createContext, useContext, ReactNode, useMemo } from "react";
import type {
    Property,
    PropertyFilters,
    Location,
    AreaOfInterest,
} from "@/types/property";

// Data Context - Rarely changes (properties, loading state, errors)
interface PropertiesDataContextValue {
    properties: Property[];
    isLoading: boolean;
    error: string | null;
}

// UI State Context - Changes frequently (selection, filters, search)
interface PropertiesUIContextValue {
    filters: PropertyFilters;
    searchQuery: string;
    selectedProperty: Property | null;
    showMap: boolean;
    areasOfInterest: AreaOfInterest[];
    currentLocation: Location | null;
}

// Actions Context - Stable functions (never changes)
interface PropertiesActionsContextValue {
    handleFilterChange: (newFilters: Partial<PropertyFilters>) => void;
    handleSearch: (e: React.FormEvent) => void;
    handleSearchQueryChange: (value: string) => void;
    handlePropertySelect: (property: Property | null) => void;
    handleMapToggle: (checked: boolean) => void;
    handleAreasChange: (areas: AreaOfInterest[]) => void;
    handleRemoveAreaOfInterest: () => void;
    handlePropertyDeselect: () => void;
    clearAllFilters: () => void;
}

// Combined type for backward compatibility
export interface PropertiesPageContextValue
    extends PropertiesDataContextValue,
        PropertiesUIContextValue,
        PropertiesActionsContextValue {}

// ============================================================================
// CONTEXT CREATION
// ============================================================================

const PropertiesDataContext = createContext<PropertiesDataContextValue | undefined>(undefined);
const PropertiesUIContext = createContext<PropertiesUIContextValue | undefined>(undefined);
const PropertiesActionsContext = createContext<PropertiesActionsContextValue | undefined>(undefined);

// ============================================================================
// PROVIDER COMPONENT
// ============================================================================

interface PropertiesPageProviderProps {
    children: ReactNode;
    value: PropertiesPageContextValue;
}

export const PropertiesPageProvider: React.FC<PropertiesPageProviderProps> = ({
    children,
    value,
}) => {

    // Data context - only properties, loading, error
    const dataValue = useMemo(
        () => ({
            properties: value.properties,
            isLoading: value.isLoading,
            error: value.error,
        }),
        [value.properties, value.isLoading, value.error]
    );

    // UI State context - frequently changing UI state
    const uiValue = useMemo(
        () => ({
            filters: value.filters,
            searchQuery: value.searchQuery,
            selectedProperty: value.selectedProperty,
            showMap: value.showMap,
            areasOfInterest: value.areasOfInterest,
            currentLocation: value.currentLocation,
        }),
        [
            value.filters,
            value.searchQuery,
            value.selectedProperty,
            value.showMap,
            value.areasOfInterest,
            value.currentLocation,
        ]
    );

    // Actions context - stable functions (should never change if properly memoized)
    const actionsValue = useMemo(
        () => ({
            handleFilterChange: value.handleFilterChange,
            handleSearch: value.handleSearch,
            handleSearchQueryChange: value.handleSearchQueryChange,
            handlePropertySelect: value.handlePropertySelect,
            handleMapToggle: value.handleMapToggle,
            handleAreasChange: value.handleAreasChange,
            handleRemoveAreaOfInterest: value.handleRemoveAreaOfInterest,
            handlePropertyDeselect: value.handlePropertyDeselect,
            clearAllFilters: value.clearAllFilters,
        }),
        [
            value.handleFilterChange,
            value.handleSearch,
            value.handleSearchQueryChange,
            value.handlePropertySelect,
            value.handleMapToggle,
            value.handleAreasChange,
            value.handleRemoveAreaOfInterest,
            value.handlePropertyDeselect,
            value.clearAllFilters,
        ]
    );

    return (
        <PropertiesDataContext.Provider value={dataValue}>
            <PropertiesUIContext.Provider value={uiValue}>
                <PropertiesActionsContext.Provider value={actionsValue}>
                    {children}
                </PropertiesActionsContext.Provider>
            </PropertiesUIContext.Provider>
        </PropertiesDataContext.Provider>
    );
};

// ============================================================================
// HOOKS - Granular access to specific context slices
// ============================================================================

/**
 * Hook to access properties data (properties, loading, error)
 * Use this when you only need data state - prevents re-renders on UI changes
 */
export const usePropertiesData = (): PropertiesDataContextValue => {
    const context = useContext(PropertiesDataContext);
    if (context === undefined) {
        throw new Error("usePropertiesData must be used within a PropertiesPageProvider");
    }
    return context;
};

/**
 * Hook to access UI state (filters, search, selection, etc.)
 * Use this when you need UI state - prevents re-renders on data changes
 */
export const usePropertiesUI = (): PropertiesUIContextValue => {
    const context = useContext(PropertiesUIContext);
    if (context === undefined) {
        throw new Error("usePropertiesUI must be used within a PropertiesPageProvider");
    }
    return context;
};

/**
 * Hook to access action handlers (all the handle* functions)
 * Use this when you only need handlers - never causes re-renders (stable)
 */
export const usePropertiesActions = (): PropertiesActionsContextValue => {
    const context = useContext(PropertiesActionsContext);
    if (context === undefined) {
        throw new Error("usePropertiesActions must be used within a PropertiesPageProvider");
    }
    return context;
};

/**
 * Combined hook - provides all context values
 * BACKWARD COMPATIBLE: Use this for easy migration
 * Note: This will re-render on ANY context change
 * Prefer using granular hooks (usePropertiesData, usePropertiesUI, usePropertiesActions)
 */
export const usePropertiesPage = (): PropertiesPageContextValue => {
    const data = usePropertiesData();
    const ui = usePropertiesUI();
    const actions = usePropertiesActions();

    return useMemo(
        () => ({
            ...data,
            ...ui,
            ...actions,
        }),
        [data, ui, actions]
    );
};

/**
 * Optional combined hook - returns undefined if not in provider
 * BACKWARD COMPATIBLE
 */
export const usePropertiesPageOptional = ():
    | PropertiesPageContextValue
    | undefined => {
    const data = useContext(PropertiesDataContext);
    const ui = useContext(PropertiesUIContext);
    const actions = useContext(PropertiesActionsContext);

    if (!data || !ui || !actions) {
        return undefined;
    }

    return useMemo(
        () => ({
            ...data,
            ...ui,
            ...actions,
        }),
        [data, ui, actions]
    );
};

// ============================================================================
// SELECTIVE HOOKS - Use only what you need for maximum performance
// ============================================================================

/**
 * Hook to get only properties array
 * Most optimized - only re-renders when properties change
 */
export const useProperties = (): Property[] => {
    const { properties } = usePropertiesData();
    return properties;
};

/**
 * Hook to get only loading state
 */
export const usePropertiesLoading = (): boolean => {
    const { isLoading } = usePropertiesData();
    return isLoading;
};

/**
 * Hook to get only selected property
 */
export const useSelectedProperty = (): Property | null => {
    const { selectedProperty } = usePropertiesUI();
    return selectedProperty;
};

/**
 * Hook to get only filters
 */
export const usePropertiesFilters = (): PropertyFilters => {
    const { filters } = usePropertiesUI();
    return filters;
};

/**
 * Hook to get only search query
 */
export const usePropertiesSearchQuery = (): string => {
    const { searchQuery } = usePropertiesUI();
    return searchQuery;
};
