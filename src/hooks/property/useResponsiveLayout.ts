// // hooks/useResponsiveLayout.ts


// import { useMediaQuery } from "../use-media-query";

// export const useResponsiveLayout = (currentLocation: Location | null) => {
//   const isMobile = !useMediaQuery("(min-width: 768px)");
//   const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
//   const isLaptop = useMediaQuery("(min-width: 1024px) and (max-width: 1800px)");
//   const isDesktop = useMediaQuery("(min-width: 1700px)");

//   const mapCenter = currentLocation ? {
//     lat: getCurrentLocation.lat,
//     lng: currentLocation.lng,
//     name: currentLocation.address
//   } : {
//     lat: 28.6139,
//     lng: 77.2090,
//     name: "New Delhi Center"
//   };

//   const layout = {
//     mapWidth: isMobile ? '100%' : isTablet ? '60%' : isLaptop ? '60%' : '70%',
//     listWidth: isMobile ? '100%' : isTablet ? '40%' : isLaptop ? '40%' : '30%',
//     minWidth: {
//       map: isDesktop ? '900px' : isLaptop ? '600px' : isTablet ? '500px' : '100%',
//       list: isDesktop ? '380px' : isLaptop ? '450px' : isTablet ? '320px' : '100%'
//     },
//     padding: isDesktop ? 'p-6' : isLaptop ? 'p-5' : isTablet ? 'p-4' : 'p-3'
//   };

//   return {
//     isMobile,
//     isTablet,
//     isLaptop,
//     isDesktop,
//     layout,
//     mapCenter
//   };
// };