import React from "react";

const Icons = {
  PhoneIcon: () => (
    <svg
      width={61}
      height={41}
      viewBox="0 0 71 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"

    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M59.321 25.586l5.598 6.397 5.597-6.397H59.321z"
        fill="#77B736"
      />
      <g filter="url(#filter0_d_19858_13912)">
        <circle cx={28.2221} cy={28.2221} r={23.7065} fill="#77B736" />
        <circle
          cx={28.2221}
          cy={28.2221}
          r={23.0987}
          stroke="#77B736"
          strokeWidth={1.21572}
        />
      </g>
      <path
        d="M30.934 39.474c-1.649 0-3.34-.413-5.072-1.238-1.732-.826-3.344-1.986-4.837-3.479-1.48-1.492-2.633-3.101-3.46-4.828-.825-1.726-1.238-3.414-1.238-5.062 0-.293.098-.541.294-.743a.979.979 0 01.733-.304h2.42c.266 0 .498.084.697.252.198.167.332.382.402.645l.485 2.332c.046.274.037.513-.025.717a1.03 1.03 0 01-.325.502L18.86 30.27c.402.728.846 1.405 1.332 2.03a20.132 20.132 0 001.555 1.779 16.853 16.853 0 001.834 1.584c.655.489 1.373.95 2.156 1.384l2.093-2.13c.159-.172.338-.285.537-.34.198-.054.418-.064.66-.032l2.057.42c.266.066.482.2.648.403.165.203.248.435.248.697v2.382a.979.979 0 01-.303.734c-.203.195-.45.293-.744.293z"
        fill="#fff"
      />
      <path
        d="M30.662 20.398h5.586m-5.586 2.93h3.983m-1.19 4.946a6.41 6.41 0 10-5.757-3.588c.075.152.1.324.061.49l-.565 2.45a.415.415 0 00.499.499l2.45-.566a.735.735 0 01.49.062 6.377 6.377 0 002.822.653z"
        stroke="#fff"
        strokeWidth={1.03951}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <filter
          id="filter0_d_19858_13912"
          x={0.0000987053}
          y={0.0000987053}
          width={56.4441}
          height={56.4432}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius={1.12888}
            in="SourceAlpha"
            result="effect1_dropShadow_19858_13912"
          />
          <feOffset />
          <feGaussianBlur stdDeviation={2.8222} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_19858_13912"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_19858_13912"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  ),
  Call: () => (<svg
    width={16}
    height={16}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"

  >
    <path
      d="M18.04 19.333c-2.036 0-4.124-.51-6.264-1.53-2.14-1.02-4.13-2.451-5.974-4.295-1.828-1.843-3.252-3.83-4.272-5.963C.51 5.413 0 3.329 0 1.293 0 .93.12.624.362.375A1.21 1.21 0 011.27 0h2.988c.329 0 .615.104.86.31.245.208.41.473.497.797l.6 2.88c.056.339.046.634-.031.886-.076.252-.21.459-.402.62L3.13 7.965c.496.9 1.044 1.736 1.644 2.509.6.772 1.24 1.504 1.921 2.195.701.701 1.456 1.354 2.265 1.958a23.488 23.488 0 002.663 1.708l2.585-2.63c.196-.212.417-.352.663-.42a2.04 2.04 0 01.814-.04l2.542.52c.328.08.595.246.8.497.204.25.306.537.306.86v2.943c0 .362-.124.664-.374.906a1.27 1.27 0 01-.919.362z"
      fill="url(#paint0_linear_19886_54560)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_19886_54560"
        x1={19.3333}
        y1={9.66667}
        x2={0}
        y2={9.66667}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E91614" />
        <stop offset={1} stopColor="#E05D31" />
      </linearGradient>
    </defs>
  </svg>),
  Message: () => (<svg
    width={19}
    height={19}
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"

  >
    <path
      d="M22.564 12.74a9.8 9.8 0 01-2.872 6.945 9.825 9.825 0 01-6.95 2.878 9.768 9.768 0 01-4.03-.86l-4.106.607A1.269 1.269 0 013.16 20.79l.57-4.165a9.45 9.45 0 01-.812-3.886 9.801 9.801 0 012.873-6.944 9.822 9.822 0 016.95-2.878 9.813 9.813 0 019.822 9.822z"
      stroke="url(#paint0_linear_19886_54557)"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_19886_54557"
        x1={22.564}
        y1={12.7403}
        x2={2.91931}
        y2={12.7403}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E91614" />
        <stop offset={1} stopColor="#E05D31" />
      </linearGradient>
    </defs>
  </svg>),
  ShareArrowIcon: () => (<svg
    width={22}
    height={22}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M26.12 16.001L20 9.881v3.28l-1.147.174c-5.746.813-9.64 3.826-11.866 8.44 3.093-2.187 6.933-3.24 11.68-3.24H20v3.586m-2.667-2.226c-5.96.28-10.226 2.426-13.333 6.773 1.333-6.667 5.333-13.333 14.667-14.667V6.668L28 16.001l-9.333 9.334v-5.467c-.44 0-.88.013-1.334.027z"
      fill="url(#paint0_linear_sharearrow)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_sharearrow"
        x1={28}
        y1={16.668}
        x2={4}
        y2={16.668}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E91614" />
        <stop offset={1} stopColor="#E05D31" />
      </linearGradient>
    </defs>
  </svg>),
  InterestedIcon: () => (<svg
    width={22}
    height={22}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M26.177 9.48l-8.632-5.36a2.973 2.973 0 00-3.149 0l-8.63 5.39a2.973 2.973 0 00-1.353 2.972l2.227 13.37a2.973 2.973 0 002.97 2.48h12.777a2.973 2.973 0 002.972-2.48l2.226-13.37a2.973 2.973 0 00-1.41-3.001"
      stroke="url(#paint0_linear_19886_54570)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 14.425c-1.192-2.699-3.964-2.937-5.253-1.76-1.052.943-1.558 3.207-.598 5.29C11.805 21.539 16 23.42 16 23.42s4.195-1.882 5.85-5.464c.96-2.084.455-4.347-.595-5.292-1.291-1.176-4.063-.938-5.255 1.761z"
      stroke="url(#paint1_linear_19886_54570)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_19886_54570"
        x1={27.6198}
        y1={15.9997}
        x2={4.37805}
        y2={15.9997}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E91614" />
        <stop offset={1} stopColor="#E05D31" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_19886_54570"
        x1={22.3611}
        y1={17.7059}
        x2={9.63904}
        y2={17.7059}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E91614" />
        <stop offset={1} stopColor="#E05D31" />
      </linearGradient>
    </defs>
  </svg>),
  WhatsAppIcon: () => (
    <svg
      width={38}
      height={42}
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 41.81l3.002-11.143A20.579 20.579 0 01.836 16.399a20.631 20.631 0 017.74-12.195A20.757 20.757 0 0122.44.044 20.74 20.74 0 0135.65 5.95a20.59 20.59 0 012.103 26.958 20.715 20.715 0 01-12.134 7.872 20.77 20.77 0 01-14.343-1.974L0 41.81zm11.82-7.173l.697.412a16.783 16.783 0 0020.271-2.458 16.634 16.634 0 002.799-20.16 16.72 16.72 0 00-8.079-7.121 16.79 16.79 0 00-10.76-.73 16.74 16.74 0 00-8.974 5.963 16.645 16.645 0 00-3.46 10.181 16.451 16.451 0 002.447 8.647l.437.718-1.678 6.22 6.3-1.672z"
        fill="url(#paint0_linear_whatsapp)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28.888 23.812a3.729 3.729 0 00-1.46-.654 3.888 3.888 0 00-1.622.005c-.802.307-1.32 1.47-1.837 2.05a.771.771 0 01-.451.275.82.82 0 01-.535-.07c-2.934-1.061-5.394-3.009-6.979-5.525a.734.734 0 01.111-1.071 4.415 4.415 0 001.233-1.903 3.894 3.894 0 00-.567-2.278 5.323 5.323 0 00-1.788-2.495 2.65 2.65 0 00-1.385-.174c-.47.066-.91.257-1.266.55a5.083 5.083 0 00-1.433 1.796 4.705 4.705 0 00-.453 2.191 4.8 4.8 0 00.173 1.253c.286.985.726 1.925 1.306 2.792.42.664.876 1.306 1.37 1.925a20.478 20.478 0 005.93 5.081 18.55 18.55 0 003.698 1.63 8.79 8.79 0 004.303.626 5.402 5.402 0 002.31-.89 4.875 4.875 0 001.586-1.787c.213-.427.278-.905.185-1.367-.222-.946-1.59-1.504-2.429-1.96z"
        fill="url(#paint1_linear_whatsapp)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_whatsapp"
          x1={28}
          y1={16.668}
          x2={4}
          y2={16.668}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E91614" />
          <stop offset={1} stopColor="#E05D31" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_whatsapp"
          x1={28}
          y1={16.668}
          x2={4}
          y2={16.668}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E91614" />
          <stop offset={1} stopColor="#E05D31" />
        </linearGradient>
      </defs>
    </svg>
  ),
  FacebookIcon: () => (<svg
    width={21}
    height={39}
    viewBox="0 0 21 39"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.486 21.737l1.1-6.99H13.81v-4.545c0-1.911.946-3.78 3.972-3.78h3.124V.47A37.875 37.875 0 0015.404 0c-5.578 0-9.22 3.353-9.22 9.416v5.33H0v6.991h6.184v16.91h7.625v-16.91h5.677z"
      fill="url(#paint0_linear_facebook)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_facebook"
        x1={28}
        y1={16.668}
        x2={4}
        y2={16.668}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E91614" />
        <stop offset={1} stopColor="#E05D31" />
      </linearGradient>
    </defs>
  </svg>),
  TwitterIcon: () => (<svg
    width={42}
    height={35}
    viewBox="0 0 42 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M41.625 4.144a17.125 17.125 0 01-4.23 1.207c.68-.117 1.682-1.343 2.08-1.84a7.79 7.79 0 001.362-2.52c0-.069.068-.166 0-.215a.233.233 0 00-.224 0 21.383 21.383 0 01-5.008 1.947.35.35 0 01-.35-.088 4.858 4.858 0 00-.438-.457A9.119 9.119 0 0032.425.63 8.405 8.405 0 0028.7.017a9.01 9.01 0 00-3.54.973 9.172 9.172 0 00-2.8 2.375 8.997 8.997 0 00-1.703 3.407 9.36 9.36 0 00-.087 3.602c0 .204 0 .233-.175.204C13.46 9.556 7.772 7.093 3.123 1.808c-.204-.234-.311-.234-.477 0C.624 4.884 1.606 9.75 4.134 12.155c.34.321.69.633 1.06.925a8.679 8.679 0 01-3.326-.925c-.194-.127-.301-.058-.31.175-.028.324-.028.65 0 .973a8.843 8.843 0 005.445 7.048c.354.151.722.265 1.1.34a9.943 9.943 0 01-3.259.098c-.233-.049-.32.078-.233.301 1.43 3.894 4.532 5.082 6.808 5.744.31.048.622.048.972.126l-.058.058c-.671 1.227-3.385 2.054-4.63 2.483a16.627 16.627 0 01-7.099.915c-.38-.059-.467-.05-.564 0-.097.048 0 .155.107.253.486.32.973.603 1.478.876a23.274 23.274 0 004.746 1.946c8.539 2.356 18.147.623 24.556-5.752 5.038-5.003 6.808-11.905 6.808-18.816 0-.263.32-.418.505-.555a16.706 16.706 0 003.336-3.484c.163-.197.246-.447.234-.701 0-.146 0-.117-.185-.039z"
      fill="url(#paint0_linear_twitter)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_twitter"
        x1={28}
        y1={16.668}
        x2={4}
        y2={16.668}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E91614" />
        <stop offset={1} stopColor="#E05D31" />
      </linearGradient>
    </defs>
  </svg>),
  RedditIcon: () => (<svg
    width={39}
    height={35}
    viewBox="0 0 39 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M38.993 17.43a4.212 4.212 0 01-1.384 3.186c-.296.269-.628.495-.987.672a7.72 7.72 0 010 1.277c0 6.499-7.64 11.78-17.066 11.78-9.426 0-17.066-5.281-17.066-11.78a7.711 7.711 0 010-1.277 4.273 4.273 0 01-1.466-1.098 4.2 4.2 0 01-.295-5.118c.347-.51.8-.938 1.33-1.256a4.309 4.309 0 015.143.538 21.041 21.041 0 015.445-2.612 21.096 21.096 0 015.972-.957L20.785.717a.89.89 0 01.395-.572.926.926 0 01.688-.124l7.172 1.422A2.94 2.94 0 0132.625.196a2.897 2.897 0 011.808 3.31A2.922 2.922 0 0131.42 5.8a2.916 2.916 0 01-2.76-2.588l-6.265-1.305-1.902 9.052a20.985 20.985 0 0111.27 3.569 4.306 4.306 0 014.563-.87 4.266 4.266 0 011.895 1.494c.474.67.742 1.46.772 2.277zM9.943 21.44a2.934 2.934 0 002.705 1.79 2.93 2.93 0 002.704-1.79 2.883 2.883 0 00-.635-3.162 2.946 2.946 0 00-3.19-.63 2.903 2.903 0 00-1.807 2.682c0 .38.075.758.223 1.11zm16.766 6.965a.78.78 0 00-.542-1.344.963.963 0 00-.581.203 9.596 9.596 0 01-2.907 1.403 9.718 9.718 0 01-3.211.367 9.646 9.646 0 01-6.089-1.828.795.795 0 00-1.06.052.782.782 0 00-.052 1.05 11.252 11.252 0 003.42 1.74 11.35 11.35 0 003.81.495 11.337 11.337 0 007.23-2.234l-.018.096zm-.538-4.942a2.936 2.936 0 002.132-.88 2.895 2.895 0 00.825-2.137 2.903 2.903 0 00-1.807-2.681 2.946 2.946 0 00-3.19.63 2.883 2.883 0 00-.635 3.161 2.93 2.93 0 002.705 1.791l-.03.116z"
      fill="url(#paint0_linear_reddit)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_reddit"
        x1={28}
        y1={16.668}
        x2={4}
        y2={16.668}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E91614" />
        <stop offset={1} stopColor="#E05D31" />
      </linearGradient>
    </defs>
  </svg>),
  EmailIcon: () => (<svg
    width={42}
    height={42}
    viewBox="0 0 42 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M34.581 6.523H7.177a4.572 4.572 0 00-4.567 4.568v19.574a4.572 4.572 0 004.567 4.568h27.404a4.573 4.573 0 004.568-4.568V11.091a4.572 4.572 0 00-4.568-4.568zm-1.156 7.555L21.68 23.213a1.305 1.305 0 01-1.602 0L8.334 14.078a1.306 1.306 0 111.602-2.06l10.943 8.512 10.944-8.512a1.305 1.305 0 011.602 2.06z"
      fill="url(#paint0_linear_email)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_email"
        x1={28}
        y1={16.668}
        x2={4}
        y2={16.668}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E91614" />
        <stop offset={1} stopColor="#E05D31" />
      </linearGradient>
    </defs>
  </svg>),
  EmbedIcon: () => (<svg
    width={37}
    height={23}
    viewBox="0 0 37 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.509.527L1.056 10.98l10.453 10.453M24.948 1.273L35.4 11.726 24.948 22.18"
      stroke="url(#paint0_linear_embed)"
      strokeWidth={1.49324}
    />
    <defs>
      <linearGradient
        id="paint0_linear_embed"
        x1={28}
        y1={16.668}
        x2={4}
        y2={16.668}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E91614" />
        <stop offset={1} stopColor="#E05D31" />
      </linearGradient>
    </defs>
  </svg>),
  TickIcon: ({
    size = 15,
    bgColor,
    tickColor,
  }: {
    size?: number;
    bgColor: string;
    tickColor: string;
  }) => {
    const id = React.useId();
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx={7.49602} cy={7.28215} r={7.00676} fill={bgColor} />
        <g clipPath={`url(#${id})`}>
          <path
            d="M4.1 6.869c1.116 1.207 2.198 2.294 3.238 3.669 1.13-2.25 2.288-4.506 4.197-6.95l-.514-.236c-1.613 1.71-2.865 3.329-3.954 5.253-.757-.682-1.98-1.647-2.727-2.143l-.24.407z"
            fill={tickColor}
          />
        </g>
        <defs>
          <clipPath id={id}>
            <path
              fill="#fff"
              transform="translate(3.825 2.945)"
              d="M0 0H8.00772V8.00772H0z"
            />
          </clipPath>
        </defs>
      </svg>
    );
  }
};

export default Icons;
