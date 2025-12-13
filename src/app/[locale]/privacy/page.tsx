"use client";

import Footer from "@/components/site/Footer";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

import { LazyMotion, domAnimation, m } from "framer-motion";

/* === SAME FADE YOU USE EVERYWHERE === */
// const fade = {
//   hidden: { opacity: 0 },
//   show: (delay = 0) => ({
//     opacity: 1,
//     transition: { duration: 0.6, ease: "easeOut", delay },
//   }),
// };

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

export default function PrivacyPolicyPage() {
  const t = useTranslations("privacy");

  const sections = t.raw("sections") as Record<
    string,
    {
      title: string;
      content: string[];
      table?: { headers: string[]; rows: string[][] };
    }
  >;

  /* === Smooth anchor scrolling === */
  useEffect(() => {
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          const yOffset = -120;
          const y =
            element.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }
    };

    document
      .querySelectorAll("a[href^='#section-']")
      .forEach((link) => link.addEventListener("click", handleAnchorClick));

    return () =>
      document
        .querySelectorAll("a[href^='#section-']")
        .forEach((link) =>
          link.removeEventListener("click", handleAnchorClick)
        );
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <main className="min-h-screen bg-neutral-900 text-white scroll-smooth">
        {/* === HEADER === */}
        <m.section
          initial="hidden"
          animate="show"
          // // variants={fade}
          className="border-b border-white/10 bg-neutral-950 py-16 md:py-24 text-center px-5 md:px-10"
        >
          <m.h1
            //variants={fade}
            className="text-4xl md:text-5xl font-semibold text-yellow-400"
          >
            {t("title")}
          </m.h1>

          <m.p
            // // variants={fade}
            custom={0.15}
            className="text-white/70 mt-3 text-sm md:text-base"
          >
            {t("effectiveDate")}
          </m.p>
        </m.section>

        {/* === CONTENT === */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-12 md:py-20 leading-relaxed text-white/90 space-y-12">
          {/* === TABLE OF CONTENTS === */}
          <m.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.01 }}
            // // variants={fade}
            className="bg-neutral-950 border border-white/10 rounded-2xl p-6 shadow-md mb-10"
          >
            <h2 className="text-yellow-400 text-xl font-semibold mb-4">
              {t("tableOfContents")}
            </h2>

            <ul className="space-y-2 text-sm md:text-base">
              {Object.entries(sections).map(([key, section]) => (
                <li key={key}>
                  <a
                    href={`#section-${key}`}
                    className="text-white/80 hover:text-yellow-400 transition"
                  >
                    {key}. {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </m.div>

          {/* === SECTIONS === */}
          <m.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            variants={stagger}
            className="space-y-16"
          >
            {Object.entries(sections).map(([key, section]) => (
              <m.section
                key={key}
                id={`section-${key}`}
                // // variants={fade}
                className="scroll-mt-[140px]"
              >
                <m.h2
                  // // variants={fade}
                  custom={0}
                  className="text-yellow-400 text-xl font-semibold mb-3"
                >
                  {key}. {section.title}
                </m.h2>

                {/* === TABLE === */}
                {section.table ? (
                  <m.div
                    // // variants={fade}
                    custom={0.15}
                    className="overflow-x-auto border border-white/10 rounded-xl bg-neutral-950 mt-4 mb-4"
                  >
                    <table className="w-full text-left text-sm md:text-base border-collapse">
                      <thead className="bg-neutral-800 text-yellow-400">
                        <tr>
                          {section.table.headers.map((header, i) => (
                            <th
                              key={i}
                              className="p-3 border-b border-white/10"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row, i) => (
                          <tr key={i} className="border-b border-white/5">
                            {row.map((cell, j) => (
                              <td
                                key={j}
                                className="p-3"
                                dangerouslySetInnerHTML={{ __html: cell }}
                              />
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </m.div>
                ) : (
                  section.content.map((p, idx) => (
                    <m.p
                      key={idx}
                      // // variants={fade}
                      custom={idx * 0.1}
                      className="mt-2 text-white/90"
                    >
                      {p}
                    </m.p>
                  ))
                )}
              </m.section>
            ))}
          </m.div>
        </section>

        <Footer />
      </main>
    </LazyMotion>
  );
}
