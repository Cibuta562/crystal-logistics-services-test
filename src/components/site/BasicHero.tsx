"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";


import {
  LazyMotion,
  domAnimation,
  m,
  useInView,
  useReducedMotion,
} from "framer-motion";

import { ArrowRight, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";

import NewsletterFormSection from "@/components/site/NewsletterFormSection";

// ------------------------------
// Code-split heavier sections
// ------------------------------
const ReviewsSection = dynamic(
    () => import("@/components/site/ReviewsSection"),
    { ssr: false, loading: () => <div className="h-24 bg-white" /> }
);

const Organizatii = dynamic(() => import("@/components/site/Organizatii"), {
  ssr: false,
  loading: () => <div className="h-16 bg-white" />,
});

const BlogAndFAQSection = dynamic(
    () => import("@/components/site/BlogAndFAQSection"),
    { ssr: false, loading: () => <div className="h-24 bg-white" /> }
);

const WhyWorkWithUsSection = dynamic(
    () => import("@/components/site/WhyWorkWithUsSection"),
    { ssr: false, loading: () => <div className="h-24 bg-white" /> }
);




// ------------------------------
// Static data outside component
// ------------------------------
const SERVICE_CARDS = [
  {
    key: "road",
    img: "/images/rutier.webp",
    link: "/transport-marfa-rutier",
  },
  {
    key: "maritime",
    img: "/images/maritim.webp",
    link: "/transport-maritim",
  },
  {
    key: "air",
    img: "/images/aerian.webp",
    link: "/transport-aerian",
  },
  {
    key: "rail",
    img: "/images/feroviar.webp",
    link: "/transport-feroviar",
  },
] as const;

// ------------------------------
// Motion variants (FADE ONLY)
// no functions, no y, no blur
// ------------------------------
const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export default function PageHero({
                                   backgroundVideo = "/videos/heroVideo.webm",
                                 }: {
  backgroundVideo?: string;
}) {
  const t = useTranslations("BasicHero");
  const s = useTranslations("Services");
  const locale = useLocale();
  const reduceMotion = useReducedMotion();

  const [isQuoteLoading, setIsQuoteLoading] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);

  const quoteUrl =
      locale === "ro"
          ? "https://forms.monday.com/forms/embed/d822b77b6d1ae8edf0cc2c81a9989ce9?r=euc1"
          : "https://forms.monday.com/forms/embed/0dd269a68887c5ca2de17dd4dead0648?r=euc1";

  const fadeTransition = {
    duration: reduceMotion ? 0 : 0.6,
    ease: "easeOut",
  } as const;

  // ------------------------------
  // ✅ Tracking helper
  // ------------------------------
  const sendTracking = useCallback(
      (event: "form_load" | "form_intent" | "form_submission") => {
        try {
          const key = `tracked-${locale}-homepage-newsletter-${event}`;
          if (sessionStorage.getItem(key)) return;
          sessionStorage.setItem(key, "1");

          fetch("/api/form-tracking", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              pageUrl: window.location.href,
              language: locale,
              formType: "homepage/newsletter",
              event,
            }),
          }).catch(() => {});
        } catch (e) {
          console.error("Tracking error:", e);
        }
      },
      [locale]
  );

  // ✅ FORM LOAD tracking
  useEffect(() => {
    const iframe = document.querySelector(
        "iframe[title='Formular abonare / contact']"
    ) as HTMLIFrameElement | null;

    if (!iframe) return;

    const onLoad = () => sendTracking("form_load");
    iframe.addEventListener("load", onLoad);

    return () => iframe.removeEventListener("load", onLoad);
  }, [sendTracking]);

  // ✅ FORM INTENT tracking
  useEffect(() => {
    const iframe = document.querySelector(
        "iframe[title='Formular abonare / contact']"
    );
    if (!iframe) return;

    const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) sendTracking("form_intent");
        },
        { threshold: 0.3 }
    );

    observer.observe(iframe);
    return () => observer.disconnect();
  }, [sendTracking]);

  // ✅ FORM SUBMISSION tracking
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (!event.data) return;
      if (event.data.type === "monday-form-submit") {
        sendTracking("form_submission");
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [sendTracking]);

  return (
      <LazyMotion features={domAnimation}>
        <section className="bg-neutral-900 text-white overflow-hidden">
          {/* ================= HERO TEXT ================= */}
          {/* ================= HERO TEXT ================= */}
          <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 flex flex-col md:flex-row items-start justify-between">
            <div className="flex flex-col items-start md:w-1/2">
              <m.h1
                  initial="hidden"
                  animate="show"              // 👈 în loc de whileInView
                  variants={fadeIn}
                  transition={fadeTransition}
                  className="text-4xl md:text-6xl font-regular leading-tight"
              >
                {t("title")}
              </m.h1>
            </div>

            <m.div
                initial="hidden"
                animate="show"                // 👈 și aici
                variants={fadeIn}
                transition={fadeTransition}
                className="relative md:w-1/2 text-white mt-8 md:mt-0"
            >
              <p className="max-w-lg text-base md:text-lg leading-relaxed text-white">
                {t("paragraph")}
              </p>
            </m.div>
          </div>

          {/* ================= VIDEO HERO ================= */}
          <div className="relative w-full h-[40vh] md:h-[65vh] overflow-hidden">
            <video
                className="absolute top-0 left-0 w-full h-full object-cover brightness-[0.7]"
                src={backgroundVideo}
                autoPlay
                muted
                loop
                playsInline
                preload="none"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />

            {/* CTA buttons */}
            <div className="absolute bottom-16 left-0 xl:left-[calc((100vw-1280px)/2)] w-full z-20">
              <div className="px-6 md:px-12 flex flex-col gap-3 w-[330px] md:w-[400px]">
                <button
                    onClick={() => { setQuoteOpen(true);
                                   setIsQuoteLoading(true);}}
                    className="relative overflow-hidden group flex items-center justify-start border border-yellow-400 rounded-full px-6 py-2 text-sm md:text-base font-medium text-black bg-yellow-400 transition-all duration-300 w-full"
                >
                  <span
                      className="absolute inset-0 bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"/>
                  <span
                      className="relative z-10 flex items-center gap-2 group-hover:text-black transition-colors duration-300">
    {t("ctaPrimary")} <ArrowRight size={16}/>
  </span>
                </button>


                <Link
                    href="/transportatori"
                    className="relative overflow-hidden group flex items-center justify-start border border-white/60 rounded-full px-6 py-2 text-sm md:text-base font-medium text-white transition-all duration-300 w-full"
                >
                  <span
                      className="absolute inset-0 bg-yellow-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"/>
                  <span
                      className="relative z-10 flex items-center gap-2 group-hover:text-black transition-colors duration-300">
                  {t("ctaSecondary")} <ArrowRight size={16}/>
                </span>
                </Link>
              </div>
            </div>
          </div>

          {/* ================= AI MARFĂ ================= */}
          <div className="bg-neutral-900 text-gray-200 py-16">
            <div className="max-w-7xl mx-auto px-6 md:px-12 text-left">
              <m.h2
                  initial="hidden"
                  whileInView="show"
                  viewport={{once: true, amount: 0.3}}
                  variants={fadeIn}
                  transition={fadeTransition}
                  className="text-2xl md:text-3xl font-bold mb-4"
              >
                {t("hasCargoTitle")}
              </m.h2>

              <m.p
                  initial="hidden"
                  whileInView="show"
                  viewport={{once: true, amount: 0.3}}
                  variants={fadeIn}
                  transition={fadeTransition}
                  className="mb-4 max-w-2xl"
              >
                {t("hasCargoText1")}
              </m.p>

              <m.p
                  initial="hidden"
                  whileInView="show"
                  viewport={{once: true, amount: 0.3}}
                  variants={fadeIn}
                  transition={fadeTransition}
                  className="mb-4 max-w-2xl whitespace-pre-line"
              >
                {t("hasCargoText2")}
              </m.p>

              <m.p
                  initial="hidden"
                  whileInView="show"
                  viewport={{once: true, amount: 0.3}}
                  variants={fadeIn}
                  transition={fadeTransition}
                  className="mb-8 max-w-2xl"
              >
                {t("hasCargoText3")}
              </m.p>

              <button
                  onClick={() => { setQuoteOpen(true);
                    setIsQuoteLoading(true);}}
                  className="relative overflow-hidden group flex items-center gap-2 border border-white/60 rounded-full px-10 py-2 text-white text-sm md:text-base font-medium transition-all duration-300 w-fit"
              >
                <span
                    className="absolute inset-0 bg-yellow-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"/>
                <span
                    className="relative z-10 flex items-center gap-2 group-hover:text-black transition-colors duration-300">
    {t("fillForm")}
                  <ArrowRight size={16}/>
  </span>
              </button>

            </div>
          </div>

          {/* ================= SERVICII ================= */}
          <section className="bg-neutral-900 text-white pb-4 pt-6">
            <div className="max-w-7xl mx-auto px-6 md:px-12 pb-10">
              <div className="flex items-center justify-center gap-6 mb-16">
                <span className="block h-[2px] w-16 bg-yellow-500"/>
                <m.h2
                    initial="hidden"
                    whileInView="show"
                    viewport={{once: true, amount: 0.2}}
                    variants={fadeIn}
                    transition={fadeTransition}
                    className="text-center text-4xl md:text-4xl font-normal"
                >
                  {s("title")}
                </m.h2>
                <span className="block h-[2px] w-16 bg-yellow-500" />
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                {SERVICE_CARDS.map(({ key, img, link }) => (
                    <m.div
                        key={key}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeIn}
                        transition={fadeTransition}
                        className="bg-white text-black rounded-md overflow-hidden shadow-lg"
                    >
                      <div className="relative w-full h-56">
                        <Image
                            src={img}
                            alt={s(`cards.${key}.title`)}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                        />
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="block h-6 w-[3px] bg-yellow-500" />
                          <h3 className="text-xl font-normal">
                            {s(`cards.${key}.title`)}
                          </h3>
                        </div>

                        <p className="text-gray-800 whitespace-pre-line leading-relaxed mb-6">
                          {s(`cards.${key}.text`)}
                        </p>

                        <Link href={link} className="inline-flex flex-col group">
                      <span className="flex items-center gap-2 text-black font-medium">
                        {s("learnMore")}
                        <ChevronRight
                            size={18}
                            className="group-hover:translate-x-1 transition-transform"
                        />
                      </span>
                          <span className="block h-[2px] w-14 bg-yellow-500 mt-1 group-hover:w-20 transition-all" />
                        </Link>
                      </div>
                    </m.div>
                ))}
              </div>

              {/* ================= MULTIMODAL CARD ================= */}
              <m.div
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeIn}
                  transition={fadeTransition}
                  className="mt-10 bg-white text-black rounded-md overflow-hidden shadow-xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative w-full h-72 md:h-full min-h-[18rem]">
                    <Image
                        src="/images/multimodal.webp"
                        alt={s("cards.multimodal.title")}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                    />
                  </div>

                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="block h-6 w-[3px] bg-yellow-500" />
                      <h3 className="text-2xl font-normal">
                        {s("cards.multimodal.title")}
                      </h3>
                    </div>

                    <p className="text-gray-800 mb-8 leading-relaxed max-w-xl">
                      {s("cards.multimodal.text")}
                    </p>

                    <Link
                        href="/transport-multimodal"
                        className="inline-flex flex-col group"
                    >
                    <span className="flex items-center gap-2 text-black font-medium">
                      {s("learnMore")}
                      <ChevronRight
                          size={18}
                          className="group-hover:translate-x-1 transition-transform"
                      />
                    </span>
                      <span className="block h-[2px] w-14 bg-yellow-500 mt-1 group-hover:w-20 transition-all" />
                    </Link>
                  </div>
                </div>
              </m.div>
            </div>

            {/* ================= STATS ================= */}
            <AnimatedStatsSection fadeTransition={fadeTransition} />
          </section>

          {/* ================= OTHER SECTIONS ================= */}
          <ReviewsSection />
          <Organizatii />

          {/* Banner */}
          <m.section
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
              transition={fadeTransition}
              className="bg-white"
          >
            <div className="relative w-full h-[40vh] md:h-[60vh] lg:h-[55vh]">
              <Image
                  src="/images/homeBannerHero.webp"
                  alt="Crystal Logistics banner"
                  fill
                  sizes="100vw"
                  className="object-cover"
                  style={{ objectPosition: "24% center" }}
                  priority={false}
              />
            </div>
          </m.section>

          <BlogAndFAQSection />
          <WhyWorkWithUsSection />

          {/* Newsletter form */}
          <NewsletterFormSection />
        </section>
        {quoteOpen && (
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] px-4"
                onClick={() => setQuoteOpen(false)}
            >
              <div
                  className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden relative"
                  onClick={(e) => e.stopPropagation()}
              >
                <button
                    onClick={() => setQuoteOpen(false)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/30 z-20"
                >
                  <X className="w-6 h-6 text-black" />
                </button>

                {/* container relativ ca să putem suprapune loaderul */}
                <div className="relative w-full h-[80vh]">
                  {/* LOADER OVERLAY */}
                  {isQuoteLoading && (
                      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white">
                        {/* spinner simplu Tailwind */}
                        <div className="h-10 w-10 rounded-full border-4 border-neutral-200 border-t-yellow-500 animate-spin" />
                        <p className="mt-4 text-neutral-700 text-sm md:text-base">
                          Se încarcă formularul…
                        </p>

                        {/* dots animation mică (opțional) */}
                        <div className="mt-2 flex gap-1">
                          <span className="h-2 w-2 bg-yellow-500 rounded-full animate-bounce [animation-delay:-0.2s]" />
                          <span className="h-2 w-2 bg-yellow-500 rounded-full animate-bounce [animation-delay:-0.1s]" />
                          <span className="h-2 w-2 bg-yellow-500 rounded-full animate-bounce" />
                        </div>
                      </div>
                  )}

                  <iframe
                      src={quoteUrl}
                      className="absolute inset-0 w-full h-full"
                      allow="fullscreen; clipboard-write"
                      loading="lazy"
                      onLoad={() => {
                        setIsQuoteLoading(false);
                        sendTracking("form_load"); // dacă vrei să track-uiesti fix la load modal
                      }}
                      onError={() => setIsQuoteLoading(false)}
                  />
                </div>
              </div>
            </div>
        )}


      </LazyMotion>
  );
}

