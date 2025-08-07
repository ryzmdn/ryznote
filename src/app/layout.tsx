import { ReactNode } from "react";
import type { Metadata } from "next";
import { Fira_Code, Merriweather, Montserrat } from "next/font/google";
import { Provider } from "@/app/provider";
import { clss } from "@/utils/clss";
import "@/app/globals.css";

const monsterrat = Montserrat({
  variable: "--font-monsterrat",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s - RyzNotes",
    default: "RyzNotes | My Personal Blog",
  },
  description:
    "Personal blog of Rizky Ramadhan, a blogger and web developer sharing knowledge about technology, programming, and self-development.",
  generator: "Next.js",
  applicationName: "RyzNotes",
  referrer: "origin-when-cross-origin",
  keywords: [
    "RyzNotes",
    "Rizky Ramadhan",
    "Blog",
    "Personal Blog",
    "Web Development",
    "Programming",
    "Technology",
    "JavaScript",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Rizky Ramadhan", url: process.env.NEXT_PUBLIC_SITE_URL }],
  creator: "Rizky Ramadhan",
  publisher: "Rizky Ramadhan",
  manifest: `${process.env.NEXT_PUBLIC_SITE_URL}/site.webmanifest`,
  category: "Technology & Programming",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "id-ID": "/id-ID",
    },
  },
  openGraph: {
    title: "RyzNotes | My Personal Blog",
    description:
      "A personal blog by Rizky Ramadhan, covering technology, programming, and web development.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    siteName: "RyzNotes",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og_light.jpg`,
        width: 800,
        height: 600,
        alt: "Open graph light theme image",
      },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og_dark.jpg`,
        width: 1800,
        height: 1600,
        alt: "Open graph dark theme image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RyzNotes | My Personal Blog",
    description:
      "A personal blog by Rizky Ramadhan, covering technology, programming, and web development.",
    siteId: "@ryzmdn",
    creator: "@ryzmdn",
    creatorId: "@ryzmdn",
    images: [
      `${process.env.NEXT_PUBLIC_SITE_URL}/og_light.png`,
      `${process.env.NEXT_PUBLIC_SITE_URL}/og_dark.png`,
    ],
  },
  icons: {
    icon: "/favicon-16x16.png",
    shortcut: ["/favicon-32x32.png"],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={clss(
          monsterrat.className,
          merriweather.variable,
          firaCode.variable,
          "antialiased w-full h-full bg-white dark:bg-black"
        )}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
