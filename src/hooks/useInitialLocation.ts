"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import {
  selectLocation,
  setLocation,
  setLocationModalOpen,
} from "@/store/slices/locationSlice";

export const useInitialLocation = () => {
  const dispatch = useAppDispatch();
  const { currentLocation } = useAppSelector(selectLocation);

  useEffect(() => {
    // Check if location exists in localStorage
    const storedLocation = localStorage.getItem("userLocation");

    if (storedLocation) {
      dispatch(setLocation(JSON.parse(storedLocation)));
    } else if (!currentLocation) {
      // If no location is stored or selected, open the location picker
      dispatch(setLocationModalOpen(true));
    }
  }, []); // Run only on mount
};