/* ============================
   STATS SECTION (fade only)
============================= */
function AnimatedStatsSection({
                                fadeTransition,
                              }: {
  fadeTransition: { duration: number; ease: "easeOut" };
}) {
  const t = useTranslations("Stats");
  const locale = useLocale();
  const reduceMotion = useReducedMotion();

  const stats = [
    { value: 22000000, label: t("items.km"), icon: "/images/numbers1.svg" },
    { value: 7000, label: t("items.clients"), icon: "/images/numbers2.svg" },
    { value: 230000, label: t("items.cargo"), icon: "/images/numbers3.svg" },
    {
      value: 20,
      label: t("items.revenue"),
      icon: "/images/numbers4.svg",
      prefix: "€",
      suffix: "B",
    },
    { value: 98, label: t("items.satisfaction"), icon: "/images/numbers5.svg" },
  ];

  const numberLocale = locale === "ro" ? "ro-RO" : "en-US";
  const duration = reduceMotion ? 600 : 1800;

  return (
      <section className="bg-white text-neutral-900 py-10">
        <m.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeIn}
            transition={fadeTransition}
            className="max-w-7xl mx-auto px-6 md:px-12"
        >
          <div className="text-center mb-4">
            <h2 className="text-2xl md:text-3xl font-normal mb-3">
              {t("title")}
            </h2>
            <div className="w-16 h-[2px] bg-yellow-500 mx-auto" />
          </div>

          <div className="flex flex-col md:grid md:grid-cols-5 text-center w-full">
            {stats.map((s, i) => (
                <AnimatedStat
                    key={i}
                    value={s.value}
                    label={s.label}
                    icon={s.icon}
                    duration={duration}
                    numberLocale={numberLocale}
                    fadeTransition={fadeTransition}
                    prefix={("prefix" in s && s.prefix) || ""}
                    suffix={("suffix" in s && s.suffix) || ""}
                />
            ))}
          </div>
        </m.div>
      </section>
  );
}


function AnimatedStat({
                        value,
                        label,
                        icon,
                        duration,
                        numberLocale,
                        fadeTransition,
                        prefix = "",
                        suffix = "",
                      }: {
  value: number;
  label: string;
  icon: string;
  duration: number;
  numberLocale: string;
  fadeTransition: { duration: number; ease: "easeOut" };
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const stepTime = 20;
    const increment = end / (duration / stepTime);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
      <m.div
          ref={ref}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeIn}
          transition={fadeTransition}
          className="flex flex-col items-center py-8 border-b border-neutral-200 md:border-none w-full"
      >
        <div className="hidden md:flex justify-center mb-3">
          <Image src={icon} alt={label} width={64} height={64} />
        </div>

        <div className="text-3xl font-semibold">
          {prefix}
          {count.toLocaleString(numberLocale)}
          {suffix}
        </div>
        <div className="text-yellow-500 text-lg md:text-xl mt-1">{label}</div>
      </m.div>
  );
}

