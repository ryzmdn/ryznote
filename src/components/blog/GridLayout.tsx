"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/common/Button";
import { Post } from "@/types/wordpress";
import { clss } from "@/utils/clss";
import { convertEncode } from "@/utils/encode";

export function GridLayout({ content }: Readonly<{ content: Post[] }>) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  function getThumbnailFromContent(contentHtml?: string): string {
    if (!isClient || !contentHtml) return "https://www.svgrepo.com/show/532577/image-square-xmark.svg";
    const doc = new DOMParser().parseFromString(contentHtml, "text/html");
    const img = doc.querySelector("img[data-orig-file]");
    return (
      img?.getAttribute("data-orig-file") || "https://www.svgrepo.com/show/532577/image-square-xmark.svg"
    );
  }

  return (
    <div className="grid grid-cols-1 gap-y-6 w-full my-8 py-8 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
      {content.slice(0, 3).map((post, index) => {
        const thumbnail = getThumbnailFromContent(post.content?.rendered);
        return (
          <div
            key={post.id}
            className={clss(
              index % 2 === 1
                ? "sm:row-span-2 sm:aspect-square"
                : "sm:aspect-auto",
              "group relative aspect-[2/1] overflow-hidden rounded-lg"
            )}
          >
            <Image
              fill
              src={thumbnail}
              alt={convertEncode(post.title.rendered) || "Post thumbnail"}
              className="absolute size-full object-cover group-hover:opacity-75"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"
            />
            <div className="absolute inset-0 flex items-end p-6">
              <div>
                <h3 className="text-xl/8 font-semibold text-gray-50">
                  <Button variant="default" href={`/blog/read/${post.slug}`} className="line-clamp-2">
                    <span className="absolute inset-0" />
                    {convertEncode(post.title.rendered)}
                  </Button>
                </h3>
                <p aria-hidden="true" className="mt-1 text-sm text-gray-50">
                  Read blog <span aria-hidden="true">&rarr;</span>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}