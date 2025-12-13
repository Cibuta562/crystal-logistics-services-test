"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import {
  LazyMotion,
  domAnimation,
  m,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Motion variants (fade only)
const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

type FadeTransition = {
  duration: number;
  ease: "easeOut";
};

type AnimatedStatProps = {
  value: number;
  label: string;
  icon: string;
  duration: number;
  numberLocale: string;
  fadeTransition: FadeTransition;
};

function AnimatedStat({
  value,
  label,
  icon,
  duration,
  numberLocale,
  fadeTransition,
}: AnimatedStatProps) {
  const ref = useRef<HTMLDivElement | null>(null);
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
        {count.toLocaleString(numberLocale)}
      </div>
      <div className="text-yellow-500 text-lg md:text-xl mt-1">{label}</div>
    </m.div>
  );
}

export default function AnimatedStatsSection() {
  const t = useTranslations("Stats");
  const locale = useLocale();
  const reduceMotion = useReducedMotion();

  const stats = [
    { value: 1400000, label: t("items.km"), icon: "/images/numbers1.svg" },
    { value: 2300, label: t("items.clients"), icon: "/images/numbers2.svg" },
    { value: 24000, label: t("items.cargo"), icon: "/images/numbers3.svg" },
    { value: 900, label: t("items.revenue"), icon: "/images/numbers4.svg" },
    { value: 98, label: t("items.satisfaction"), icon: "/images/numbers5.svg" },
  ];

  const numberLocale = locale === "ro" ? "ro-RO" : "en-US";
  const duration = reduceMotion ? 600 : 1800;

  const fadeTransition: FadeTransition = {
    duration: reduceMotion ? 0 : 0.6,
    ease: "easeOut",
  };

  return (
    <LazyMotion features={domAnimation}>
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
                {...s}
                duration={duration}
                numberLocale={numberLocale}
                fadeTransition={fadeTransition}
              />
            ))}
          </div>
        </m.div>
      </section>
    </LazyMotion>
  );
}
