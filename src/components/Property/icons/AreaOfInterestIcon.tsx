interface AreaOfInterestProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  letter?: string;
  colorIndex?: number;
}

const gradients = [
  "from-[#E02323] to-[#FFB8B8]",
  "from-[#485CE2] to-[#A9C1FF]",
  "from-[#33D885] to-[#48AF7F]",
];
const colors = [
  { primary: "#E02323", secondary: "#FFB8B8", accent: "#FFA9A9" }, // Red (original)
  { primary: "#485CE2", secondary: "#A9C1FF", accent: "#93C5FD" }, // Blue
  { primary: "#33D885", secondary: "#48AF7F", accent: "#6EE7B7" }, // Green
  // { primary: "#7C3AED", secondary: "#A78BFA", accent: "#C4B5FD" }, // Purple
  // { primary: "#DC2626", secondary: "#F87171", accent: "#FCA5A5" }, // Bright Red
  // { primary: "#EA580C", secondary: "#FB923C", accent: "#FED7AA" }, // Orange
];

export const AreaOfInterestIcon = ({
  width = 65,
  height = 72,
  letter,
  colorIndex = 0,
  ...props
}: AreaOfInterestProps) => {
  const color = colors[colorIndex % colors.length];
  const uniqueId = `area_${colorIndex}_${Math.random()
    .toString(36)
    .substring(2, 11)}`;

  return (
    <svg
      width={45}
      height={52}
      viewBox="0 0 45 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter={`url(#filter_${uniqueId})`}>
        <path
          d="M9.278 5.296A18.417 18.417 0 0122.218 0c4.85 0 9.505 1.901 12.942 5.296 3.111 3.07 4.732 6.505 5.16 10.074.426 3.538-.335 7.089-1.788 10.419-2.884 6.625-8.617 12.65-14.116 16.569a3.776 3.776 0 01-4.395 0c-5.498-3.92-11.231-9.946-14.118-16.57-1.45-3.33-2.21-6.88-1.786-10.42.428-3.567 2.05-7 5.16-10.072zm6.868 11.819a6.073 6.073 0 1112.146 0 6.073 6.073 0 01-12.146 0z"
          fill={`url(#gradient_${uniqueId})`}
        />
      </g>
      <circle
        cx={22.2169}
        cy={18.4122}
        r={13.5294}
        fill={color.accent}
        fillOpacity={0.2}
        stroke="#fff"
      />
      {letter && (
        <text
          x={22.2169}
          y={21.2169}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="20"
          fontWeight="bold"
          fill="#fff"
          fontFamily="Arial, sans-serif"
        >
          {letter}
        </text>
      )}
      <defs>
        <filter
          id={`filter_${uniqueId}`}
          x={0}
          y={0}
          width={44.438}
          height={51.063}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_3985_34882"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_3985_34882"
            result="shape"
          />
        </filter>
        <linearGradient
          id={`gradient_${uniqueId}`}
          x1={22.219}
          y1={0}
          x2={22.219}
          y2={43.0631}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color.primary} />
          <stop offset={1} stopColor={color.secondary} />
        </linearGradient>
      </defs>
    </svg>
  );
};
