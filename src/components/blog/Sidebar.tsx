"use client";

import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { BLOG_POSTS, CATEGORIES } from "../../../data/blog";

export default function Sidebar() {
  const recent = BLOG_POSTS.slice(0, 3);

  return (
    <aside className="space-y-8 lg:pl-6">
      {/* search */}
      <div>
        <form className="relative">
          <input
            type="search"
            placeholder="Căutare"
            className="w-full rounded-full border border-zinc-300 bg-white px-4 py-2 pr-10 text-sm outline-none transition focus:border-zinc-900"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-zinc-500 hover:text-zinc-900"
            aria-label="Caută"
          >
            <Search size={16} />
          </button>
        </form>
      </div>

      {/* categorii */}
      <div>
        <h4 className="mb-3 border-b border-zinc-300 pb-2 text-lg font-semibold">
          Categorii
        </h4>
        <ul className="space-y-2 text-sm">
          {CATEGORIES.map((c) => (
            <li
              key={c.name}
              className="flex items-center justify-between rounded-lg px-1 py-1 text-zinc-700"
            >
              <span className="hover:text-zinc-900">{c.name}</span>
              <span className="text-zinc-400">
                {c.count ? `(${c.count})` : "-"}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* ultimele postări */}
      <div>
        <h4 className="mb-3 border-b border-zinc-300 pb-2 text-lg font-semibold">
          Ultimele postări
        </h4>
        <div className="space-y-4">
          {recent.map((p) => (
            <Link
              key={p.id}
              href={`/blog/${p.slug}`}
              className="group flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-2 transition hover:shadow-sm"
            >
              <div className="relative h-14 w-20 overflow-hidden rounded-md">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] text-zinc-500">{p.date}</p>
                <p className="truncate text-xs font-semibold leading-snug text-zinc-900">
                  {p.subtitle || p.title}
                </p>
              </div>
            </Link>
          ))}

          {/* placeholder pentru două carduri „gri” din mockup */}
          <div className="flex gap-3">
            <div className="h-14 flex-1 rounded-lg bg-zinc-200" />
            <div className="h-14 flex-1 rounded-lg bg-zinc-300" />
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="relative">
          <Image
            src="/images/cta-bg.jpg" // pune imagine generică; altfel rămâne gol
            alt=""
            width={600}
            height={400}
            className="h-40 w-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-amber-500/10" />
        </div>
        <div className="space-y-3 p-4">
          <h5 className="text-lg font-bold">
            Devino partener
            <br />
            Crystal Logistics
          </h5>
          <p className="text-sm text-zinc-600">
            Descoperă cele mai noi rute, prețuri și parteneriate exclusive
            pentru a-ți accelera logistica.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium transition hover:border-zinc-900 hover:bg-zinc-900 hover:text-white"
          >
            Contactează-ne
          </Link>
        </div>
      </div>
    </aside>
  );
}
