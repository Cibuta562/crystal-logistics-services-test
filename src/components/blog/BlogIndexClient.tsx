"use client";

import { useMemo, useState } from "react";
import type { BlogPost } from "@/types/blog";
import BlogPostCard from "./BlogPostCard";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

type Props = {
  posts: BlogPost[];
  categories: { tag: string; count: number }[];
  latest: BlogPost[];
};

export default function BlogIndexClient({ posts, categories, latest }: Props) {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const q0 = sp.get("q") ?? "";
  const tags0 = (sp.get("tags") ?? "").split(",").filter(Boolean);

  const [q, setQ] = useState(q0);
  const [selected, setSelected] = useState<string[]>(tags0);
  const [mobileOpen, setMobileOpen] = useState(false);

  function applyFilters(nextQ = q, nextTags = selected) {
    const params = new URLSearchParams();
    if (nextQ.trim()) params.set("q", nextQ.trim());
    if (nextTags.length) params.set("tags", nextTags.join(","));
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname);
  }

  function toggleTag(tag: string) {
    const has = selected.includes(tag);
    const next = has ? selected.filter((t) => t !== tag) : [...selected, tag];
    setSelected(next);
    applyFilters(q, next);
  }

  const filtered = useMemo(() => {
    const txt = q.trim().toLowerCase();
    return posts.filter((p) => {
      const hitTxt =
        !txt ||
        p.title.toLowerCase().includes(txt) ||
        (p.subtitle ?? "").toLowerCase().includes(txt) ||
        (p.excerpt ?? "").toLowerCase().includes(txt) ||
        (p.tags ?? []).some((t: string) => t.toLowerCase().includes(txt));
      const hitTags =
        selected.length === 0 ||
        selected.every((t: string) => (p.tags ?? []).includes(t));
      return hitTxt && hitTags;
    });
  }, [posts, q, selected]);

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-6">
      {/* Search + mobile filters button */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="relative flex-1">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyFilters()}
            placeholder="Căutare"
            className="w-full rounded-xl border p-2 pl-10"
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 opacity-60"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="11"
              cy="11"
              r="7"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path d="M20 20L17 17" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>

        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden rounded-xl border px-3 py-2"
        >
          Filtre
        </button>
      </div>

      <div className="grid md:grid-cols-[1fr_320px] gap-8">
        {/* LEFT: list of posts */}
        <div className="space-y-10">
          {filtered.map((p, idx) => (
            <BlogPostCard key={p.slug} post={p} featured={idx === 0} />
          ))}
          {filtered.length === 0 && (
            <p className="opacity-70">Nu am găsit rezultate.</p>
          )}
        </div>

        {/* RIGHT: sidebar (desktop) */}
        <aside className="hidden md:block">
          <div className="sticky top-4 space-y-8">
            <Filters
              categories={categories}
              selected={selected}
              onToggle={toggleTag}
              onClear={() => {
                setSelected([]);
                applyFilters(q, []);
              }}
            />
            <Latest latest={latest} />
          </div>
        </aside>
      </div>

      {/* Mobile drawer for filters */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Filtre</h3>
              <button
                className="rounded-md border px-2 py-1"
                onClick={() => setMobileOpen(false)}
              >
                ×
              </button>
            </div>
            <Filters
              categories={categories}
              selected={selected}
              onToggle={toggleTag}
              onClear={() => {
                setSelected([]);
                applyFilters(q, []);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function Filters({
  categories,
  selected,
  onToggle,
  onClear,
}: {
  categories: { tag: string; count: number }[];
  selected: string[];
  onToggle: (tag: string) => void;
  onClear: () => void;
}) {
  return (
    <div className="border rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-semibold">Categorii</h3>
        {selected.length > 0 && (
          <button onClick={onClear} className="text-sm underline">
            Reset
          </button>
        )}
      </div>
      <ul className="space-y-2">
        {categories.length === 0 && <li className="opacity-60 text-sm">—</li>}
        {categories.map((c) => {
          const active = selected.includes(c.tag);
          return (
            <li key={c.tag} className="flex items-center justify-between">
              <button
                onClick={() => onToggle(c.tag)}
                className={`text-left ${active ? "font-semibold" : ""}`}
              >
                {c.tag}
              </button>
              <span className="opacity-70">({c.count})</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Latest({ latest }: { latest: BlogPost[] }) {
  return (
    <div className="border rounded-2xl p-4">
      <h3 className="text-xl font-semibold mb-3">Ultimele postări</h3>
      <ul className="space-y-3">
        {latest.map((p) => (
          <li key={p.slug} className="flex gap-3">
            {p.coverUrl ? (
              <div className="relative h-14 w-20 overflow-hidden rounded-md bg-gray-200">
                <Image
                  src={p.coverUrl}
                  alt={p.title}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="h-14 w-20 rounded-md bg-gray-200" />
            )}

            <Link
              href={`/blog/${p.slug}`}
              className="text-sm font-medium leading-tight hover:underline"
            >
              {p.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
