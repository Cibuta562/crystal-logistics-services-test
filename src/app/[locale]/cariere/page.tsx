"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import Footer from "@/components/site/Footer";
import { Play, Pause } from "lucide-react";
import { useRef, useState } from "react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import { Briefcase, Truck, Clock, Users, Medal, Globe } from "lucide-react";

/* -------------------------------------------
   TYPES
------------------------------------------- */

type SupportedLocale = "ro" | "en";

type Job = {
  title: string;
  location: string;
  type: string;
};

/* -------------------------------------------
   Static Data (UPDATED WITH MULTI-LANGUAGE JOBS)
------------------------------------------- */

const JOBS_BY_LOCALE: Record<SupportedLocale, Job[]> = {
  ro: [
    {
      title: "Expeditor Transport Internațional",
      location: "București",
      type: "Full-time",
    },
    {
      title: "Agent de Vânzări Transport",
      location: "București",
      type: "Full-time",
    },
    {
      title: "Account Manager",
      location: "București",
      type: "Full-time",
    },
  ],
  en: [
    { title: "Freight Forwarder", location: "Bucharest", type: "Full-time" },
    {
      title: "Sales and Freight Agent",
      location: "Bucharest",
      type: "Full-time",
    },
    { title: "Account Manager", location: "Bucharest", type: "Full-time" },
  ],
};

const getJobs = (locale: string): Job[] =>
  JOBS_BY_LOCALE[locale as SupportedLocale] ?? JOBS_BY_LOCALE.ro;

const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

