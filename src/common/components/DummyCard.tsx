import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CardComponent = ({
  image,
  className,
}: {
  image: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "shadow-xl rounded-lg lg:rounded-3xl overflow-hidden bg-white w-[140px] h-[165px] lg:w-[200px] lg:h-[240px] xl:w-[300px] xl:h-[370px]",
        className,
      )}
    >
      <div className="relative h-20 lg:h-24 xl:h-44 w-full">
        <Image src={image} alt="card-image" fill className="object-cover" />
      </div>
      <div className="bg-white flex gap-1 lg:gap-2 flex-col p-3 xl:p-4">
        <div className="h-[4px] lg:h-2 w-24 lg:w-28 xl:w-32 bg-[#D9D9D9] rounded-xl"></div>
        <div className="h-[4px] lg:h-2 w-12 lg:w-14 xl:w-16 bg-[#D9D9D9] rounded-xl"></div>
        <div className="h-[4px] lg:h-2 w-28 lg:w-32 xl:w-36 bg-[#D9D9D9] rounded-xl"></div>
        <div className="h-[4px] lg:h-2 w-8 lg:w-9 xl:w-10 bg-[#D9D9D9] rounded-xl"></div>
      </div>
    </div>
  );
};
