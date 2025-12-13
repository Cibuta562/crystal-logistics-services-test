// components/NewsletterFormSection.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Variants } from "framer-motion";

/* ============================
   FADE ONLY (NO SLIDE)
============================= */
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

export default function NewsletterFormSection() {
  const locale = useLocale();

  return (
    <section className="w-full min-h-[30vh] bg-[#FACC14]">
      <motion.section
        variants={fade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="w-full bg-[#FACC14] text-neutral-900 min-h-[30vh] flex items-center justify-center"
      >
        <NewsletterForm locale={locale} formType="newsletter" />
      </motion.section>
    </section>
  );
}

type NewsletterFormProps = {
  locale: string;
  formType: string; // aici: "newsletter"
};

function NewsletterForm({ locale, formType }: NewsletterFormProps) {
  const t = useTranslations("Newsletter");
  const [isLoading, setIsLoading] = useState(true);

  /* ============================
     FORM SOURCES PER LANGUAGE
  ============================= */
  const formSrc =
    locale === "ro"
      ? "https://forms.monday.com/forms/embed/4d2bca5cce2d67aaf9e2095869c7b300?r=euc1"
      : "https://forms.monday.com/forms/embed/d5bf0a523884fc924cb2098a2ce1cca5?r=euc1";

  /* ============================
     INTENT TRACKING
  ============================= */
  useEffect(() => {
    const selector = `iframe[data-form-type="${formType}"]`;
    const iframe = document.querySelector<HTMLIFrameElement>(selector);
    if (!iframe) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;

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
    return () => observer.disconnect();
  }, [locale, formType]);

  return (
    <div className="relative w-full max-w-3xl">
      {/* LOADER OVERLAY */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            variants={fade}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white"
          >
            <div className="h-10 w-10 rounded-full border-4 border-neutral-300 border-t-yellow-500 animate-spin" />
            <p className="mt-4 text-neutral-700 text-sm md:text-base text-center">
              {t("loading")}
            </p>
            <div className="mt-1 flex gap-1">
              <span className="h-2 w-2 rounded-full bg-yellow-500 animate-bounce [animation-delay:-0.2s]" />
              <span className="h-2 w-2 rounded-full bg-yellow-500 animate-bounce [animation-delay:-0.1s]" />
              <span className="h-2 w-2 rounded-full bg-yellow-500 animate-bounce" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* IFRAME FORM */}
      <iframe
        src={formSrc}
        data-form-type={formType}
        title={t("iframeTitle")}
        className="w-full"
        style={{ height: "calc(540px - 1px)" }}
        allow="clipboard-write; fullscreen"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
