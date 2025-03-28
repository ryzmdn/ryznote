"use client";

import { useState, useEffect, useCallback, useMemo, ReactNode } from "react";

interface TimeProps {
  date: string | Date;
  children?: ReactNode;
  locale?: string;
  options?: Intl.DateTimeFormatOptions;
  relative?: boolean;
  tooltip?: boolean;
}

export function Time({
  date,
  children,
  locale = "en-US",
  options = { year: "numeric", month: "long", day: "numeric" },
  relative = false,
  tooltip = true,
  ...props
}: React.ComponentPropsWithoutRef<"time"> & TimeProps) {
  const [formattedDate, setFormattedDate] = useState<string>("");
  const [relativeTime, setRelativeTime] = useState<string>("");

  const parsedDate = useMemo(() => {
    return typeof date === "string" ? new Date(date) : date;
  }, [date]);

  const formatRelativeTime = useCallback(
    (seconds: number) => {
      const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

      const units = [
        { unit: "year", value: 31536000 },
        { unit: "month", value: 2592000 },
        { unit: "day", value: 86400 },
        { unit: "hour", value: 3600 },
        { unit: "minute", value: 60 },
        { unit: "second", value: 1 },
      ];

      for (const { unit, value } of units) {
        if (Math.abs(seconds) >= value || unit === "second") {
          return rtf.format(
            Math.floor(seconds / value),
            unit as Intl.RelativeTimeFormatUnit
          );
        }
      }
      return "";
    },
    [locale]
  );

  useEffect(() => {
    setFormattedDate(
      new Intl.DateTimeFormat(locale, options).format(parsedDate)
    );

    if (relative) {
      const diffInSeconds = Math.floor(
        (new Date().getTime() - parsedDate.getTime()) / 1000
      );
      setRelativeTime(formatRelativeTime(diffInSeconds));
    }
  }, [parsedDate, formatRelativeTime, locale, options, relative]);

  return (
    <time
      dateTime={parsedDate.toISOString()}
      title={tooltip ? formattedDate : undefined}
      data-time={formattedDate}
      {...props}
    >
      {children || (relative ? relativeTime : formattedDate)}
    </time>
  );
}
