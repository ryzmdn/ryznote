"use client";

import { ReactNode } from "react";
import { clss } from "@/utils/clss";

export interface SvgProps {
  variant?: "outline" | "solid" | "custom";
  draw?: string[];
  viewBox?: string;
  width?: number;
  height?: number;
  current?: boolean;
  className?: string;
  children?: ReactNode;
}

export function Svg({
  variant = "solid",
  draw = [],
  viewBox,
  width,
  height,
  current = false,
  className,
  children,
}: Readonly<SvgProps>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={variant === "custom" ? viewBox : "0 0 24 24"}
      width={width}
      height={height}
      aria-hidden="true"
      className={clss(
        className,
        current && variant === "custom" || variant === "solid" ? "fill-current" : "",
        current && variant === "custom" || variant === "outline" ? "outline-current" : "",
        "pointer-events-none shrink-0"
      )}
    >
      {variant === "custom"
        ? children
        : draw.map((d) => (
            <path
              key={d}
              d={d}
              stroke={variant === "outline" ? "currentColor" : undefined}
              strokeWidth={variant === "outline" ? 1.5 : undefined}
              strokeLinecap={variant === "outline" ? "round" : undefined}
              strokeLinejoin={variant === "outline" ? "round" : undefined}
              strokeOpacity={variant === "outline" ? "100%" : undefined}
              fill={variant === "solid" ? "currentColor" : "none"}
              fillOpacity={variant === "solid" ? "100%" : undefined}
              fillRule={variant === "solid" ? "evenodd" : undefined}
              clipRule={variant === "solid" ? "evenodd" : undefined}
            />
          ))}
    </svg>
  );
}
