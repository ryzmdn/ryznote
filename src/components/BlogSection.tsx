import { BlogCard } from "@/components/blog/BlogCard";
import { Button } from "@/components/common/Button";
import { NotFound } from "@/components/NotFound";
import { Svg } from "@/components/common/Svg";
import { Post } from "@/types/wordpress";

const BROWSE_MORE_BUTTON = (
  <Button
    variant="ghost"
    href="/blog/category/all?page=1"
    className="text-base px-3 py-1.5"
  >
    Browse more posts
    <Svg
      variant="outline"
      width={16}
      height={16}
      draw={["m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"]}
    />
  </Button>
);

function SectionHeader({
  title,
  action = BROWSE_MORE_BUTTON,
}: Readonly<{
  title: string;
  action?: React.ReactNode;
}>) {
  return (
    <header
      id={`${title.replace(/ /gi, "-").toLowerCase()}-header`}
      className="sm:flex sm:items-center sm:justify-between mb-8"
    >
      <h3 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
        {title}
      </h3>
      <div className="mt-3 sm:mt-0 sm:ml-4">{action}</div>
    </header>
  );
}

function BlogGrid({
  posts,
  variant = "default",
  error,
  from,
  to
}: Readonly<{
  posts: Post[];
  variant?: "default" | "featured";
  error: boolean;
  from?: number;
  to?: number;
}>) {
  if (error) return <NotFound variant="error" />;
  if (!posts.length) return <NotFound />;

  if (variant === "featured") {
    return (
      <>
        <div className="grid grid-cols-1 place-items-start gap-x-8 gap-y-12 sm:gap-y-16 lg:grid-cols-2">
          {posts.slice(0, 1).map((post) => (
            <BlogCard
              key={post.id}
              title={post.title.rendered}
              contentHtml={post.content.rendered}
              url={post.slug}
              category={post._embedded?.["wp:term"]?.[0]?.[0].name}
              datetime={post.date}
              description={post.excerpt.rendered}
            />
          ))}

          <div className="mx-auto w-full max-w-2xl space-y-8 border-t border-gray-900/10 pt-12 sm:pt-16 lg:mx-0 lg:max-w-none lg:border-t-0 lg:pt-0">
            {posts.slice(1, 3).map((post) => (
              <BlogCard
                key={post.id}
                title={post.title.rendered}
                contentHtml={post.content.rendered}
                url={post.slug}
                category={post._embedded?.["wp:term"]?.[0]?.[0].name}
                datetime={post.date}
                description={post.excerpt.rendered}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-16 mt-14 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.slice(3, 9).map((post) => (
            <BlogCard
              key={post.id}
              title={post.title.rendered}
              contentHtml={post.content.rendered}
              url={post.slug}
              category={post._embedded?.["wp:term"]?.[0]?.[0].name}
              datetime={post.date}
              description={post.excerpt.rendered}
            />
          ))}
        </div>
      </>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {posts
        .toSorted(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
        .slice(from, to)
        .map((post) => (
          <BlogCard
            key={post.id}
            title={post.title.rendered}
            contentHtml={post.content.rendered}
            url={post.slug}
            category={post._embedded?.["wp:term"]?.[0]?.[0].name}
            datetime={post.date}
            description={post.excerpt.rendered}
          />
        ))}
    </div>
  );
}

export { SectionHeader, BlogGrid };
