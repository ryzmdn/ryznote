import { Feed } from "feed";
import axios from "axios";
import { Post } from "@/types/wordpress";

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!siteUrl) {
    throw new Error("Missing NEXT_PUBLIC_SITE_URL environment variable");
  }

  const author = {
    name: "Rizky Ramadhan",
    email: "riybuzniz@gmail.com",
  };

  const feed = new Feed({
    title: "RyzNote | Personal Blog by Rizky Ramadhan",
    description: "Personal blog of Rizky Ramadhan, a blogger and web developer sharing knowledge about technology, programming, and self-development.",
    id: siteUrl,
    link: siteUrl,
    image: `${siteUrl}/favicon.ico`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    author,
    feedLinks: {
      rss2: `${siteUrl}/feed.xml`,
    },
  });

  try {
    const { data: posts } = await axios.get<Post[]>(`${process.env.NEXT_PUBLIC_WORDPRESS_API}/posts`, {
      headers: {
        "Cache-Control": "no-store"
      }
    });

    posts.forEach((post: Post) => {
      feed.addItem({
        title: post.title.rendered,
        id: `${siteUrl}/blog/read/${post.slug}`,
        link: `${siteUrl}/blog/read/${post.slug}`,
        content: post.content.rendered,
        author: [author],
        contributor: [author],
        date: new Date(post.date),
      });
    });

    return new Response(feed.rss2(), {
      status: 200,
      headers: {
        "content-type": "application/xml",
        "cache-control": "s-maxage=31556952",
      },
    });
  } catch (error) {
    console.error("Error generating RSS feed:", error);
    return new Response("Failed to generate RSS feed", { status: 500 });
  }
}
