import axios from "axios";
import { Button } from "@/components/common/Button";
import { Search } from "@/components/Search";
import { Svg } from "@/components/common/Svg";
import { Category } from "@/types/wordpress";

async function getPosts() {
  try {
    const response = await axios.get<Category[]>(`${process.env.NEXT_PUBLIC_WORDPRESS_API}/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function Heading() {
  const data = await getPosts();

  const topCategories = data.filter(category => category.count > 0).toSorted((a, b) => b.count - a.count).slice(0, 5);

  return (
    <div className="mx-auto max-w-4xl w-full pt-16 pb-6">
      <div className="hidden sm:mb-8 sm:flex sm:justify-center">
        <div className="relative flex items-center gap-x-2.5 rounded-full px-3 py-1 text-sm/6 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-950 ring-1 ring-gray-900/10 dark:ring-gray-100/10 hover:ring-gray-900/20 dark:hover:ring-gray-100/20">
          <Svg width={16} height={16} draw={["M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"]} className="text-yellow-400" />
          <span
            className="w-px h-3 bg-gray-300 dark:bg-gray-700 rounded-full"
            aria-hidden="true"
          />
          Find more blogs
          <Button
            variant="default"
            href="/blog/category/all?page=1"
            className="text-gray-700 dark:text-gray-300"
          >
            <span aria-hidden="true" className="absolute inset-0" />
            <Svg variant="outline" width={14} height={14} draw={["m8.25 4.5 7.5 7.5-7.5 7.5"]} />
          </Button>
        </div>
      </div>
      <div className="text-center">
        <h1 className="text-4xl font-medium tracking-tight text-balance text-gray-900 dark:text-gray-100 sm:text-5xl lg:text-6xl">
          From Local Starting Points, Towards Global Horizons
        </h1>

        <Search />

        <div className="flex flex-wrap justify-center items-center gap-6 my-8 px-4 md:flex-nowrap sm:px-6 lg:px-8">
          <h5 className="text-base/7 font-semibold text-gray-800 dark:text-gray-200">
            {topCategories.length > 0 ? "Top" : "No"} Suggestion
          </h5>
          {topCategories.length > 0 && (
            <>
              <span
                className="hidden w-px h-6 bg-gray-200 dark:bg-gray-800 md:block"
                aria-hidden="true"
              />
              
              <div className="flex flex-wrap justify-evenly items-center gap-x-4 gap-y-3 order-last w-full sm:gap-x-5 sm:gap-y-4 sm:order-none sm:w-auto md:justify-center lg:flex-nowrap">
                <Button
                  variant="link"
                  href="/blog/category/all?page=1"
                  className="text-sm/7 font-normal"
                >
                  All
                </Button>
                {topCategories.slice(0, 4).map((cat) => (
                  <Button
                    key={cat.id}
                    variant="link"
                    href={`/blog/category/${cat.slug}?page=1`}
                    className="text-sm/7 font-normal capitalize"
                  >
                    {cat.name.charAt(0).toUpperCase() + cat.name.slice(1).toLowerCase()}
                  </Button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
