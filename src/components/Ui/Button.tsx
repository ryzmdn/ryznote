"use client";

import { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";
import { clss } from "@/utils/clss";

const variantStyles = {
  primary: "bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-gray-200 shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:text-gray-100 disabled:bg-gray-300 dark:disabled:text-gray-700 dark:disabled:bg-gray-800",
  secondary: "bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900 shadow-xs disabled:text-gray-400 disabled:bg-gray-200",
  outline: "bg-gray-50 text-gray-800 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 shadow-xs disabled:text-gray-400 disabled:bg-gray-200 disabled:ring-gray-200",
  ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-800 dark:text-gray-200 disabled:text-gray-400 disabled:hover:bg-transparent",
  link: "text-gray-800 dark:text-gray-200 hover:underline disabled:hover:no-underline disabled:text-gray-400",
  default: ""
} as const;

type ButtonProps = {
  variant?: keyof typeof variantStyles;
  type?: "button" | "submit" | "reset";
  rounded?: boolean;
  href?: string;
  current?: boolean;
  children: ReactNode;
  className?: string;
} & (
  | (ComponentPropsWithoutRef<"button">)
  | (ComponentPropsWithoutRef<typeof Link>)
  | (ComponentPropsWithoutRef<"a">)
);

export function Button({
  variant = "primary",
  type = "button",
  rounded = false,
  href,
  current = false,
  children,
  className,
  ...props
}: Readonly<ButtonProps>) {
  const radius: string = rounded ? "rounded-full" : "rounded-sm"
  const baseClassName = clss(
    "inline-flex justify-center items-center gap-x-2 font-medium cursor-pointer disabled:cursor-not-allowed",
    variantStyles[variant],
    variant === "link" || variant === "default" ? "" : radius,
    current ? "text-current" : "",
    className
  );

  if (href) {
    const isExternalUrl: boolean = href.startsWith("http://") || href.startsWith("https://");
    if (isExternalUrl) {
      return (
        <a
          className={baseClassName}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          {...(props as ComponentPropsWithoutRef<"a">)}
        >
          {children}
        </a>
      );
    }
    return (
      <Link className={baseClassName} href={href} {...(props as Omit<ComponentPropsWithoutRef<typeof Link>, "href">)}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={baseClassName} {...(props as ComponentPropsWithoutRef<"button">)}>
      {children}
    </button>
  );
}
