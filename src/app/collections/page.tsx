import type { Metadata } from "next";
import axios from "axios";
import { NotFound } from "@/components/Error/NotFound";
import { Button } from "@/components/Ui/Button";
import { Category } from "@/types/wordpress";

export const metadata: Metadata = {
  title: "Blog Collections",
};

async function getPosts() {
  try {
    const response = await axios.get<Category[]>(
      `${process.env.NEXT_PUBLIC_WORDPRESS_API}/categories`
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
    <div className="w-full py-12">
      {mappedPosts.length > 0 ? (
        <ul className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mappedPosts
            .toSorted((a, b) => b.postCount - a.postCount)
            .map((post) => (
              <li
                key={post.name}
                id={`collection-${post.name.replace(/ /gi, "-").toLowerCase()}`}
                className="col-span-1 flex rounded-md ring-1 ring-gray-200 dark:ring-gray-800"
              >
                <span className="flex w-20 shrink-0 items-center justify-center rounded-l-md font-medium text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-800">
                  {post.name.substring(0, 3).toUpperCase()}
                </span>
                <div className="flex-1 truncate px-4 py-2">
                  <Button
                    variant="link"
                    href={post.href}
                    className="capitalize text-lg/relaxed font-medium"
                  >
                    {post.name.replace(/-/gi, " ")}
                  </Button>
                  <p className="text-gray-700 dark:text-gray-300">
                    {post.postCount} Post{post.postCount > 1 ? "s" : ""}
                  </p>
                </div>
              </li>
            ))}
        </ul>
      ) : (
        <NotFound variant="error" />
      )}
    </div>
  );
}
