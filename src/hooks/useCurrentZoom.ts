// hooks/useCurrentZoom.ts
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectCurrentZoom } from "@/store/slices/propertySlice";
import { useAppDispatch } from "./useAppDispatch";

export const useCurrentZoom = () => {

  return useAppSelector(selectCurrentZoom);
};