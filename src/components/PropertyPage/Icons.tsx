// const Icons = () => (
//   const ShieldIcon = () => (

//   );
// );

import React , {useId, SVGProps} from "react"

export type IconProps = SVGProps<SVGSVGElement>;


export const IconGradients = () => {
  return (
    <svg style={{ width: 0, height: 0, position: 'absolute' }} aria-hidden="true" focusable="false">
      <linearGradient id="icon-tag-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E91614" />
        <stop offset="100%" stopColor="#E05D31" />
      </linearGradient>
    </svg>
  );
};

const Icons = {
  affordableIcon: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 16 16"
    >
      <path
        fill="url(#icon-tag-gradient)"
        d="M15.25 0h-6c-.412 0-.989.239-1.28.53L.531 7.969a.75.75 0 0 0 0 1.061l6.439 6.439a.75.75 0 0 0 1.061 0L15.47 8.03c.292-.292.53-.868.53-1.28v-6a.753.753 0 0 0-.75-.75M11.5 6a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 11.5 6"
      ></path>
    </svg>
  ),
  heart: () => (
    <svg
      width={31}
      height={31}
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.346 5.667a6.167 6.167 0 014.369 1.821h0c2.457 2.467 2.453 6.295.005 8.742l-9.222 9.222-9.222-9.222c-2.449-2.447-2.452-6.275 0-8.737h.001a6.168 6.168 0 014.373-1.826c1.535 0 3.014.576 4.144 1.615l.704.649.704-.649a6.118 6.118 0 013.857-1.608l.287-.007z"
        stroke="#404040"
        strokeWidth={2.07983}
      />
    </svg>
  ),
  share: ({ isHovered }: any) => (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill={isHovered ? "#fff" : "#000"}
      xmlns="http://www.w3.org/2000/svg"
      style={{ transition: "fill 0.2s ease-in-out" }}
    >
      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7 0-.24-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92 0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
    </svg>
  ),
  link: () => (
    <svg
      width={28}
      height={28}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.231 12.16l4.98-8.682 4.981 8.682h-9.96zm5.003 11.779c-1.149 0-2.12-.398-2.914-1.192-.794-.794-1.191-1.762-1.191-2.905 0-1.159.396-2.134 1.19-2.927.795-.792 1.766-1.188 2.915-1.188s2.12.398 2.914 1.192c.795.794 1.192 1.765 1.192 2.914 0 1.149-.397 2.12-1.192 2.914-.794.794-1.765 1.192-2.914 1.192zm0-1.167c.82 0 1.516-.284 2.085-.853.57-.569.854-1.264.854-2.086 0-.822-.285-1.517-.854-2.085-.57-.568-1.264-.852-2.085-.854-.82-.001-1.516.283-2.086.854-.57.571-.854 1.266-.852 2.085.003.819.287 1.514.853 2.086.566.572 1.26.856 2.085.853zM5.245 10.993H11.2L8.212 5.845l-2.967 5.148zM15.772 23.94v-8.212h8.212v8.212h-8.212zm1.167-1.167h5.878v-5.878H16.94v5.878zm2.94-10.612c-.72-.575-1.38-1.108-1.98-1.6a16.115 16.115 0 01-1.546-1.433 6.426 6.426 0 01-1.007-1.383 3.057 3.057 0 01-.36-1.437c0-.696.229-1.27.684-1.723.455-.454 1.035-.68 1.74-.68.465 0 .9.113 1.304.341.405.228.793.571 1.165 1.03.37-.443.766-.782 1.185-1.018.42-.236.855-.354 1.304-.354.685 0 1.256.239 1.714.716.458.477.687 1.062.687 1.754 0 .486-.12.955-.36 1.405a6.252 6.252 0 01-1.006 1.36c-.432.456-.948.93-1.547 1.422-.599.493-1.258 1.026-1.977 1.6zm0-1.514c1.354-1.047 2.314-1.896 2.878-2.547.564-.651.846-1.23.846-1.734 0-.373-.118-.682-.354-.927a1.182 1.182 0 00-.889-.368c-.251 0-.496.076-.735.228-.239.151-.57.438-.992.86l-.754.743-.756-.742c-.438-.438-.77-.728-1-.872a1.34 1.34 0 00-.726-.217c-.373 0-.673.112-.9.335-.228.223-.342.528-.344.915 0 .535.282 1.128.846 1.779.564.65 1.525 1.499 2.88 2.546z"
        fill="#000"
      />
    </svg>
  ),
  affordable: () => (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.669 14.668H1.335m8-8.667H6.67m2.666 4H6.67M4.336 5.334H4.33m.007 2.667H4.33m.007 2.667H4.33m7.34-5.334h-.007m.007 2.667h-.007m.007 2.667h-.007m2.34-5.677c0-.732 0-1.097-.185-1.407-.184-.309-.523-.51-1.201-.916l-.863-.516c-1.065-.638-1.597-.956-2.008-.759-.41.197-.41.771-.41 1.92v11.355h4.666V4.99zm-12 0c0-.732 0-1.097.183-1.407.184-.309.523-.51 1.201-.916l.863-.516c1.065-.638 1.597-.958 2.008-.76.41.198.41.772.41 1.92v11.356H2.003V4.99z"
        stroke="#C7AF57"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  shieldIcon: (props:IconProps) => (
    <svg
      width="52"
      height="52"
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M25.9998 36.8332C26.6137 36.8332 27.1287 36.6252 27.5447 36.2092C27.9607 35.7932 28.1679 35.279 28.1665 34.6665V25.9999C28.1665 25.386 27.9585 24.8718 27.5425 24.4572C27.1265 24.0427 26.6123 23.8347 25.9998 23.8332C25.3874 23.8318 24.8732 24.0398 24.4572 24.4572C24.0412 24.8746 23.8332 25.3889 23.8332 25.9999V34.6665C23.8332 35.2804 24.0412 35.7954 24.4572 36.2114C24.8732 36.6274 25.3874 36.8346 25.9998 36.8332ZM25.9998 19.4999C26.6137 19.4999 27.1287 19.2919 27.5447 18.8759C27.9607 18.4599 28.1679 17.9456 28.1665 17.3332C28.1651 16.7208 27.9571 16.2065 27.5425 15.7905C27.1279 15.3745 26.6137 15.1665 25.9998 15.1665C25.3859 15.1665 24.8717 15.3745 24.4572 15.7905C24.0426 16.2065 23.8346 16.7208 23.8332 17.3332C23.8317 17.9456 24.0397 18.4606 24.4572 18.878C24.8746 19.2955 25.3888 19.5028 25.9998 19.4999ZM25.9998 47.4499C25.7471 47.4499 25.5123 47.4318 25.2957 47.3957C25.079 47.3596 24.8623 47.3054 24.6457 47.2332C19.7707 45.6082 15.8887 42.6016 12.9998 38.2134C10.1109 33.8251 8.6665 29.104 8.6665 24.0499V13.8124C8.6665 12.9096 8.92867 12.0971 9.453 11.3749C9.97734 10.6526 10.6541 10.129 11.4832 9.80404L24.4832 4.92904C24.9887 4.74848 25.4943 4.6582 25.9998 4.6582C26.5054 4.6582 27.0109 4.74848 27.5165 4.92904L40.5165 9.80404C41.3471 10.129 42.0245 10.6526 42.5488 11.3749C43.0732 12.0971 43.3346 12.9096 43.3332 13.8124V24.0499C43.3332 29.1054 41.8887 33.8273 38.9998 38.2155C36.1109 42.6038 32.229 45.6096 27.354 47.2332C27.1373 47.3054 26.9207 47.3596 26.704 47.3957C26.4873 47.4318 26.2526 47.4499 25.9998 47.4499Z"
        fill="white"
      />
    </svg>
  ),
  summaryIcon: (props:IconProps) => (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.88 7.017l4.774 1.271m-5.796 2.525l2.386.636m-2.267 6.517l.954.255c2.7.72 4.05 1.08 5.114.468 1.063-.61 1.425-1.953 2.148-4.637l1.023-3.797c.724-2.685 1.085-4.027.471-5.085-.614-1.058-1.963-1.417-4.664-2.136l-.954-.255c-2.7-.72-4.05-1.079-5.113-.468-1.064.61-1.426 1.953-2.15 4.637l-1.022 3.797c-.724 2.685-1.086 4.027-.47 5.085.613 1.057 1.963 1.417 4.663 2.136z"
        stroke="#000"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 20.946l-.952.26c-2.694.733-4.04 1.1-5.102.477-1.06-.622-1.422-1.99-2.143-4.728l-1.021-3.872c-.722-2.737-1.083-4.106-.47-5.184C2.842 6.966 4 7 5.5 7"
        stroke="#000"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  builderIcon: (props:IconProps) => (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.7 2c1.68 0 2.52 0 3.162.34a3.06 3.06 0 011.311 1.359c.327.665.327 1.536.327 3.279v10.044c0 1.743 0 2.614-.327 3.28a3.06 3.06 0 01-1.311 1.359C17.22 22 16.38 22 14.7 22H9.3c-1.68 0-2.52 0-3.162-.34a3.06 3.06 0 01-1.311-1.359c-.327-.665-.327-1.536-.327-3.279V6.978c0-1.743 0-2.614.327-3.28A3.06 3.06 0 016.138 2.34C6.78 2 7.62 2 9.3 2h5.4z"
        stroke="#000"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 21v-5.5a2 2 0 012-2h1a2 2 0 012 2V21M10 6H8m2 4H8m8-4h-2m2 4h-2"
        stroke="#000"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  clockIcon: (props:IconProps) => (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 21a9 9 0 100-18 9 9 0 000 18z"
        stroke="#000"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 8v5h5"
        stroke="#000"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  downloadIcon: () => (
    <svg
      width={34}
      height={34}
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.563 19.343a.708.708 0 00-.01 1.002l4.945 4.947a.71.71 0 001.003 0l4.945-4.947a.709.709 0 00-1-1.002l-3.738 3.737V3.54a.708.708 0 10-1.416 0v19.54l-3.738-3.737a.708.708 0 00-.991 0zM25.5 12.75h-2.125a.708.708 0 100 1.416H25.5A2.837 2.837 0 0128.333 17v9.916A2.837 2.837 0 0125.5 29.75h-17a2.838 2.838 0 01-2.833-2.834V17A2.837 2.837 0 018.5 14.165h3.542a.708.708 0 000-1.416H8.5a4.254 4.254 0 00-4.25 4.25v9.916a4.254 4.254 0 004.25 4.25h17a4.255 4.255 0 004.25-4.25V17a4.255 4.255 0 00-4.25-4.25z"
        fill="#E91614"
      />
    </svg>
  ),
  chargeIcon: (props:IconProps) => (
    <svg
      width={27}
      height={28}
      viewBox="0 0 27 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19.828 11.627H13.5V1.344L7.172 16.373H13.5v10.283l6.328-15.029z"
        fill="#fff"
      />
    </svg>
  ),
  adobeIcon: () => (
    <svg
      width={29}
      height={29}
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.075 25.992c3.28-2.266 5.474-5.728 7.087-9.969 1.631-4.223 3.371-7.848 2.61-12.017-.109-.652-1.033-1.323-1.504-1.269-1.849.11-1.722 2.194-1.54 3.444.434 3.1 2.827 6.706 5.147 10.078 2.302 3.39 4.205 3.915 6.85 4.096.907.054 2.266-.254 2.484-1.051 1.396-5.075-16.349-.979-22.257 3.77-.725.598-1.56 1.812-1.088 2.646.363.652 1.577.725 2.23.272h-.019z"
        stroke="#BB2828"
        strokeWidth={1.8125}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  customerSupportIcon: () => (
    <svg
      width={27}
      height={27}
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.934 12.445c0-.368 0-.551.055-.715.16-.475.583-.659 1.008-.852.475-.217.713-.325.95-.345.267-.02.536.037.765.165.303.17.515.494.732.758 1 1.216 1.502 1.824 1.684 2.493a3.102 3.102 0 010 1.648c-.266.979-1.11 1.798-1.735 2.558-.32.387-.48.581-.681.695-.233.13-.5.186-.765.164-.237-.019-.475-.127-.951-.345-.425-.193-.847-.376-1.007-.852-.055-.163-.055-.347-.055-.714v-4.658zm-10.612 0c0-.463-.013-.878-.386-1.203-.136-.118-.317-.2-.676-.364-.477-.216-.715-.325-.951-.345-.708-.057-1.089.427-1.496.924C3.81 12.672 3.31 13.28 3.126 13.95a3.12 3.12 0 000 1.648c.268.978 1.113 1.798 1.736 2.557.394.477.77.913 1.447.86.236-.02.474-.128.95-.346.361-.163.54-.246.677-.364.373-.324.386-.74.386-1.2v-4.66z"
        stroke="#6F6F6F"
        strokeWidth={1.59176}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.2 10.53c0-3.518 3.326-6.368 7.428-6.368 4.103 0 7.429 2.85 7.429 6.367m0 8.49v.848c0 1.875-1.9 3.396-4.245 3.396H14.69"
        stroke="#6F6F6F"
        strokeWidth={1.59176}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  starIcon: (props:IconProps) => (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.153 5.408C10.42 3.136 11.053 2 12 2c.947 0 1.58 1.136 2.847 3.408l.328.588c.36.646.54.969.82 1.182.28.213.63.292 1.33.45l.636.144c2.46.557 3.69.835 3.982 1.776.292.94-.546 1.921-2.223 3.882l-.434.507c-.476.557-.715.836-.822 1.18-.107.345-.07.717.001 1.46l.066.677c.253 2.617.38 3.925-.386 4.506-.766.581-1.918.051-4.22-1.009l-.597-.274c-.654-.302-.98-.452-1.328-.452-.347 0-.674.15-1.328.452l-.596.274c-2.303 1.06-3.455 1.59-4.22 1.01-.767-.582-.64-1.89-.387-4.507l.066-.676c.072-.744.108-1.116 0-1.46-.106-.345-.345-.624-.82-1.18l-.435-.508c-1.677-1.96-2.515-2.941-2.223-3.882.292-.941 1.523-1.22 3.983-1.776l.636-.144c.7-.158 1.048-.237 1.33-.45.28-.213.46-.536.82-1.182l.327-.588z"
        fill="#45BB28"
      />
    </svg>
  ),
  propertyIcon: (props:IconProps) => (
    <svg
      width={67}
      height={67}
      viewBox="0 0 67 67"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_i_3457_6907)">
        <circle cx={33.3254} cy={33.3254} r={33.3254} fill="#fff" />
      </g>
      <circle
        cx={33.3254}
        cy={33.3254}
        r={31.4684}
        stroke="#77B736"
        strokeWidth={3.71411}
      />
      <path
        d="M42.314 31.893c1.09 0 2.08.272 2.972.817a5.64 5.64 0 012.099 2.234c.506.945.76 1.997.76 3.154 0 1.157-.254 2.211-.76 3.164a5.742 5.742 0 01-2.099 2.235c-.892.537-1.883.805-2.972.805-.862 0-1.648-.174-2.359-.522a5.129 5.129 0 01-1.815-1.486v6.137h-2.609V32.177h2.61v1.712a5.075 5.075 0 011.803-1.474 5.366 5.366 0 012.37-.522zm-3.13 8.836c.703.703 1.576 1.055 2.62 1.055 1.043 0 1.913-.352 2.609-1.055.696-.71 1.043-1.588 1.043-2.631 0-1.044-.348-1.921-1.043-2.632-.696-.71-1.566-1.066-2.61-1.066-1.043 0-1.916.355-2.62 1.066-.695.71-1.043 1.588-1.043 2.632 0 1.043.348 1.92 1.044 2.631z"
        fill="#77B736"
      />
      <path
        d="M20.382 22.663v16.063M37.898 21.934v4.38"
        stroke="#77B736"
        strokeWidth={1.82528}
        strokeLinecap="round"
      />
      <path
        d="M16 26.314L27.51 15.48a1.46 1.46 0 011.887-.098l12.887 9.835"
        stroke="#77B736"
        strokeWidth={2.19034}
        strokeLinecap="round"
      />
      <defs>
        <filter
          id="filter0_i_3457_6907"
          x={0}
          y={0}
          width={66.6504}
          height={66.6509}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius={2.47607}
            in="SourceAlpha"
            result="effect1_innerShadow_3457_6907"
          />
          <feOffset />
          <feGaussianBlur stdDeviation={3.09509} />
          <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" />
          <feBlend in2="shape" result="effect1_innerShadow_3457_6907" />
        </filter>
      </defs>
    </svg>
  ),
  schoolIcon: () => (
    <svg
      width={22}
      height={18}
      viewBox="0 0 22 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.267 14.7a2 2 0 01-.74-.712 1.913 1.913 0 01-.274-1.013V8.29L1.33 7.223a1.092 1.092 0 01-.392-.372.896.896 0 01-.125-.476A.944.944 0 01.94 5.9c.083-.143.214-.267.39-.372l8.24-4.495c.147-.081.298-.14.454-.174.155-.035.315-.052.478-.053.164-.001.324.017.48.053.156.036.308.094.454.173l9.33 5.059c.17.1.3.227.387.378a.97.97 0 01.131.493v6.525c0 .17-.058.314-.174.43a.584.584 0 01-.43.174.588.588 0 01-.431-.174.574.574 0 01-.173-.43V7.054L17.753 8.29v4.685c0 .374-.091.711-.274 1.013a1.991 1.991 0 01-.738.713l-5.299 2.868c-.15.085-.303.145-.459.18a2.118 2.118 0 01-.48.052c-.163 0-.323-.018-.48-.052a1.579 1.579 0 01-.458-.181L4.267 14.7zm5.957-3.993a.607.607 0 00.29.092.61.61 0 00.292-.092l7.95-4.332-7.95-4.308a.597.597 0 00-.29-.093.597.597 0 00-.29.093L2.25 6.375l7.974 4.332zm-.023 5.839c.109.062.21.093.302.093a.618.618 0 00.303-.093l5.391-2.914a.72.72 0 00.266-.267c.053-.1.08-.228.082-.384V8.955l-5.096 2.781c-.15.085-.303.145-.459.18a2.207 2.207 0 01-.487.053c-.17 0-.333-.018-.488-.053a1.643 1.643 0 01-.458-.18l-5.095-2.78v4.026c0 .124.027.245.08.362a.68.68 0 00.268.29l5.391 2.912z"
        fill="url(#paint0_linear_school)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_school"
          x1={18.0833}
          y1={10.6317}
          x2={0}
          y2={10.6317}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E91614" />
          <stop offset={1} stopColor="#E05D31" />
        </linearGradient>
      </defs>
    </svg>
  ),
  hospitalIcon: () => (
    <svg
      width={22}
      height={22}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 21H1"
        stroke="url(#paint0_linear_hospital)"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <path
        d="M16 21V5c0-1.886 0-2.828-.586-3.414C14.828 1 13.886 1 12 1h-2c-1.886 0-2.828 0-3.414.586C6 2.172 6 3.114 6 5v16"
        stroke="url(#paint0_linear_hospital)"
        strokeWidth={1.5}
      />
      <path
        opacity={0.5}
        d="M20 21V7.5c0-1.404 0-2.107-.337-2.611a2 2 0 00-.552-.552C18.607 4 17.904 4 16.5 4M2 21V7.5c0-1.404 0-2.107.337-2.611a2 2 0 01.552-.552C3.393 4 4.096 4 5.5 4"
        stroke="url(#paint0_linear_hospital)"
        strokeWidth={1.5}
      />
      <path
        d="M11 21v-3"
        stroke="url(#paint0_linear_hospital)"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <path
        opacity={0.5}
        d="M9 11h4m-8.5-1H6m-1.5 3H6m10-3h1.5M16 13h1.5m-13-6H6m10 0h1.5M9 14h4"
        stroke="url(#paint0_linear_hospital)"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <path
        d="M11 8V4m2 2H9"
        stroke="url(#paint0_linear_hospital)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_hospital"
          x1={18.0833}
          y1={10.6317}
          x2={0}
          y2={10.6317}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E91614" />
          <stop offset={1} stopColor="#E05D31" />
        </linearGradient>
      </defs>
    </svg>
  ),
  collegeIcon: () => (
    <svg
      width={19}
      height={19}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.125 18.25V9.848c0-.934 0-1.402.214-1.794.214-.392.607-.644 1.393-1.15l1.822-1.17c.46-.296.689-.444.946-.444s.486.148.947.443l1.82 1.17c.787.507 1.18.76 1.394 1.151.214.392.214.86.214 1.794v8.402M9.5 10.375h.008m7.867 7.875v-5.108c0-2.005-1.102-2.168-3.5-2.767M1.625 18.25v-5.108c0-2.005 1.103-2.168 3.5-2.767M.75 18.25h17.5m-8.75 0v-3.5m0-9.625V3.359m0 0V1.6c0-.415 0-.622.128-.751.402-.405 2.06.552 2.69.94.532.328.682.982.682 1.571H9.5z"
        stroke="url(#paint0_linear_college)"
        strokeWidth={1.3125}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_college"
          x1={18.0833}
          y1={10.6317}
          x2={0}
          y2={10.6317}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E91614" />
          <stop offset={1} stopColor="#E05D31" />
        </linearGradient>
      </defs>
    </svg>
  ),
  otherIcon: () => (
    <svg
      className="w-6 h-6 text-gray-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2-10h3m2 0h4m-6 4h4"
      />
    </svg>
  ),
  shoppingIcon: () => (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4H5a2 2 0 00-2 2v11a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2h-2M7 4h10"
        stroke="url(#paint0_linear_shopping)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 10a4 4 0 01-8 0"
        stroke="url(#paint0_linear_shopping)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_shopping"
          x1={18.0833}
          y1={10.6317}
          x2={0}
          y2={10.6317}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E91614" />
          <stop offset={1} stopColor="#E05D31" />
        </linearGradient>
      </defs>
    </svg>
  ),
  transportationIcon: () => (
    <svg
      width={19}
      height={22}
      viewBox="0 0 19 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 15.65V3.875C0 2.502.704 1.513 2.113.908 3.523.303 5.833 0 9.042 0c3.24 0 5.556.299 6.949.896 1.393.598 2.09 1.59 2.092 2.979V15.65c0 1.037-.361 1.918-1.085 2.641-.722.723-1.602 1.084-2.64 1.084l1.403.942c.208.14.274.332.196.577-.077.245-.244.369-.5.37H2.628c-.257 0-.425-.124-.503-.37-.077-.245-.012-.438.196-.577l1.404-.942c-1.038 0-1.919-.362-2.641-1.085C.362 17.568 0 16.688 0 15.65zm1.292-5.317h15.5V4.571h-15.5v5.762zm13.066 1.292H1.292h15.5-2.434zm-5.316 4.67c.405 0 .747-.138 1.024-.417a1.39 1.39 0 00.417-1.024c0-.405-.139-.747-.417-1.024a1.39 1.39 0 00-1.024-.417 1.39 1.39 0 00-1.025.417 1.39 1.39 0 00-.417 1.024c0 .406.14.747.417 1.025a1.39 1.39 0 001.025.417zm-5.316 1.788h10.63c.677 0 1.252-.236 1.725-.71.474-.474.71-1.049.71-1.725v-4.023h-15.5v4.025c0 .675.237 1.25.711 1.723.474.473 1.048.71 1.724.71zM9.042 1.292c-2.365 0-4.16.161-5.384.484-1.224.323-1.968.824-2.232 1.504h15.261c-.239-.68-.97-1.181-2.195-1.504-1.224-.323-3.04-.484-5.45-.484zm0 1.988h7.645H1.426h7.616z"
        fill="url(#paint0_linear_transportation)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_transportation"
          x1={18.0833}
          y1={10.6317}
          x2={0}
          y2={10.6317}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E91614" />
          <stop offset={1} stopColor="#E05D31" />
        </linearGradient>
      </defs>
    </svg>
  ),
  entertainmentIcon: () => (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="4"
        y="5"
        width="16"
        height="12"
        rx="2"
        stroke="url(#paint0_linear_entertainment)"
        strokeWidth="1.8"
      />
      <path
        d="M11 9L15 11L11 13V9Z"
        stroke="url(#paint0_linear_entertainment)"
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* <path
        d="M7 4L8 3M17 4L16 3M19 8L20 7M4 8L3 7"
        stroke="url(#paint0_linear_entertainment)"
        strokeWidth="1.6"
        strokeLinecap="round"
      /> */}
      <defs>
        <linearGradient
          id="paint0_linear_entertainment"
          x1={18.0833}
          y1={10.6317}
          x2={0}
          y2={10.6317}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E91614" />
          <stop offset={1} stopColor="#E05D31" />
        </linearGradient>
      </defs>
    </svg>
  ),
  CheckIcon: ({ color }: { color: "green" | "red" }) => (
    <svg
      className={`w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 ${
        color === "green" ? "text-green-500" : "text-red-500"
      }`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.3}
        d="M5 13l4 4L19 7"
      />
    </svg>
  ),
  mapMarkerIcon: () => (
    <svg
      className="w-12 h-12 mx-auto"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
};
export default Icons;
