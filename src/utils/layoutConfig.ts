import { useMediaQuery } from "@/hooks/use-media-query";

export const layoutConfig = {
  // Fixed widths for consistent card appearance
  listWidth: {
    mobile: "100%",
    tablet: "50%", // 680px - consistent minimum
    laptop: "50%", // 720px - slightly larger for laptops
    desktop: "50%", // 1000px - maximum for large screens
  },
  mapWidth: {
    mobile: "100%",
    tablet: "50%",
    laptop: "50%",
    desktop: "calc(100% - 50%)",
  },
  // Card constraints
  // cardMinWidth: {
  //   mobile: "100%",
  //   tablet: "42.5rem",
  //   laptop: "42.5rem",
  //   desktop: "62.5rem",
  // },
  cardConstraints: {
    minWidth: "42.5rem", // 680px - minimum card width
    maxWidth: "57.5rem", // 920px - maximum card width for larger screens
  },
  // Card-specific dimensions for consistent scaling
  cardDimensions: {
    mobile: {
      height: "auto", // Stack layout
      imageRatio: "aspect-[4/3]",
      padding: "p-2",
      gap: "gap-3",
    },
    tablet: {
      height: "h-68", // 16rem/256px - consistent base height
      imageRatio: "aspect-[4/3]",
      padding: "p-3",
      gap: "gap-4",
    },
    laptop: {
      height: "h-68", // 16rem/256px - same as tablet for consistency
      imageRatio: "aspect-[4/3]",
      padding: "p-3",
      gap: "gap-4",
    },
    desktop: {
      height: "h-68", // 17rem/272px - slightly larger for large screens
      imageRatio: "aspect-[4/3]",
      padding: "p-3",
      gap: "gap-4",
    },
  },
  // Grid spacing for different screens
  gridSpacing: {
    mobile: "gap-3",
    tablet: "gap-3",
    laptop: "gap-3", // Reduced from gap-4 to prevent overlap
    desktop: "gap-4", // Reduced from gap-5 to prevent overlap on desktop
  },
  padding: {
    mobile: "p-3",
    tablet: "p-4",
    laptop: "p-5",
    desktop: "p-6",
  },
};

export const useResponsiveLayout = () => {
  // Use rem-based breakpoints for better scaling support
  // CHANGED: Expanded isMobile to include tablet range (up to 1280px)
  const isMobile = !useMediaQuery("(min-width: 80rem)"); // < 1280px (includes tablet)

  // Kept for reference but effectively treated as mobile now
  const isTablet = useMediaQuery(
    "(min-width: 48rem) and (max-width: 79.9375rem)"
  ); // 768px - 1279px

  const isLaptop = useMediaQuery(
    "(min-width: 80rem) and (max-width: 119.9375rem)"
  ); // 1280px - 1919px
  const isDesktop = useMediaQuery("(min-width: 120rem)"); // 1920px+

  // Enhanced responsive value getter with viewport width consideration
  const getResponsiveValue = (config: Record<string, string>) => {
    if (isDesktop) return config.desktop;
    if (isLaptop) return config.laptop;
    // CHANGED: Tablet now uses mobile config
    // if (isTablet) return config.laptop; 
    return config.mobile;
  };

  // Get fixed list width for consistent appearance
  const getListWidth = () => {
    if (isDesktop) return layoutConfig.listWidth.desktop;
    if (isLaptop) return layoutConfig.listWidth.laptop;
    if (isTablet) return layoutConfig.listWidth.tablet;
    return layoutConfig.listWidth.mobile;
  };

  // Get card min and max width constraints
  const getCardMinWidth = () => layoutConfig.cardConstraints.minWidth;
  const getCardMaxWidth = () => layoutConfig.cardConstraints.maxWidth;

  // Get responsive card dimensions
  const getCardDimensions = () => {
    if (isDesktop) return layoutConfig.cardDimensions.desktop;
    if (isLaptop) return layoutConfig.cardDimensions.laptop;
    if (isTablet) return layoutConfig.cardDimensions.tablet;
    return layoutConfig.cardDimensions.mobile;
  };

  // Get responsive grid spacing
  const getGridSpacing = () => {
    if (isDesktop) return layoutConfig.gridSpacing.desktop;
    if (isLaptop) return layoutConfig.gridSpacing.laptop;
    if (isTablet) return layoutConfig.gridSpacing.tablet;
    return layoutConfig.gridSpacing.mobile;
  };

  // For tablet viewport, we want to use desktop layout behavior
  // CHANGED: Tablet should NOT use desktop layout anymore
  const shouldDesktopLayout = false;

  // Minimum width for tablet to enable horizontal scroll when content exceeds viewport
  const getMinContentWidth = () => {
    if (shouldDesktopLayout) return "80rem"; // 1280px in rem for better scaling
    return "auto";
  };

  // Get map width based on list width
  const getMapWidth = () => {
    if (isDesktop) return layoutConfig.mapWidth.desktop;
    if (isLaptop) return layoutConfig.mapWidth.laptop;
    if (isTablet) return layoutConfig.mapWidth.tablet;
    return layoutConfig.mapWidth.mobile;
  };

  // Viewport size detection for scaling issues
  const getViewportInfo = () => {
    if (typeof window !== "undefined") {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio || 1,
        // Detect potential scaling issues
        isScaled: window.devicePixelRatio !== 1,
      };
    }
    return { width: 0, height: 0, devicePixelRatio: 1, isScaled: false };
  };

  return {
    isMobile,
    isTablet,
    isLaptop,
    isDesktop,
    shouldDesktopLayout,
    getResponsiveValue,
    getMinContentWidth,
    getCardDimensions,
    getGridSpacing,
    getListWidth,
    getMapWidth,
    getViewportInfo,
    getCardMinWidth,
    getCardMaxWidth,
    layoutConfig, // Export config for direct access
  };
};
