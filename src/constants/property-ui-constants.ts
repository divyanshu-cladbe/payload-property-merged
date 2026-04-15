export const PROPERTY_COLORS = {
  // Brand colors
  primary: "#BB2828",
  primaryHover: "#A01F1F", // Darker shade for hover states
  secondary: "#404040",
  muted: "#A7A7A7",
  mutedLight: "#7D7D7D",
  success: "#235920",
  dark: "#834748",
  white: "#FFFFFF",

  // Background colors
  background: "#F9F9F9",
  backgroundLight: "#F8F8F8",
  backgroundSoft: "#F9F6F6",

  // State colors
  error: "#DC2626",
  warning: "#F59E0B",
  info: "#3B82F6",

  // UI element colors
  indicator: "#BB2828", // For carousel indicators
  border: "#E5E7EB",
  borderLight: "#F3F4F6",
  shadow: "rgba(0, 0, 0, 0.1)",

  // Text colors
  textPrimary: "#111827",
  textSecondary: "#6B7280",
  textMuted: "#9CA3AF",
  textLight: "#D1D5DB",
} as const;

export const PROPERTY_IMAGES = {
  samples: [
    "https://images.pexels.com/photos/1662159/pexels-photo-1662159.jpeg",
    "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg",
    "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
    "https://images.pexels.com/photos/1650904/pexels-photo-1650904.jpeg",
  ] as string[],
  defaultBuilder: "/images/sample-property/builder1.png",
  tickMark: "/icons/tick-mark.png",
};

export const PROPERTY_DEFAULTS = {
  emiText: "EMI from 50k",
  authenticBadgeText: "Authentic",
  boostedBadgeText: "BOOSTED",
  pricePrefix: "₹",
} as const;

export const PROPERTY_BOOST_STYLES = {
  premium: "bg-gradient-to-r from-yellow-500 to-yellow-600",
  featured: "bg-gradient-to-r from-blue-500 to-blue-600",
  sponsored: "bg-gradient-to-r from-purple-500 to-purple-600",
  default: "bg-gradient-to-r from-orange-500 to-orange-600",
} as const;

export const PROPERTY_RESPONSIVE_STYLES = {
  text: {
    title: {
      mobile: "text-base",
      desktop: "text-xl",
    },
    subtitle: {
      mobile: "text-[10px]",
      desktop: "text-sm",
    },
    price: {
      mobile: "text-lg",
      desktop: "text-xl",
    },
  },
  spacing: {
    card: {
      mobile: "p-2",
      desktop: "p-3",
    },
  },
} as const;

export const PROPERTY_GRID_CONFIG = {
  listOnly: {
    mobile: { columns: 1, gap: "1rem", padding: "1rem" },
    tablet: { columns: 2, gap: "1rem", padding: "1rem" },
    laptop: { columns: 2, gap: "1.25rem", padding: "1.25rem" },
    desktop: { columns: 3, gap: "1.25rem", padding: "1.25rem" },
    largeScreen: { columns: 4, gap: "1.5rem", padding: "1.5rem" },
  },
  withMap: {
    mobile: { columns: 1, gap: "0.75rem", padding: "0.75rem" },
    tablet: { columns: 1, gap: "0.75rem", padding: "0.75rem" },
    laptop: { columns: 2, gap: "0.75rem", padding: "0.75rem" },
    desktop: { columns: 2, gap: "0.75rem", padding: "0.75rem" },
    largeScreen: { columns: 2, gap: "0.75rem", padding: "0.75rem" },
  },
} as const;

export const PROPERTY_CARD_CONSTRAINTS = {
  withMap: { maxWidth: "320px" },
  listOnly: { maxWidth: "400px" },
} as const;

export const CONTAINER_MAX_WIDTHS = {
  mobile: "100%",
  tablet: "100%",
  laptop: "1024px",
  desktop: "1440px",
  largeScreen: "1920px",
} as const;

export const BADGE_CONFIG = {
  value: {
    label: "VALUE",
    borderGradient: "linear-gradient(to right, #E76767, #F1906D)",
    textColor: "#000",
    fontClass: "font-normal tracking-wide font-['Days-One']",
  },
  budget: {
    label: "BUDGET",
    borderGradient: "linear-gradient(to right, #5ACF66, #D8CE72)",
    textColor: "#000",
    fontClass: "font-bold tracking-normal font-['Play']",
  },
  lux: {
    label: "LUX",
    borderGradient: "linear-gradient(to right, #E6CF23, #746C2B,#E6CF23)",
    textColor: "#000",
    fontClass: "font-medium tracking-widest italic",
  },
} as const;

export type BadgeType = keyof typeof BADGE_CONFIG;

export const BADGE_TOOLTIP_CONTENT = {
  lux: {
    title: "Lux Selections",
    subtitle: "Handpicked Luxury Properties",
    features: [
      {
        text: "Exclusive Handpicked",
        icon: "Building2",
      },
      {
        text: "Extraordinary Signature",
        icon: "Gem",
      },
      {
        text: "Never before offers & deals",
        icon: "Tag",
      },
    ],
  },
  value: {
    title: "Value For Money",
    subtitle: "Best Value Properties",
    features: [
      {
        text: "Curated for best price",
        icon: "Building2",
      },
      {
        text: "Essential Amenities",
        icon: "Gem",
      },
      {
        text: "Great deals and discounts",
        icon: "Tag",
      },
    ],
  },
  budget: {
    title: "Budget Friendly",
    subtitle: "Affordable Properties",
    features: [
      {
        text: "Pocket-friendly options",
        icon: "Building2",
      },
      {
        text: "Clean and comfortable",
        icon: "Gem",
      },
      {
        text: "Budget-conscious deals",
        icon: "Tag",
      },
    ],
  },
} as const;