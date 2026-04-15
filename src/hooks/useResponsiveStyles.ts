import { useMediaQuery } from "./use-media-query";
import { PROPERTY_RESPONSIVE_STYLES } from "@/constants/property-ui-constants";

export const useResponsiveStyles = () => {
  const isMobile = !useMediaQuery("(min-width: 768px)");
  
  const getResponsiveStyle = (category: keyof typeof PROPERTY_RESPONSIVE_STYLES, subcategory: string) => {
    const styles = PROPERTY_RESPONSIVE_STYLES[category] as any;
    const styleSet = styles[subcategory];
    
    if (!styleSet) return '';
    
    return isMobile ? styleSet.mobile : styleSet.desktop;
  };

  const getResponsiveText = (type: 'title' | 'subtitle' | 'price') => {
    return getResponsiveStyle('text', type);
  };

  const getResponsiveSpacing = (type: 'card') => {
    return getResponsiveStyle('spacing', type);
  };

  return {
    isMobile,
    getResponsiveText,
    getResponsiveSpacing,
    getResponsiveStyle,
  };
};