import { cache } from 'react';

export type Metadata = {
  title: string;
  description: string;
  date: string;
  discussionId?: string;
};

export type FrontmatterParseResult = {
  metadata: Metadata;
  content: string;
};

export type MDXFileData = FrontmatterParseResult & {
  slug: string;
};

// Hàm fetch dữ liệu từ GitHub API được cache
export const fetchBlogPosts = cache(async (): Promise<MDXFileData[]> => {
  // Return empty array to show no blog posts
  return [];
});

// Hàm lấy tất cả các slug của blog
export const getAllBlogSlugs = cache(async (): Promise<string[]> => {
  const posts = await fetchBlogPosts();
  return posts.map(post => post.slug);
});

// Hàm lấy bài viết theo slug
export const getPostBySlug = cache(async (slug: string): Promise<MDXFileData | null> => {
  console.log("Fetching post for slug:", slug);
  
  const posts = await fetchBlogPosts();
  console.log(
    "Available posts:",
    posts.map((p) => p.slug)
  );
  
  const foundPost = posts.find((post) => post.slug === slug) ?? null;
  console.log("Found post:", foundPost);
  
  return foundPost;
});

// Hàm parse frontmatter từ nội dung markdown
function parseFrontmatter(fileContent: string): FrontmatterParseResult {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);

  if (!match) {
    throw new Error("No frontmatter found");
  }

  const frontmatter = match[1];

  if (!frontmatter) {
    throw new Error("No frontmatter found");
  }

  const content = fileContent.replace(frontmatterRegex, "").trim();
  const frontmatterLines = frontmatter.trim().split("\n");
  const metadata: Partial<Metadata> = {};

  frontmatterLines.forEach((line) => {
    const [key, ...values] = line.split(": ");
    let value = values.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1");
    if (key && value) {
      metadata[key.trim() as keyof Metadata] = value;
    }
  });

  return { metadata: metadata as Metadata, content };
}