"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useMemo, useRef, useState } from "react";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Facebook, Linkedin, Twitter } from "lucide-react";

import { Section as SectionType } from "@/lib/postSchema";
import ImageUploader from "@/components/admin/ImageUploader";
import { publishDraft, saveDraft } from "../../actions";

type InitialPost = {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  author: string;
  articleDate?: string;
  coverUrl: string | null;
  tags: string[];
  locale: string;
  sections: SectionType[];
};

type ErrorLike = { message?: unknown };

function getErrorMessage(e: unknown, fallback = "Eroare"): string {
  if (e instanceof Error) return e.message || fallback;
  if (typeof e === "string") return e || fallback;

  if (typeof e === "object" && e !== null) {
    const maybe = e as ErrorLike;
    const msg = typeof maybe.message === "string" ? maybe.message : "";
    return msg || fallback;
  }

  return fallback;
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

type ToolbarProps = {
  onBold: () => void;
  onItalic: () => void;
  onStrikethrough: () => void;
  onInlineCode: () => void;
  onCodeBlock: () => void;
  onLink: () => void;
  onBulletedList: () => void;
  onNumberedList: () => void;
  onChecklist: () => void;
  onQuote: () => void;
  onH2: () => void;
  onH3: () => void;
  onHr: () => void;
};

function Toolbar({
  onBold,
  onItalic,
  onStrikethrough,
  onInlineCode,
  onCodeBlock,
  onLink,
  onBulletedList,
  onNumberedList,
  onChecklist,
  onQuote,
  onH2,
  onH3,
  onHr,
}: ToolbarProps) {
  return (
    <div className="flex flex-wrap gap-2 text-sm">
      <button
        type="button"
        onClick={onBold}
        className="rounded border px-2 py-1 font-semibold"
      >
        B
      </button>
      <button
        type="button"
        onClick={onItalic}
        className="rounded border px-2 py-1 italic"
      >
        I
      </button>
      <button
        type="button"
        onClick={onStrikethrough}
        className="rounded border px-2 py-1 line-through"
      >
        S
      </button>
      <button
        type="button"
        onClick={onInlineCode}
        className="rounded border px-2 py-1 font-mono text-xs"
      >
        `code`
      </button>

      <button
        type="button"
        onClick={onH2}
        className="rounded border px-2 py-1"
        title="Heading 2"
      >
        H2
      </button>
      <button
        type="button"
        onClick={onH3}
        className="rounded border px-2 py-1"
        title="Heading 3"
      >
        H3
      </button>

      <button
        type="button"
        onClick={onQuote}
        className="rounded border px-2 py-1"
        title="Citat"
      >
        &gt;
      </button>
      <button
        type="button"
        onClick={onLink}
        className="rounded border px-2 py-1 underline"
      >
        Link
      </button>

      <button
        type="button"
        onClick={onBulletedList}
        className="rounded border px-2 py-1"
        title="Listă neordonată"
      >
        •
      </button>
      <button
        type="button"
        onClick={onNumberedList}
        className="rounded border px-2 py-1"
        title="Listă ordonată"
      >
        1.
      </button>
      <button
        type="button"
        onClick={onChecklist}
        className="rounded border px-2 py-1"
        title="Checklist"
      >
        [ ]
      </button>

      <button
        type="button"
        onClick={onCodeBlock}
        className="rounded border px-2 py-1 font-mono text-xs"
        title="Code block"
      >
        ````
      </button>
      <button
        type="button"
        onClick={onHr}
        className="rounded border px-2 py-1"
        title="Linie orizontală"
      >
        ―
      </button>
    </div>
  );
}

type SectionEditorProps = {
  idx: number;
  value: SectionType;
  onChange: (v: SectionType) => void;
  slug: string;
};

function SectionEditor({ idx, value, onChange, slug }: SectionEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const bodyText = value.bodyMd ?? "";

  function wrapSelection(wrapLeft: string, wrapRight = wrapLeft) {
    const el = textareaRef.current;
    if (!el) return;

    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;
    const text = bodyText;

    const hasSelection = start !== end;
    const selected = hasSelection ? text.slice(start, end) : "";
    const inner = selected || "text";

    const next =
      text.slice(0, start) + wrapLeft + inner + wrapRight + text.slice(end);
    onChange({ ...value, bodyMd: next });

    const innerStart = start + wrapLeft.length;
    const innerEnd = innerStart + inner.length;

    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(innerStart, innerEnd);
    });
  }

  function modifySelectedLines(
    transform: (line: string, idx: number) => string
  ) {
    const el = textareaRef.current;
    if (!el) return;

    const text = bodyText;
    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;

    const lineStart = text.lastIndexOf("\n", start - 1) + 1;
    const lineEndRaw = text.indexOf("\n", end);
    const lineEnd = lineEndRaw === -1 ? text.length : lineEndRaw;

    const before = text.slice(0, lineStart);
    const selected = text.slice(lineStart, lineEnd);
    const after = text.slice(lineEnd);

    const lines = selected.split("\n");
    const newLines = lines.map((line, i) => transform(line, i));
    const newSelected = newLines.join("\n");
    const next = before + newSelected + after;

    onChange({ ...value, bodyMd: next });

    const newStart = lineStart;
    const newEnd = lineStart + newSelected.length;

    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(newStart, newEnd);
    });
  }

  function applyList(ordered: boolean) {
    modifySelectedLines((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return line;

      if (ordered) {
        const clean = trimmed.replace(/^\d+\.\s+/, "");
        return `${i + 1}. ${clean}`;
      }

      const clean = trimmed.replace(/^[-*]\s+/, "");
      return `- ${clean}`;
    });
  }

  function applyChecklist() {
    modifySelectedLines((line) => {
      const trimmed = line.trim();
      if (!trimmed) return line;

      const clean = trimmed.replace(/^[-*]\s+\[[ xX]\]\s+/, "");
      return `- [ ] ${clean}`;
    });
  }

  function applyHeading(level: 2 | 3) {
    const prefix = level === 2 ? "## " : "### ";
    modifySelectedLines((line) => {
      const trimmed = line.trim();
      if (!trimmed) return line;

      const clean = trimmed.replace(/^#{1,6}\s+/, "");
      return `${prefix}${clean}`;
    });
  }

  function applyQuote() {
    modifySelectedLines((line) => {
      const trimmed = line.trim();
      if (!trimmed) return line;

      const clean = trimmed.replace(/^>\s+/, "");
      return `> ${clean}`;
    });
  }

  function insertHr() {
    const el = textareaRef.current;
    if (!el) return;

    const text = bodyText;
    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;

    const before = text.slice(0, start);
    const after = text.slice(end);

    const insert = `${before.endsWith("\n") ? "" : "\n"}\n---\n\n`;
    const next = before + insert + after;

    const cursorPos = (before + insert).length;
    onChange({ ...value, bodyMd: next });

    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(cursorPos, cursorPos);
    });
  }

  type ImagePosition = NonNullable<SectionType["imagePosition"]>;

  return (
    <div className="space-y-4 rounded-2xl border p-4">
      <div className="grid gap-3 md:grid-cols-2">
        <input
          className="rounded-xl border p-2"
          placeholder="Titlu secțiune"
          value={value.heading ?? ""}
          onChange={(e) => onChange({ ...value, heading: e.target.value })}
        />
        <select
          className="rounded-xl border p-2"
          value={value.imagePosition}
          onChange={(e) =>
            onChange({
              ...value,
              imagePosition: e.target.value as ImagePosition,
            })
          }
        >
          <option value="full">Imagine full</option>
          <option value="left">Imagine stânga</option>
          <option value="right">Imagine dreapta</option>
        </select>
      </div>

      <Toolbar
        onBold={() => wrapSelection("**")}
        onItalic={() => wrapSelection("*")}
        onStrikethrough={() => wrapSelection("~~")}
        onInlineCode={() => wrapSelection("`")}
        onCodeBlock={() => wrapSelection("```\n", "\n```")}
        onLink={() => {
          const el = textareaRef.current;
          if (!el) return;

          const text = bodyText;
          const start = el.selectionStart ?? 0;
          const end = el.selectionEnd ?? 0;
          const selected = start !== end ? text.slice(start, end) : "";
          const label = selected || "text";

          const before = text.slice(0, start);
          const after = text.slice(end);
          const linkMd = `[${label}](https://)`;
          const next = before + linkMd + after;

          onChange({ ...value, bodyMd: next });

          const urlStart = before.length + label.length + 3;
          const urlEnd = urlStart + "https://".length;

          requestAnimationFrame(() => {
            el.focus();
            el.setSelectionRange(urlStart, urlEnd);
          });
        }}
        onBulletedList={() => applyList(false)}
        onNumberedList={() => applyList(true)}
        onChecklist={applyChecklist}
        onQuote={applyQuote}
        onH2={() => applyHeading(2)}
        onH3={() => applyHeading(3)}
        onHr={insertHr}
      />

      <textarea
        ref={textareaRef}
        className="min-h-[160px] w-full rounded-xl border p-2 font-mono text-sm"
        placeholder="Text (Markdown suportă **bold**, *italic*, [link](url), liste, etc.)"
        value={bodyText}
        onChange={(e) => onChange({ ...value, bodyMd: e.target.value })}
      />

      <div className="space-y-1">
        <p className="text-xs text-neutral-500">Preview secțiune:</p>
        <div className="max-h-60 overflow-y-auto rounded-xl border bg-neutral-50 p-3 text-sm">
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {bodyText || "_Paragraf..._"}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <ImageUploader
          pathPrefix={`posts/${slug}/s-${idx}`}
          onUploaded={(url) => onChange({ ...value, imageUrl: url })}
          label={value.imageUrl ? "Încarcă altă imagine" : "Încarcă imagine"}
        />
        {value.imageUrl && (
          <span className="break-all text-xs opacity-70">imagine setată</span>
        )}
      </div>
    </div>
  );
}

