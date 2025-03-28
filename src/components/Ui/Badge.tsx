"use client";

import { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";
import { clss } from "@/utils/clss";

const variantStyles = {
  default: "text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-400/10 ring-gray-500/10 dark:ring-gray-400/20",
  colored: "text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-400/10 ring-blue-700/10 dark:ring-blue-400/30",
} as const;

type BadgeProps = {
  variant?: keyof typeof variantStyles;
  href?: string;
  title: string;
  rounded?: boolean;
  children: ReactNode;
  className?: string;
} & (
  | (ComponentPropsWithoutRef<typeof Link>)
  | (ComponentPropsWithoutRef<"a">)
);

export function Badge({
  variant = "default",
  href,
  title,
  rounded = true,
  children,
  className,
  ...props
}: Readonly<BadgeProps>) {
  const baseClassName = clss(
    "inline-flex items-center gap-x-1.5 px-2 py-1 text-xs font-medium ring-1 ring-inset",
    variantStyles[variant],
    rounded ? "rounded-full" : "rounded-md",
    className,
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
          title={title}
          {...(props as ComponentPropsWithoutRef<"a">)}
        >
          {children}
        </a>
      );
    }
    return (
      <Link className={baseClassName} href={href} title={title} {...(props as Omit<ComponentPropsWithoutRef<typeof Link>, "href">)}>
        {children}
      </Link>
    );
  }

  return (
    <span className={clss(baseClassName, "w-max cursor-default")} title={title}>
      {children}
    </span>
  );
}
