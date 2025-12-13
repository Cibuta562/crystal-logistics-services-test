// components/DummyFormSection.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

type ContactMondayFormProps = {
    locale: string;
    formType: string; // ex: "contact", "quote", etc.
};

function ContactMondayForm({ locale, formType }: ContactMondayFormProps) {
    const formSrc =
        locale === "ro"
            ? "https://forms.monday.com/forms/embed/d822b77b6d1ae8edf0cc2c81a9989ce9?r=euc1"
            : "https://forms.monday.com/forms/embed/0dd269a68887c5ca2de17dd4dead0648?r=euc1";

    const [loading, setLoading] = useState(true);

    // INTENT tracking per formType
    useEffect(() => {
        const selector = `iframe[data-form-type="${formType}"]`;
        const iframe = document.querySelector<HTMLIFrameElement>(selector);
        if (!iframe) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const isVisible = entries[0]?.isIntersecting;
                if (!isVisible) return;

                const key = `tracked-${locale}-${formType}-intent`;
                if (sessionStorage.getItem(key)) return;

                sessionStorage.setItem(key, "1");

                fetch("/api/form-tracking", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        pageUrl: window.location.href,
                        language: locale,
                        formType,
                        event: "form_intent",
                    }),
                }).catch(() => {});
            },
            { threshold: 0.3 }
        );

        observer.observe(iframe);

        return () => {
            observer.disconnect();
        };
    }, [locale, formType]);

    return (
        <div className="relative w-full">
            {/* LOADER OVERLAY */}
            {loading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white">
                    <div className="h-10 w-10 rounded-full border-4 border-neutral-200 border-t-yellow-500 animate-spin" />
                    <p className="mt-4 text-neutral-700 text-sm md:text-base">
                        {locale === "ro" ? "Se încarcă formularul…" : "Loading form…"}
                    </p>
                    <div className="mt-2 flex gap-1">
                        <span className="h-2 w-2 bg-yellow-500 rounded-full animate-bounce [animation-delay:-0.2s]" />
                        <span className="h-2 w-2 bg-yellow-500 rounded-full animate-bounce [animation-delay:-0.1s]" />
                        <span className="h-2 w-2 bg-yellow-500 rounded-full animate-bounce" />
                    </div>
                </div>
            )}

            <iframe
                src={formSrc}
                title="Formular abonare / contact"
                data-form-type={formType}
                className="w-full h-[60vh] max-h-[700px]"
                style={{ border: 0, backgroundColor: "white" }}
                allow="clipboard-write; fullscreen"
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setLoading(false)}
            />
        </div>
    );
}

export default function RequestQuoteSection() {
    const locale = useLocale();

    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="
        w-full
        max-w-6xl
        mx-auto
        bg-white
        text-neutral-900
        rounded
        shadow-sm
        px-6 md:px-12
        pb-10 md:py-12
      "
        >
            <div className="w-full">
                {/* Poți schimba formType dacă ai mai multe formulare */}
                <ContactMondayForm locale={locale} formType="contact" />
            </div>
        </motion.section>
    );
}
