import axios from "axios";
import { SectionHeader } from "@/components/BlogSection";
import { BlogCard } from "@/components/ui/BlogCard";
import { Post } from "@/types/wordpress";
import { HeroSection } from "@/components/ui/HeroSection";

async function getPosts(): Promise<Post[]> {
  try {
    const response = await axios.get<Post[]>(
      `${process.env.NEXT_PUBLIC_WORDPRESS_API}/posts`,
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
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <section id="featured-posts-section" className="w-full py-20 lg:py-24">
      <HeroSection />
      <div className="py-20">
        <SectionHeader title="Featured posts" />
        <div className="grid grid-cols-1 gap-x-10 gap-y-16 py-5 sm:grid-cols-2">
          {posts.slice(3).map((post) => (
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
    </section>
  );
}
