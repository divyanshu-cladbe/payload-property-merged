import { useReducer, useRef, useCallback } from "react";

export type BottomSheetState = {
  isOpen: boolean;
  triggerSource: "property" | "user" | "initial";
};

export type BottomSheetAction =
  | "open_from_property"
  | "close_from_property"
  | "open_from_user"
  | "close_from_user"
  | "toggle";

const initialState: BottomSheetState = {
  isOpen: false,
  triggerSource: "initial",
};

function bottomSheetReducer(
  state: BottomSheetState,
  action: BottomSheetAction
): BottomSheetState {
  switch (action) {
    case "open_from_property":
      return {
        isOpen: true,
        triggerSource: "property",
      };
    case "close_from_property":
      return {
        isOpen: false,
        triggerSource: "property",
      };
    case "open_from_user":
      return {
        isOpen: true,
        triggerSource: "user",
      };
    case "close_from_user":
      return {
        isOpen: false,
        triggerSource: "user",
      };
    case "toggle":
      return {
        isOpen: !state.isOpen,
        triggerSource: state.isOpen ? "user" : "user",
      };
    default:
      return state;
  }
}

export const useBottomSheet = () => {
  const [state, dispatch] = useReducer(bottomSheetReducer, initialState);
  const selectedItemRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  const scrollToSelectedItem = useCallback(() => {
    if (selectedItemRef.current && containerRef.current) {
      const selectedElement = selectedItemRef.current;
      const container = containerRef.current;

      const offsetLeft = selectedElement.offsetLeft;
      const elementWidth = selectedElement.offsetWidth;
      const containerWidth = container.offsetWidth;

      const scrollLeft = offsetLeft - containerWidth / 2 + elementWidth / 2;

      container.scrollTo({
        left: Math.max(0, scrollLeft),
        behavior: "smooth",
      });
    }
  }, []);

  const openFromProperty = useCallback(() => {
    dispatch("open_from_property");
    // Defer scrolling to allow DOM to update
    setTimeout(scrollToSelectedItem, 0);
  }, [scrollToSelectedItem]);

  const closeFromProperty = useCallback(() => {
    dispatch("close_from_property");
  }, []);

  const openFromUser = useCallback(() => {
    dispatch("open_from_user");
  }, []);

  const closeFromUser = useCallback(() => {
    dispatch("close_from_user");
  }, []);

  const toggle = useCallback(() => {
    dispatch("toggle");
    if (!state.isOpen) {
      setTimeout(scrollToSelectedItem, 0);
    }
  }, [state.isOpen, scrollToSelectedItem]);

  return {
    // State
    isOpen: state.isOpen,
    triggerSource: state.triggerSource,

    // Refs for scroll management
    selectedItemRef,
    containerRef,

    // Actions
    openFromProperty,
    closeFromProperty,
    openFromUser,
    closeFromUser,
    toggle,

    // Utilities
    scrollToSelectedItem,
  };
};
