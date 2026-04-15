import { useMemo } from "react";
import { PROPERTY_COLORS } from "@/constants/property-ui-constants";

// Common style patterns
export const useStyles = () => {
  return useMemo(
    () => ({
      // Text colors
      primaryText: { color: PROPERTY_COLORS.primary },
      secondaryText: { color: PROPERTY_COLORS.secondary },
      mutedText: { color: PROPERTY_COLORS.muted },
      darkText: { color: PROPERTY_COLORS.dark },

      // Background colors
      primaryBg: { backgroundColor: PROPERTY_COLORS.primary },
      backgroundLight: { backgroundColor: PROPERTY_COLORS.backgroundLight },
      backgroundSoft: { backgroundColor: PROPERTY_COLORS.backgroundSoft },

      // Border styles
      primaryBorder: { borderColor: PROPERTY_COLORS.primary },
      mutedBorder: { borderColor: PROPERTY_COLORS.border },

      // Common combinations
      primaryButton: {
        backgroundColor: PROPERTY_COLORS.primary,
        color: PROPERTY_COLORS.white,
      },
      outlineButton: {
        borderColor: PROPERTY_COLORS.primary,
        color: PROPERTY_COLORS.primary,
      },

      // Layout styles
      centerFlex: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },

      // Shadow styles
      cardShadow: {
        boxShadow: `0 1px 3px 0 ${PROPERTY_COLORS.shadow}`,
      },
    }),
    []
  );
};

// Hook for dynamic styles based on props
export const useDynamicStyles = <T extends Record<string, any>>(
  props: T,
  styleMap: (props: T) => Record<string, React.CSSProperties>
) => {
  return useMemo(() => styleMap(props), [props, styleMap]);
};

// Hook for responsive styles
export const useResponsiveStyles = () => {
  return useMemo(
    () => ({
      mobileHidden: {
        display: "none",
        "@media (min-width: 768px)": {
          display: "block",
        },
      },
      desktopHidden: {
        display: "block",
        "@media (min-width: 768px)": {
          display: "none",
        },
      },
    }),
    []
  );
};

// Hook for theme-based styles
export const useThemeStyles = (theme: "light" | "dark" = "light") => {
  return useMemo(() => {
    const lightTheme = {
      background: PROPERTY_COLORS.white,
      text: PROPERTY_COLORS.textPrimary,
      border: PROPERTY_COLORS.border,
    };

    const darkTheme = {
      background: PROPERTY_COLORS.secondary,
      text: PROPERTY_COLORS.white,
      border: PROPERTY_COLORS.mutedLight,
    };

    return theme === "light" ? lightTheme : darkTheme;
  }, [theme]);
};

// Hook for animation styles
export const useAnimationStyles = () => {
  return useMemo(
    () => ({
      fadeIn: {
        opacity: 0,
        animation: "fadeIn 0.3s ease-in-out forwards",
      },
      slideIn: {
        transform: "translateX(-100%)",
        animation: "slideIn 0.3s ease-out forwards",
      },
      scaleIn: {
        transform: "scale(0.9)",
        animation: "scaleIn 0.2s ease-out forwards",
      },
    }),
    []
  );
};
