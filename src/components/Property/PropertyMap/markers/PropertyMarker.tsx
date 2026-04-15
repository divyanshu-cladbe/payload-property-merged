import { AreaOfInterest, PropertyTypes } from "@/types/property";
import { PremiumIcon } from "../../icons/PremiumIcon";
import { ResidentialIcon } from "../../icons/ResidentialIcon";
import { CommercialIcon } from "../../icons/CommercialIcon";

type PropertyMarkerProp = {
  title: string;
  propertyType: string;
  selected?: boolean;
  hovered?: boolean;
  imageUrl?: string;
  areasOfInterest: AreaOfInterest[];
  isAnySelected?: boolean;
};

export const PropertyMarker = ({
  title,
  propertyType,
  selected = false,
  hovered = false,
  areasOfInterest,
  imageUrl,
  isAnySelected = false,
}: PropertyMarkerProp) => {
  let type;
  if (propertyType === PropertyTypes.VILLA) {
    type = "Premium";
  } else {
    type = "Residential";
  }

  // Determine if title should be visible
  const hasAreasOfInterest = areasOfInterest?.length > 0;

  let shouldShowTitle = false;

  // Show title if the marker is selected, hovered, or if no property is selected
  shouldShowTitle = (isAnySelected ? selected : true) || hovered;

  return (
    <div className="relative">
      {/* Icon - changes on hover */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {type === "Premium" && <PremiumIcon />}
        {type === "Residential" && (
          <ResidentialIcon
            selected={selected}
            hovered={hovered}
            imageUrl={imageUrl}
          />
        )}
        {type === "Commercial" && <CommercialIcon />}
      </div>

      {/* Property name label */}
      {shouldShowTitle && (
        <div
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 ml-2 p-4 py-1 border-white bg-white/70 backdrop-blur-2xl rounded-md shadow-lg transition-opacity duration-200`}
        >
          <span
            className={`text-xs sm:text-sm md:text-base font-medium text-black whitespace-nowrap text-clip overflow-hidden max-w-[10px]`}
          >
            {title}
          </span>
        </div>
      )}
    </div>
  );
};
