"use client";

import { useState } from "react";
import { useEffect } from "react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin, Clock, Building2 } from "lucide-react";
import Footer from "@/components/site/Footer";
import ToggleMondayForms from "@/components/ui/ToggleMondayForms";
import Image from "next/image";
import { motion as m, type Variants } from "framer-motion";
import { useLocale } from "next-intl";
import NewsletterFormSection from "@/components/site/NewsletterFormSection";

/* ============================
   FADE ANIMATION
============================= */
const fade: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/* ============================
   CONTACT LOCATIONS
============================= */
const LOCATIONS = [
    {
        name: "Crystal Logistics Services SRL",
        addressLine: "Iuliu Maniu 7",

        city: "București",
        country: "România",
        phone: "+40 373 761 415",
        email: "logistics@crystal-logistics-services.com",
        hoursKey: "hours_ro",
        embedUrl:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2848.7281566928994!2d26.0175049!3d44.4336093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b203a323ef943d%3A0x996f3f555919234f!2sBulevardul%20Iuliu%20Maniu%207%2C%20Bucure%C8%99ti%2C%20Rom%C3%A2nia!5e0!3m2!1sro!2sro!4v1731450700000",
    },
    {
        name: "Crystal Logistics Services GmbH",
        addressLine: "Bahnhofstrasse 21",
        city: "Zug",
        country: "Elveția",
        phone: "+41 41 588 05 31",
        email: "logistics@crystal-logistics-services.com",
        hoursKey: "hours_ch",
        embedUrl:
            "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5424.7525531154415!2d8.513531!3d47.170069!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479aab06e3555ae3%3A0x72bb77115cfda22d!2sCrystal%20Logistics%20Services%20GmbH!5e0!3m2!1sro!2sro!4v1764752445914",
    },
];


