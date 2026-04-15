export type DeviceType = "mobile" | "tablet" | "desktop";

//INFO: Device detection utility for responsive property loading
export const deviceDetector = {
  //INFO: Detect current device type based on screen size and user agent
  detectDevice(): DeviceType {
    //INFO: Server-side rendering check
    if (typeof window === "undefined") {
      return "desktop"; // Default for SSR
    }

    //INFO: Check screen width first
    const screenWidth = window.innerWidth;

    //INFO: Mobile: < 768px
    if (screenWidth < 768) {
      return "mobile";
    }

    //INFO: Tablet: 768px - 1024px
    if (screenWidth >= 768 && screenWidth <= 1024) {
      return "tablet";
    }

    //INFO: Desktop: > 1024px
    return "desktop";
  },

  //INFO: Check if current device is mobile
  isMobile(): boolean {
    return this.detectDevice() === "mobile";
  },

  //INFO: Check if current device is tablet
  isTablet(): boolean {
    return this.detectDevice() === "tablet";
  },

  //INFO: Check if current device is desktop
  isDesktop(): boolean {
    return this.detectDevice() === "desktop";
  },

  //INFO: Get device-specific configuration for property loading
  getDeviceConfig(deviceType?: DeviceType) {
    const device = deviceType || this.detectDevice();

    switch (device) {
      case "mobile":
        return {
          defaultPageSize: 15,
          maxPageSize: 25,
          includeFullData: false,
          optimizeImages: true,
        };
      case "tablet":
        return {
          defaultPageSize: 25,
          maxPageSize: 50,
          includeFullData: true,
          optimizeImages: true,
        };
      case "desktop":
      default:
        return {
          defaultPageSize: 40,
          maxPageSize: 100,
          includeFullData: true,
          optimizeImages: false,
        };
    }
  },
};
