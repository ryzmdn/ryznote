"use client";

import { useState } from "react";
import { Button } from "@/components/common/Button";
import { Sidebar } from "@/components/Sidebar";
import { Svg } from "@/components/common/Svg";
import { Search } from "@/components/Search";
import Logo from "@/assets/logo.webp";
import { useTheme } from "@/context/ThemeProvider";
import Image from "next/image";

interface Navigation {
  name: string;
  href: string;
}

const navigation: Navigation[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Posts", href: "/blog/category/all?page=1" },
  { name: "Collections", href: "/collections" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const { darkMode, toggleTheme } = useTheme();

  return (
    <>
      <header
        id="Global Header"
        className="relative w-full max-w-6xl h-max mx-auto px-6 py-5 bg-transparent border-b border-gray-200 dark:border-gray-800 lg:px-0"
      >
        <nav
          aria-label="Global Navigation"
          className="flex items-center justify-between w-full"
        >
          <Button
            variant="default"
            href="/"
            aria-label="Go to the home page"
            className="flex items-center gap-x-2.5"
          >
            <div className="relative shrink-0 size-7">
              <Image src={Logo} alt="Primary logo" fill />
            </div>
            <span className="text-2xl text-gray-950 dark:text-gray-50 font-serif">
              RyzNotes
            </span>
          </Button>

          <div className="flex items-center gap-x-8 lg:hidden">
            <Search />

            <Button
              variant="ghost"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open the sidebar"
            >
              <Svg
                variant="outline"
                width={26}
                height={26}
                draw={["M3.75 9h16.5m-16.5 6.75h16.5"]}
              />
            </Button>
          </div>

          <div className="hidden gap-x-5 items-center w-full lg:flex">
            <div className="flex flex-1 justify-end items-center gap-x-5">
              {navigation.map((item) => (
                <Button
                  variant="link"
                  key={item.name}
                  href={item.href}
                  className="text-base/6 font-normal"
                >
                  {item.name}
                </Button>
              ))}
            </div>

            <div aria-hidden="true" className="block w-px h-4 bg-gray-200 dark:bg-gray-800 rounded-full" />

            <div className="flex items-center gap-x-6">
              <Search />

              <Button
                variant="ghost"
                onClick={toggleTheme}
                aria-label={`switch to ${darkMode ? "dark" : "light"} theme`}
                className="size-7"
              >
                <Svg
                  variant="outline"
                  width={20}
                  height={20}
                  draw={[
                    darkMode
                      ? "M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                      : "M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z",
                  ]}
                />
              </Button>
            </div>
          </div>
        </nav>
      </header>

      <Sidebar
        opened={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        navigation={navigation}
        toggleTheme={toggleTheme}
        darkMode={darkMode}
      />
    </>
  );
}