function emptySection(): SectionType {
  return { heading: "", bodyMd: "", imagePosition: "full" } as SectionType;
}

function PreviewImage({
  src,
  className,
  aspectClassName,
}: {
  src: string;
  className?: string;
  aspectClassName?: string;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl ${
        aspectClassName ?? "aspect-[16/9]"
      }`}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 768px"
        className={className ?? "object-cover"}
      />
    </div>
  );
}

export default function EditPostClient({ initial }: { initial: InitialPost }) {
  const router = useRouter();
  const locale = useLocale();

    const [postLocale, setPostLocale] = useState(initial.locale);


    const [title, setTitle] = useState(initial.title ?? "");
  const [subtitle, setSubtitle] = useState(initial.subtitle ?? "");
  const [excerpt, setExcerpt] = useState(initial.excerpt ?? "");
  const [author, setAuthor] = useState(initial.author ?? "");
  const [articleDate, setArticleDate] = useState(initial.articleDate ?? "");
  const [coverUrl, setCoverUrl] = useState<string | null>(initial.coverUrl);
  const [tagsInput, setTagsInput] = useState<string>(initial.tags.join(", "));
    const [sections, setSections] = useState<SectionType[]>(
    initial.sections.length > 0 ? initial.sections : [emptySection()]
  );

  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [draftId, setDraftId] = useState<string | null>(null);

  function updateSection(i: number, v: SectionType) {
    setSections((prev) => {
      const next = prev.slice();
      next[i] = v;
      return next;
    });
  }

  const tagsArr = useMemo(
    () =>
      tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    [tagsInput]
  );

  function getPreviewDateString() {
    if (articleDate) {
      const d = new Date(articleDate);
      if (!Number.isNaN(d.getTime())) return d.toLocaleDateString();
    }
    return new Date().toLocaleDateString();
  }

  function buildPayload(id?: string) {
    return {
      id,
      slug: initial.slug,
      title,
      subtitle,
      excerpt,
      author,
      articleDate: articleDate || undefined,
      coverUrl: coverUrl || undefined,
      tags: tagsArr,
      sections,
        locale: postLocale,
      published: false,
    };
  }

    async function handleSaveDraft() {
        if (!postLocale) {
            setErr("Selectează limba articolului");
            return;
        }

        try {
            setBusy(true);
            setErr(null);

            const payload = buildPayload(draftId ?? undefined);
            const result = await saveDraft(payload);
            setDraftId(result.id);
        } catch (e: unknown) {
            setErr(getErrorMessage(e, "Eroare la salvare"));
        } finally {
            setBusy(false);
        }
    }


    async function handlePublish() {
        if (!postLocale) {
            setErr("Selectează limba articolului");
            return;
        }

        try {
            setBusy(true);
            setErr(null);

            let id = draftId;
            if (!id) {
                const saved = await saveDraft(buildPayload());
                id = saved.id;
                setDraftId(saved.id);
            }

            if (!id) throw new Error("Draft ID lipsă");

            await publishDraft(id);
            router.replace(`/${locale}/admin/posts`);
        } catch (e: unknown) {
            setErr(getErrorMessage(e, "Eroare la publicare"));
        } finally {
            setBusy(false);
        }
    }


    const previewArticle = (
    <article className="prose max-w-none">
      <p className="text-sm opacity-60">
        {getPreviewDateString()} • {author || "Autor"}
      </p>

      <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
        {title || "Titlu articol"}
      </h1>

      {subtitle && (
        <h3 className="-mt-2 text-xl opacity-80 md:text-2xl">{subtitle}</h3>
      )}

      {coverUrl && (
        <div className="my-4">
          <PreviewImage src={coverUrl} />
        </div>
      )}

      {sections.map((s, i) => (
        <section key={i} className="my-8">
          {s.heading && (
            <header className="mb-4">
              <div className="mb-2 h-[2px] w-10 bg-[#FFD500]" />
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                {s.heading}
              </h2>
            </header>
          )}

          <div
            className={
              s.imageUrl && s.imagePosition !== "full"
                ? "grid items-start gap-4 md:grid-cols-2"
                : ""
            }
          >
            {s.imageUrl &&
              (s.imagePosition === "left" || s.imagePosition === "full") && (
                <div className={s.imagePosition === "full" ? "mb-3" : ""}>
                  <PreviewImage
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
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {s.bodyMd || "*Paragraf...*"}
              </ReactMarkdown>
            </div>

            {s.imageUrl && s.imagePosition === "right" && (
              <PreviewImage src={s.imageUrl} aspectClassName="aspect-[4/3]" />
            )}
          </div>
        </section>
      ))}

      <div className="not-prose mt-10 flex flex-wrap items-center gap-3">
        <span className="text-sm opacity-70">Share:</span>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm transition hover:bg-[#FFD500] hover:text-black"
          >
            <Facebook className="h-4 w-4" />
            <span>Facebook</span>
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm transition hover:bg-[#FFD500] hover:text-black"
          >
            <Linkedin className="h-4 w-4" />
            <span>LinkedIn</span>
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm transition hover:bg-[#FFD500] hover:text-black"
          >
            <Twitter className="h-4 w-4" />
            <span>X</span>
          </button>
        </div>
      </div>
    </article>
  );

  return (
    <>
      <div className="mx-auto max-w-6xl space-y-6 p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Editează postare</h1>
            <p className="mt-1 text-sm text-neutral-500">
              /blog/{initial.slug}
            </p>
          </div>
        </div>

          <div className="grid gap-3 md:grid-cols-2">
              <div className="flex flex-col gap-1">
                  <label className="text-sm text-neutral-700">URL</label>
                  <input
                      className="cursor-not-allowed rounded-xl border bg-neutral-50 p-2 text-neutral-500"
                      value={initial.slug}
                      disabled
                  />
                  <span className="text-xs text-neutral-500">
              URL-ul nu poate fi modificat din editorul de față.
            </span>
              </div>

              <div className="flex flex-col gap-1">
                  <label className="text-sm text-neutral-700">Autor</label>
                  <input
                      className="rounded-xl border p-2"
                      placeholder="Autor"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                  />
              </div>

              <div className="flex flex-col gap-1 md:col-span-2">
                  <label className="text-sm text-neutral-700">
                      Limba articolului
                  </label>
                  <select
                      className="max-w-xs rounded-xl border p-2"
                      value={postLocale}
                      onChange={(e) => setPostLocale(e.target.value)}
                  >
                      <option value="ro">Română</option>
                      <option value="en">English</option>
                      <option value="de">Deutsch</option>
                      <option value="fr">Français</option>
                      <option value="it">Italiano</option>
                      <option value="pl">Polski</option>
                  </select>
              </div>


              <input
                  className="rounded-xl border p-2 md:col-span-2"
                  placeholder="Titlu"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
              />

              <input
                  className="rounded-xl border p-2 md:col-span-2"
                  placeholder="Subtitlu"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
              />

              <textarea
                  className="min-h-[80px] rounded-xl border p-2 text-sm md:col-span-2"
                  placeholder="Rezumat (excerpt) – apare în listă și ajută la SEO"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
              />

              <div className="flex flex-col gap-1 md:col-span-2">
                  <label className="text-sm text-neutral-700">
                      Dată articol (opțional)
                  </label>
                  <input
                      type="date"
                      className="max-w-xs rounded-xl border p-2"
                      value={articleDate}
                      onChange={(e) => setArticleDate(e.target.value)}
                  />
                  <span className="text-xs text-neutral-500">
              Dacă este completată, această dată va fi afișată în locul datei de
              publicare.
            </span>
              </div>
          </div>

          <div className="flex items-center gap-3">
              <ImageUploader
                  pathPrefix={`posts/${initial.slug || "draft"}/cover`}
                  onUploaded={setCoverUrl}
                  label={coverUrl ? "Schimbă cover" : "Încarcă cover"}
              />
              {coverUrl && (
                  <span className="break-all text-xs opacity-70">cover setat</span>
              )}
          </div>

          <div>
              <label className="mb-1 block text-sm">
                  Tag-uri (separate prin virgulă)
              </label>
              <input
            className="w-full rounded-xl border p-2"
            placeholder="logistică, transport, supply-chain"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Secțiuni</h2>
            <button
              type="button"
              className="rounded-xl border px-3 py-1"
              onClick={() => setSections((prev) => [...prev, emptySection()])}
            >
              + Adaugă secțiune
            </button>
          </div>

          {sections.map((s, i) => (
            <div key={i} className="space-y-2">
              <SectionEditor
                idx={i}
                value={s}
                onChange={(v) => updateSection(i, v)}
                slug={initial.slug || "draft"}
              />
              {sections.length > 1 && (
                <button
                  type="button"
                  className="text-xs opacity-70 underline"
                  onClick={() =>
                    setSections((prev) => prev.filter((_, j) => j !== i))
                  }
                >
                  șterge secțiunea
                </button>
              )}
            </div>
          ))}
        </div>

        {err && <p className="text-sm text-red-600">{err}</p>}

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleSaveDraft}
            disabled={busy}
            className="rounded-xl border px-4 py-2"
          >
            Salvează draft
          </button>
          <button
            onClick={handlePublish}
            disabled={busy}
            className="rounded-xl border px-4 py-2"
          >
            Publică modificările
          </button>
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className="rounded-xl border px-4 py-2"
          >
            Previzualizează articol
          </button>
        </div>
      </div>

      {showPreview && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60">
          <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-5">
            <button
              type="button"
              onClick={() => setShowPreview(false)}
              className="absolute right-4 top-4 rounded-xl border bg-white/80 px-3 py-1 text-sm"
            >
              Închide preview
            </button>
            {previewArticle}
          </div>
        </div>
      )}
    </>
  );
}