export default function CareersPage() {
  const t = useTranslations("CareersPage");
  const locale = useLocale();
  const reduceMotion = useReducedMotion();

  const JOBS = getJobs(locale);

  const smoothScrollStyle = `
    html { scroll-behavior: smooth; }
  `;

  const mondayFormUrl =
    locale === "ro"
      ? "https://forms.monday.com/forms/embed/0ed77899cc49744ca3dde36d9d918f50?r=euc1"
      : "https://forms.monday.com/forms/embed/2e45a7d9e171f7534511020564a8b5d6?r=euc1";

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="bg-neutral-900 text-white">
        <style>{smoothScrollStyle}</style>

        {/* ================= HERO ================= */}
        <section className="relative h-[45vh] md:h-[60vh] overflow-hidden">
          <Image
            src="/images/teamBg.webp"
            alt="Careers background"
            fill
            priority
            className="object-cover opacity-40"
          />

          <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto">
            <m.h1
              initial="hidden"
              animate="show"
              className="text-4xl md:text-6xl font-light"
            >
              {t("hero.title")}
            </m.h1>

            <m.p
              initial="hidden"
              animate="show"
              custom={0.15}
              className="mt-4 text-lg max-w-xl text-white/90"
            >
              {t("hero.subtitle")}
            </m.p>

            <a
              href="#apply"
              className="mt-6 inline-block bg-yellow-400 text-black font-medium px-4 py-2 rounded-full hover:bg-white transition
                          w-[60%] md:w-[30%] text-center"
            >
              {t("hero.applyBtn")}
            </a>
          </div>
        </section>

        {/* ================= JOIN US ================= */}
        <m.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative w-full grid grid-cols-1 md:grid-cols-[60%_40%] min-h-[80vh] bg-neutral-900"
        >
          {/* LEFT CONTENT */}
          <m.div
            variants={staggerContainer}
            className="flex flex-col justify-center px-8 md:px-16 py-20 space-y-12 text-white"
          >
            <m.h2
              custom={0}
              className="text-3xl md:text-4xl font-light mb-4 text-center md:text-left"
            >
              {t("join.title")}
            </m.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: Medal,
                  title: t("join.item1.title"),
                  text: t("join.item1.text"),
                },
                {
                  icon: Clock,
                  title: t("join.item2.title"),
                  text: t("join.item2.text"),
                },
                {
                  icon: Users,
                  title: t("join.item3.title"),
                  text: t("join.item3.text"),
                },
                {
                  icon: Truck,
                  title: t("join.item4.title"),
                  text: t("join.item4.text"),
                },
                {
                  icon: Globe,
                  title: t("join.item5.title"),
                  text: t("join.item5.text"),
                },
                {
                  icon: Briefcase,
                  title: t("join.item6.title"),
                  text: t("join.item6.text"),
                },
              ].map(({ icon: Icon, title, text }, i) => (
                <m.div
                  key={i}
                  custom={i * 0.1}
                  className="bg-neutral-800 p-6 rounded-xl shadow-lg border border-neutral-700 hover:border-yellow-400/60 transition"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <Icon className="text-yellow-400 w-7 h-7 flex-shrink-0" />
                    <h3 className="text-lg font-medium">{title}</h3>
                  </div>
                  <p className="text-sm text-white/80">{text}</p>
                </m.div>
              ))}
            </div>

            {/* CTA */}
            <m.div custom={0.3}>
              <a
                href="#apply"
                className="relative overflow-hidden group inline-flex items-center justify-center
                      border border-yellow-400 rounded-full px-12 py-2 text-[15px] font-semibold
                      bg-yellow-400 text-black transition-all duration-300 whitespace-nowrap"
              >
                <span className="absolute inset-0 bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                <span className="relative z-10">{t("join.button")}</span>
              </a>
            </m.div>
          </m.div>

          {/* RIGHT VIDEO */}
          <m.div
            custom={0.4}
            className="relative flex items-center justify-center bg-neutral-900 p-6 md:p-10"
          >
            <div className="relative w-full h-[70%] md:h-[70%] rounded-2xl overflow-hidden shadow-2xl group">
              <video
                ref={videoRef}
                src="/videos/cariere.webm"
                loop
                playsInline
                className="w-full h-full object-cover rounded-2xl"
                onClick={togglePlay}
              />

              <button
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/0
                      group-hover:bg-black/40 transition"
              >
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {isPlaying ? (
                    <Pause className="w-16 h-16 text-white" />
                  ) : (
                    <Play className="w-16 h-16 text-white" />
                  )}
                </div>
              </button>
            </div>
          </m.div>
        </m.section>

        {/* ================= JOBS ================= */}
        <section className="pb-20 max-w-7xl mx-auto px-6 md:px-12">
          <m.h2
            initial="hidden"
            whileInView="show"
            className="text-3xl md:text-4xl font-light text-center mb-12"
          >
            {t("jobs.title")}
          </m.h2>

          <m.div
            initial="hidden"
            whileInView="show"
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            {JOBS.map((job, index) => (
              <m.div
                key={job.title}
                custom={reduceMotion ? 0 : index * 0.1}
                className="bg-neutral-800 border border-neutral-700 p-6 rounded-xl shadow-lg hover:border-yellow-400/60 transition"
              >
                <h3 className="text-xl font-medium">{job.title}</h3>
                <p className="text-white/70 mt-2">
                  Locație: {job.location}
                  <br />
                  Tip: {job.type}
                </p>
                <a
                  href="#apply"
                  className="mt-5 inline-block border border-yellow-400 text-yellow-400 px-5 py-2 rounded-full hover:bg-yellow-400 hover:text-black transition"
                >
                  {t("jobs.applyBtn")}
                </a>
              </m.div>
            ))}
          </m.div>
        </section>

        {/* ================= FORM ================= */}
        <section id="apply" className="pb-28 max-w-7xl mx-auto px-6 md:px-12">
          <m.h2
            initial="hidden"
            whileInView="show"
            className="text-3xl md:text-4xl font-light text-center mb-8"
          >
            {t("form.title")}
          </m.h2>

          <div className="bg-white rounded-xl overflow-hidden shadow-2xl p-4">
            <iframe
              src={mondayFormUrl}
              title="Job application form"
              className="w-full h-[75vh] md:h-[90vh]"
              allow="clipboard-write; fullscreen"
              loading="lazy"
            />
          </div>
        </section>

        <Footer />
      </div>
    </LazyMotion>
  );
}
