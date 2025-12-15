import "@/lib/firebase-admin";
import Image from "next/image";
import { Timestamp, getFirestore } from "firebase-admin/firestore";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import Footer from "@/components/site/Footer";

export const runtime = "nodejs";
export const revalidate = 60;

type TimestampLike = { toDate: () => Date };

type Section = {
  heading?: string;
  bodyMd?: string;
  imageUrl?: string | null;
  imagePosition?: "left" | "right" | "full";
};

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
  author?: unknown;
  coverUrl?: unknown;
  tags?: unknown;
  sections?: unknown;
  articleDate?: unknown;
  publishedAt?: unknown;
  createdAt?: unknown;
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

function normalizeImagePosition(v: unknown): Section["imagePosition"] {
  if (v === "left" || v === "right" || v === "full") return v;
  return "full";
}

function normalizeSections(v: unknown): Section[] {
  if (!Array.isArray(v)) return [];
  return v.map((raw): Section => {
    const s = (raw ?? {}) as FirestoreSection;
    return {
      heading: asString(s.heading, ""),
      bodyMd: asString(s.bodyMd, ""),
      imageUrl: asStringOrNull(s.imageUrl),
      imagePosition: normalizeImagePosition(s.imagePosition),
    };
  });
}

function normalizeTags(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.filter(
    (x): x is string => typeof x === "string" && x.trim().length > 0
  );
}

function inferDate(p: FirestorePost): Date {
  if (typeof p.articleDate === "string" && p.articleDate) {
    const d = new Date(p.articleDate);
    if (!Number.isNaN(d.getTime())) return d;
  }

  const ts = p.publishedAt ?? p.createdAt;
  if (ts instanceof Timestamp) return ts.toDate();
  if (isTimestampLike(ts)) return ts.toDate();

  return new Date();
}

function stripNodeProp<T extends Record<string, unknown>>(props: T) {
  const rest = { ...props };
  delete rest.node;
  return rest;
}

const markdownComponents: Components = {
  p: (props) => (
    <p
      className="mb-4 leading-relaxed md:mb-5"
      {...(stripNodeProp(
        props as Record<string, unknown>
      ) as React.ComponentPropsWithoutRef<"p">)}
    />
  ),
  h2: (props) => {
    const rest = stripNodeProp(
      props as Record<string, unknown>
    ) as React.ComponentPropsWithoutRef<"h2">;
    return (
      <div className="mb-6">
        <div className="mb-2 h-[2px] w-10 bg-[#FFD500]" />
        <h2
          className="text-2xl font-semibold tracking-tight md:text-3xl"
          {...rest}
        />
      </div>
    );
  },
  ul: (props) => (
    <ul
      className="my-4 ml-6 list-disc space-y-1 marker:text-[#FFD500]"
      {...(stripNodeProp(
        props as Record<string, unknown>
      ) as React.ComponentPropsWithoutRef<"ul">)}
    />
  ),
  ol: (props) => (
    <ol
      className="my-4 ml-6 list-decimal space-y-1"
      {...(stripNodeProp(
        props as Record<string, unknown>
      ) as React.ComponentPropsWithoutRef<"ol">)}
    />
  ),
  li: (props) => (
    <li
      className="leading-relaxed"
      {...(stripNodeProp(
        props as Record<string, unknown>
      ) as React.ComponentPropsWithoutRef<"li">)}
    />
  ),
};

function ResponsiveImage({
  src,
  aspectClassName,
}: {
  src: string;
  aspectClassName?: string;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl ${
        aspectClassName ?? "aspect-[16/9]"
      }`}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 1200px"
        className="object-cover"
      />
    </div>
  );
}

export default async function BlogPostPage({
                                             params,
                                           }: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug: routeSlug } = await params;

  const db = getFirestore();
  const snap = await db.collection("posts").doc(routeSlug).get();
  if (!snap.exists) return notFound();

  const p = (snap.data() ?? {}) as FirestorePost;

  const date = inferDate(p);
  const sections = normalizeSections(p.sections);
  const tags = normalizeTags(p.tags);

  const title = asString(p.title, "");
  const subtitle = asString(p.subtitle, "");
  const author = asString(p.author, "");

  // slug sigur pentru chei React etc.
  const postSlug = asString(p.slug, routeSlug);

  const coverUrl = asStringOrNull(p.coverUrl);

  return (
      <>
        <main className="py-6 md:py-10">
          <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-8 lg:px-12">
            <div className="mb-3 flex items-center gap-2 text-sm opacity-70">
              <span>{date.toLocaleDateString()}</span>
              {author && (
                  <>
                    <span>•</span>
                    <span>{author}</span>
                  </>
              )}
            </div>

            <h1 className="text-3xl font-semibold uppercase leading-tight md:text-4xl">
              {title}
            </h1>

            {subtitle && (
                <h2 className="-mt-2 text-xl opacity-80 md:text-2xl">
                  {subtitle}
                </h2>
            )}

            {coverUrl && (
                <div className="my-5">
                  <ResponsiveImage src={coverUrl} />
                </div>
            )}

            <article className="prose max-w-none">
              {sections.map((s, i) => {
                const layoutTwoCol = Boolean(
                    s.imageUrl && s.imagePosition !== "full"
                );

                return (
                    <section key={`${postSlug}-s-${i}`} className="my-8">
                      {s.heading && (
                          <header className="mb-4">
                            <div className="mb-2 h-[2px] w-10 bg-[#FFD500]" />
                            <h2 className="text-2xl font-semibold uppercase tracking-tight md:text-3xl">
                              {s.heading}
                            </h2>
                          </header>
                      )}

                      <div
                          className={
                            layoutTwoCol
                                ? "grid items-start gap-6 md:grid-cols-2"
                                : ""
                          }
                      >
                        {s.imageUrl &&
                            (s.imagePosition === "left" ||
                                s.imagePosition === "full") && (
                                <div
                                    className={
                                      s.imagePosition === "full" ? "mb-3" : ""
                                    }
                                >
                                  <ResponsiveImage
                                      src={s.imageUrl}
                                      aspectClassName={
                                        s.imagePosition === "full"
                                            ? "aspect-[16/9]"
                                            : "aspect-[4/3]"
                                      }
                                  />
                                </div>
                            )}

                        <div>
                          <ReactMarkdown
                              remarkPlugins={[remarkGfm, remarkBreaks]}
                              components={markdownComponents}
                          >
                            {s.bodyMd || ""}
                          </ReactMarkdown>
                        </div>

                        {s.imageUrl && s.imagePosition === "right" && (
                            <ResponsiveImage
                                src={s.imageUrl}
                                aspectClassName="aspect-[4/3]"
                            />
                        )}
                      </div>
                    </section>
                );
              })}
            </article>

            {tags.length > 0 && (
                <div className="mt-10 flex flex-wrap items-center gap-2">
                  <span className="text-sm opacity-70">Tags:</span>
                  {tags.map((t) => (
                      <span
                          key={t}
                          className="rounded-full border px-3 py-1 text-sm italic"
                      >
                  {t}
                </span>
                  ))}
                </div>
            )}
          </div>
        </main>

        <Footer />
      </>
  );
}
