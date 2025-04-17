import { ReactNode } from "react";
import type { Metadata } from "next";
import { Poppins, Source_Code_Pro } from "next/font/google";
import { Provider } from "@/app/provider";
import { clss } from "@/utils/clss";
import "@/app/globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s - RyzNote",
    default: "RyzNote | Personal Blog by Rizky Ramadhan",
  },
  description:
    "Personal blog of Rizky Ramadhan, a blogger and web developer sharing knowledge about technology, programming, and self-development.",
  generator: "Next.js",
  applicationName: "RyzNote",
  referrer: "origin-when-cross-origin",
  keywords: [
    "RyzNote",
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
    title: "RyzNote | Personal Blog by Rizky Ramadhan",
    description:
      "A personal blog by Rizky Ramadhan, covering technology, programming, and web development.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    siteName: "RyzNote",
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
    title: "RyzNote | Personal Blog",
    description:
      "Personal blog of Rizky Ramadhan, a blogger and web developer sharing knowledge about technology, programming, and self-development.",
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
          poppins.className,
          sourceCodePro.variable,
          "antialiased h-full bg-gray-50 dark:bg-gray-950 pt-20"
        )}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
