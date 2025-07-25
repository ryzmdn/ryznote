"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Time } from "../common/Time";
import { formatDate } from "@/utils/fotmatDate";
import picture from "@/assets/picture.webp";
import { Button } from "../common/Button";
import { convertEncode } from "@/utils/encode";

interface Props {
  contentHtml: string;
  datetime: string;
  url: string;
  category?: string;
  title: string;
}

export function UniqueCard({
  contentHtml,
  datetime,
  url,
  category,
  title,
}: Readonly<Props>) {
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  useEffect(() => {
    const doc = new DOMParser().parseFromString(contentHtml, "text/html");
    const img = doc.querySelector("img[data-orig-file]");
    const imgSrc =
      img?.getAttribute("data-orig-file") || "https://www.svgrepo.com/show/532577/image-square-xmark.svg";
    setThumbnail(imgSrc);
  }, [contentHtml]);

  return (
    <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80">
      {thumbnail ? (
        <Image
          fill
          src={thumbnail}
          alt={`blog-thumbnail-${title.replace(/ /gi, "-").toLowerCase()}`}
          className="absolute inset-0 -z-10 size-full object-cover"
        />
      ) : (
        <div>h</div>
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
      <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 overflow-hidden text-sm/6 text-gray-300">
        <Time
          date={new Date(datetime).toLocaleDateString()}
          className="text-gray-300"
        >
          {formatDate(new Date(datetime).toLocaleDateString())}
        </Time>
        <div className="flex items-center gap-x-4">
          <svg
            viewBox="0 0 2 2"
            className="size-0.5 flex-none fill-gray-50/50"
          >
            <circle r={1} cx={1} cy={1} />
          </svg>
          <div className="flex gap-x-2.5">
            <Image
              src={picture}
              alt="me"
              className="size-6 flex-none rounded-full bg-gray-50/10"
            />
            Ryzmdn
          </div>
        </div>
      </div>
      <h3 className="mt-3 text-xl/7 font-semibold text-gray-100">
        <Button variant="default" href={`/blog/read/${url}`} className="line-clamp-2">
          <span className="absolute inset-0" />
          {convertEncode(title)}
        </Button>
      </h3>
    </article>
  );
}
