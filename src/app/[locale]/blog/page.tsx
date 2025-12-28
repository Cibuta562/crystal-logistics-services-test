import "@/lib/firebase-admin";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import BlogIndexClient from "@/components/blog/BlogIndexClient";
import type { BlogPost } from "@/types/blog";
import Footer from "@/components/site/Footer";
import NewsletterFormSection from "@/components/site/NewsletterFormSection";
import BlogHero from "@/components/blog/BlogHero";

export const runtime = "nodejs";
export const revalidate = 60;

type TimestampLike = { toDate: () => Date };

type FirestorePost = {
  slug?: unknown;
  title?: unknown;
  subtitle?: unknown;
  author?: unknown;
  coverUrl?: unknown;
  tags?: unknown;
  excerpt?: unknown;
  publishedAt?: unknown;
};

function isTimestampLike(v: unknown): v is TimestampLike {
  return (
      typeof v === "object" &&
      v !== null &&
      "toDate" in v &&
      typeof (v as { toDate?: unknown }).toDate === "function"
  );
}

function asString(v: unknown, fallback = ""): string {
  return typeof v === "string" ? v : fallback;
}

function asStringOrNull(v: unknown): string | null {
  return typeof v === "string" && v.length > 0 ? v : null;
}

function normalizeTags(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.filter(
      (x): x is string => typeof x === "string" && x.trim().length > 0
  );
}

function toDateOrNull(v: unknown): Date | null {
  if (v instanceof Timestamp) return v.toDate();
  if (isTimestampLike(v)) return v.toDate();
  return null;
}

export default async function BlogIndex({
                                          params,
                                        }: {
  params: { locale: string };
}) {
  const { locale } = params;

  const db = getFirestore();
  const snap = await db
      .collection("posts")
      .where("locale", "==", locale) // 🔥 FILTRARE LIMBĂ
      .orderBy("publishedAt", "desc")
      .limit(100)
      .get();

  const posts: BlogPost[] = snap.docs.map((d) => {
    const p = (d.data() ?? {}) as FirestorePost;
    return {
      slug: asString(p.slug, d.id),
      title: asString(p.title, ""),
      subtitle: asString(p.subtitle, ""),
      author: asString(p.author, ""),
      coverUrl: asStringOrNull(p.coverUrl),
      tags: normalizeTags(p.tags),
      excerpt: asString(p.excerpt, ""),
      publishedAt: toDateOrNull(p.publishedAt),
    };
  });

  const latest = posts.slice(0, 3);

  const tagCounts = posts.reduce<Record<string, number>>((acc, post) => {
    (post.tags ?? []).forEach((t) => {
      acc[t] = (acc[t] ?? 0) + 1;
    });
    return acc;
  }, {});

  const categories = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([tag, count]) => ({ tag, count }));

  return (
      <div>
        <BlogHero />
        <BlogIndexClient posts={posts} categories={categories} latest={latest} />
        <NewsletterFormSection />
        <Footer />
      </div>
  );
}
