import { Timestamp } from "firebase-admin/firestore";
import Link from "next/link";
import { listPosts } from "./actions";

type TimestampLike = { toDate: () => Date };

type PostListItem = {
  id: string;
  slug?: string;
  title?: string;
  author?: string;
  tags?: unknown;
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

function formatPostDate(p: PostListItem): string {
  if (typeof p.articleDate === "string" && p.articleDate) {
    const d = new Date(p.articleDate);
    if (!Number.isNaN(d.getTime())) return d.toLocaleDateString("ro-RO");
  }

  const ts = p.publishedAt ?? p.createdAt;
  if (ts instanceof Timestamp) return ts.toDate().toLocaleDateString("ro-RO");
  if (isTimestampLike(ts)) return ts.toDate().toLocaleDateString("ro-RO");

  return "";
}

function normalizeTags(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.filter(
    (x): x is string => typeof x === "string" && x.trim().length > 0
  );
}

export default async function AdminPosts() {
  const posts = (await listPosts()) as PostListItem[];

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Posts</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Gestionează articolele de pe blog: vezi, editează, actualizează.
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center rounded-xl border px-3 py-2 text-sm font-medium transition hover:bg-[#FFD500] hover:text-black"
        >
          + Post nou
        </Link>
      </header>

      {posts.length === 0 ? (
        <p className="text-sm text-neutral-500">
          Nu există încă postări publicate.
        </p>
      ) : (
        <div className="space-y-3">
          {posts.map((p) => {
            const dateString = formatPostDate(p);
            const tags = normalizeTags(p.tags);

            return (
              <div
                key={p.id}
                className="flex flex-col gap-3 rounded-2xl border bg-white/80 p-4 md:flex-row md:items-center md:justify-between md:p-5"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base font-semibold md:text-lg">
                      {p.title || "(Fără titlu)"}
                    </h2>
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs uppercase tracking-wide text-emerald-700">
                      Publicat
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 md:text-sm">
                    {dateString && <span>{dateString}</span>}
                    {dateString && <span>•</span>}
                    <span className="font-mono text-[11px] md:text-xs">
                      /blog/{p.slug ?? ""}
                    </span>
                    {p.author && (
                      <>
                        <span>•</span>
                        <span>de {p.author}</span>
                      </>
                    )}
                  </div>

                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full border border-yellow-200 bg-yellow-50 px-2 py-0.5 text-[11px] text-yellow-800 md:text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 md:justify-end">
                  <Link
                    href={`/blog/${p.slug ?? ""}`}
                    target="_blank"
                    className="inline-flex items-center rounded-xl border px-3 py-1.5 text-xs transition hover:bg-neutral-100 md:text-sm"
                  >
                    Vezi live
                  </Link>
                  <Link
                    href={`/admin/posts/${p.slug ?? ""}/edit`}
                    className="inline-flex items-center rounded-xl border border-yellow-400 px-3 py-1.5 text-xs text-yellow-800 transition hover:bg-[#FFD500] hover:text-black md:text-sm"
                  >
                    Editează
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
