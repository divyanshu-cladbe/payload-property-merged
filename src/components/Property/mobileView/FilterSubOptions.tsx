import { useState } from "react";
// import { ApartmentTypeEnum } from "./MobileViewFilters";
import { Check } from "lucide-react";

type FilterSubOptionsProps = {
  heading: string;
  listOfOptions: any[];
  currentlySelectedOptions: string;
  handleTypeBtnClick: (options: any) => void;
};

export const FilterSubOptions = ({
  heading,
  listOfOptions,
  currentlySelectedOptions,
  handleTypeBtnClick,
}: FilterSubOptionsProps) => {
  return (
    <div className="p-6 border-b-[1px] border-[#A7A7A7]">
      <p>{heading}</p>
      <div className="flex flex-wrap justify-center gap-2 mt-2">
        {listOfOptions.map((options) => {
          return (
            <button
              onClick={() => handleTypeBtnClick(options)}
              className={`font-light rounded-full py-2 min-w-[10px] ${
                currentlySelectedOptions === options
                  ? `text-white mt-1   bg-gradient-to-r from-[#BB2828] to-[#E25F5F] flex gap-2 px-4`
                  : `border-[1px] border-[#A7A7A7] px-6`
              }`}
            >
              {currentlySelectedOptions === options && <Check />}
              {options}
            </button>
          );
        })}
      </div>
    </div>
  );
};
