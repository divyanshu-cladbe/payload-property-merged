import { Property } from "@/types/property";
import { useMemo } from "react";

export function usePagination(currentPage: number, listOfProperty: Property[]) {
    const PROPERTIES_PER_PAGE = 10;

    const indexOfLastProperty = currentPage * PROPERTIES_PER_PAGE;
    const indexOfFirstProperty = indexOfLastProperty - PROPERTIES_PER_PAGE;

    const propertyList = useMemo(
        () => listOfProperty.slice(indexOfFirstProperty, indexOfLastProperty),
        [listOfProperty, indexOfFirstProperty, indexOfLastProperty]
    );
    const totalPage = Math.ceil(listOfProperty.length / PROPERTIES_PER_PAGE);

    return {
        propertyList,
        totalPage
    }
}