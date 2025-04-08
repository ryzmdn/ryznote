import type { Metadata } from "next";
import axios from "axios";
import { Pagination } from "@/components/Pagination";
import { Heading } from "@/components/Layout/Heading";
import { BlogGrid } from "@/components/Layout/BlogSection";
import { Category, Post } from "@/types/wordpress";

export const metadata: Metadata = {
  title: "Blogs",
};

const POSTS_PER_PAGE: number = 12;

async function getCategoryId(slug: string): Promise<number | null> {
  try {
    const { data } = await axios.get<Category[]>(
      `${process.env.NEXT_PUBLIC_WORDPRESS_API}/categories`,
      {
        headers: {
          "Cache-Control": "no-store"
        }
      }
    );
    const category = data.find((cat) => cat.slug === slug);
    return category ? category.id : null;
  } catch (error) {
    console.error("Error fetching category ID:", error);
    return null;
  }
}

async function getPostsByCategory(categorySlug: string, page: number) {
  try {
    if (categorySlug === "all") {
      const { data, headers } = await axios.get<Post[]>(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API}/posts`,
        {
          params: {
            per_page: POSTS_PER_PAGE,
            page,
            _embed: true,
          },
          headers: {
            "Cache-Control": "no-store"
          }
        }
      );
      const totalPosts = parseInt(headers["x-wp-total"], 10) || 0;
      const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
      return { posts: data, totalPages };
    }

    const categoryId = await getCategoryId(categorySlug);
    if (categoryId === null) return { posts: [], totalPages: 1 };

    const { data, headers } = await axios.get<Post[]>(
      `${process.env.NEXT_PUBLIC_WORDPRESS_API}/posts`,
      {
        params: {
          categories: categoryId,
          per_page: POSTS_PER_PAGE,
          page,
          _embed: true,
        },
        headers: {
          "Cache-Control": "no-store"
        }
      }
    );
    const totalPosts = parseInt(headers["x-wp-total"], 10) || 0;
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
    return { posts: data, totalPages };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { posts: [], totalPages: 1 };
  }
}

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ page: string }>;

export default async function CategoryPage({
  params,
  searchParams,
}: Readonly<{ params: Params; searchParams: SearchParams }>) {
  const { slug } = await params;
  const { page } = await searchParams;
  const tagName = decodeURIComponent(slug);
  const currentPage = parseInt(page || "1", 10);
  
  const { posts, totalPages } = await getPostsByCategory(tagName, currentPage);

  return (
    <>
      <Heading />

      <div id="category-posts-section" className="my-10">
        <BlogGrid posts={posts} error={posts.length === 0} />
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        baseUrl={`/blog/category/${slug}?page=1`}
      />
    </>
  );
}
