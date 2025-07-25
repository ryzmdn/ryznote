import Image from "next/image";
import { Button } from "@/components/common/Button";
import { SectionHeader } from "@/components/BlogSection";
import { Post } from "@/types/wordpress";
import { BlogCard } from "@/components/blog/BlogCard";
import { HeroSection } from "@/components/HeroSection";
import { SingleColumnCard } from "@/components/blog/SingleColumnCard";

async function getPosts(): Promise<Post[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API}/posts?_embed`, {
      next: { revalidate: 60 }
    });
    return response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}
 
function CollectionSection() {
  return (
    <div className="relative overflow-hidden rounded-lg lg:h-96">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1502945015378-0e284ca1a5be?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Collection section large image"
          priority
          fill
          className="size-full object-cover object-center"
        />
      </div>
      <div aria-hidden="true" className="relative h-96 w-full lg:hidden" />
      <div aria-hidden="true" className="relative h-32 w-full lg:hidden" />
      <div className="absolute inset-x-0 bottom-0 rounded-br-lg rounded-bl-lg bg-black/75 p-6 backdrop-blur-sm backdrop-filter sm:flex sm:items-center sm:justify-between lg:inset-x-auto lg:inset-y-0 lg:w-96 lg:flex-col lg:items-start lg:rounded-tl-lg lg:rounded-br-none">
        <div>
          <h2 className="text-xl font-bold text-white">Blog Collection</h2>
          <p className="mt-1 text-sm text-gray-300">
            See a collection of blogs with more categories that you can read.
          </p>
        </div>
        <Button
          variant="ghost"
          href="/collections"
          className="mt-6 flex shrink-0 items-center justify-center rounded-md border border-white/25 px-4 py-3 text-base font-medium text-white hover:bg-white/10 sm:mt-0 sm:ml-8 lg:ml-0 lg:w-full"
        >
          View the collection
        </Button>
      </div>
    </div>
  );
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <>
      <HeroSection />

      <div className="w-full my-16 space-y-16">
        <section id="featured-posts-section" className="w-full py-20 lg:py-24">
          <SectionHeader title="Featured posts" />
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 py-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(3, 9).map((post) => (
              <BlogCard
                key={post.id}
                contentHtml={post.content.rendered}
                title={post.title.rendered}
                url={post.slug}
                category={post._embedded?.["wp:term"]?.[0]?.[0].name}
                datetime={post.date}
                description={post.excerpt.rendered}
              />
            ))}
          </div>
        </section>

        <CollectionSection />

        <section id="recent-posts-section" className="w-full py-20 lg:py-24">
          <SectionHeader title="Recent posts" />
          <div className="grid grid-cols-1 gap-x-8 gap-y-10">
            {posts.slice(0, 6).map((post) => (
              <SingleColumnCard
                key={post.id}
                contentHtml={post.content.rendered}
                title={post.title.rendered}
                url={post.slug}
                category={post._embedded?.["wp:term"]?.[0]?.[0].name}
                datetime={post.date}
                description={post.excerpt.rendered}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
