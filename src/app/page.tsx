import axios from "axios";
import Image from "next/image";
import { Heading } from "@/components/Layout/Heading";
import { Button } from "@/components/Ui/Button";
import { BlogGrid, SectionHeader } from "@/components/Layout/BlogSection";

async function getPosts() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_WORDPRESS_API}/posts?_embed`);
    return response.data;
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
      <Heading />

      <div className="w-full my-16 space-y-16">
        <section id="featured-posts-section">
          <SectionHeader title="Featured posts" />
          <BlogGrid posts={posts} error={posts.length === 0} variant="featured" />
        </section>

        <CollectionSection />

        <section id="recent-posts-section">
          <SectionHeader title="Recent posts" />
          <div className="my-10">
            <BlogGrid posts={posts} from={0} to={6} error={posts.length === 0} />
          </div>
        </section>
      </div>
    </>
  );
}
