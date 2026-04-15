import React, { useId } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

interface ResidentialIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  selected?: boolean;
  hovered?: boolean;
  imageUrl?: string;
}

export const ResidentialIcon: React.FC<ResidentialIconProps> = ({
  width = 156,
  height = 156,
  selected = false,
  hovered = false,
  imageUrl,
  ...props
}) => {
  const id = useId();
  const patternId = `pattern_${id}`;
  const filterId = `filter_${id}`;
  const isDesktop = useMediaQuery("(min-width:768px)")

  // If hovered and has image, show PropertyImageMarker style
  if (hovered && imageUrl) {
    return (
      <svg
        width={71}
        height={80}
        viewBox="0 0 71 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{
          transition: 'all 0.8s ease-in-out',
        }}
      >
        <defs>
          {/* Filter for drop shadow */}
          <filter
            id={filterId}
            x={-0.555554}
            y={0.467449}
            width={73.1111}
            height={81.1111}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy={6.22222} />
            <feGaussianBlur stdDeviation={7.77778} />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend
              in2="BackgroundImageFix"
              result="effect1_dropShadow"
            />
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow"
              result="shape"
            />
          </filter>

          {/* Pattern with property image */}
          <pattern
            id={patternId}
            patternContentUnits="objectBoundingBox"
            width={1}
            height={1}
          >
            <image
              href={imageUrl}
              x="0"
              y="0"
              width="1"
              height="1"
              preserveAspectRatio="xMidYMid slice"
            />
          </pattern>
        </defs>

        <g filter={`url(#${filterId})`}>
          {/* White pin shape background */}
          <path
            d="M21.083 15.95A21.15 21.15 0 0136 9.8c5.59 0 10.956 2.208 14.917 6.15 3.586 3.564 5.455 7.553 5.948 11.697.492 4.107-.387 8.23-2.061 12.097-3.325 7.692-9.933 14.687-16.27 19.238a4.331 4.331 0 01-5.066 0c-6.338-4.551-12.946-11.548-16.273-19.238-1.672-3.867-2.548-7.99-2.06-12.1.495-4.14 2.363-8.128 5.95-11.695zM29 29.671c0-1.87.737-3.663 2.05-4.986A6.974 6.974 0 0136 22.621c1.856 0 3.636.743 4.95 2.065A7.077 7.077 0 0143 29.672c0 1.87-.738 3.664-2.05 4.986A6.974 6.974 0 0136 36.724a6.974 6.974 0 01-4.95-2.066A7.077 7.077 0 0129 29.672z"
            fill="#fff"
          />
        </g>

        {/* Circle with property image */}
        <circle cx={36} cy={31.5} r={18} fill={`url(#${patternId})`} />
      </svg>
    );
  }

  // Default ResidentialIcon
  return (
    <svg
      width={`${isDesktop ? "58" : "38"}`}
      height="63"
      viewBox="0 0 47 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transition: 'all 0.8s ease-in-out',
      }}
    >
      <g filter="url(#filter0_d_3985_34952)">
        <path
          d="M13.9108 10.6479C16.467 7.66548 19.9118 5.99555 23.4997 5.99952C27.0931 5.99952 30.5425 7.66851 33.0886 10.6479C35.3943 13.3423 36.5953 16.3585 36.9128 19.491C37.2286 22.5964 36.664 25.7134 35.5873 28.6365C33.4503 34.4518 29.2023 39.7399 25.1279 43.1806C24.653 43.5831 24.0836 43.7995 23.4997 43.7995C22.9158 43.7995 22.3465 43.5831 21.8715 43.1806C17.7971 39.7399 13.5491 34.4499 11.4104 28.6365C10.3354 25.7134 9.77245 22.5964 10.0866 19.4891C10.4041 16.3585 11.6052 13.3442 13.9108 10.6479ZM18.9998 21.0224C18.9998 19.6086 19.4739 18.2527 20.3178 17.253C21.1617 16.2533 22.3062 15.6917 23.4997 15.6917C24.6932 15.6917 25.8377 16.2533 26.6816 17.253C27.5255 18.2527 27.9996 19.6086 27.9996 21.0224C27.9996 22.4362 27.5255 23.792 26.6816 24.7917C25.8377 25.7914 24.6932 26.3531 23.4997 26.3531C22.3062 26.3531 21.1617 25.7914 20.3178 24.7917C19.4739 23.792 18.9998 22.4362 18.9998 21.0224Z"
          fill="#FEFAFA"
        />
        {selected && (
          <path
            d="M23.4997 5.99952C27.393 5.99952 31.092 7.81952 33.838 10.998C36.144 13.553 37.425 16.762 37.763 20.092L37.815 20.708C38.021 23.791 37.426 26.844 36.38 29.683C34.171 35.694 29.805 41.12 25.628 44.647C25.186 44.956 24.659 45.127 24.116 45.138C23.573 45.15 23.038 44.999 22.583 44.706V44.705C18.406 41.178 14.04 35.752 11.83 29.742C10.716 26.712 10.117 23.441 10.45 20.148L10.524 19.525C10.952 16.42 12.22 13.434 14.508 10.758H14.509C17.267 7.81852 20.969 5.99552 23.4997 5.99952Z"
            stroke="#BB2828"
            strokeWidth="2.5"
            fill="none"
          />
        )}
      </g>
      <circle
        cx="23.4986"
        cy="19.6431"
        r="10.0251"
        fill="#FFA9A9"
        fillOpacity="0.2"
        stroke="white"
        strokeWidth="0.740984"
      />
      <g clipPath="url(#clip0_3985_34952)">
        <path
          d="M18.2549 16.8909L23.3629 14.3369C23.4065 14.3151 23.4547 14.3037 23.5035 14.3037C23.5523 14.3037 23.6005 14.3151 23.6442 14.3369L28.7522 16.8909M27.7024 18.4654V22.6644C27.7024 22.9428 27.5918 23.2098 27.395 23.4066C27.1981 23.6035 26.9311 23.7141 26.6527 23.7141H20.3543C20.0759 23.7141 19.8089 23.6035 19.6121 23.4066C19.4152 23.2098 19.3046 22.9428 19.3046 22.6644V18.4654"
          stroke="#BB2828"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_3985_34952"
          x="0"
          y="-0.000488281"
          width="47"
          height="57.7998"
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
            result="effect1_dropShadow_3985_34952"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_3985_34952"
            result="shape"
          />
        </filter>
        <clipPath id="clip0_3985_34952">
          <rect
            width="12.5967"
            height="12.5967"
            fill="white"
            transform="translate(17.2012 12.6919)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
