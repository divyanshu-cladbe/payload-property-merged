import React from "react";
import type { SVGProps } from "react";

export function IconoirView360(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4 8.5h1.75m0 0a1.75 1.75 0 1 1 0 3.5H3m2.75-3.5a1.75 1.75 0 1 0 0-3.5H3m18 10c0 3.314-4.03 6-9 6s-9-2.686-9-6M14 5h-1a3 3 0 0 0-3 3v2m4.5-.5v.5a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2v-.5a2 2 0 0 1 2-2h.5a2 2 0 0 1 2 2m2.5-1V7a2 2 0 0 1 2-2h.5a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H19a2 2 0 0 1-2-2z"
      ></path>
    </svg>
  );
}

export function TrustedIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={36}
      height={36}
      viewBox="0 0 16 16"
      {...props}
    >
      <path
        fill="currentColor"
        d="M13.4 3c-1.837 0-3.486-.333-4.974-1.824a.6.6 0 0 0-.848 0C6.086 2.667 4.436 3 2.601 3a.6.6 0 0 0-.6.6v3.602c0 3.862 1.97 6.487 5.81 7.768a.6.6 0 0 0 .38 0c3.841-1.28 5.81-3.906 5.81-7.768V3.6c0-.331-.27-.6-.601-.6M13 7.201c0 3.396-1.636 5.614-5 6.776c-3.364-1.162-5-3.38-5-6.776V3.995c1.579-.039 3.352-.349 5.001-1.843C9.647 3.645 11.421 3.955 13 3.995zM7.499 8.793l2.646-2.646a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708z"
      ></path>
    </svg>
  );
}

export function GameIconsCheckMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 512 512" {...props}>
      <path
        fill="currentColor"
        d="M17.47 250.9C88.82 328.1 158 397.6 224.5 485.5c72.3-143.8 146.3-288.1 268.4-444.37L460 26.06C356.9 135.4 276.8 238.9 207.2 361.9c-48.4-43.6-126.62-105.3-174.38-137z"
      ></path>
    </svg>
  );
}
