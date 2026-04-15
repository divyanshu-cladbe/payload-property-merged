import React from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { MapPin } from "lucide-react";

interface MobileMapViewProps {
  isMobile: boolean;
}

export const MobileMapView: React.FC<MobileMapViewProps> = ({ isMobile }) => {
  return isMobile ? (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="w-full mt-4">
            <MapPin className="w-4 h-4 mr-2" />
            View on Map
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh]">
          <div className="h-full">{/* Add your map component here */}</div>
        </SheetContent>
      </Sheet>
    </div>
  ) : null;
};
