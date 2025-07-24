'use client'

import { useEffect, useState } from "react";
import { Time } from "@/components/common/Time";
import { formatDate } from "@/utils/fotmatDate";
import Image from "next/image";
import Link from "next/link";
import { convertEncode } from "@/utils/encode";
import picture from '@/assets/picture.webp';

interface Props {
  contentHtml: string;
  datetime: string;
  url: string;
  category?: string;
  title: string;
  description: string;
}

export function BlogCard({
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
      const imgSrc = img?.getAttribute("data-orig-file") || "https://placehold.co/600x400";
      setThumbnail(imgSrc);
    }, [contentHtml]);

  return (
    <article
      className="group flex flex-col items-start justify-between"
    >
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden sm:aspect-2/1 lg:aspect-3/2">
        {thumbnail ? (
          <Image
            fill
            src={thumbnail}
            alt={`blog-thumbnail-${title.replace(/ /gi, '-').toLowerCase()}`}
            className="w-full bg-gray-100 object-cover group-hover:scale-105"
          />
        ) : (
          <div>h</div>
        )}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset" />
      </div>
      <div className="max-w-xl">
        <div className="mt-4 flex items-center gap-x-4 text-xs">
          <Time date={new Date(datetime).toLocaleDateString()} className="text-gray-600 dark:text-gray-400">
            {formatDate(new Date(datetime).toLocaleDateString())}
          </Time>
          <Link
            href={`/blog/tag/${category?.replace(/ /gi, '-').toLowerCase()}?page=1`}
            className="inline-flex items-center capitalize rounded-full bg-gray-100 dark:bg-gray-900 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400"
          >
            {category}
          </Link>
        </div>
        <div className="group relative">
          <h3 className="mt-3 text-xl/7 line-clamp-2 font-semibold text-gray-900 dark:text-gray-100 group-hover:text-gray-600 dark:group-hover:text-gray-400">
            <Link href={`/blog/read/${url}`}>
              <span className="absolute inset-0" />
              {convertEncode(title)}
            </Link>
          </h3>
          <div className="mt-5 line-clamp-3 text-sm/6 text-gray-600 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: description }} />
        </div>
        <div className="relative mt-5 flex items-center gap-x-4">
          <div className="relative size-10 rounded-full overflow-hidden">
            <Image
              fill
              src={picture}
              alt="me"
              className="object-cover"
            />
          </div>
          <div className="text-sm">
            <p className="font-semibold text-gray-800 dark:text-gray-200">
              <Link href="/about">
                <span className="absolute inset-0" /> Ryzmdn
              </Link>
            </p>
            <p className="text-gray-600 dark:text-gray-300">Content Writer</p>
          </div>
        </div>
      </div>
    </article>
  );
}
