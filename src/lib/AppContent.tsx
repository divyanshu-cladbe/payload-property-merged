"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  setLocation,
  setLocationModalOpen,
} from "@/store/slices/locationSlice";

export function AppContent({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    //INFO: Check if location exists in localStorage
    const storedLocation = localStorage.getItem("userLocation");

    if (storedLocation) {
      dispatch(setLocation(JSON.parse(storedLocation)));
    } else {
      //INFO: If no location is stored, open the location picker on first visit
      dispatch(setLocationModalOpen(true));
    }
  }, []); // Run only on mount

  return <>{children}</>;
}
