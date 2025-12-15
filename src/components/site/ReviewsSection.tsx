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
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/* ============================
   GOOGLE MAP – PRIMARY LOCATION
============================= */
const PRIMARY_MAP_URL =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2848.7281566928994!2d26.0175049!3d44.4336093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b203a323ef943d%3A0x996f3f555919234f!2sBulevardul%20Iuliu%20Maniu%207%2C%20Bucure%C8%99ti%2C%20Rom%C3%A2nia!5e0!3m2!1sro!2sro!4v1731450700000";

export default function ReviewsSection() {
  const [shuffled, setShuffled] = useState<Review[]>([]);
  const [mapLoading, setMapLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const t = useTranslations("Reviews");
  const locale = useLocale() as Locale;

  /* === Shuffle reviews === */
  useEffect(() => {
    const copy = [...(reviews as Review[])];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    setShuffled(copy.slice(0, 3));
  }, []);

  /* === AUTO SCROLL MOBILE === */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % shuffled.length;
      el.scrollTo({
        left: index * el.clientWidth,
        behavior: "smooth",
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [shuffled]);

  return (
      <motion.section
          id="reviews"
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="bg-neutral-900 text-white py-12"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* TITLU */}
          <motion.h2
              variants={fade}
              className="text-center text-2xl md:text-3xl font-semibold mb-10"
          >
            {t("title")}
          </motion.h2>

          {/* ================= MAP (TOP) ================= */}
          <motion.div
              variants={fade}
              className="relative mb-10 h-[420px] rounded-2xl overflow-hidden border border-white/10"
          >
            {mapLoading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-neutral-900">
                  <div className="h-10 w-10 border-4 border-white/20 border-t-yellow-400 rounded-full animate-spin" />
                  <p className="mt-3 text-sm text-white/70">
                    Loading...
                  </p>
                </div>
            )}

            <iframe
                src={PRIMARY_MAP_URL}
                title="Crystal Logistics Services – București"
                aria-label="Crystal Logistics Services – București"
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setMapLoading(false)}
            />
          </motion.div>

          {/* ================= DESKTOP REVIEWS ================= */}
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

          {/* ================= MOBILE AUTO-SCROLL ================= */}
          <div className="relative md:hidden -mx-6">
            <div
                ref={scrollRef}
                className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory w-full"
            >
              {shuffled.map((r, i) => (
                  <div
                      key={i}
                      className="snap-center flex-shrink-0 w-full px-6"
                  >
                    <ReviewCard {...r} t={t} locale={locale} />
                  </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div
              variants={fade}
              transition={{ delay: 0.25 }}
              className="text-center mt-10"
          >
            <a
                href="https://www.google.com/maps/place/Crystal+Logistics+Services/@44.4336093,26.0513054,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-500 hover:text-yellow-400 font-medium underline"
            >
              {t("cta")}
            </a>
          </motion.div>
        </div>
      </motion.section>
  );
}

/* ============================
   REVIEW CARD
============================= */
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
          <div className="text-gray-500 text-xs">
            {date[locale] ?? date.ro}
          </div>
        </div>
      </div>
  );
}
