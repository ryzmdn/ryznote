import { Time } from "@/components/common/Time";
import { Button } from "@/components/common/Button";
import { formatDate } from "@/utils/fotmatDate";
import { convertEncode } from "@/utils/encode";
import { Post } from "@/types/wordpress";

interface Props {
  date: string;
  url: string;
  category?: string;
  title: string;
  description: string;
}

export function FeaturedBlogCard({ content }: Readonly<{ content: Post[] }>) {
  return (
    <article className="mx-auto w-full max-w-2xl lg:mx-0 lg:max-w-lg">
      <div className="flex items-center gap-x-4">
        <Time
          date={new Date(content[0].date).toLocaleDateString()}
          className="text-gray-600 dark:text-gray-400"
        >
          {formatDate(new Date(content[0].date).toLocaleDateString())}
        </Time>
        <Button
          variant="ghost"
          href={`/blog/tag/${content[0]._embedded?.["wp:term"]?.[0]?.[0].name
            ?.replace(/ /gi, "-")
            .toLowerCase()}?page=1`}
          className="capitalize rounded-full bg-gray-100 dark:bg-gray-900 px-2 py-1 font-medium text-gray-600 dark:text-gray-400"
        >
          {content[0]._embedded?.["wp:term"]?.[0]?.[0].name}
        </Button>
      </div>
      <h3
        id="featured-post"
        className="text-pretty text-3xl tracking-tight text-gray-900 mt-3 sm:text-4xl lg:text-5xl"
      >
        <Button
          variant="link"
          href={`/blog/read/${content[0].slug}`}
          className="font-semibold line-clamp-2 py-1"
        >
          <span className="absolute inset-0" />
          {convertEncode(content[0].title.rendered)}
        </Button>
      </h3>
      <div
        dangerouslySetInnerHTML={{ __html: content[0].excerpt.rendered }}
        className="mt-4 text-lg/8 text-gray-600 line-clamp-3"
      />
      <div className="mt-4 flex flex-col justify-between gap-6 sm:mt-8 sm:flex-row-reverse sm:gap-8 lg:mt-4 lg:flex-col">
        <div className="flex">
          <Button
            variant="link"
            href={`/blog/read/${content[0].slug}`}
            aria-describedby="featured-post"
            className="text-sm/6 font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Continue reading <span aria-hidden="true">&rarr;</span>
          </Button>
        </div>
      </div>
    </article>
  );
}

export function BlogCard({
  date,
  url,
  category,
  title,
  description,
}: Readonly<Props>) {
  return (
    <article className="flex max-w-xl flex-col items-start justify-between">
      <div className="flex items-center gap-x-4 text-xs">
        <Time
          date={new Date(date).toLocaleDateString()}
          className="text-gray-600 dark:text-gray-400"
        >
          {formatDate(new Date(date).toLocaleDateString())}
        </Time>
        <Button
          variant="ghost"
          href={`/blog/tag/${category
            ?.replace(/ /gi, "-")
            .toLowerCase()}?page=1`}
          className="capitalize rounded-full bg-gray-100 dark:bg-gray-900 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400"
        >
          {category}
        </Button>
      </div>
      <div className="group relative grow">
        <h3 className="mt-3 text-xl text-gray-800 dark:text-gray-200 group-hover:text-gray-600">
          <Button
            variant="link"
            href={`/blog/read/${url}`}
            className="font-semibold line-clamp-2"
          >
            <span className="absolute inset-0" />
            {convertEncode(title)}
          </Button>
        </h3>
        <div
          className="mt-5 line-clamp-2 text-sm/6 text-gray-700 dark:text-gray-300"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </article>
  );
}
