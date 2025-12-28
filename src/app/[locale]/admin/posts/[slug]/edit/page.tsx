import "@/lib/firebase-admin";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { notFound } from "next/navigation";
import EditPostClient from "./EditPostClient";
import type { Section as SectionType } from "@/lib/postSchema";

export const runtime = "nodejs";

type Params = { slug: string };

type FirestoreSection = {
  heading?: unknown;
  bodyMd?: unknown;
  imageUrl?: unknown;
  imagePosition?: unknown;
};

type FirestorePost = {
  slug?: unknown;
  title?: unknown;
  subtitle?: unknown;
  excerpt?: unknown;
  author?: unknown;
  articleDate?: unknown;
  coverUrl?: unknown;
  tags?: unknown;
  sections?: unknown;
  locale?: unknown;
  publishedAt?: unknown;
  createdAt?: unknown;
};

function asString(v: unknown, fallback = ""): string {
  return typeof v === "string" ? v : fallback;
}

function asStringOrNull(v: unknown): string | null {
  return typeof v === "string" && v.length > 0 ? v : null;
}

function isTimestampLike(v: unknown): v is Timestamp {
  return (
    typeof v === "object" &&
    v !== null &&
    "toDate" in v &&
    typeof (v as { toDate?: unknown }).toDate === "function"
  );
}

function normalizeImagePosition(
  v: unknown
): NonNullable<SectionType["imagePosition"]> {
  if (v === "left" || v === "right" || v === "full") return v;
  return "full";
}

function normalizeSections(v: unknown): SectionType[] {
  if (!Array.isArray(v)) return [];
  return v.map((raw): SectionType => {
    const s = (raw ?? {}) as FirestoreSection;
    return {
      heading: asString(s.heading, ""),
      bodyMd: asString(s.bodyMd, ""),
      imageUrl: asStringOrNull(s.imageUrl),
      imagePosition: normalizeImagePosition(s.imagePosition),
    } as SectionType;
  });
}

function normalizeTags(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.filter(
    (x): x is string => typeof x === "string" && x.trim().length > 0
  );
}

function inferArticleDate(p: FirestorePost): string {
  const direct = asString(p.articleDate, "");
  if (direct) return direct;

  if (isTimestampLike(p.publishedAt))
    return p.publishedAt.toDate().toISOString().slice(0, 10);
  if (isTimestampLike(p.createdAt))
    return p.createdAt.toDate().toISOString().slice(0, 10);

  return "";
}

export default async function EditPostPage({ params }: { params: Params }) {
  const db = getFirestore();
  const snap = await db.collection("posts").doc(params.slug).get();
  if (!snap.exists) return notFound();

  const p = (snap.data() ?? {}) as FirestorePost;

  const sections = normalizeSections(p.sections);
  const tags = normalizeTags(p.tags);
  const articleDate = inferArticleDate(p);

  const initial = {
    slug: asString(p.slug, params.slug),
    title: asString(p.title, ""),
    subtitle: asString(p.subtitle, ""),
    excerpt: asString(p.excerpt, ""),
    author: asString(p.author, ""),
    articleDate,
    coverUrl: asStringOrNull(p.coverUrl),
    tags,
    sections,
    locale: asString(p.locale, "ro"),
  };

  return <EditPostClient initial={initial} />;
}
