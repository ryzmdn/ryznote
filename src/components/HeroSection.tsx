import { Button } from "@/components/common/Button";
import { UniqueCard } from "@/components/blog/UniqueCard";
import { Post } from "@/types/wordpress";
import { Svg } from "./common/Svg";

async function getPosts(): Promise<Post[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_API}/posts?_embed`,
      {
        next: { revalidate: 60 },
      }
    );
    return response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function HeroSection() {
  const posts = await getPosts();

  return (
    <>
      <div className="mx-auto max-w-4xl py-20">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 dark:text-gray-400 ring-1 ring-gray-900/10 dark:ring-gray-100/10 hover:ring-gray-900/20 dark:hover:ring-gray-100/20">
            Check out my wordpress profile too.{" "}
            <Button
              variant="default"
              href="https://ryzmdn.wordpress.com/"
              className="font-medium text-indigo-600 dark:text-indigo-400"
            >
              <span aria-hidden="true" className="absolute inset-0" /> Visit Now{" "}
              <span aria-hidden="true">&rarr;</span>
            </Button>
          </div>
        </div>
        <div className="flex justify-center mb-8 sm:hidden">
          <Button variant="default" href="https://ryzmdn.wordpress.com/" className="inline-flex space-x-6">
            <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-sm/6 font-semibold text-indigo-400 dark:text-indigo-600 ring-1 ring-indigo-500/25 ring-inset">
              Visit My Wordpress
            </span>
            <span className="inline-flex items-center space-x-2 text-sm/6 font-medium text-gray-700 dark:text-gray-300">
              <span>Let&apos;s go</span>
              <Svg
                variant="outline"
                width={16}
                height={16}
                draw={["m8.25 4.5 7.5 7.5-7.5 7.5"]}
                className="text-gray-500"
              />
            </span>
          </Button>
        </div>

        <div className="text-center">
          <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 dark:text-gray-100 sm:text-7xl">
            Welcome to My Personal Blog
          </h1>
          <p className="mt-8 text-base/7 text-pretty text-gray-600 dark:text-gray-300 sm:text-lg/8">
            Discover stories, insights, and inspiration from my journey. Explore
            articles on technology, creativity, and everyday life—written to
            spark ideas and connect with fellow readers.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              href="/blog/category/all?page=1"
              className="text-sm px-5 py-3 rounded-xl sm:text-base"
            >
              View All Blogs &rarr;
            </Button>
            <Button
              variant="secondary"
              href="/collections"
              className="text-sm px-5 py-3 rounded-xl sm:text-base"
            >
              See All Collections &rarr;
            </Button>
          </div>
        </div>
      </div>

      <section className="grid grid-cols-1 gap-x-8 gap-y-10 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:py-16">
        {posts.slice(0, 3).map((post) => (
          <UniqueCard
            key={post.id}
            contentHtml={post.content.rendered}
            title={post.title.rendered}
            url={post.slug}
            category={post._embedded?.["wp:term"]?.[0]?.[0].name}
            datetime={post.date}
          />
        ))}
      </section>
    </>
  );
}
