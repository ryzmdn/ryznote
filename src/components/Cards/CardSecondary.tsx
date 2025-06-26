'use client'

import { useEffect, useState } from "react";
import { Time } from "../Time";
import { formatDate } from "@/utils/fotmatDate";

interface SecondaryCardProps {
  contentHtml: string;
  datetime: string;
  url: string;
  category?: string;
  title: string;
  description: string;
}

export function CatdSecondary({
  contentHtml,
  datetime,
  url,
  category,
  title,
  description,
}: Readonly<SecondaryCardProps>) {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  
    useEffect(() => {
      const doc = new DOMParser().parseFromString(contentHtml, "text/html");
      const img = doc.querySelector("img[data-orig-file]");
      const imgSrc = img?.getAttribute("data-orig-file") || "https://placehold.co/600x400";
      setThumbnail(imgSrc);
    }, [contentHtml]);

  return (
    <article
      className="flex flex-col items-start justify-between"
    >
      <div className="relative w-full">
        <img
          alt=""
          src={thumbnail || "https://placehold.co/600x400"}
          className="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-2/1 lg:aspect-3/2"
        />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset" />
      </div>
      <div className="max-w-xl">
        <div className="mt-8 flex items-center gap-x-4 text-xs">
          <Time date={new Date(datetime).toLocaleDateString()}>
            {formatDate(new Date(datetime).toLocaleDateString())}
          </Time>
          <a
            href="/"
            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
          >
            {category}
          </a>
        </div>
        <div className="group relative">
          <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
            <a href="/">
              <span className="absolute inset-0" />
              {title}
            </a>
          </h3>
          <div className="mt-5 line-clamp-3 text-sm/6 text-gray-600" dangerouslySetInnerHTML={{ __html: description }} />
        </div>
        <div className="relative mt-8 flex items-center gap-x-4">
          <img
            alt=""
            src={thumbnail || "https://placehold.co/600x400"}
            className="size-10 rounded-full bg-gray-100"
          />
          <div className="text-sm/6">
            <p className="font-semibold text-gray-900">
              <a href="/">
                <span className="absolute inset-0" />
                John Doe
              </a>
            </p>
            <p className="text-gray-600">Writer</p>
          </div>
        </div>
      </div>
    </article>
  );
}
