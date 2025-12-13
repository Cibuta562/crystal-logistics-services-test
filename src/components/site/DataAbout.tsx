"use client";

import { useEffect, useRef, useState } from "react";
import { motion, animate } from "framer-motion";
import {
  Users,
  Truck,
  Package,
  CheckCircle,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

// === COUNT-UP INTEGRAT ===
function useCountUpOnView(target: number, duration = 1.5) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          animate(0, target, {
            duration,
            ease: "easeOut",
            onUpdate: (v) => setValue(v),
          });
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return { value, ref };
}

// === TIPURI ===
type StatItemProps = {
  value: number;
  suffix: string;
  label: string;
  Icon: LucideIcon;
};

type TimelinePointProps = {
  year: number;
  value: number;
  index: number;
};

// === COMPONENTĂ PENTRU STATISTICI ===
function StatItem({ value, suffix, label, Icon }: StatItemProps) {
  const { value: animated, ref } = useCountUpOnView(value);

  return (
    <div
      ref={ref}
      className="flex-1 flex flex-col items-center text-center gap-2"
    >
      <div className="w-12 h-12 mb-2 rounded-full border border-[#FFD500]/60 flex items-center justify-center">
        <Icon className="text-white" size={22} />
      </div>

      <span className="text-2xl md:text-3xl font-bold text-[#FFD500]">
        {Math.round(animated).toLocaleString("en-US")}
        {suffix}
      </span>

      <p className="text-gray-300 text-xs md:text-sm tracking-wide">{label}</p>
    </div>
  );
}

// === COMPONENTĂ PENTRU UN PUNCT DIN TIMELINE ===
function TimelinePoint({ year, value, index }: TimelinePointProps) {
  const { value: count, ref } = useCountUpOnView(value);

  const isLeft = index % 2 === 1;

  return (
    <div
      ref={ref}
      className="
        flex flex-col items-center text-center
        w-full md:w-[80px]
        relative
      "
    >
      {/* Punct animat */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 + index * 0.15, duration: 0.4 }}
        className="
          w-4 h-4 rounded-full bg-[#FFD500]
          border-[4px] border-[#141414] z-10
          translate-y-[6px]
        "
      />

      {/* TEXT */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 + index * 0.15, duration: 0.4 }}
        className="mt-6 relative"
      >
        <div
          className={`
            md:static 
            absolute md:relative
            ${
              isLeft
                ? "-translate-x-[150px] text-right"
                : "translate-x-[20px] text-left"
            }
            -translate-y-[60px]  
            md:translate-y-[-20px]
            md:translate-x-0 
            md:text-center
            w-[130px]
          `}
        >
          <p className="text-white font-semibold text-lg md:text-2xl">{year}</p>

          <span className="text-gray-300 text-sm md:text-lg">
            {value < 1_000_000
              ? `${Math.round(count / 1000)}K EUR`
              : `${(count / 1_000_000).toFixed(1)}M EUR`}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

// === COMPONENTA PRINCIPALĂ ===
export default function DataAbout() {
  const t = useTranslations("about.dataAbout");

  const stats: StatItemProps[] = [
    { value: 4500, suffix: "+", label: t("stats.clients"), Icon: Users },
    { value: 4000, suffix: "+", label: t("stats.partners"), Icon: Truck },
    { value: 500, suffix: "+", label: t("stats.orders"), Icon: Package },
    {
      value: 98,
      suffix: "%",
      label: t("stats.satisfaction"),
      Icon: CheckCircle,
    },
  ];

  const revenue: { year: number; value: number }[] = [
    { year: 2021, value: 130000 },
    { year: 2022, value: 600000 },
    { year: 2023, value: 1700000 },
    { year: 2024, value: 3500000 },
    { year: 2025, value: 6300000 },
  ];

  return (
    <section className="w-full bg-[#0F0F0F] py-16 px-4 md:px-10 flex flex-col items-center">
      <div className="max-w-6xl w-full flex flex-col gap-16">
        {/* === STATISTICI === */}
        <div>
          <div className="mb-6">
            <h2
              className="
                text-2xl md:text-3xl font-semibold text-white
                text-center md:text-left
              "
            >
              {t("statsTitle")}
            </h2>

            <div
              className="
                h-1 w-12 bg-[#FFD500] rounded-full
                mx-auto md:mx-0
                mt-2
              "
            />
          </div>

          <div className="w-full bg-[#141414] rounded-3xl px-6 md:px-10 py-10 flex flex-col md:flex-row justify-between gap-8">
            {stats.map((item, i) => (
              <StatItem
                key={i}
                value={item.value}
                suffix={item.suffix}
                label={item.label}
                Icon={item.Icon}
              />
            ))}
          </div>
        </div>

        {/* === TIMELINE === */}
        <div>
          <div className="mb-6">
            <h2
              className="
                text-2xl md:text-3xl font-semibold text-white
                text-center md:text-left
              "
            >
              {t("timelineTitle")}
            </h2>

            <div
              className="
                h-1 w-12 bg-[#FFD500] rounded-full
                mx-auto md:mx-0
                mt-2
              "
            />
          </div>

          <div className="w-full bg-[#141414] rounded-3xl px-6 md:px-10 py-20 relative">
            {/* Linie orizontală */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="
                hidden md:block
                absolute left-10 right-10
                top-[126px]
                h-[2px] bg-neutral-600
                origin-left
              "
            />

            {/* Linie verticală pe mobil */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="
                md:hidden
                absolute left-1/2 -translate-x-1/2
                top-10 bottom-10
                w-[2px] bg-neutral-600
                origin-top
              "
            />

            <div className="relative flex justify-between items-start flex-wrap gap-y-20 pt-10">
              {revenue.map((entry, i) => (
                <TimelinePoint
                  key={i}
                  year={entry.year}
                  value={entry.value}
                  index={i}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
