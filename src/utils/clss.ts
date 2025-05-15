import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function clss(...args: ClassValue[]) {
  return twMerge(clsx(args));
}
