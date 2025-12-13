"use client";

import { useState, useEffect, useRef } from "react";
import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import reviews from "../../../data/reviews";

type Locale = "ro" | "en";

type LocalizedString = {
  ro: string;
  en: string;
};

type Review = {
  author: string;
  date: LocalizedString;
  text: LocalizedString;
  rating: number;
};

/* ============================
   FADE ONLY ANIMATION
============================= */
const fade: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function ReviewsSection() {
  const [shuffled, setShuffled] = useState<Review[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const t = useTranslations("Reviews");
  const locale = useLocale() as Locale;

  /* === Shuffle reviews și selectează max 3 === */
  useEffect(() => {
    const copy = [...(reviews as Review[])];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    setShuffled(copy.slice(0, Math.min(copy.length, 3)));
  }, []);

  return (
    <motion.section
      variants={fade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="bg-neutral-900 text-white py-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* TITLU */}
        <motion.h2
          variants={fade}
          className="text-center text-2xl md:text-3xl font-semibold mb-12"
        >
          {t("title")}
        </motion.h2>

        {/* === DESKTOP GRID === */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {shuffled.map((r, i) => (
            <motion.div
              key={i}
              variants={fade}
              transition={{ delay: i * 0.12 }}
            >
              <ReviewCard {...r} t={t} locale={locale} />
            </motion.div>
          ))}
        </div>

        {/* === MOBILE CAROUSEL === */}
        <div className="relative md:hidden -mx-6">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory w-full"
          >
            {shuffled.map((r, i) => (
              <motion.div
                key={i}
                variants={fade}
                transition={{ delay: i * 0.12 }}
                className="snap-center flex-shrink-0 w-full px-6"
              >
                <ReviewCard {...r} t={t} locale={locale} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA LINK */}
        <motion.div
          variants={fade}
          transition={{ delay: 0.25 }}
          className="text-center mt-10"
        >
          <a
            href="https://www.google.com/maps/place/Crystal+Logistics+Services/@44.4336093,26.0513054,17z"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-500 hover:text-yellow-400 transition font-medium underline"
          >
            {t("cta")}
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}

function ReviewCard({
  author,
  date,
  text,
  rating,
  t,
  locale,
}: Review & {
  t: (key: string) => string;
  locale: Locale;
}) {
  const [expanded, setExpanded] = useState(false);
  const maxLength = 200;

  const fullText = text[locale] ?? text.ro;
  const visibleText =
    expanded || fullText.length <= maxLength
      ? fullText
      : fullText.slice(0, maxLength);

  return (
    <div className="bg-white text-neutral-900 p-6 rounded-xl shadow-lg h-full flex flex-col justify-between">
      {/* RATING */}
      <div className="flex gap-1 mb-3">
        {Array.from({ length: rating }).map((_, i) => (
          <span key={i} className="relative w-8 h-8">
            <Image
              src="/images/box.svg"
              alt="Star"
              fill
              sizes="32px"
              className="object-contain"
              priority={false}
            />
          </span>
        ))}
      </div>

      {/* TEXT */}
      <p className="text-base leading-relaxed mb-4">
        “{visibleText}
        {fullText.length > maxLength && !expanded && (
          <>
            …{" "}
            <button
              onClick={() => setExpanded(true)}
              className="text-yellow-500 hover:text-yellow-400 font-medium"
            >
              {t("readMore")}
            </button>
          </>
        )}
        {expanded && (
          <button
            onClick={() => setExpanded(false)}
            className="text-yellow-500 hover:text-yellow-400 font-medium ml-1"
          >
            {t("readLess")}
          </button>
        )}
        ”
      </p>

      {/* AUTHOR */}
      <div className="mt-auto border-t border-neutral-200 pt-4">
        <div className="font-semibold">{author}</div>
        <div className="text-gray-500 text-xs">{date[locale] ?? date.ro}</div>
      </div>
    </div>
  );
}
