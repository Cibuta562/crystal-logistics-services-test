"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Link } from "@/i18n/navigation";

import Image from "next/image";
import {
  CheckCircle,
  Quote,
  Pause,
  Play,
  Truck,
  Ship,
  Clock,
  FileText,
  Package,
  ShieldCheck,
  BarChart3,
  ClipboardList,
} from "lucide-react";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import Footer from "@/components/site/Footer";
import { useTranslations } from "next-intl";
import NewsletterFormSection from "@/components/site/NewsletterFormSection";
import DataAbout from "@/components/site/DataAbout";
import WhyCrystalSections from "@/components/site/WhyCrystalSection";

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

export default function AboutPage() {
  const t = useTranslations("about");

  const partners = [
    "/images/client1.webp",
    "/images/client2.webp",
    "/images/client3.webp",
    "/images/client4.webp",
    "/images/client5.webp",
  ];

  const benefitIcons = [
    Truck,
    Ship,
    ClipboardList,
    Clock,
    FileText,
    Package,
    ShieldCheck,
    BarChart3,
  ];

  const looped = [...partners, ...partners];

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeout = useRef<NodeJS.Timeout | null>(null);

  const router = useRouter();

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }

    setShowControls(true);

    if (controlsTimeout.current) {
      clearTimeout(controlsTimeout.current);
    }

    controlsTimeout.current = setTimeout(() => {
      setShowControls(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/aboutHero.webp"
            alt="About Background"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/70 md:bg-black/60" />
        </div>

        <div className="relative max-w-6xl mx-auto px-5 md:px-10 py-20 md:py-28 text-white">
          <div className="max-w-3xl">
            <motion.p
              initial="hidden"
              animate="show"
              variants={fade}
              className="text-[#FFD500] tracking-wide uppercase text-sm font-semibold"
            >
              {t("hero.tag")}
            </motion.p>

            <motion.h1
              initial="hidden"
              animate="show"
              variants={fade}
              transition={{ delay: 0.05 }}
              className="text-4xl md:text-5xl font-normal mt-2"
            >
              {t("hero.title")}
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="show"
              variants={fade}
              transition={{ delay: 0.1 }}
              className="mt-3 text-base md:text-lg leading-relaxed"
            >
              {t("hero.subtitle")}
            </motion.p>
          </div>
        </div>
      </section>

      <section className="relative w-full grid grid-cols-1 md:grid-cols-[60%_40%] min-h-[80vh] bg-neutral-900">
        <div className="flex flex-col justify-center px-8 md:px-16 py-20 text-white">
          <div>
            <motion.h2
              initial="hidden"
              animate="show"
              variants={fade}
              className="text-3xl font-light mb-10 text-center md:text-left"
            >
              {t("workWithUs.title")}
            </motion.h2>

            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                show: {
                  transition: { staggerChildren: 0.08 },
                },
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {(
                t.raw("workWithUs.items") as { title: string; desc: string }[]
              ).map((item, i) => (
                <div
                  key={i}
                  className="bg-neutral-800 p-6 rounded-xl shadow-lg border border-neutral-700 hover:border-yellow-400/60 transition"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle className="text-yellow-400 w-6 h-6 mt-0.5" />

                    <motion.h3
                      variants={{
                        hidden: { opacity: 0 },
                        show: { opacity: 1 },
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="text-lg font-medium text-white"
                    >
                      {item.title}
                    </motion.h3>
                  </div>

                  <motion.p
                    variants={{
                      hidden: { opacity: 0 },
                      show: { opacity: 1 },
                    }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                    className="text-sm text-white/80"
                  >
                    {item.desc}
                  </motion.p>
                </div>
              ))}
            </motion.div>

            <div className="mt-10">
              <button
                onClick={() => router.push("/contact")}
                className="relative overflow-hidden group inline-flex items-center justify-center border border-yellow-400 rounded-full px-12 py-2 text-[15px] font-semibold bg-yellow-400 text-black transition-all duration-300"
              >
                <span className="absolute inset-0 bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative z-10"
                >
                  {t("buttons.quote3")}
                </motion.span>
              </button>
            </div>
          </div>
        </div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={fade}
          transition={{ delay: 0.15 }}
          className="relative flex items-center justify-center bg-neutral-900 p-8 md:p-12"
        >
          <div className="relative w-full h-[60vh] md:h-[70%] rounded-2xl overflow-hidden shadow-2xl">
            <video
              ref={videoRef}
              src="/videos/about.webm#t=0.1"
              preload="metadata"
              playsInline
              className="w-full h-full object-cover rounded-2xl"
              onClick={togglePlay}
            />

            <button
              type="button"
              onClick={togglePlay}
              className="absolute inset-0 z-10"
            />

            <AnimatePresence>
              {showControls && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/70">
                    {isPlaying ? (
                      <Pause className="h-8 w-8 text-white" />
                    ) : (
                      <Play className="ml-0.5 h-8 w-8 text-white" />
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      <section className="bg-neutral-900 pt-10 md:pt-0 pb-24 px-8 md:px-16 text-white">
        <div className="w-full">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl font-light mb-20 text-center md:text-left"
          >
            {t("benefits.title")}
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              show: { transition: { staggerChildren: 0.12 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14"
          >
            {(t.raw("benefits.items") as { title: string; desc: string }[]).map(
              (item, i) => {
                const Icon = benefitIcons[i] ?? CheckCircle;

                return (
                  <div
                    key={i}
                    className="relative bg-neutral-800 px-6 py-5 pt-10 rounded-xl shadow-lg border border-neutral-700 hover:border-yellow-400/60 transition"
                  >
                    <div className="absolute top-[-20] left-1/2 -translate-x-1/2">
                      <div className="w-11 h-11 rounded-full bg-yellow-400 flex items-center justify-center shadow-md">
                        <Icon className="text-neutral-900 w-5 h-5" />
                      </div>
                    </div>

                    <motion.h3
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="text-lg font-semibold text-white text-left leading-snug"
                    >
                      {item.title}
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        ease: "easeOut",
                        delay: 0.1,
                      }}
                      className="text-sm text-white/80 mt-2 text-left leading-relaxed"
                    >
                      {item.desc}
                    </motion.p>
                  </div>
                );
              }
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="mt-10"
          >
            <Link
              href="/solutii"
              className="relative overflow-hidden group inline-flex items-center justify-center border border-yellow-400 rounded-full px-12 py-2 text-[15px] font-semibold bg-yellow-400 text-black transition-all"
            >
              <span className="absolute inset-0 bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              <span className="relative z-10">{t("buttons.quote2")}</span>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="bg-neutral-900 border-y border-neutral-800 py-20 px-6 md:px-20 text-center md:text-left">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            show: {
              transition: { staggerChildren: 0.12 },
            },
          }}
          className="max-w-5xl mx-auto flex flex-col items-center md:items-start"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1 },
            }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#FFD500]">
              <Image
                src="/images/team/Rafael.webp"
                alt="CEO"
                width={80}
                height={80}
                className="object-cover object-[center_-10px]"
              />
            </div>

            <div className="flex flex-col items-start text-left">
              <p className="font-semibold text-white text-lg">
                {t("quote.name")}
              </p>
              <p className="text-gray-300 text-sm">{t("quote.role")}</p>
            </div>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1 },
            }}
            className="relative"
          >
            <Quote
              size={30}
              strokeWidth={1.5}
              className="text-[#FFD500] mb-6"
            />

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                show: { transition: { staggerChildren: 0.12 } },
              }}
              className="italic text-lg text-gray-100 space-y-4"
            >
              {(t.raw("quote.paragraphs") as string[]).map((p, i) => (
                <motion.p
                  key={i}
                  variants={{
                    hidden: { opacity: 0 },
                    show: { opacity: 1 },
                  }}
                >
                  {p}
                </motion.p>
              ))}
            </motion.div>

            <Quote
              size={30}
              strokeWidth={1.5}
              className="text-[#FFD500] mt-6 rotate-180 ml-auto block"
            />
          </motion.div>
        </motion.div>
      </section>

      <section className="bg-white py-20 px-6 flex flex-col items-center text-center overflow-hidden">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-bold mb-3"
        >
          {t("fleet.title")}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="w-20 h-[3px] bg-[#FFD500] rounded-full mb-10"
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            show: { transition: { staggerChildren: 0.12 } },
          }}
          className="max-w-3xl mx-auto text-gray-700 space-y-4 mb-12"
        >
          {(t.raw("fleet.paragraphs") as string[]).map((p, i) => (
            <motion.p
              key={i}
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1 },
              }}
              className="leading-relaxed"
            >
              {p}
            </motion.p>
          ))}
        </motion.div>

        <div className="relative w-full flex justify-center">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-md py-6 px-4">
            <motion.div
              className="flex items-center gap-16"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 30, repeat: Infinity }}
            >
              {looped.map((logo, i) => (
                <Image
                  key={i}
                  src={logo}
                  alt="partner"
                  width={120}
                  height={120}
                  className="w-28 h-28 object-contain opacity-90 hover:scale-105 transition"
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <DataAbout />
      <WhyCrystalSections />

      <section className="bg-neutral-900 py-20 px-6 md:px-16">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl font-bold text-center mb-12 text-white"
        >
          {t("team.title")}
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            show: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
          className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10"
        >
          {(
            t.raw("team.members") as {
              name: string;
              role: string;
              img: string;
            }[]
          ).map((member, i) => (
            <div
              key={i}
              className="bg-neutral-800 rounded-xl shadow-lg overflow-hidden text-center px-4 py-6"
            >
              <Image
                src={member.img}
                alt={member.name}
                width={160}
                height={160}
                className={`mx-auto rounded-full w-28 h-28 mb-4 border-2 border-[#FFD500] object-cover ${
                  i === 1 || i === 2 ? "object-[center_0px]" : "object-[center_-12px]"
                }`}
              />

              <motion.h3
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1 },
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-base md:text-lg font-semibold text-white leading-tight"
              >
                {member.name}
              </motion.h3>

              <motion.p
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1 },
                }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                className="mt-1 text-sm text-[#FFD500] leading-snug"
              >
                {member.role}
              </motion.p>
            </div>
          ))}
        </motion.div>
      </section>

      <NewsletterFormSection />
      <Footer />
    </main>
  );
}
