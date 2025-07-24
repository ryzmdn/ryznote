import { Time } from "@/components/common/Time";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { clss } from "@/utils/clss";
import { formatDate } from "@/utils/fotmatDate";

export interface BlogCardProps {
  variant?: "primary" | "secondary";
  datetime: string;
  url: string;
  category: string | undefined;
  title: string;
  description: string;
}

export function BlogCard({
  variant = "secondary",
  datetime,
  url,
  category,
  title,
  description,
}: Readonly<BlogCardProps>) {
  const nonBreakingSpace = (text: string) => {
    return text.replace(/&nbsp;/gi, " ");
  };

  return (
    <article
      id={`blog-${title.replace(/ /gi, "-").toLowerCase()}`}
      className="flex max-w-xl flex-col items-start justify-between"
    >
      <div className="flex items-center gap-x-4 text-xs text-gray-600 dark:text-gray-400">
        <Time date={new Date(datetime).toLocaleDateString()}>
          {formatDate(new Date(datetime).toLocaleDateString())}
        </Time>
        <Badge
          title={category || ""}
          href={`/blog/tag/${category?.replace(/ /gi, "-").toLowerCase()}`}
          className="relative z-10 px-3 py-1.5 text-gray-600 dark:text-gray-400 font-medium"
        >
          {category
            ? category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
            : "Uncategorized"}
        </Badge>
      </div>
      <div className="relative w-full">
        <h3
          className={clss(
            variant === "primary" ? "text-3xl sm:text-4xl" : "text-xl",
            "text-gray-800 dark:text-gray-200 mt-3"
          )}
        >
          <Button
            variant="link"
            href={`/blog/read/${url}`}
            className="font-semibold"
          >
            <span
              className={clss(
                variant === "primary" ? "py-0.5" : "",
                "line-clamp-2"
              )}
            >
              {nonBreakingSpace(title)}
            </span>
          </Button>
        </h3>
        <div
          dangerouslySetInnerHTML={{ __html: nonBreakingSpace(description) }}
          className={clss(
            variant === "primary"
              ? "text-lg/8 line-clamp-4"
              : "text-sm/6 line-clamp-3",
            "mt-3 text-gray-600 dark:text-gray-400"
          )}
        />
      </div>

      <Button
        variant="link"
        href={`/blog/read/${url}`}
        aria-describedby="featured-post"
        className={clss(
          variant === "primary" ? "text-base/6 mt-4" : "text-sm/6 mt-3",
          "font-medium"
        )}
      >
        Read blog <span aria-hidden="true">&rarr;</span>
      </Button>
    </article>
  );
}
