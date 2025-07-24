import type { Metadata } from "next";
import axios from "axios";
import { NotFound } from "@/components/NotFound";
import { Button } from "@/components/common/Button";
import { Category } from "@/types/wordpress";
import { Svg } from "@/components/common/Svg";

export const metadata: Metadata = {
  title: "Blog Collections",
};

async function getPosts(): Promise<Category[]> {
  try {
    const response = await axios.get<Category[]>(
      `${process.env.NEXT_PUBLIC_WORDPRESS_API}/categories`,
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function Collections() {
  const data = await getPosts();

  const mappedPosts = data
    .filter((category) => category.count > 0)
    .map((category) => ({
      name: category.name,
      href: `/blog/category/${category.slug}?page=1`,
      postCount: category.count,
    }));

  return (
    <>
      <div className="bg-transparent w-full pt-10 pb-5">
        <div className="text-center mx-auto max-w-2xl">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl">
            Posts by Collection
          </h2>
          <p className="mt-8 text-base font-medium text-pretty text-gray-600 dark:text-gray-400 sm:text-lg/7">
            Explore our blog posts organized by collections. Each collection
            contains a variety of topics and insights to enhance your reading
            experience.
          </p>
        </div>
      </div>

      <div className="w-full pt-14 pb-24">
        {mappedPosts.length > 0 ? (
          <ul className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {mappedPosts
              .toSorted((a, b) => b.postCount - a.postCount)
              .map((post) => (
                <li
                  key={post.name}
                  id={`collection-${post.name
                    .replace(/ /gi, "-")
                    .toLowerCase()}`}
                  className="group col-span-1 flex rounded-xl bg-gray-100 ring-1 ring-gray-200 dark:ring-gray-800"
                >
                  <Button
                    variant="default"
                    href={post.href}
                    className="capitalize text-lg/relaxed text-gray-800 dark:text-gray-200 font-medium size-full px-4 py-8"
                  >
                    {post.name.replace(/-/gi, " ")}
                    <Svg
                      variant="outline"
                      width={24}
                      height={24}
                      draw={[
                        "m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
                      ]}
                      className="text-gray-500 group-hover:-rotate-45"
                    />
                  </Button>
                </li>
              ))}
          </ul>
        ) : (
          <NotFound variant="error" />
        )}
      </div>
    </>
  );
}
