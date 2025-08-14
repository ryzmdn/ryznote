"use client";

import { Button } from "./common/Button";
import { Svg } from "./common/Svg";
import { socialIcons } from "./Icons";

interface NavigationPage {
  name: string;
  href: string;
}

const navigation: NavigationPage[] = [
  { name: "Terms of service", href: "terms-of-service" },
  { name: "Privacy policy", href: "privacy-policy" },
  { name: "License", href: "license" },
  { name: "RSS Page", href: "feed.xml" },
];

export function Footer() {
  return (
    <footer className="w-full bg-gray-50 dark:bg-gray-950">
      <div className="space-y-6 mx-auto max-w-7xl overflow-hidden pt-10 pb-5">
        <nav
          aria-label="Footer"
          className="flex flex-wrap justify-center gap-x-12 gap-y-3 text-sm/6"
        >
          {navigation.map((item) => (
            <Button
              variant="link"
              key={item.name}
              href={item.href}
              className="font-normal"
            >
              {item.name}
            </Button>
          ))}
        </nav>
        <div className="flex justify-center gap-x-6">
          {socialIcons.map((item) => (
            <Button
              variant="ghost"
              key={item.name}
              href={item.href}
              className="size-10"
              rounded
            >
              <Svg width={24} height={24} draw={[item.path]} />
            </Button>
          ))}
        </div>
        <p className="text-center text-sm/6 text-gray-700 dark:text-gray-300">
          &copy; 2024 Your Company, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
