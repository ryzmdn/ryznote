"use client";

import { Button } from "@/components/common/Button";
import { Logo } from "@/components/Logo";
import { Category } from "@/types/wordpress";
import { CallToAction } from "./CallToAction";

interface NavigationPage {
  name: string;
  href: string;
}

interface Navigation {
  [key: string]: NavigationPage[];
}

const navigation: Navigation = {
  pages: [
    { name: "About", href: "about" },
    { name: "Blog", href: "blog/category/all?page=1" },
    { name: "Collections", href: "collections" },
    { name: "Contact", href: "contact" },
    { name: "Faqs", href: "frequently-asked-questions" },
  ],
  resources: [
    { name: "Terms of service", href: "terms-of-service" },
    { name: "Privacy policy", href: "privacy-policy" },
    { name: "License", href: "license" },
    { name: "RSS Page", href: "feed.xml" },
  ],
};

export function Footer({ categories }: Readonly<{ categories: Category[] }>) {
  const topCategories = categories
    .filter((category) => category.count > 0)
    .toSorted((a, b) => b.count - a.count)
    .slice(0, 5);
  const year: number = new Date().getFullYear();

  return (
    <>
      <CallToAction />

      <footer
        id="Global footer"
        className="bg-gray-50 dark:bg-gray-950 px-4 pb-5 border-t border-gray-600/10 dark:border-gray-400/10 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 mt-8 py-8 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-14">
          <div className="col-span-2 flex flex-col items-start gap-y-6 md:col-span-3 lg:col-span-2">
            <Button
              variant="default"
              href="/"
              aria-label="Go to the home page"
              className="flex items-center gap-x-2 -m-1.5 p-1.5"
            >
              <Logo />
              <span className="text-xl font-semibold text-gray-950 dark:text-gray-50">
                RyzNote
              </span>
            </Button>
            <p className="text-sm/6 text-gray-700 dark:text-gray-300">
              Discover stories, insights, and inspiration from my journey.
              Explore articles on technology, creativity, and everyday
              life—written to spark ideas and connect with fellow readers.
            </p>
          </div>

          {topCategories.length > 0 && (
            <div className="text-start w-full">
              <h3 className="text-sm/6 font-medium text-gray-800 dark:text-gray-200">
                Suggestions
              </h3>
              <ul className="flex flex-col gap-y-3 mt-6 w-full">
                <li>
                  <Button
                    variant="link"
                    href="/blog/category/all?page=1"
                    className="font-normal text-sm/6 text-gray-600 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    All
                  </Button>
                </li>
                {topCategories.slice(0, 4).map((cat) => (
                  <li key={cat.id}>
                    <Button
                      variant="link"
                      href={`/blog/category/${cat.slug}?page=1`}
                      className="font-normal capitalize text-sm/6 text-gray-600 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      {cat.name}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {Object.entries(navigation).map(([category, items]) => (
            <div key={category} className="text-start w-full">
              <h3 className="text-sm/6 font-medium text-gray-800 dark:text-gray-200">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h3>
              <ul className="flex flex-col gap-y-3 mt-6 w-full">
                {items.map((item) => (
                  <li key={item.name}>
                    <Button
                      variant="link"
                      href={`/${item.href}`}
                      className="font-normal text-sm/6 text-gray-600 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      {item.name}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 border-t border-gray-900/10 dark:border-gray-100/10 pt-5">
          <p className="text-sm/6 text-gray-600 dark:text-gray-400">
            &copy; {year} RyzNote, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
