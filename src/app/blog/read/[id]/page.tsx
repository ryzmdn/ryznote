import type { Metadata } from "next";
import axios from "axios";
import { notFound } from "next/navigation";
import { Badge } from "@/components/Ui/Badge";
import { formatDate } from "@/utils/fotmatDate";
import { averageReadingTime } from "@/utils/readingTime";
import { Svg } from "@/components/Svg";
import { Post, Term } from "@/types/wordpress";
import { SectionHeader } from "@/components/Layout/BlogSection";
import { convertEncode } from "@/utils/encode";
import { CardSecondary } from "@/components/Cards/CardSecondary";

type Params = Promise<{ id: string }>;

export async function generateMetadata({
  params,
}: Readonly<{ params: Params }>): Promise<Metadata> {
  const { id } = await params;
  try {
    const response = await axios.get<Post[]>(
      `${process.env.NEXT_PUBLIC_WORDPRESS_API}/posts?slug=${id}&_embed`,
      {
        headers: {
          "Cache-Control": "no-store"
        }
      }
    );
    const post = response.data[0];

    if (!post) return {
      title: "Post Not Found",
      description: "The requested blog post could not be found."
    };

    const title = post.title.rendered;
    const description = post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160);
    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    const publishedTime = post.date_gmt;
    const modifiedTime = post.modified_gmt;
    const tags = post._embedded?.['wp:term']?.[1]?.map((tag: Term) => tag.name) || [];
    const category = post._embedded?.['wp:term']?.[0]?.[0]?.name;

    return {
      title: convertEncode(title),
      description: description,
      openGraph: {
        title: title,
        description: description,
        type: 'article',
        publishedTime: publishedTime,
        modifiedTime: modifiedTime,
        authors: post._embedded?.['author']?.map(author => author.name) || [],
        tags: tags,
        section: category
      },
      twitter: {
        card: 'summary_large_image',
        title: title,
        description: description,
        images: featuredImage ? [featuredImage] : []
      },
      keywords: tags,
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${id}`
      }
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Error Loading Post",
      description: "There was an issue retrieving the blog post."
    };
  }
}

async function getPost(slug: string) {
  try {
    const response = await axios.get<Post[]>(
      `${process.env.NEXT_PUBLIC_WORDPRESS_API}/posts?slug=${slug}&_embed`,
      {
        headers: {
          "Cache-Control": "no-store"
        }
      }
    );
    return response.data[0] || null;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

async function getRelatedPosts(currentPost: Post, maxPosts: number = 3) {
  try {
    const response = await axios.get<Post[]>(
      `${process.env.NEXT_PUBLIC_WORDPRESS_API}/posts?_embed`,
      {
        headers: {
          "Cache-Control": "no-store"
        }
      }
    );
    const allPosts = response.data;

    const currentPostTags =
      currentPost._embedded?.["wp:term"]?.[1]?.map((tag) => tag.slug) || [];

    const relatedPosts = allPosts.filter((post) => {
      if (post.id === currentPost.id) return false;
      const postTags =
        post._embedded?.["wp:term"]?.[1]?.map((tag) => tag.slug) || [];
      return postTags.some((tag) => currentPostTags.includes(tag));
    });

    return relatedPosts.toSorted(() => 0.5 - Math.random()).slice(0, maxPosts);
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
}

export default async function Content({
  params,
}: Readonly<{ params: Params }>) {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) return notFound();

  const relatedPosts = await getRelatedPosts(post);
  const readingTime = averageReadingTime(post.content.rendered);
  const category = post._embedded?.["wp:term"]?.[0]?.[0]?.name;
  const tags =
    post._embedded?.["wp:term"]?.[1]?.map((tag: Term) => tag.name) || [];

  return (
    <>
      <div className="mx-auto max-w-2xl text-base text-gray-700 dark:text-gray-300 py-10">
        <header id={`header-${post.title.rendered.replace(/ /gi, "-").toLowerCase()}`} className="w-full h-max">
          <div className="flex justify-between items-center w-full mb-6">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 w-full">
              <Badge
                href={`/blog/category/${category?.replace(/ /gi, '-').toLowerCase()}?page=1`}
                title={`Category ${
                  category
                    ? category.charAt(0).toUpperCase() +
                      category.slice(1).toLowerCase()
                    : "Uncategorized"
                }`}
              >
                <Svg
                  variant="outline"
                  width={14}
                  height={14}
                  draw={[
                    "M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z",
                    "M6 6h.008v.008H6V6Z",
                  ]}
                />
                {category
                  ? category.charAt(0).toUpperCase() +
                    category.slice(1).toLowerCase()
                  : "Uncategorized"}
              </Badge>
              <Badge title={`Published ${formatDate(post.date)}`}>
                <Svg
                  variant="outline"
                  width={14}
                  height={14}
                  draw={[
                    "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z",
                  ]}
                />
                {formatDate(post.date)}
              </Badge>
              <Badge title={readingTime}>
                <Svg
                  variant="outline"
                  width={14}
                  height={14}
                  draw={["M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"]}
                />{" "}
                {readingTime}
              </Badge>
            </div>
          </div>
          <h1 className="text-4xl/tight font-semibold tracking-tight text-pretty text-gray-800 dark:text-gray-200 mb-3.5 sm:text-5xl/tight">
            {convertEncode(post.title.rendered)}
          </h1>
        </header>

        <div
          dangerouslySetInnerHTML={{
            __html: convertEncode(post.content.rendered),
          }}
          className="blog-content flex flex-col gap-y-6"
        />

        <footer className="w-full py-7">
          <h5 className="text-base/7 font-semibold">Tags</h5>
          <div className="flex flex-wrap gap-x-2 gap-y-1.5 my-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                href={`/blog/tag/${tag.replace(/ /gi, "-").toLowerCase()}?page=1`}
                title={tag}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </footer>
      </div>

      <section id="related-posts-section" className="w-full py-16">
        <SectionHeader title="Related posts" />
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((post) => (
              <CardSecondary
                key={post.id}
                contentHtml={post.content.rendered}
                title={post.title.rendered}
                url={post.slug}
                category={post._embedded?.["wp:term"]?.[0]?.[0].name}
                datetime={post.date}
                description={post.excerpt.rendered}
              />
            ))}
          </div>
      </section>
    </>
  );
}
