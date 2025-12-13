"use client";
// import next-intl
import { useTranslations } from "next-intl";

import {
  Boxes,
  FileText,
  Wallet,
  Receipt,
  Headset,
  Fuel,
  Shuffle,
  Pause,
  Play,
} from "lucide-react";

// HERO SECTION
import PageHero from "@/components/site/PageHero";

// ACCORDION
import AccordionSection, {
  AccordionItemData,
} from "@/components/site/AccordionSection";

// WHY WORK WITH US
import WhyWorkWithUsSection from "@/components/site/WhyWorkWithUsSection";

// CONTACT CTA
import ContactCtaSection from "@/components/site/ContactCtaSection";

// FOOTER
import Footer from "@/components/site/Footer";
import { useLocale } from "next-intl";

// ICONS
import { CheckCircle2, Truck, ShieldCheck, Clock } from "lucide-react";

// SHADCN
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

import { useEffect, useRef, useState } from "react";

export default function TransportatoriPage() {
  const t = useTranslations("Carriers.Rutier.Transportatori");

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handlePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      // când dă PLAY: PORNEȘTE CU SUNET
      videoRef.current.muted = false;
      setIsMuted(false);

      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const [open, setOpen] = useState(false);

  const locale = useLocale();
  const language = locale === "ro" ? "ro" : "en";

  const mondayFormUrl =
    language === "en"
      ? "https://forms.monday.com/forms/embed/a4edd9eb84cf90f1894d944659392da4?r=euc1"
      : "https://forms.monday.com/forms/embed/60aa1511a28f92e49c82d858069a5522?r=euc1";

  useEffect(() => {
    if (!open) return;

    fetch("/api/form-tracking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pageUrl: window.location.href ?? null,
        language,
        formType: "transportatori",
        event: "form_intent",
      }),
    }).catch(() => {});
  }, [open, language]);

  const items: AccordionItemData[] = [
    {
      id: "class1",
      title: t("Accordion.items.class1.title"),
      paragraphs: t.raw("Accordion.items.class1.paragraphs") as string[],
      icon: Boxes,
    },
    {
      id: "class2",
      title: t("Accordion.items.class2.title"),
      paragraphs: t.raw("Accordion.items.class2.paragraphs") as string[],
      icon: FileText,
    },
    {
      id: "class3",
      title: t("Accordion.items.class3.title"),
      paragraphs: t.raw("Accordion.items.class3.paragraphs") as string[],
      icon: Wallet,
    },
    {
      id: "class4",
      title: t("Accordion.items.class4.title"),
      paragraphs: t.raw("Accordion.items.class4.paragraphs") as string[],
      icon: Receipt,
    },
    {
      id: "class5",
      title: t("Accordion.items.class5.title"),
      paragraphs: t.raw("Accordion.items.class5.paragraphs") as string[],
      icon: Truck,
    },
    {
      id: "class6",
      title: t("Accordion.items.class6.title"),
      paragraphs: t.raw("Accordion.items.class6.paragraphs") as string[],
      icon: Headset,
    },
    {
      id: "class7",
      title: t("Accordion.items.class7.title"),
      paragraphs: t.raw("Accordion.items.class7.paragraphs") as string[],
      icon: Fuel,
    },
    {
      id: "class8",
      title: t("Accordion.items.class8.title"),
      paragraphs: t.raw("Accordion.items.class8.paragraphs") as string[],
      icon: Shuffle,
    },
  ];

  const items2: AccordionItemData[] = [
    {
      id: "class_a",
      title: t("Accordion2.items.class_a.title"),
      paragraphs: t.raw("Accordion2.items.class_a.paragraphs") as string[],
      listItems: t.raw("Accordion2.items.class_a.listItems") as string[],
      groupParagraphsWithListItems: true,
    },
    {
      id: "class_b",
      title: t("Accordion2.items.class_b.title"),
      paragraphs: t.raw("Accordion2.items.class_b.paragraphs") as string[],
      listItems: t.raw("Accordion2.items.class_b.listItems") as string[],
      // icon: Droplets,
      groupParagraphsWithListItems: true,
    },
    {
      id: "class_c",
      title: t("Accordion2.items.class_c.title"),
      paragraphs: t.raw("Accordion2.items.class_c.paragraphs") as string[],
      listItems: t.raw("Accordion2.items.class_c.listItems") as string[],
      groupParagraphsWithListItems: true,
      // icon: Flame,
    },
  ];

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* HERO */}
      <PageHero
        eyebrow={t("Header.section")}
        title={t("Header.title")}
        imageSrc="/images/contactBg.webp"
        imageAlt={t("Header.alt")}
      />

      {/* SECTION 1 */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-stretch">
          {/* LEFT TEXT */}
          <div className="flex flex-col justify-center space-y-5">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t("section_1.title")}
            </h2>

            {(t.raw("section_1.paragraphs") as string[]).map((p, i) => (
              <p key={i} className="text-neutral-700 leading-relaxed">
                {p}
              </p>
            ))}

            <span
              className="absolute inset-0 bg-yellow-400 scale-x-0 origin-left
                           group-hover:scale-x-100 transition-transform duration-500 ease-out"
            />
          </div>

          {/* RIGHT VIDEO */}

          <div className="flex flex-col justify-center gap-4">
            {/* VIDEO FĂRĂ AUTOPLAY + PLAY/PAUSE + UNMUTE */}
            <div className="relative h-[60vh] md:h-[60vh] rounded-2xl overflow-hidden shadow-xl group">
              <video
                ref={videoRef}
                src="/videos/about.webm"
                muted={isMuted}
                loop
                playsInline
                className="w-full h-full object-cover"
              />

              {/* PLAY / PAUSE BUTTON */}
              <button
                onClick={handlePlayPause}
                className="
        absolute inset-0 flex items-center justify-center
        bg-black/0 group-hover:bg-black/30 transition
      "
              >
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {isPlaying ? (
                    <Pause className="w-16 h-16 text-white" />
                  ) : (
                    <Play className="w-16 h-16 text-white" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNER CTA SECTION */}
      <section className="relative w-full bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 py-20">
        <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-stretch gap-12">
          {/* LEFT COLUMN (se întinde complet) */}
          <div className="flex-1 flex flex-col text-white space-y-6">
            <span className="inline-flex rounded-full bg-amber-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300">
              {t("partnerTransport.badge")}
            </span>

            <h2 className="text-4xl font-semibold">
              {t("partnerTransport.title")}
            </h2>

            <p className="text-slate-300 mb-4">
              {t("partnerTransport.subtitle")}
            </p>

            {/* Carduri — le împingem în jos dacă e cazul */}
            <div className="space-y-4 mt-auto">
              {[
                { icon: Truck, title: "card1.title", text: "card1.text" },
                { icon: ShieldCheck, title: "card2.title", text: "card2.text" },
                { icon: Clock, title: "card3.title", text: "card3.text" },
              ].map(({ icon: Icon, title, text }, i) => (
                <div
                  key={i}
                  className="flex gap-4 bg-neutral-900/80 rounded-2xl p-6"
                >
                  <Icon className="text-amber-300" />
                  <div>
                    <p className="font-semibold">
                      {t(`partnerTransport.${title}`)}
                    </p>
                    <p className="text-sm text-slate-400">
                      {t(`partnerTransport.${text}`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN — egal cu stânga */}
          <Dialog open={open} onOpenChange={setOpen}>
            <div className="flex-1 flex flex-col">
              {/* CARD FULL HEIGHT */}
              <div className="rounded-3xl bg-neutral-900 p-8 text-white h-full flex flex-col justify-between">
                <div>
                  <div className="mb-4 flex items-center gap-2">
                    <CheckCircle2 className="text-emerald-300" />
                    <span>{t("form.badge")}</span>
                  </div>

                  <p className="uppercase tracking-widest text-yellow-400 text-sm">
                    {t("form.title")}
                  </p>

                  <p className="mt-3 text-slate-300">{t("form.subtitle")}</p>

                  {/* BUTTON CU ANIMAȚIE */}
                  <DialogTrigger asChild>
                    <button
                      className="
                  relative overflow-hidden group inline-flex items-center justify-center
                  w-full rounded-full mt-6 px-12 py-2 text-[15px] font-semibold
                  border border-yellow-400 bg-yellow-400 text-black
                  transition-all duration-300
                "
                    >
                      <span
                        className="
                    absolute inset-0 bg-white origin-left scale-x-0
                    group-hover:scale-x-100 transition-transform duration-500 ease-out
                  "
                      />
                      <span className="relative z-10">{t("form.button")}</span>
                    </button>
                  </DialogTrigger>
                </div>

                {/* TEXT DE JOS — împins la fund pentru aliniere perfectă */}
                <div className="mt-6 space-y-3 text-sm text-slate-300">
                  {(t.raw("form.paragraphs") as string[]).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* MODAL */}
            <DialogContent className="max-w-4xl h-[80vh] p-0 bg-neutral-900">
              <iframe
                src={mondayFormUrl}
                className="w-full h-full border-0"
                allow="clipboard-write; fullscreen"
              />
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* ACCORDIONS */}
      <AccordionSection
        sectionTitle={t("Accordion.title")}
        sectionIntro={t("Accordion.intro")}
        items={items}
        defaultValue={items[0]?.id}
      />

      <AccordionSection
        sectionTitle={t("Accordion2.title")}
        sectionIntro={t("Accordion2.intro")}
        items={items2}
        defaultValue={items2[0]?.id}
      />

      <WhyWorkWithUsSection />

      <ContactCtaSection
        title={t("cta.title")}
        messages={t.raw("cta.messages") as string[]}
        buttonLabel={t("cta.buttonLabel")}
        href="/contact"
      />

      <Footer />
    </main>
  );
}
