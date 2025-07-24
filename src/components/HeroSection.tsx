import { Button } from "@/components/common/Button";

export function HeroSection() {
  return (
    <div className="mx-auto max-w-4xl py-20">
      <div className="hidden sm:mb-8 sm:flex sm:justify-center">
        <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
          Check out my wordpress profile too.{" "}
          <Button variant="default" href="https://ryzmdn.wordpress.com/" className="font-medium text-indigo-600">
            <span aria-hidden="true" className="absolute inset-0" /> Visit Now <span aria-hidden="true">&rarr;</span>
          </Button>
        </div>
      </div>
      <div className="text-center">
        <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
          Welcome to My Personal Blog
        </h1>
        <p className="mt-8 text-base/7 text-pretty text-gray-500 sm:text-lg/8">Discover stories, insights, and inspiration from my journey. Explore articles on technology, creativity, and everyday life—written to spark ideas and connect with fellow readers.</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button href="/blog/category/all?page=1" className="px-5 py-3 rounded-xl">
            View All Blogs
          </Button>
          <Button variant="secondary" href="/collections" className="px-5 py-3 rounded-xl">
            See All Collections
          </Button>
        </div>
      </div>
    </div>
  );
}
