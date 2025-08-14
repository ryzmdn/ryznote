import { Post } from "@/types/wordpress";
import { BlogCard, FeaturedBlogCard } from "./BlogCard";
import axios from "axios";

async function getPosts(): Promise<Post[]> {
  try {
    const response = await axios.get<Post[]>(
      `${process.env.NEXT_PUBLIC_WORDPRESS_API}/posts`,
      {
        params: {
          per_page: 12,
          _embed: true,
        },
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

export async function HeroSection() {
  const posts = await getPosts();

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-10 gap-y-12 px-6 sm:gap-y-16 lg:grid-cols-2 lg:px-0">
      <FeaturedBlogCard content={posts} />
      <div className="flex flex-col gap-y-8">
        {posts.slice(1, 3).map((post) => (
          <BlogCard
            key={post.id}
            title={post.title.rendered}
            url={post.slug}
            category={post._embedded?.["wp:term"]?.[0]?.[0].name}
            date={post.date}
            description={post.excerpt.rendered}
          />
        ))}
      </div>
    </div>
  );
}
