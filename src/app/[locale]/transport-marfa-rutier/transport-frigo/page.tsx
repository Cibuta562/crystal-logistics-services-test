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

// FEATURES
import FeatureHighlightSection, {
  FeatureItem,
} from "@/components/site/FeatureHighlightSection";

// SIDE BY SIDE
import SideBySideTextSection from "@/components/site/SideBySide";

// WHY WORK WITH US
import WhyWorkWithUsSection from "@/components/site/WhyWorkWithUsSection";

// CONTACT CTA
import ContactCtaSection from "@/components/site/ContactCtaSection";

// FOOTER
import Footer from "@/components/site/Footer";

// ICONS
import {
  ThermometerSun,
  ThermometerSnowflake,
  Droplets,
  Truck,
  ClipboardCheck,
} from "lucide-react";

export default function TransportFrigoPage() {
  const t = useTranslations("Transport.Rutier.Frigo");

  const FRIGO_CARDS: FlipCardItem[] = [
    {
      icon: Truck,
      title: t("cards.items.card1.title"),
      short: t("cards.items.card1.short"),
      descriptions: t.raw("cards.items.card1.descriptions") as string[],
    },
    {
      icon: Droplets,
      title: t("cards.items.card2.title"),
      short: t("cards.items.card2.short"),
      descriptions: t.raw("cards.items.card2.descriptions") as string[],
    },
    {
      icon: ThermometerSnowflake,
      title: t("cards.items.card3.title"),
      short: t("cards.items.card3.short"),
      descriptions: t.raw("cards.items.card3.descriptions") as string[],
    },
  ];

  const FRIGO_FEATURES: FeatureItem[] = [
    {
      icon: ThermometerSun,
      title: t("highlight.items.card1.title"),
      description: t("highlight.items.card1.description"),
    },
    {
      icon: ClipboardCheck,
      title: t("highlight.items.card2.title"),
      description: t("highlight.items.card2.description"),
    },
    {
      icon: ThermometerSnowflake,
      title: t("highlight.items.card3.title"),
      description: t("highlight.items.card3.description"),
    },
  ];

  const section_3_content = [
    {
      title: t("section_3.col1.title"),
      paragraphs: t.raw("section_3.col1.paragraphs") as string[],
    },
    {
      title: t("section_3.col2.title"),
      paragraphs: t.raw("section_3.col2.paragraphs") as string[],
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

      {/* SECTION_1 */}
      <ContentSplitRight
        title={t("section_1.title")}
        paragraphs={t.raw("section_1.paragraphs") as string[]}
        imageSrc="/images/transport-frigo/transport-frigo-01.webp"
        imageAlt={t("section_1.alt")}
        headingLevel="h1"
      />

      <RequestQuoteSection />

      {/* SECTION_2 */}
      <ContentSplitLeft
        title={t("section_2.title")}
        paragraphs={t.raw("section_2.paragraphs") as string[]}
        imageSrc="/images/transport-frigo/transport-frigo-02.webp"
        imageAlt={t("section_2.alt")}
        headingLevel="h1"
        listType="unordered"
        listItems={t.raw("section_2.listItems") as string[]}
      />

      <FlipCardsSection
        eyebrow={t("cards.eyebrow")}
        title={t("cards.title")}
        description={t("cards.description")}
        items={FRIGO_CARDS}
      />

      <FeatureHighlightSection
        // eyebrow={tf("eyebrow")}
        title={t("highlight.title")}
        description={t("highlight.description")}
        items={FRIGO_FEATURES}
      />

      {/* SECTION_3 */}
      <SideBySideTextSection items={section_3_content} headingLevel="h2" />

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
