export interface WordPressBaseEntity {
  id: number;
  slug: string;
  status: "publish" | "draft" | "private";
  type: string;
  link: string;
}

export interface RenderedContent {
  rendered: string;
  protected?: boolean;
}

export interface Term {
  id: number;
  name: string;
  slug: string;
  taxonomy: "category" | "post_tag";
}

export interface Author {
  id: number;
  name: string;
  url: string;
  description: string;
  link: string;
  avatar_urls: {
    [key: string]: string;
  };
}

export interface FeaturedMedia {
  id: number;
  source_url: string;
  media_type: "image" | "file";
  mime_type: string;
  alt_text: string;
}

export interface PostMetadata {
  yoast_head?: string;
  yoast_head_json?: {
    title: string;
    description: string;
    robots: Record<string, string>;
    canonical: string;
  };
}

export interface Post extends WordPressBaseEntity {
  title: RenderedContent;
  content: RenderedContent;
  excerpt: RenderedContent;
  author: number;
  featured_media: number;
  categories: number[];
  tags: number[];

  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;

  _embedded?: {
    "wp:term"?: Term[][];
    "wp:featuredmedia"?: FeaturedMedia[];
    author?: Author[];
  };

  metadata?: PostMetadata;
}

export interface Category extends WordPressBaseEntity {
  id: number;
  name: string;
  count: number;
  description: string;
  parent: number;
  slug: string;
}

export interface Tag extends WordPressBaseEntity {
  count: number;
}

export interface WordPressApiResponse<T> {
  total: number;
  total_pages: number;
  data: T[];
}

export interface PostQueryParams {
  slug?: string;
  per_page?: number;
  page?: number;
  categories?: number[];
  tags?: number[];
  orderby?: "date" | "title" | "modified";
  order?: "asc" | "desc";
  _embed?: boolean;
}
