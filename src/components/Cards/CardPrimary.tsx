'use client'

import { useEffect, useState } from "react";
import { Time } from "../Time";
import { formatDate } from "@/utils/fotmatDate";
import Image from "next/image";
import picture from "@/assets/picture.webp";
import { convertEncode } from "@/utils/encode";
import Link from "next/link";

interface PrimaryCardProps {
  contentHtml: string;
  datetime: string;
  url: string;
  category?: string;
  title: string;
  description: string;
}

export function CardPrimary({
  contentHtml,
  datetime,
  url,
  category,
  title,
  description,
}: Readonly<PrimaryCardProps>) {
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  useEffect(() => {
    const doc = new DOMParser().parseFromString(contentHtml, "text/html");
    const img = doc.querySelector("img[data-orig-file]");
    const imgSrc = img?.getAttribute("data-orig-file") || "https://placehold.co/600x400";
    setThumbnail(imgSrc);
  }, [contentHtml]);

  return (
    <article className="relative isolate group flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pt-80 pb-8 sm:pt-48 lg:pt-80">
      {thumbnail ? (
        <Image
          fill
          alt={`blog-thumbnail-${title.replace(/ /gi, '-').toLowerCase()}`}
          src={thumbnail}
          className="absolute inset-0 -z-10 size-full object-cover group-hover:scale-105"
        />
      ) : (
        <div>h</div>
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
      <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-gray-900/10 ring-inset" />

      <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm/6 text-gray-300">
        <Time date={new Date(datetime).toLocaleDateString()}>
          {formatDate(new Date(datetime).toLocaleDateString())}
        </Time>
        <div className="ml-4 flex items-center gap-x-4">
          <svg
            viewBox="0 0 2 2"
            className="-ml-0.5 size-0.5 flex-none fill-white/50"
          >
            <circle r={1} cx={1} cy={1} />
          </svg>
          <div className="flex items-center gap-x-2.5">
            <div className="relative size-6 flex-none overflow-hidden rounded-full">
              <Image
                fill
                src={picture}
                alt=""
              />
            </div>
            Ryzmdn
          </div>
        </div>
      </div>

      <h3 className="mt-3 text-xl/7 font-semibold text-white line-clamp-2">
        <Link href={`/blog/read/${url}`}>
          <span className="absolute inset-0" />
          {convertEncode(title)}
        </Link>
      </h3>
    </article>
  );
}
