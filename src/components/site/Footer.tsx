"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Mail,
  Clock,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

/* ============================
   TEXT FADE ANIMATION ONLY
============================= */
const fadeText: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

/* ============================
   LOCALIZED ROUTES + PDF
============================= */
const localizedRoutes: Record<string, Record<string, string>> = {
  ro: {
    "Cotație Instant": "/bursa-de-transport",
    "Bursa de Transport": "/bursa-de-transport",
    "Transport Multimodal": "/transport-multimodal",
    "Transport Rutier": "/transport-marfa-rutier",
    "Transport Aerian": "/transport-aerian",
    "Transport Maritim": "/transport-maritim",
    "Transport Feroviar": "/transport-feroviar",

    "Devino Partener CLS": "/transportatori",
    Cariere: "/cariere",
    "Echipa Noastră": "/despre-noi#echipa",
    Blog: "/blog",
    Recenzii: "/#reviews",

    Broșuri: "/brochures/brochure-ro.pdf",
  },

  en: {
    "Instant Quote": "/Freight Exchange",
    "Freight Exchange": "/bursa-de-transport",
    "Multimodal Transport": "/transport-multimodal",
    "Road Transport": "/transport-marfa-rutier",
    "Air Transport": "/transport-aerian",
    "Maritime Transport": "/transport-maritim",
    "Rail Transport": "/transport-feroviar",

    "Become a CLS Partner": "/transportatori",
    Careers: "/cariere",
    "Our Team": "/despre-noi#echipa",
    Blog: "/blog",
    Reviews: "/#reviews",

    Brochures: "/brochures/brochure-en.pdf",
  },

  de: {
    "Sofortangebot": "/transportboerse",
    "Transportbörse": "/transportboerse",
    "Multimodaler Transport": "/transport-multimodal",
    "Straßentransport": "/transport-marfa-rutier",
    "Luftfracht": "/transport-aerian",
    "Seetransport": "/transport-maritim",
    "Schienentransport": "/transport-feroviar",

    "Werden Sie CLS-Partner": "/trager",
    Karriere: "/cariere",
    "Unser Team": "/despre-noi#echipa",
    Blog: "/blog",
    Bewertungen: "/#reviews",

    Broschüren: "/brochures/brochure-en.pdf",
  },

  fr: {
    "Devis Instantané": "/bourse-de-transport",
    "Transport multimodal": "/transport-multimodal",
    "Transport routier": "/transport-marfa-rutier",
    "Transport aérien": "/transport-aerian",
    "Transport maritime": "/transport-maritim",
    "Transport ferroviaire": "/transport-feroviar",

    "Devenir partenaire CLS": "/porteurs",
     "Carrières": "/carrieres",
    "Notre équipe": "/despre-noi#echipa",
    Blog: "/blog",
    Avis: "/#reviews",

    Brochures: "/brochures/brochure-en.pdf",
  },

  it: {
    "Preventivo Istantaneo": "/scambio-di-trasporto",
    "Trasporto Multimodale": "/transport-multimodal",
    "Trasporto Stradale": "/transport-marfa-rutier",
    "Trasporto Aereo": "/transport-aerian",
    "Trasporto Marittimo": "/transport-maritim",
    "Trasporto Ferroviario": "/transport-feroviar",

    "Diventa Partner CLS": "/vettori",
    "Carriere": "/carriere",
    "Il nostro team": "/despre-noi#echipa",
    Blog: "/blog",
    Recensioni: "/#reviews",

    Brochure: "/brochures/brochure-en.pdf",
  },

  pl: {
    "Natychmiastowa Wycena": "/giełda-transportowa",
    "Transport Multimodalny": "/transport-multimodal",
    "Transport Drogowy": "/transport-marfa-rutier",
    "Transport Lotniczy": "/transport-aerian",
    "Transport Morski": "/transport-maritim",
    "Transport Kolejowy": "/transport-feroviar",

    "Zostań Partnerem CLS": "/przewoznicy",
    "Kariera": "/carriere",
    "Nasz Zespół": "/despre-noi#echipa",
    Blog: "/blog",
    Opinie: "/#reviews",

    Broszury: "/brochures/brochure-en.pdf",
  },





};

