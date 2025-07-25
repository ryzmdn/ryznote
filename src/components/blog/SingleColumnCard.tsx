"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Time } from "../common/Time";
import { formatDate } from "@/utils/fotmatDate";
import { Button } from "../common/Button";
import { convertEncode } from "@/utils/encode";
import picture from "@/assets/picture.webp";

interface Props {
  contentHtml: string;
  datetime: string;
  url: string;
  category?: string;
  title: string;
  description: string;
}

export function SingleColumnCard({
  contentHtml,
  datetime,
  url,
  category,
  title,
  description,
}: Readonly<Props>) {
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  useEffect(() => {
    const doc = new DOMParser().parseFromString(contentHtml, "text/html");
    const img = doc.querySelector("img[data-orig-file]");
    const imgSrc =
      img?.getAttribute("data-orig-file") || "https://placehold.co/600x400";
    setThumbnail(imgSrc);
  }, [contentHtml]);

  return (
    <article className="relative isolate flex flex-col gap-8 lg:flex-row">
      <div className="relative aspect-video sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
        {thumbnail ? (
          <Image
            fill
            src={thumbnail}
            alt={`blog-thumbnail-${title.replace(/ /gi, "-").toLowerCase()}`}
            className="absolute inset-0 size-full rounded-2xl bg-gray-50 object-cover"
          />
        ) : (
          <div>h</div>
        )}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
      </div>
      <div>
        <div className="flex items-center gap-x-4 text-xs">
          <Time
            date={new Date(datetime).toLocaleDateString()}
            className="text-gray-600 dark:text-gray-400"
          >
            {formatDate(new Date(datetime).toLocaleDateString())}
          </Time>
          <Button
            variant="ghost"
            href={`/blog/tag/${category
              ?.replace(/ /gi, "-")
              .toLowerCase()}?page=1`}
            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
          >
            {category}
          </Button>
        </div>
        <div className="group relative max-w-xl">
          <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
            <Button variant="link" href={`/blog/read/${url}`}>
              <span className="absolute inset-0" />
              {convertEncode(title)}
            </Button>
          </h3>
          <div dangerouslySetInnerHTML={{ __html: description }} className="mt-5 text-sm/6 text-gray-600 line-clamp-2" />
        </div>
        <div className="mt-6 flex border-t border-gray-900/5 pt-6">
          <div className="relative flex items-center gap-x-4">
            <div className="relative size-10 rounded-full overflow-hidden">
              <Image fill src={picture} alt="me" className="object-cover" />
            </div>
            <div className="text-sm/6">
              <p className="font-semibold text-gray-900">
                <Button variant="link" href="/about">
                  <span className="absolute inset-0" /> Ryzmdn
                </Button>
              </p>
              <p className="text-gray-600">Content Writer</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
