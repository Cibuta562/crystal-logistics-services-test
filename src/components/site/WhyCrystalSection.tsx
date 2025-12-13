"use client";

import {
  Cpu,
  Layers,
  BadgeCheck,
  ShieldCheck,
  LineChart,
  Handshake,
} from "lucide-react";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

export default function WhyCrystalCards() {
  const t = useTranslations("about.whyCrystal");

  const advantages = [
    {
      icon: Cpu,
      title: t("innovation.title"),
      desc: t("innovation.desc"),
    },
    {
      icon: Layers,
      title: t("consulting.title"),
      desc: t("consulting.desc"),
    },
    {
      icon: LineChart,
      title: t("efficiency.title"),
      desc: t("efficiency.desc"),
    },
    {
      icon: BadgeCheck,
      title: t("performance.title"),
      desc: t("performance.desc"),
    },
    {
      icon: ShieldCheck,
      title: t("safety.title"),
      desc: t("safety.desc"),
    },
    {
      icon: Handshake,
      title: t("ethics.title"),
      desc: t("ethics.desc"),
    },
  ];

  // === OPACITY ONLY ===
  const fadeText: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.45,
        ease: "easeOut",
      },
    },
  };

  const staggerParent: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  return (
      <section className="bg-crystal-navy text-white py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">

          {/* === TITLE === */}
          <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeText}
              className="mb-12 text-center md:text-left"
          >
            <h2 className="text-black text-3xl md:text-4xl font-bold">
              {t("sectionTitle")}
            </h2>
            <div className="h-1 w-20 bg-crystal-yellow rounded-full mt-3 mx-auto md:mx-0" />
          </motion.div>

          {/* === CARDS GRID === */}
          <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={staggerParent}
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {advantages.map((item, i) => {
              const Icon = item.icon;

              return (
                  <div
                      key={i}
                      className="
                  bg-crystal-yellow
                  border border-black/10
                  rounded-2xl
                  p-6
                  flex flex-col gap-4
                  shadow-lg
                  transition
                  hover:shadow-xl
                "
                  >
                    {/* ICON – STATIC */}
                    <div className="w-12 h-12 flex items-center justify-center bg-[#FFD500] rounded-full">
                      <Icon className="text-black" size={24} />
                    </div>

                    {/* TITLE – ANIMATED */}
                    <motion.h3
                        variants={fadeText}
                        className="text-lg font-bold text-black"
                    >
                      {item.title}
                    </motion.h3>

                    {/* DESCRIPTION – ANIMATED */}
                    <motion.p
                        variants={fadeText}
                        transition={{ delay: 0.1 }}
                        className="text-sm text-black/80 leading-relaxed"
                    >
                      {item.desc}
                    </motion.p>
                  </div>
              );
            })}
          </motion.div>
        </div>
      </section>
  );
}
