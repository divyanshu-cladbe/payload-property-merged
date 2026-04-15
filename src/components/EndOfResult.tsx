import React from "react";

interface EndOfResultsProps {
  className?: string;
}

export const EndOfResults: React.FC<EndOfResultsProps> = ({
  className = "",
}) => {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <div className="w-full max-w-[783px] h-28 relative bg-white rounded-[20px] shadow-[0px_0px_12.364866256713867px_0px_rgba(0,0,0,0.15)] outline outline-1 outline-offset-[-1px] outline-rose-400 overflow-hidden mx-4">
        {/* Red rounded square with white info icon */}
        <div className="flex-shrink-0">
          <div className="w-[99px] h-[113px] bg-[#BB2828] rounded-lg rounded-r-none flex items-center justify-center">
            <svg
              width="52"
              height="52"
              viewBox="0 0 52 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25.9998 36.8332C26.6137 36.8332 27.1287 36.6252 27.5447 36.2092C27.9607 35.7932 28.1679 35.279 28.1665 34.6665V25.9999C28.1665 25.386 27.9585 24.8718 27.5425 24.4572C27.1265 24.0427 26.6123 23.8347 25.9998 23.8332C25.3874 23.8318 24.8732 24.0398 24.4572 24.4572C24.0412 24.8746 23.8332 25.3889 23.8332 25.9999V34.6665C23.8332 35.2804 24.0412 35.7954 24.4572 36.2114C24.8732 36.6274 25.3874 36.8346 25.9998 36.8332ZM25.9998 19.4999C26.6137 19.4999 27.1287 19.2919 27.5447 18.8759C27.9607 18.4599 28.1679 17.9456 28.1665 17.3332C28.1651 16.7208 27.9571 16.2065 27.5425 15.7905C27.1279 15.3745 26.6137 15.1665 25.9998 15.1665C25.3859 15.1665 24.8717 15.3745 24.4572 15.7905C24.0426 16.2065 23.8346 16.7208 23.8332 17.3332C23.8317 17.9456 24.0397 18.4606 24.4572 18.878C24.8746 19.2955 25.3888 19.5028 25.9998 19.4999ZM25.9998 47.4499C25.7471 47.4499 25.5123 47.4318 25.2957 47.3957C25.079 47.3596 24.8623 47.3054 24.6457 47.2332C19.7707 45.6082 15.8887 42.6016 12.9998 38.2134C10.1109 33.8251 8.6665 29.104 8.6665 24.0499V13.8124C8.6665 12.9096 8.92867 12.0971 9.453 11.3749C9.97734 10.6526 10.6541 10.129 11.4832 9.80404L24.4832 4.92904C24.9887 4.74848 25.4943 4.6582 25.9998 4.6582C26.5054 4.6582 27.0109 4.74848 27.5165 4.92904L40.5165 9.80404C41.3471 10.129 42.0245 10.6526 42.5488 11.3749C43.0732 12.0971 43.3346 12.9096 43.3332 13.8124V24.0499C43.3332 29.1054 41.8887 33.8273 38.9998 38.2155C36.1109 42.6038 32.229 45.6096 27.354 47.2332C27.1373 47.3054 26.9207 47.3596 26.704 47.3957C26.4873 47.4318 26.2526 47.4499 25.9998 47.4499Z"
                fill="white"
              />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="left-[118px] top-[19px] absolute justify-start text-[#404040] text-lg font-medium ">
          End of results.
        </div>
        <div className="left-[118px] top-[54px] absolute text-center justify-start text-zinc-500 text-xs font-semibold ">
          Please refine your search to explore more properties.
        </div>
      </div>
    </div>
  );
};

export default EndOfResults;
