"use client";
// import next-intl
import { useTranslations } from "next-intl";

// HERO SECTION
import PageHero from "@/components/site/PageHero";

// CONTENT SPLIT SECTION
import { ContentSplitRight } from "@/components/site/ContentSplitSection";

// FORM _ REQUEST A QUOTE
import RequestQuoteSection from "@/components/site/RequestQuoteSection";

// FEATURES
import FeatureHighlightSection, {
  FeatureItem,
} from "@/components/site/FeatureHighlightSection";

// FLIP CARDS
import FlipCardsSection, {
  FlipCardItem,
} from "@/components/site/FlipCardsSection";

// SIDE BY SIDE
import SideBySideTextSection from "@/components/site/SideBySide";

// INFO TEXT
import InfoTextSection from "@/components/site/InfoTextSection";

// WHY WORK WITH US
import WhyWorkWithUsSection from "@/components/site/WhyWorkWithUsSection";

// CONTACT CTA
import ContactCtaSection from "@/components/site/ContactCtaSection";

// FOOTER
import Footer from "@/components/site/Footer";

// ICONS
import {
  Droplets,
  Package,
  Truck,
  ShieldCheck,
  Globe2,
  FileCheck2,
} from "lucide-react";

export default function TransportAutoturismePage() {
  const t = useTranslations("Transport.Rutier.Autoturisme");

  const section_2 = [
    {
      title: t("section_2.col1.title"),
      paragraphs: t.raw("section_2.col1.paragraphs") as string[],
    },
    {
      title: t("section_2.col2.title"),
      paragraphs: t.raw("section_2.col2.paragraphs") as string[],
    },
  ];

  const VEHICLE_CARDS: FlipCardItem[] = [
    {
      icon: ShieldCheck,
      title: t("cards.items.card1.title"),
      short: t("cards.items.card1.short"),
      descriptions: t.raw("cards.items.card1.descriptions") as string[],
    },
    {
      icon: Globe2,
      title: t("cards.items.card2.title"),
      short: t("cards.items.card2.short"),
      descriptions: t.raw("cards.items.card2.descriptions") as string[],
    },
    {
      icon: FileCheck2,
      title: t("cards.items.card3.title"),
      short: t("cards.items.card3.short"),
      descriptions: t.raw("cards.items.card3.descriptions") as string[],
    },
  ];

  const AUTO_FEATURES: FeatureItem[] = [
    {
      icon: Truck,
      title: t("highlight.items.card1.title"),
      description: t.raw("highlight.items.card1.description") as string[],
    },
    {
      icon: Package,
      title: t("highlight.items.card2.title"),
      description: t.raw("highlight.items.card2.description") as string[],
    },
    {
      icon: Droplets,
      title: t("highlight.items.card3.title"),
      description: t.raw("highlight.items.card3.description") as string[],
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
        imageSrc="/images/transport-autoturisme/transport-autoturisme-01.webp"
        imageAlt={t("section_1.alt")}
        headingLevel="h1"
      />

      <RequestQuoteSection />

      <FeatureHighlightSection
        eyebrow={t("highlight.eyebrow")}
        title={t("highlight.title")}
        description={t("highlight.description")}
        items={AUTO_FEATURES}
      />

      <FlipCardsSection
        eyebrow={t("cards.eyebrow")}
        title={t("cards.title")}
        description={t("cards.description")}
        items={VEHICLE_CARDS}
      />

      <SideBySideTextSection items={section_2} headingLevel="h2" />

      {/* SECTION_3 */}
      <InfoTextSection
        title={t("section_3.title")}
        paragraphs={t.raw("section_3.paragraphs") as string[]}
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
