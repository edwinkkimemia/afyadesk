import { prisma } from "./prisma";
import { blogPosts as staticPosts } from "./data";

export const BLOG_FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80";

export type PublicPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  image: string;
  date: string;
  author: string;
  tags: string[];
  published: boolean;
  db: boolean;
};

function toPublic(row: any): PublicPost {
  const cover = row.coverImage || BLOG_FALLBACK_IMAGE;
  const dt = row.publishedAt || row.createdAt;
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt || "",
    content: row.content || "",
    coverImage: cover,
    image: cover,
    date: dt ? new Date(dt).toISOString().slice(0, 10) : "",
    author: row.author || "AfyaDesk Team",
    tags: Array.isArray(row.tags) ? row.tags : [],
    published: !!row.published,
    db: true,
  };
}

function toStatic(p: any): PublicPost {
  const cover = p.coverImage || p.image || BLOG_FALLBACK_IMAGE;
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt || "",
    content: "",
    coverImage: cover,
    image: cover,
    date: p.date || "",
    author: p.author || "AfyaDesk Team",
    tags: Array.isArray(p.tags) ? p.tags : [],
    published: true,
    db: false,
  };
}

async function dbPublished(): Promise<PublicPost[]> {
  try {
    const rows = await prisma.blogPost.findMany({
      where: { published: true, deletedAt: null },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return rows.map(toPublic);
  } catch {
    return [];
  }
}

// Published DB posts take precedence by slug, then bundled posts.
export async function getPublicPosts(): Promise<PublicPost[]> {
  const db = await dbPublished();
  const seen = new Set(db.map((p) => p.slug));
  return [...db, ...staticPosts.filter((p) => !seen.has(p.slug)).map(toStatic)];
}

// Published DB post wins; otherwise bundled post (or null).
export async function getPublicPost(slug: string): Promise<PublicPost | null> {
  try {
    const row = await prisma.blogPost.findFirst({ where: { slug, published: true, deletedAt: null } });
    if (row) return toPublic(row);
  } catch {}
  const s = staticPosts.find((p) => p.slug === slug);
  return s ? toStatic(s) : null;
}

export async function getAllPublicSlugs(): Promise<string[]> {
  return (await getPublicPosts()).map((p) => p.slug);
}
