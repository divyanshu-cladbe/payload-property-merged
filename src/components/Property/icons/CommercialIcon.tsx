import React, { useId } from "react";

interface CommercialIconProps extends React.SVGProps<SVGSVGElement> {}

export const CommercialIcon: React.FC<CommercialIconProps> = ({
  width = 50,
  height = 56,
  ...props
}) => {
  const id = useId();

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 50 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter={`url(#${id}-filter0_d)`}>
        <path
          d="M12.2778 5.29559C15.7276 1.89793 20.3766 -0.00451874 25.2186 8.05999e-06C30.0681 8.05999e-06 34.7233 1.90138 38.1595 5.29559C41.271 8.36517 42.8919 11.8013 43.3203 15.37C43.7465 18.9078 42.9847 22.4588 41.5316 25.7889C38.6475 32.4139 32.9147 38.4383 27.4159 42.358C26.775 42.8166 26.0067 43.0631 25.2186 43.0631C24.4306 43.0631 23.6622 42.8166 23.0213 42.358C17.5226 38.4383 11.7897 32.4117 8.90345 25.7889C7.45258 22.4588 6.69291 18.9078 7.11691 15.3678C7.54533 11.8013 9.16624 8.36738 12.2778 5.29559ZM19.1457 17.1146C19.1457 15.504 19.7855 13.9593 20.9244 12.8204C22.0633 11.6815 23.608 11.0417 25.2186 11.0417C26.8293 11.0417 28.3739 11.6815 29.5128 12.8204C30.6517 13.9593 31.2915 15.504 31.2915 17.1146C31.2915 18.7252 30.6517 20.2699 29.5128 21.4088C28.3739 22.5477 26.8293 23.1875 25.2186 23.1875C23.608 23.1875 22.0633 22.5477 20.9244 21.4088C19.7855 20.2699 19.1457 18.7252 19.1457 17.1146Z"
          fill={`url(#${id}-paint0_linear)`}
        />
      </g>
      <circle
        cx="25.2169"
        cy="18.4122"
        r="13.5294"
        fill="#FFA9A9"
        fillOpacity="0.2"
        stroke="white"
      />
      <path
        d="M32.6518 16.4307H18.7852C18.8784 14.9555 19.2399 13.5096 19.8518 12.1641H31.5852C32.1971 13.5096 32.5586 14.9555 32.6518 16.4307ZM20.9185 17.4974H30.5185V23.8974H29.4518V18.5641H26.2518V23.8974H20.9185V17.4974ZM21.9852 20.6974H25.1852V18.5641H21.9852V20.6974Z"
        fill="white"
      />
      <defs>
        <filter
          id={`url(#${id}-filter0_d)`}
          x="0.764706"
          y="0"
          width="48.9081"
          height="55.5331"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="6.23529" />
          <feGaussianBlur stdDeviation="3.11765" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <linearGradient
          id={`paint0_linear_${id}`}
          x1="25.219"
          y1="0"
          x2="25.219"
          y2="43.0631"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#51E972" />
          <stop offset="1" stopColor="#2D8368" />
        </linearGradient>
      </defs>
    </svg>
  );
};
