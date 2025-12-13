"use client";
// import next-intl
import { useTranslations } from "next-intl";

// HERO SECTION
import PageHero from "@/components/site/PageHero";

// CONTENT SPLIT SECTION
import {
  ContentSplitRight,
  ContentSplitLeft,
} from "@/components/site/ContentSplitSection";

// FORM _ REQUEST A QUOTE
import RequestQuoteSection from "@/components/site/RequestQuoteSection";

// FLIP CARDS
import FlipCardsSection, {
  FlipCardItem,
} from "@/components/site/FlipCardsSection";

// INFO TEXT
import InfoTextSection from "@/components/site/InfoTextSection";

// FEATURES
import FeatureHighlightSection, {
  FeatureItem,
} from "@/components/site/FeatureHighlightSection";

// NEWSLETTER
import NewsletterFormSection from "@/components/site/NewsletterFormSection";

// WHY WORK WITH US
import WhyWorkWithUsSection from "@/components/site/WhyWorkWithUsSection";

// CONTACT CTA
import ContactCtaSection from "@/components/site/ContactCtaSection";

// FOOTER
import Footer from "@/components/site/Footer";

import {
  TimerReset,
  Percent,
  ArrowLeftRight,
  Leaf,
  FileCheck2,
  PackageSearch,
  Globe2,
  ShieldCheck,
} from "lucide-react";

export default function TransportMultimodalPage() {
  const t = useTranslations("Transport.Multimodal");

  const MULTIMODAL_CARDS: FlipCardItem[] = [
    {
      icon: PackageSearch,
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
    {
      icon: ShieldCheck,
      title: t("cards.items.card4.title"),
      short: t("cards.items.card4.short"),
      descriptions: t.raw("cards.items.card4.descriptions") as string[],
    },
  ];

  const MULTIMODAL_FEATURES: FeatureItem[] = [
    {
      icon: TimerReset,
      title: t("highlight.items.card1.title"),
      description: t("highlight.items.card1.description"),
    },
    {
      icon: Percent,
      title: t("highlight.items.card2.title"),
      description: t("highlight.items.card2.description"),
    },
    {
      icon: ArrowLeftRight,
      title: t("highlight.items.card3.title"),
      description: t("highlight.items.card3.description"),
    },
    {
      icon: Leaf,
      title: t("highlight.items.card4.title"),
      description: t("highlight.items.card4.description"),
    },
    {
      icon: FileCheck2,
      title: t("highlight.items.card5.title"),
      description: t("highlight.items.card5.description"),
    },
  ];
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Schimbă background aici */}
      <PageHero
        eyebrow={t("Header.section")}
        title={t("Header.title")}
        imageSrc="/images/transport-multimodal/multimodal.webp"
        imageAlt={t("Header.alt")}
        imageClassName="object-cover object-center"
      />

      <ContentSplitRight
        title={t("section_1.title")}
        paragraphs={t.raw("section_1.paragraphs") as string[]}
        imageSrc="/images/transport-multimodal/multimodal.jpg"
        imageAlt={t("section_1.alt")}
        headingLevel="h1"
      />

      <InfoTextSection
        title={t("section_2.title")}
        paragraphs={t.raw("section_2.introParagraphs") as string[]}
        listTitle={t("section_2.listTitle")}
        listItems={
          t.raw("section_2.groups") as Array<{
            label?: string;
            text: string;
          }>
        }
      />

      <FlipCardsSection
        title={t("cards.items.title")}
        items={MULTIMODAL_CARDS}
      />

      <FeatureHighlightSection
        eyebrow={t("highlight.eyebrow")}
        title={t("highlight.title")}
        description={t("highlight.description")}
        items={MULTIMODAL_FEATURES}
      />

      <ContentSplitRight
        title={t("section_3.title")}
        paragraphs={t.raw("section_3.paragraphs") as string[]}
        imageSrc="/images/transport-multimodal/transport-aerian.webp"
        imageAlt={t("section_3.alt")}
        headingLevel="h1"
      />

      <ContentSplitLeft
        title={t("section_4.title")}
        paragraphs={t.raw("section_4.paragraphs") as string[]}
        imageSrc="/images/transport-multimodal/transport-feroviar.webp"
        imageAlt={t("section_4.alt")}
        headingLevel="h1"
      />

      <ContentSplitRight
        title={t("section_5.title")}
        paragraphs={t.raw("section_5.paragraphs") as string[]}
        imageSrc="/images/transport-multimodal/transport-maritim.webp"
        imageAlt={t("section_5.alt")}
        headingLevel="h1"
      />

      <RequestQuoteSection />

      <WhyWorkWithUsSection />

      <NewsletterFormSection />

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
