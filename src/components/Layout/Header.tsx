"use client";

import { useState } from "react";
import { Button } from "@/components/Ui/Button";
import { useTheme } from "@/context/ThemeProvider";
import { Sidebar } from "@/components/Layout/Sidebar";
import { Svg } from "@/components/Svg";
import { Logo } from "@/components/Ui/Logo";
import { Badge } from '../Ui/Badge';

interface Navigation {
  name: string;
  href: string;
}

const navigation: Navigation[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Blogs", href: "/blog/category/all?page=1" },
  { name: "Collections", href: "/collections" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const { darkMode, toggleTheme } = useTheme();

  return (
    <>
      <header id="Global Header" className="absolute top-0 left-0 z-30 w-full h-max bg-transparent">
        <nav aria-label="Global Navigation" className="flex items-center justify-between w-full p-6">
          <div className="flex items-center gap-x-3.5">
            <Button
              variant="default"
              href="/"
              aria-label="Go to the home page"
              className="flex items-center gap-x-2 -m-1.5 p-1.5"
            >
              <Logo />
              <span className="text-xl font-semibold text-gray-950 dark:text-gray-50">RyzNote</span>
            </Button>
            <Badge title="Beta version">Beta</Badge>
          </div>
          <div className="flex lg:hidden">
            <Button
              variant="ghost"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open the sidebar"
              className="size-8"
            >
              <Svg variant="outline" width={28} height={28} draw={["M3.75 9h16.5m-16.5 6.75h16.5"]} />
            </Button>
          </div>
          <div className="hidden gap-x-6 items-center lg:flex">
            <div className="flex items-center gap-x-6">
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

            <span
              className="w-px h-5 bg-gray-300 dark:bg-gray-700 rounded-full"
              aria-hidden="true"
            />

            <Button
              variant="ghost"
              onClick={toggleTheme}
              aria-label={`switch to ${darkMode ? "dark" : "light"} theme`}
              className="size-7"
            >
              {darkMode ? (
                <Svg variant="outline" width={20} height={20} draw={["M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"]} />
              ) : (
                <Svg variant="outline" width={20} height={20} draw={["M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"]} />
              )}
            </Button>
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
