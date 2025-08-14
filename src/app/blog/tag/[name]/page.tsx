import axios from "axios";
import type { Metadata } from "next";
import { Pagination } from "@/components/ui/Pagination";
import { Svg } from "@/components/common/Svg";
import { Post, Term } from "@/types/wordpress";
import { BlogCard } from "@/components/ui/BlogCard";

export const metadata: Metadata = {
  title: "Blog Tag",
};

const POSTS_PER_PAGE: number = 12;

interface PostsResponse {
  posts: Post[];
  totalPages: number;
}

async function getTagId(slug: string): Promise<number | null> {
  try {
    const formatSlug = encodeURIComponent(slug.replace(/\s+/g, "-"));
    const { data } = await axios.get<Term[]>(
      `${process.env.NEXT_PUBLIC_WORDPRESS_API}/tags?slug=${formatSlug}`,
      {
        params: {
          per_page: 100,
          _embed: true,
        },
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
    return data.length > 0 ? data[0].id : null;
  } catch (error) {
    console.error("Error fetching tag ID:", error);
    return null;
  }
}

async function getPostsByTag(
  tagSlug: string,
  page: number
): Promise<PostsResponse> {
  const tagId = await getTagId(tagSlug);
  if (tagId === null) return { posts: [], totalPages: 1 };

  try {
    const { data, headers } = await axios.get<Post[]>(
      `${process.env.NEXT_PUBLIC_WORDPRESS_API}/posts`,
      {
        params: {
          tags: tagId,
          per_page: POSTS_PER_PAGE,
          page,
          _embed: true,
        },
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );

    const totalPosts = parseInt(headers["x-wp-total"], 10) || 0;
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

    return { posts: data, totalPages };
  } catch (error) {
    console.error("Error fetching posts by tag:", error);
    return { posts: [], totalPages: 1 };
  }
}

type Params = Promise<{ name: string }>;
type SearchParams = Promise<{ page: string }>;

export default async function TopicPage({
  params,
  searchParams,
}: Readonly<{ params: Params; searchParams: SearchParams }>) {
  const { name } = await params;
  const { page } = await searchParams;
  const currentPage = parseInt(page || "1", 10);
  const tagName = decodeURIComponent(name.replace(/-/gi, " "));
  const { posts, totalPages } = await getPostsByTag(tagName, currentPage);

  return (
    <>
      <header
        id={`header-tag-${name}`}
        className="bg-transparent px-6 py-20 sm:py-24 lg:px-8"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight capitalize text-gray-900 dark:text-gray-100 sm:text-5xl">
            {name.replace(/-/gi, " ")}
          </h2>
          <div className="flex justify-center items-center gap-x-4 mt-5 text-gray-500 sm:text-lg/8">
            <p>Topic</p>
            <Svg
              variant="custom"
              width={6}
              height={6}
              viewBox="0 0 6 6"
              current
            >
              <circle r={2} cx={2} cy={2} />
            </Svg>
            <p>
              {posts.length} Post{posts.length > 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </header>

      <section id="tag-posts-section" className="grid grid-cols-1 gap-x-8 gap-y-10 w-full my-10 sm:grid-cols-2">
        {posts.map((post) => (
          <BlogCard
            key={post.id}
            title={post.title.rendered}
            url={post.slug}
            category={post._embedded?.["wp:term"]?.[0]?.[0].name}
            date={post.date}
            description={post.excerpt.rendered}
          />
        ))}
      </section>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        baseUrl={`/blog/tag/${name}`}
      />
    </>
  );
}