/* ============================
            FOOTER
============================= */
export default function Footer() {
  const t = useTranslations("Footer");
  const locale = useLocale();

  return (
    <footer className="bg-neutral-900 text-white pt-16 pb-8 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12">
        {/* === SOCIALS MOBILE === */}
        <div className="flex justify-center gap-4 mb-8 md:hidden">
          {[
            {
              Icon: Facebook,
              href: "https://www.facebook.com/crystallogisticsservices",
            },
            {
              Icon: Instagram,
              href: "https://www.instagram.com/crystallogisticsservices/",
            },
            {
              Icon: Linkedin,
              href: "https://www.linkedin.com/company/crystal-logistics-services/",
            },
            {
              Icon: Youtube,
              href: "https://www.youtube.com/@CrystalLogisticsServicess",
            },
          ].map(({ Icon, href }, i) => (
            <Link
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-white/60 rounded-full flex items-center justify-center hover:bg-[#F4BD19] hover:text-black transition"
            >
              <Icon size={18} />
            </Link>
          ))}
        </div>

        {/* === MAIN GRID === */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.2fr_minmax(280px,1fr)] gap-10 mb-12">
          <FooterColumn
            title={t("columns.services.title")}
            links={t.raw("columns.services.links")}
            locale={locale}
          />

          <FooterColumn
            title={t("columns.about.title")}
            links={t.raw("columns.about.links")}
            locale={locale}
          />

          {/* === CONTACT === */}
          <div className="flex flex-col items-center md:items-start">
            <div className="w-full max-w-[320px]">
              <motion.h3
                {...fadeProps}
                className="text-[#F4BD19] font-medium mb-4"
              >
                {t("columns.contact.title")}
              </motion.h3>

              <motion.ul {...fadeGroupProps} className="space-y-2 text-sm">
                <motion.li variants={fadeText}>
                  <Link
                    href="/contact"
                    className="flex items-center gap-2 hover:text-[#FFD84D]"
                  >
                    <MapPin size={16} /> {t("columns.contact.address")}
                  </Link>
                </motion.li>

                <motion.li variants={fadeText}>
                  <Link
                    href="mailto:logistics@crystal-logistics-services.com"
                    className="flex items-center gap-2 hover:text-[#FFD84D]"
                  >
                    <Mail size={16} /> {t("columns.contact.email")}
                  </Link>
                </motion.li>

                <motion.li variants={fadeText}>
                  <Link
                    href="/contact"
                    className="flex items-center gap-2 hover:text-[#FFD84D]"
                  >
                    <Clock size={16} /> {t("columns.contact.hours")}
                  </Link>
                </motion.li>
              </motion.ul>
            </div>
          </div>

          {/* === LICENSES === */}
          <div className="flex flex-col items-center md:items-start">
            <div className="w-full max-w-[320px]">
              <motion.h3
                {...fadeProps}
                className="text-[#F4BD19] font-medium mb-4"
              >
                {t("columns.licenses.title")}
              </motion.h3>

              <motion.p
                {...fadeProps}
                className="text-sm mb-6 whitespace-pre-line"
              >
                {t("columns.licenses.text")}
              </motion.p>

              <div className="flex flex-wrap gap-4">
                {[1, 2, 4, 5].map((n) => (
                  <div key={n} className="relative h-12 w-24">
                    <Image
                      src={`/images/licenta${n}.png`}
                      alt="License"
                      fill
                      sizes="96px"
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* === BOTTOM === */}
        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/90">
          <motion.p {...fadeProps}>{t("bottom.rights")}</motion.p>

          <div className="flex flex-col md:flex-row items-center gap-6">
            <motion.div {...fadeGroupProps} className="flex gap-3">
              <Link
                href={`/${locale}/privacy`}
                className="hover:text-[#FFD84D]"
              >
                {t("bottom.privacy")}
              </Link>
              <Link
                href={`/${locale}/terms-and-conditions`}
                className="hover:text-[#FFD84D]"
              >
                {t("bottom.terms")}
              </Link>
              <Link
                href={`/${locale}/cookies`}
                className="hover:text-[#FFD84D]"
              >
                {t("bottom.cookies")}
              </Link>
            </motion.div>

            <div className="hidden md:flex gap-3">
              {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="w-8 h-8 border border-white/60 rounded-full flex items-center justify-center hover:bg-[#F4BD19] hover:text-black transition"
                >
                  <Icon size={16} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============================
        FOOTER COLUMN
============================= */
function FooterColumn({
  title,
  links,
  locale,
}: {
  title: string;
  links: string[];
  locale: string;
}) {
  return (
    <div className="flex flex-col items-center md:items-start">
      <div className="w-full max-w-[320px]">
        <motion.h3 {...fadeProps} className="text-[#F4BD19] font-medium mb-4">
          {title}
        </motion.h3>

        <motion.ul {...fadeGroupProps} className="space-y-2 text-sm">
          {links.map((label, i) => {
            const href = localizedRoutes[locale]?.[label] ?? "#";
            const isPdf = href.endsWith(".pdf");

            return (
              <motion.li
                key={i}
                variants={fadeText}
                transition={{ delay: i * 0.05 }}
              >
                {isPdf ? (
                  <a href={href} download className="hover:text-[#FFD84D]">
                    {label}
                  </a>
                ) : (
                    <Link href={`/${locale}${href}`} className="hover:text-[#FFD84D]">
                      {label}
                    </Link>
                )}
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </div>
  );
}

/* ============================
      SHARED FADE PROPS
============================= */
const fadeProps = {
  variants: fadeText,
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true },
};

const fadeGroupProps = {
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true },
};
