import React from "react";
import Image from "next/image";

export const LocationPickerHeader: React.FC = () => {
  return (
    <>
      {/* Logo - Only on Desktop */}
      <div className="absolute top-0 left-0 hidden sm:block">
        <Image
          src="/images/LocationPickerLogo.png"
          alt="Property.new"
          width={120}
          height={96}
          className="object-contain"
          priority
        />
      </div>

      {/* Header Text */}
      <div className="text-center space-y-2">
        <h1 className="text-base md:text-xl xl:text-2xl font-bold   text-black">
          Tell Us Your Dream City. We'll Find Your Home.
        </h1>
        <p className="text-[#656565] font-medium   text-sm xl:text-base">
          Please choose the city in which you are looking for
        </p>
      </div>
    </>
  );
};
