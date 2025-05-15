import { clss } from "@/utils/clss";
import { Svg } from "./Svg";

export function Pattern() {
  return (
    <div className="absolute inset-0 -z-10 size-full">
      <div
        className={clss(
          "absolute inset-0 size-full opacity-10 dark:opacity-25 pointer-events-none [background-size:40px_40px] select-none",
          "[background-image:linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)]",
        )}
      />
 
      <Svg
        variant="custom"
        className={clss(
          "animate-spotlight pointer-events-none absolute z-[1] h-[169%] w-[138%] lg:w-[84%] opacity-0",
          "-top-40 left-0 md:-top-20 md:left-60"
        )}
        viewBox="0 0 3787 2842"
      >
        <g filter="url(#filter)">
          <ellipse
            cx="1924.71"
            cy="273.501"
            rx="1924.71"
            ry="273.501"
            transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
            fill="#f9fafb80"
            fillOpacity="0.21"
          />
        </g>
        <defs>
          <filter
            id="filter"
            x="0.860352"
            y="0.838989"
            width="3785.16"
            height="2840.26"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feGaussianBlur
              stdDeviation="151"
              result="effect1_foregroundBlur_1065_8"
            ></feGaussianBlur>
          </filter>
        </defs>
      </Svg>

      <div className="pointer-events-none absolute inset-0 size-full flex items-center justify-center bg-gray-50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-gray-950" />
    </div>
  );
}
