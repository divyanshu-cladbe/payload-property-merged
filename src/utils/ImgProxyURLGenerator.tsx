// import { generateUrl } from "@imgproxy/imgproxy-js-core";

// export default function imgproxyLoader({
//   src,
//   width,
//   quality,
// }: {
//   src: string;
//   width: number;
//   quality?: number;
// }) {
//   return generateUrl(
//     { value: src, type: "plain" },
//     { width, format: "webp", quality: quality ?? 80, resizing_type: "fill" },
//   );
// }

import { generateUrl } from "@imgproxy/imgproxy-js-core";

export default function imgproxyLoader({
  src,
  width,
  height,
  quality,
}: {
  src: string;
  width: number;
  height?: number;
  quality?: number;
}) {
  // Use the base without a trailing slash
  const BASE_URL = "https://ds1.property.new/img";

  const path = generateUrl(
    { value: src, type: "plain" },
    { 
      width, 
      height,
      format: "webp", 
      quality: quality ?? 80, 
      resizing_type: "fill" 
    },
  );

  // path comes out as "/f:webp/q:80/..."
  // Concatenating them gives you exactly: 
  // https://ds1.property.new/img/f:webp/...
  return `${BASE_URL}${path}`;
}