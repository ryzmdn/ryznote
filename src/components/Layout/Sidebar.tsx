"use client";

import { useEffect } from "react";
import { Button } from "@/components/Ui/Button";
import { clss } from "@/utils/clss";
import { Svg } from "@/components/Svg";
import { Logo } from "@/components/Ui/Logo";
import { usePathname } from "next/navigation";

interface SidebarProps {
  opened: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  navigation: { name: string; href: string }[];
  toggleTheme: () => void;
  darkMode: boolean;
}

export function Sidebar({
  opened,
  setMobileMenuOpen,
  navigation,
  toggleTheme,
  darkMode,
}: Readonly<SidebarProps>) {
  useEffect(() => {
    if (opened) {
      document.documentElement.classList.add("overflow-hidden");
    }

    return () => {
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, [opened]);

  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname, setMobileMenuOpen]);

  return (
    <div className={clss("fixed inset-0 z-50 lg:hidden", opened ? "block" : "hidden")}>
      {opened && (
        <button
          className="fixed inset-0 z-40 backdrop-blur-sm bg-gray-400/25 dark:bg-gray-950/40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <aside id="mobile-sidebar" className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-gray-50 dark:bg-gray-950 shadow-lg ring-1 ring-gray-900/10 dark:ring-gray-100/10 px-6 py-6">
        <div className="flex items-center justify-between">
          <Button
            variant="default"
            href="/"
            aria-label="Go to the home page"
            className="flex items-center gap-x-2 -m-1.5 p-1.5"
          >
            <Logo />
            <span className="text-xl font-semibold text-gray-950 dark:text-gray-50">
              RyzNotes
            </span>
          </Button>

          <Button
            variant="default"
            onClick={() => setMobileMenuOpen(false)}
            className="-m-2.5 text-gray-800 dark:text-gray-200"
          >
            <Svg
              variant="outline"
              width={20}
              height={20}
              draw={["M6 18 18 6M6 6l12 12"]}
            />
          </Button>
        </div>

        <div className="mt-6 px-2">
          <div className="flex flex-col gap-y-2 py-6 divide-y divide-gray-100 dark:divide-gray-900">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant="link"
                href={item.href}
                rounded={false}
                className="-mx-3 justify-start px-3 py-2.5 text-base/7"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-3">
          <Button
            variant="secondary"
            onClick={toggleTheme}
            className="w-max flex items-center justify-center gap-2 text-sm px-2.5 py-1.5"
          >
            {darkMode ? (
              <>
                <Svg
                  variant="outline"
                  width={16}
                  height={16}
                  draw={[
                    "M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z",
                  ]}
                />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Svg
                  variant="outline"
                  width={16}
                  height={16}
                  draw={[
                    "M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z",
                  ]}
                />
                <span>Dark Mode</span>
              </>
            )}
          </Button>
        </div>
      </aside>
    </div>
  );
}
