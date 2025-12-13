"use client";

import { useState, useEffect } from "react";
import Footer from "@/components/site/Footer";
import { useTranslations } from "next-intl";
import { motion as m } from "framer-motion";

export default function TermsConditionsPage() {
    const t = useTranslations("terms");
    const [activeTab, setActiveTab] = useState<"clients" | "transporters">("clients");

    const data = t.raw(activeTab) as {
        title: string;
        tableOfContents: string;
        sections: Record<string, { title: string; content: string[] }>;
    };

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    const getCleanTitle = (title: string) =>
        title.replace(/^\d+[\.\)]\s*/, "");

    // Smooth scroll for header offset
    useEffect(() => {
        const handleAnchorClick = (e: Event) => {
            const target = e.target as HTMLAnchorElement;
            if (target.hash) {
                e.preventDefault();
                const element = document.querySelector(target.hash);
                if (element) {
                    const yOffset = -120;
                    const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
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
                .forEach((link) => link.removeEventListener("click", handleAnchorClick));
    }, []);

    const renderTable = (rows: string[]) => (
        <m.div
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="overflow-x-auto border border-white/10 rounded-xl bg-neutral-950 mt-4 mb-6"
        >
            <table className="w-full text-left text-sm md:text-base border-collapse">
                <tbody>
                {rows.map((row, idx) => {
                    const cols = row.split("|").map((c) => c.trim()).filter(Boolean);
                    return (
                        <tr key={idx} className="border-b border-white/10">
                            {cols.map((col, i) => (
                                <td key={i} className="p-3 text-white/90">
                                    {col}
                                </td>
                            ))}
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </m.div>
    );

    return (
        <main className="min-h-screen bg-neutral-900 text-white scroll-smooth">

            {/* === HEADER === */}
            <m.section
                variants={fadeIn}
                initial="hidden"
                animate="show"
                transition={{ duration: 0.7 }}
                className="border-b border-white/10 bg-neutral-950 py-16 md:py-24 text-center px-5 md:px-10"
            >
                <h1 className="text-4xl md:text-5xl font-semibold text-yellow-400">
                    {t("title")}
                </h1>

                {/* === TOGGLE === */}
                <m.div
                    variants={fadeIn}
                    initial="hidden"
                    animate="show"
                    transition={{ duration: 0.7, delay: 0.15 }}
                    className="flex justify-center mt-6 gap-4"
                >
                    <button
                        onClick={() => setActiveTab("clients")}
                        className={`px-5 py-2 rounded-lg font-medium transition ${
                            activeTab === "clients"
                                ? "bg-yellow-400 text-neutral-900"
                                : "bg-neutral-800 text-white/70 hover:bg-neutral-700"
                        }`}
                    >
                        {t("toggle.clients")}
                    </button>
                    <button
                        onClick={() => setActiveTab("transporters")}
                        className={`px-5 py-2 rounded-lg font-medium transition ${
                            activeTab === "transporters"
                                ? "bg-yellow-400 text-neutral-900"
                                : "bg-neutral-800 text-white/70 hover:bg-neutral-700"
                        }`}
                    >
                        {t("toggle.transporters")}
                    </button>
                </m.div>
            </m.section>


            {/* === CONTENT === */}
            <section className="max-w-5xl mx-auto px-5 md:px-10 py-12 md:py-20 leading-relaxed text-white/90 space-y-12">

                {/* === TABLE OF CONTENTS === */}
                <m.div
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7 }}
                    className="bg-neutral-950 border border-white/10 rounded-2xl p-6 shadow-md mb-10"
                >
                    <h2 className="text-yellow-400 text-xl font-semibold mb-4">
                        {data.tableOfContents}
                    </h2>
                    <ul className="space-y-2 text-sm md:text-base list-decimal list-inside">
                        {Object.entries(data.sections)
                            .sort(([a], [b]) => Number(a) - Number(b))
                            .map(([key, section]) => (
                                <li key={key}>
                                    <a
                                        href={`#section-${key}`}
                                        className="text-white/80 hover:text-yellow-400 transition"
                                    >
                                        {getCleanTitle(section.title)}
                                    </a>
                                </li>
                            ))}
                    </ul>
                </m.div>


                {/* === SECTIONS === */}
                {Object.entries(data.sections)
                    .sort(([a], [b]) => Number(a) - Number(b))
                    .map(([key, section]) => (
                        <m.section
                            key={key}
                            id={`section-${key}`}
                            variants={fadeIn}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6 }}
                            className="scroll-mt-[140px] space-y-3"
                        >
                            <h2 className="text-yellow-400 text-xl font-semibold mb-3">
                                {section.title}
                            </h2>

                            {section.content.map((p, idx) => {
                                // Detect table rows
                                if (p.includes("|")) {
                                    const rows = p
                                        .split("<br>")
                                        .map((r) => r.trim())
                                        .filter(Boolean);
                                    return <div key={idx}>{renderTable(rows)}</div>;
                                }

                                return (
                                    <m.p
                                        key={idx}
                                        variants={fadeIn}
                                        initial="hidden"
                                        whileInView="show"
                                        viewport={{ once: true, amount: 0.2 }}
                                        transition={{ duration: 0.6 }}
                                        className="mt-2 text-white/90 whitespace-pre-line"
                                    >
                                        {p}
                                    </m.p>
                                );
                            })}
                        </m.section>
                    ))}
            </section>

            <Footer />
        </main>
    );
}
