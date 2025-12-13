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

// WHY WORK WITH US
import WhyWorkWithUsSection from "@/components/site/WhyWorkWithUsSection";

// CONTACT CTA
import ContactCtaSection from "@/components/site/ContactCtaSection";

// FOOTER
import Footer from "@/components/site/Footer";

// ICONS
import {
  ShieldCheck,
  Shapes,
  Radiation,
  CircleSmall,
  Shield,
  Briefcase,
  Drone,
  Boxes,
  BookOpenText,
  ScanEye,
  Vault,
  Route,
  Handshake,
  LockKeyhole,
} from "lucide-react";

export default function TransportArmamentPage() {
  const t = useTranslations("Transport.Rutier.Armament");

  const ARMAMENT_CARDS: FlipCardItem[] = [
    {
      icon: CircleSmall,
      title: t("cards.items.card1.title"),
      descriptions: t.raw("cards.items.card1.descriptions") as string[],
    },
    {
      icon: Radiation,
      title: t("cards.items.card2.title"),
      descriptions: t.raw("cards.items.card2.descriptions") as string[],
    },
    {
      icon: Shapes,
      title: t("cards.items.card3.title"),
      descriptions: t.raw("cards.items.card3.descriptions") as string[],
    },
    {
      icon: Drone,
      title: t("cards.items.card4.title"),
      descriptions: t.raw("cards.items.card4.descriptions") as string[],
    },
    {
      icon: Briefcase,
      title: t("cards.items.card5.title"),
      descriptions: t.raw("cards.items.card5.descriptions") as string[],
    },
    {
      icon: Shield,
      title: t("cards.items.card6.title"),
      descriptions: t.raw("cards.items.card6.descriptions") as string[],
    },
  ];

  const ARMAMENT_FEATURES: FeatureItem[] = [
    {
      icon: ShieldCheck,
      title: t("highlight.items.card1.title"),
      description: t("highlight.items.card1.description"),
    },
    {
      icon: Boxes,
      title: t("highlight.items.card2.title"),
      description: t("highlight.items.card2.description"),
    },
    {
      icon: BookOpenText,
      title: t("highlight.items.card3.title"),
      description: t("highlight.items.card3.description"),
    },
    {
      icon: ScanEye,
      title: t("highlight.items.card4.title"),
      description: t("highlight.items.card4.description"),
    },
    {
      icon: Vault,
      title: t("highlight.items.card5.title"),
      description: t("highlight.items.card5.description"),
    },
    {
      icon: Route,
      title: t("highlight.items.card6.title"),
      description: t("highlight.items.card6.description"),
    },
    {
      icon: Handshake,
      title: t("highlight.items.card7.title"),
      description: t("highlight.items.card7.description"),
    },
    {
      icon: LockKeyhole,
      title: t("highlight.items.card8.title"),
      description: t("highlight.items.card8.description"),
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
        imageSrc="/images/transport-armament/transport-armament.webp"
        imageAlt={t("section_1.alt")}
        headingLevel="h1"
      />

      {/* SECTION_2 */}
      <ContentSplitLeft
        title={t("section_2.title")}
        paragraphs={t.raw("section_2.paragraphs") as string[]}
        imageSrc="/images/transport-armament/de-ce-sa-ne-alegi.webp"
        imageAlt={t("section_2.alt")}
        headingLevel="h1"
      />

      <RequestQuoteSection />

      <FlipCardsSection title={t("cards.title")} items={ARMAMENT_CARDS} />

      {/* SECTION_3 */}
      <ContentSplitRight
        title={t("section_3.title")}
        paragraphs={t.raw("section_3.paragraphs") as string[]}
        imageSrc="/images/transport-armament/split-trei.webp"
        imageAlt={t("section_3.alt")}
        headingLevel="h1"
      />

      {/* SECTION_4 */}
      <ContentSplitLeft
        title={t("section_4.title")}
        paragraphs={t.raw("section_4.paragraphs") as string[]}
        imageSrc="/images/transport-armament/de-ce-sa-ne-alegi.webp"
        imageAlt={t("section_4.alt")}
        headingLevel="h1"
      />

      <FeatureHighlightSection
        eyebrow={t("highlight.eyebrow")}
        title={t("highlight.title")}
        description={t("highlight.description")}
        items={ARMAMENT_FEATURES}
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
