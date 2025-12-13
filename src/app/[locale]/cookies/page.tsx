"use client";

import Footer from "@/components/site/Footer";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { motion as m, type Variants } from "framer-motion";

const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function CookiesPolicyPage() {
  const t = useTranslations("cookies");

  const sections = t.raw("sections") as Record<
    string,
    { title: string; content: string[] }
  >;

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

    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("a[href^='#section-']")
    );

    links.forEach((link) => link.addEventListener("click", handleAnchorClick));

    return () => {
      links.forEach((link) =>
        link.removeEventListener("click", handleAnchorClick)
      );
    };
  }, []);

  return (
    <main className="min-h-screen bg-neutral-900 text-white scroll-smooth">
      <m.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.05 }}
        variants={fade}
        className="border-b border-white/10 bg-neutral-950 px-5 py-16 text-center md:px-10 md:py-24"
      >
        <h1 className="text-4xl font-semibold text-yellow-400 md:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-3 text-sm text-white/70 md:text-base">
          {t("lastUpdate")}
        </p>
      </m.section>

      <section className="mx-auto max-w-4xl space-y-12 px-5 py-12 text-white/90 md:px-10 md:py-20">
        <m.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          variants={fade}
          className="mb-10 rounded-2xl border border-white/10 bg-neutral-950 p-6 shadow-md"
        >
          <h2 className="mb-4 text-xl font-semibold text-yellow-400">
            {t("tableOfContents")}
          </h2>
          <ul className="space-y-2 text-sm md:text-base">
            {Object.entries(sections).map(([key, section]) => (
              <li key={key}>
                <a
                  href={`#section-${key}`}
                  className="text-white/80 transition hover:text-yellow-400"
                >
                  {key}. {section.title}
                </a>
              </li>
            ))}
          </ul>
        </m.div>

        {Object.entries(sections).map(([key, section]) => (
          <m.section
            key={key}
            id={`section-${key}`}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            variants={fade}
            className="scroll-mt-[140px]"
          >
            <h2 className="mb-3 text-xl font-semibold text-yellow-400">
              {key}. {section.title}
            </h2>

            {key === "8" ? (
              <>
                <p className="mb-4">{t("tableTitle")}</p>

                <div className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-neutral-950">
                  <table className="w-full border-collapse text-left text-sm md:text-base">
                    <thead className="bg-neutral-800 text-yellow-400">
                      <tr>
                        <th className="border-b border-white/10 p-3">
                          Nume Cookie
                        </th>
                        <th className="border-b border-white/10 p-3">
                          Categorie
                        </th>
                        <th className="border-b border-white/10 p-3">Scop</th>
                        <th className="border-b border-white/10 p-3">Durata</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.content
                        .filter((line) => line.startsWith("Nume Cookie:"))
                        .map((line, idx) => {
                          const parts = line.split("|").map((p) => p.trim());
                          const name = (parts[0] ?? "")
                            .replace("Nume Cookie:", "")
                            .trim();
                          const category = (parts[1] ?? "")
                            .replace("Categorie:", "")
                            .trim();
                          const purpose = (parts[2] ?? "")
                            .replace("Scop:", "")
                            .trim();
                          const duration = (parts[3] ?? "")
                            .replace("Durata:", "")
                            .trim();

                          return (
                            <tr key={idx} className="border-b border-white/5">
                              <td className="p-3 font-medium underline">
                                {name}
                              </td>
                              <td className="p-3">{category}</td>
                              <td className="p-3">{purpose}</td>
                              <td className="p-3">{duration}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>

                  <p className="border-t border-white/10 p-4 text-sm italic text-white/70">
                    {t("tableNote")}
                  </p>
                </div>
              </>
            ) : (
              section.content.map((p, idx) => (
                <p key={idx} className="mt-2 leading-relaxed">
                  {p}
                </p>
              ))
            )}
          </m.section>
        ))}

        <m.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          variants={fade}
          className="mt-10 text-sm italic text-white/60"
        >
          {t("footerNote")}
        </m.p>
      </section>

      <Footer />
    </main>
  );
}
