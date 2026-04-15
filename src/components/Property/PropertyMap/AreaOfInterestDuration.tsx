type AreaOfInterestDurationProps = {
  duration: string;
  letter: string;
  distance: string;
};

export const AreaOfInterestDuration = ({
  duration,
  letter,
  distance,
}: AreaOfInterestDurationProps) => {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-full shadow-md">
      {/* Letter Badge */}
      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#E57373] text-white text-sm font-semibold">
        {letter}
      </div>

      {/* Duration and Distance */}
      <div className="flex flex-col leading-none">
        <span className="text-sm font-semibold text-gray-900">{duration}</span>
        <span className="text-xs text-gray-500">{distance}</span>
      </div>
    </div>
  );
};
