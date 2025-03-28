import { Svg } from "@/components/Svg";

export function Pattern() {
  return (
    <Svg
      variant="custom"
      className="absolute inset-0 -z-10 size-full max-w-3xl mx-auto stroke-gray-600/10 dark:stroke-gray-400/10 [mask-image:radial-gradient(ellipse,white,transparent)]"
    >
      <defs>
        <pattern
          id="grid-pattern"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          <rect
            width="60"
            height="60"
            fill="none"
            strokeWidth="1"
            className="stroke-gray-600/10 dark:stroke-gray-400/10"
          />
        </pattern>
      </defs>
      <rect fill="url(#grid-pattern)" width="100%" height="100%" />
    </Svg>
  );
}