/* ============================
   PAGE
============================= */
export default function ContactPage() {
  const locale = useLocale();
    const t = useTranslations("contact");


  const [quoteOpen, setQuoteOpen] = useState(false);
  const [loadingForm, setLoadingForm] = useState(true);
  const [refresh, setRefresh] = useState(0);
  const isDesktop = useIsDesktop();


    const quoteUrl =
      locale === "ro"
          ? "https://forms.monday.com/forms/embed/d822b77b6d1ae8edf0cc2c81a9989ce9?r=euc1"
          : "https://forms.monday.com/forms/embed/0dd269a68887c5ca2de17dd4dead0648?r=euc1";


    const [mapLoading, setMapLoading] = useState<boolean[]>(
        LOCATIONS.map(() => true)
    );

    function useIsDesktop() {
        const [isDesktop, setIsDesktop] = useState(false);

        useEffect(() => {
            const mq = window.matchMedia("(min-width: 768px)");
            const update = () => setIsDesktop(mq.matches);
            update();
            mq.addEventListener("change", update);
            return () => mq.removeEventListener("change", update);
        }, []);

        return isDesktop;
    }

  return (
      <main className="min-h-screen bg-neutral-900 text-white">
          {/* ================= HERO ================= */}
          <m.section
              initial="hidden"
              animate="show"
              variants={fade}
              className="relative border-b border-white/10 overflow-hidden"
          >
              <div className="absolute inset-0">
                  <Image
                      src="/images/contactBg.webp"
                      alt="Crystal Logistics Contact"
                      fill
                      priority
                      className="object-cover object-[30%_10%]"
                  />
                  <div className="absolute inset-0 bg-black/70 md:bg-black/60"/>
              </div>

              <div className="relative max-w-6xl mx-auto px-5 md:px-10 py-16 md:py-24">
                  <m.div
                      initial={{opacity: 0}}
                      animate={{opacity: 1}}
                      transition={{duration: 0.7, ease: "easeOut"}}
                      className="max-w-xl"
                  >
                      <p className="text-yellow-400 uppercase text-sm font-semibold">
                          {t("badge")}
                      </p>
                      <h1 className="text-4xl md:text-5xl mt-2">{t("title")}</h1>
                      <p className="mt-3 text-base md:text-lg">{t("subtitle")}</p>
                  </m.div>
              </div>
          </m.section>

          {/* ================= TOGGLE ================= */}
          <m.div
              initial="hidden"
              animate={isDesktop ? "show" : undefined}
              whileInView={!isDesktop ? "show" : undefined}
              viewport={{once: true}}
              variants={fade}
          >
              <ToggleMondayForms/>
          </m.div>


          {/* ================= LOCATIONS ================= */}
          {LOCATIONS.map((loc, i) => (
              <m.section
                  key={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{once: true, amount: 0.1}}
                  variants={fade}
                  className="mx-auto max-w-6xl px-5 md:px-10 pb-16"
              >
                  <div className="rounded-2xl border border-white/10 bg-neutral-950 overflow-hidden">
                      <div className="grid grid-cols-1 lg:grid-cols-2">
                          <div className="p-8 md:p-12">
                              <h2 className="text-2xl font-semibold mb-4">{loc.name}</h2>

                              <ul className="space-y-3 text-sm text-white/80">
                                  <li className="flex gap-3">
                                      <MapPin className="text-yellow-400"/>
                                      {loc.addressLine}, {loc.city}
                                  </li>

                                  {/* PHONE – apel automat la click */}
                                  <li className="flex gap-3">
                                      <Phone className="text-yellow-400"/>
                                      <a
                                          href={`tel:${loc.phone.replace(/\s+/g, "")}`}
                                          className="hover:underline"
                                      >
                                          {loc.phone}
                                      </a>
                                  </li>

                                  {/* EMAIL – deschide clientul de mail la click */}
                                  <li className="flex gap-3">
                                      <Mail className="text-yellow-400"/>
                                      <a
                                          href="mailto:logistics@crystal-logistics-services.com"
                                          aria-label="Trimite email către Crystal Logistics Services"
                                          title="Trimite email"
                                          className="w-8 h-8 rounded-full flex items-center justify-center"
                                      >
                                          <Mail aria-hidden="true"/>
                                      </a>

                                  </li>

                                  <li className="flex gap-3">
                                      <Clock className="text-yellow-400"/>
                                      {t(loc.hoursKey)}
                                  </li>
                              </ul>


                              <button
                                  onClick={() => {
                                      setQuoteOpen(true);
                                      setLoadingForm(true);
                                  }}
                                  className="mt-6 rounded-full bg-yellow-400 px-6 py-2 font-semibold text-black hover:bg-yellow-300"
                              >
                                  {t("requestQuote")}
                              </button>
                          </div>

                          <div className="relative min-h-[400px]">
                              {mapLoading[i] && (
                                  <div
                                      className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-neutral-900">
                                      <div
                                          className="h-10 w-10 border-4 border-white/20 border-t-yellow-400 rounded-full animate-spin"/>
                                      <p className="mt-3 text-sm text-white/70">
                                          {t("mapLoading")}
                                      </p>
                                  </div>
                              )}

                              <iframe
                                  src={loc.embedUrl}
                                  title={`Hartă locație ${loc.name}`}
                                  aria-label={`Hartă locație ${loc.name}`}
                                  className="w-full h-full"
                                  loading="lazy"
                                  referrerPolicy="no-referrer-when-downgrade"
                                  onLoad={() =>
                                      setMapLoading((prev) =>
                                          prev.map((v, idx) => (idx === i ? false : v))
                                      )
                                  }
                              />

                          </div>
                      </div>
                  </div>
              </m.section>
          ))}

          {/* ================= NEWSLETTER ================= */}
          <m.div initial="hidden" whileInView="show" viewport={{once: true}} variants={fade}>
              <NewsletterFormSection/>
          </m.div>

          <Footer/>

          {/* ================= MODAL ================= */}
          {quoteOpen && (
              <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999]">
                  <div className="bg-white w-full max-w-4xl rounded-2xl overflow-hidden relative">
                      <button
                          aria-label={locale === "ro" ? "Închide" : "Close"}
                          title={locale === "ro" ? "Închide" : "Close"}
                          onClick={() => setQuoteOpen(false)}
                          className="absolute top-4 right-4"
                      >
                          <X/>
                      </button>

                      <iframe
                          src={quoteUrl}
                          title={locale === "ro" ? "Formular cerere ofertă" : "Quote request form"}
                          aria-label={locale === "ro" ? "Formular cerere ofertă" : "Quote request form"}
                          className="w-full h-[80vh]"
                          loading="lazy"
                          allow="fullscreen; clipboard-write"
                          onLoad={() => setLoadingForm(false)}
                      />
                  </div>
              </div>
          )}
      </main>
  );
}
