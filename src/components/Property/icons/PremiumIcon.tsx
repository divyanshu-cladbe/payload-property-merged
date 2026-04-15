import React, { useId } from "react";

interface PremiumIconProps extends React.SVGProps<SVGSVGElement> {}

export const PremiumIcon: React.FC<PremiumIconProps> = ({
  width = 50,
  height = 56,
  ...props
}) => {
  const id = useId();
  <>
    <svg
      width="47"
      height="58"
      viewBox="0 0 47 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    ></svg>
  </>;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 50 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_d_4153_15529)">
        <path
          d="M13.9108 10.6479C16.467 7.66548 19.9118 5.99555 23.4997 5.99952C27.0931 5.99952 30.5425 7.66851 33.0886 10.6479C35.3943 13.3423 36.5953 16.3585 36.9128 19.491C37.2286 22.5964 36.664 25.7134 35.5873 28.6365C33.4503 34.4518 29.2023 39.7399 25.1279 43.1806C24.653 43.5831 24.0836 43.7995 23.4997 43.7995C22.9158 43.7995 22.3465 43.5831 21.8715 43.1806C17.7971 39.7399 13.5491 34.4499 11.4104 28.6365C10.3354 25.7134 9.77245 22.5964 10.0866 19.4891C10.4041 16.3585 11.6052 13.3442 13.9108 10.6479ZM18.9998 21.0224C18.9998 19.6086 19.4739 18.2527 20.3178 17.253C21.1617 16.2533 22.3062 15.6917 23.4997 15.6917C24.6932 15.6917 25.8377 16.2533 26.6816 17.253C27.5255 18.2527 27.9996 19.6086 27.9996 21.0224C27.9996 22.4362 27.5255 23.792 26.6816 24.7917C25.8377 25.7914 24.6932 26.3531 23.4997 26.3531C22.3062 26.3531 21.1617 25.7914 20.3178 24.7917C19.4739 23.792 18.9998 22.4362 18.9998 21.0224Z"
          fill="#FEFAFA"
        />
      </g>
      <path
        d="M30 13L26.6667 16.3333L24 13L21.3333 16.3333L18 13V21.6667H30V13ZM19.3333 25.6667H28.6667C29.0203 25.6667 29.3594 25.5262 29.6095 25.2761C29.8595 25.0261 30 24.687 30 24.3333V23H18V24.3333C18 24.687 18.1405 25.0261 18.3905 25.2761C18.6406 25.5262 18.9797 25.6667 19.3333 25.6667Z"
        fill="#C59839"
      />
      <circle
        cx="23.5"
        cy="19.5"
        r="11.0901"
        fill="#C59839"
        fill-opacity="0.15"
        stroke="white"
        stroke-width="0.819706"
      />
      <defs>
        <filter
          id="filter0_d_4153_15529"
          x="0"
          y="-0.000488281"
          width="47"
          height="57.7998"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4153_15529"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_4153_15529"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
