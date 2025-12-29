"use client";

import { useEffect, useState } from "react";
import {
    collection,
    getDocs,
    query,
    where,
    orderBy,
    limit,
} from "firebase/firestore";
import { db } from "@/lib/firebase-client";
import { ChevronDown } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";

interface Post {
    id: string;
    title: string;
    slug: string;
    author: string;
    coverUrl: string;
    publishedAt: string;
}

// helper pentru data localizată
const getLocaleDateString = (locale: string): string => {
    if (locale === "de") return "de-DE";
    if (locale === "fr") return "fr-FR";
    if (locale === "it") return "it-IT";
    if (locale === "pl") return "pl-PL";
    return locale === "ro" ? "ro-RO" : "en-US";
};

export default function BlogAndFAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [posts, setPosts] = useState<Post[]>([]);

    const t = useTranslations("BlogFAQ");
    const locale = useLocale();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const q = query(
                    collection(db, "posts"),
                    where("published", "==", true),
                    where("locale", "==", locale), // 🔥 FILTRARE PE LIMBĂ
                    orderBy("publishedAt", "desc"),
                    limit(3)
                );

                const snapshot = await getDocs(q);
                const dateFormat = getLocaleDateString(locale);

                const fetched: Post[] = snapshot.docs.map((doc) => {
                    const data = doc.data();

                    return {
                        id: doc.id,
                        title: data.title || "",
                        slug: data.slug || "",
                        author: data.author || "",
                        coverUrl: data.coverUrl || "",
                        publishedAt: data.publishedAt
                            ? new Date(
                                data.publishedAt.seconds * 1000
                            ).toLocaleDateString(dateFormat, {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                            })
                            : "",
                    };
                });

                setPosts(fetched);
            } catch (err) {
                console.error("Error fetching posts:", err);
            }
        };

        fetchPosts();
    }, [locale]);

    const faqs = [
        {
            question: t("faqs.0.question"),
            answer: (
                <div className="space-y-2 text-gray-800">
                    <p className="font-semibold">{t("faqs.0.answer.intro")}</p>
                    <ul className="list-none space-y-1">
                        <li>{t("faqs.0.answer.item1")}</li>
                        <li>{t("faqs.0.answer.item2")}</li>
                        <li>{t("faqs.0.answer.item3")}</li>
                        <li>{t("faqs.0.answer.item4")}</li>
                    </ul>
                </div>
            ),
        },
        {
            question: t("faqs.1.question"),
            answer: <p className="text-gray-800">{t("faqs.1.answer")}</p>,
        },
        {
            question: t("faqs.2.question"),
            answer: <p className="text-gray-800">{t("faqs.2.answer")}</p>,
        },
    ];

    return (
        <section className="bg-white text-gray-900 w-full grid grid-cols-1 md:grid-cols-2 gap-16 py-20 px-8 md:px-24">
            {/* === LEFT: Latest Blog Posts === */}
            <div>
                <h2 className="text-3xl font-semibold mb-6 border-b-2 border-yellow-500 inline-block pb-1">
                    {t("latestPosts")}
                </h2>

                <div className="space-y-8">
                    {posts.length === 0 ? (
                        <p className="text-gray-500 italic">{t("loadingText")}</p>
                    ) : (
                        posts.map((post) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.slug}`}
                                locale={locale} // 🔥 /ro/stiri vs /en/blog automat
                                className="flex gap-6 group items-center"
                            >
                                <Image
                                    src={post.coverUrl}
                                    alt={post.title}
                                    width={180}
                                    height={120}
                                    className="w-44 h-28 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
                                />
                                <div>
                                    <p className="text-gray-500 font-semibold text-sm">
                                        {post.publishedAt}
                                    </p>
                                    <p className="font-bold text-lg leading-snug text-gray-900 group-hover:text-yellow-600 transition">
                                        {post.title}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {post.author}
                                    </p>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>

            {/* === RIGHT: FAQ Section === */}
            <div>
                <h2 className="text-3xl font-semibold mb-6 text-gray-900">
                    {t("faqTitle")}
                </h2>

                <div className="space-y-3">
                    {faqs.map((faq, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <div key={idx} className="border-b border-gray-300 pb-2">
                                <button
                                    className="w-full flex justify-between items-center py-3 text-left font-medium text-gray-900"
                                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                                >
                  <span>
                    {idx + 1}. {faq.question}
                  </span>
                                    <ChevronDown
                                        className={`w-5 h-5 transform transition-transform ${
                                            isOpen
                                                ? "rotate-180 text-yellow-600"
                                                : "text-gray-500"
                                        }`}
                                    />
                                </button>
                                {isOpen && (
                                    <div className="pl-4 pb-3 text-gray-800">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
