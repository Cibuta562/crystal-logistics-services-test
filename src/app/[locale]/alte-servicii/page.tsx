"use client";
// import next-intl
import { useTranslations } from "next-intl";

// HERO SECTION
import PageHero from "@/components/site/PageHero";

// CONTENT SPLIT SECTION
import {
  ContentSplitLeft,
  ContentSplitRight,
} from "@/components/site/ContentSplitSection";

// FORM _ REQUEST A QUOTE
import RequestQuoteSection from "@/components/site/RequestQuoteSection";

// FLIP CARDS
import FlipCardsSection, {
  FlipCardItem,
} from "@/components/site/FlipCardsSection";

// WHY WORK WITH US
import WhyWorkWithUsSection from "@/components/site/WhyWorkWithUsSection";

// CONTACT CTA
import ContactCtaSection from "@/components/site/ContactCtaSection";

// FOOTER
import Footer from "@/components/site/Footer";

// ICONS
import { Users, ArrowLeftRight, Forklift, Construction } from "lucide-react";

export default function AlteServiciiPage() {
  const t = useTranslations("Transport.Rutier.AlteServicii");

  const VRAC_CARDS: FlipCardItem[] = [
    {
      icon: Users,
      title: t("cards.items.card1.title"),
      descriptions: t.raw("cards.items.card1.descriptions") as string[],
    },
    {
      icon: ArrowLeftRight,
      title: t("cards.items.card2.title"),
      descriptions: t.raw("cards.items.card2.descriptions") as string[],
    },
    {
      // !IMPORTANT - schimbă icon
      icon: Construction,
      title: t("cards.items.card3.title"),
      descriptions: t.raw("cards.items.card3.descriptions") as string[],
    },
    {
      icon: Forklift,
      title: t("cards.items.card4.title"),
      descriptions: t.raw("cards.items.card4.descriptions") as string[],
    },
  ];

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Schimbă background aici */}
      <PageHero
        eyebrow={t("Header.section")}
        title={t("Header.title")}
        imageSrc="/images/transport-marfa-rutier/banner-vechi.png"
        imageAlt={t("Header.alt")}
        imageClassName="object-cover object-center"
      />

      <ContentSplitRight
        title={t("section_1.title")}
        paragraphs={t.raw("section_1.paragraphs") as string[]}
        imageSrc="/images/alte-servicii/depozitare-si-manipulare.webp"
        imageAlt={t("section_1.alt")}
        headingLevel="h1"
      />

      <RequestQuoteSection />

      <ContentSplitRight
        title={t("section_2.title")}
        paragraphs={t.raw("section_2.paragraphs") as string[]}
        imageSrc="/images/alte-servicii/asigurari-marfa.webp"
        imageAlt={t("section_2.alt")}
        headingLevel="h1"
      />

      <ContentSplitLeft
        title={t("section_3.title")}
        paragraphs={t.raw("section_3.paragraphs") as string[]}
        imageSrc="/images/alte-servicii/prestatii-vamale.webp"
        imageAlt={t("section_3.alt")}
        headingLevel="h1"
      />

      <ContentSplitRight
        title={t("section_4.title")}
        paragraphs={t.raw("section_4.paragraphs") as string[]}
        imageSrc="/images/alte-servicii/asistenta-la-incarcare-si-descarcare.webp"
        imageAlt={t("section_4.alt")}
        headingLevel="h1"
      />

      <FlipCardsSection title={t("cards.items.title")} items={VRAC_CARDS} />

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
