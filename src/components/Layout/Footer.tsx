"use client"

import { Button } from "@/components/Ui/Button";
import { Svg } from "@/components/Svg";
import { Pattern } from "@/components/Pattern";
import { Category } from "@/types/wordpress";
import { Logo } from "@/components/Ui/Logo";

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
  legal: [
    { name: "Terms of service", href: "terms-of-service" },
    { name: "Privacy policy", href: "privacy-policy" },
    { name: "License", href: "license" },
  ],
  other: [
    { name: "RSS", href: "feed.xml" }
  ]
};

export function Footer({ categories }: Readonly<{ categories: Category[] }>) {
  const topCategories = categories
    .filter((category) => category.count > 0)
    .toSorted((a, b) => b.count - a.count)
    .slice(0, 5);
  const year: number = new Date().getFullYear();

  return (
    <>
      <div className="relative isolate overflow-hidden bg-transparent px-6 py-24">
        <Pattern />
        <h2 className="mx-auto max-w-3xl text-center text-3xl font-semibold tracking-tight text-gray-800 dark:text-gray-200 sm:text-4xl">
          Get notifications for new posts
        </h2>
        <form className="mx-auto w-full mt-10 max-w-lg">
          <div className="flex flex-col gap-4 lg:flex-row">
            <label htmlFor="email-address-cta" className="sr-only">
              Email address
            </label>
            <input
              id="email-address-cta"
              name="email-address-cta"
              type="email"
              required
              placeholder="Enter your email"
              spellCheck={false}
              autoComplete="off"
              className="min-w-0 flex-auto rounded-md bg-gray-50 dark:bg-gray-950 px-4 py-2.5 text-base text-gray-700 dark:text-gray-300 outline-1 -outline-offset-1 outline-gray-900/10 dark:outline-gray-100/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2"
            />
            <Button type="submit" className="py-2 px-4">
              Subscribe
            </Button>
          </div>
          <p className="mt-2 ml-1 text-xs/6 text-gray-600 dark:text-gray-400">
            This feature is under development.
          </p>
        </form>
      </div>

      <footer id="Global footer" className="bg-gray-50 dark:bg-gray-950 px-4 pb-5 border-t border-gray-600/10 dark:border-gray-400/10 sm:px-6 lg:px-8">
        <div className="pt-10 xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="flex flex-col items-start gap-y-6">
            <Button
              variant="default"
              href="/"
              aria-label="Go to the home page"
              className="flex items-center gap-x-2 -m-1.5 p-1.5"
            >
              <Logo />
              <span className="text-xl font-semibold text-gray-950 dark:text-gray-50">RyzNote</span>
            </Button>
            <div>
              <label htmlFor="language-footer" className="sr-only">
                Translate
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-gray-50 dark:bg-gray-950 w-max pl-3 outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-700 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                  <Svg
                    variant="outline"
                    width={16}
                    height={16}
                    draw={[
                      "m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802",
                    ]}
                    className="col-start-1 row-start-1 text-gray-600 dark:text-gray-400"
                  />
                  <div className="grid shrink-0 grid-cols-1 w-60">
                    <select
                      id="language-footer"
                      name="language"
                      aria-label="Change language"
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md py-1.5 pr-7 pl-3 text-sm/6 text-gray-600 dark:text-gray-400 placeholder:text-gray-500 focus:outline-0"
                    >
                      <option>English</option>
                    </select>
                    <Svg
                      variant="outline"
                      width={16}
                      height={16}
                      draw={["m19.5 8.25-7.5 7.5-7.5-7.5"]}
                      className="text-gray-600 dark:text-gray-400 col-start-1 row-start-1 mr-2 self-center justify-self-end"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-y-8 md:grid-cols-4 sm:gap-x-6 sm:gap-y-8 xl:col-span-2 xl:mt-0">
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
