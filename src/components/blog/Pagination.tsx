"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination() {
  return (
    <nav className="mx-auto mt-6 flex w-full items-center justify-center gap-2 text-sm text-zinc-700">
      <button
        className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 disabled:opacity-50"
        disabled
        aria-label="Pagina anterioară"
      >
        <ChevronLeft size={16} />
      </button>

      <div className="flex items-center gap-1">
        <button className="h-8 w-8 rounded-full border border-zinc-300 text-zinc-900">
          1
        </button>
        <button className="h-8 w-8 rounded-full border border-zinc-300">
          2
        </button>
        <button className="h-8 w-8 rounded-full border border-zinc-300">
          3
        </button>
        <span className="px-1">…</span>
      </div>

      <button
        className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300"
        aria-label="Pagina următoare"
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}
