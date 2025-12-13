"use client";
// import next-intl
import { useTranslations } from "next-intl";

// HERO SECTION
import PageHero from "@/components/site/PageHero";

// CONTENT SPLIT SECTION
import { ContentSplitRight } from "@/components/site/ContentSplitSection";

// FORM _ REQUEST A QUOTE
import RequestQuoteSection from "@/components/site/RequestQuoteSection";

// FLIP CARDS
import FlipCardsSection, {
  FlipCardItem,
} from "@/components/site/FlipCardsSection";

// ACCORDION
import AccordionSection, {
  AccordionItemData,
} from "@/components/site/AccordionSection";

// INFO TEXT
import InfoTextSection from "@/components/site/InfoTextSection";

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
  AlertTriangle,
  Droplets,
  Flame,
  Truck,
  ShieldAlert,
  Biohazard,
  Radiation,
  FlaskConical,
  Package,
  Battery,
} from "lucide-react";

export default function TransportAdrPage() {
  const t = useTranslations("Transport.Rutier.Adr");

  const ADR_CARDS: FlipCardItem[] = [
    {
      icon: Truck,
      title: t("cards.items.card1.title"),
      short: t("cards.items.card1.short"),
      descriptions: t.raw("cards.items.card1.descriptions") as string[],
    },
    {
      icon: Package,
      title: t("cards.items.card2.title"),
      short: t("cards.items.card2.short"),
      descriptions: t.raw("cards.items.card2.descriptions") as string[],
    },
    {
      icon: Droplets,
      title: t("cards.items.card3.title"),
      short: t("cards.items.card3.short"),
      descriptions: t.raw("cards.items.card3.descriptions") as string[],
    },
  ];

  const ADR_FEATURES: FeatureItem[] = [
    {
      icon: Truck,
      title: t("highlight.items.card1.title"),
      description: t("highlight.items.card1.description"),
    },
    {
      icon: Truck,
      title: t("highlight.items.card2.title"),
      description: t("highlight.items.card2.description"),
    },
  ];

  const items: AccordionItemData[] = [
    {
      id: "class1",
      title: t("Accordion.items.class1.title"),
      subtitle: t("Accordion.items.class1.short"),
      paragraphs: t.raw("Accordion.items.class1.paragraphs") as string[],
      listItems: t.raw("Accordion.items.class1.listItems") as string[],
      icon: AlertTriangle,
    },
    {
      id: "class2",
      title: t("Accordion.items.class2.title"),
      subtitle: t("Accordion.items.class2.short"),
      paragraphs: t.raw("Accordion.items.class2.paragraphs") as string[],
      listItems: t.raw("Accordion.items.class2.listItems") as string[],
      icon: Droplets,
      groupParagraphsWithListItems: true,
    },
    {
      id: "class3",
      title: t("Accordion.items.class3.title"),
      subtitle: t("Accordion.items.class3.short"),
      paragraphs: t.raw("Accordion.items.class3.paragraphs") as string[],
      listItems: t.raw("Accordion.items.class3.listItems") as string[],
      icon: Flame,
    },
    {
      id: "class4",
      title: t("Accordion.items.class4.title"),
      subtitle: t("Accordion.items.class4.short"),
      paragraphs: t.raw("Accordion.items.class4.paragraphs") as string[],
      listItems: t.raw("Accordion.items.class4.listItems") as string[],
      icon: Flame,
      groupParagraphsWithListItems: true,
    },
    {
      id: "class5",
      title: t("Accordion.items.class5.title"),
      subtitle: t("Accordion.items.class5.short"),
      paragraphs: t.raw("Accordion.items.class5.paragraphs") as string[],
      listItems: t.raw("Accordion.items.class5.listItems") as string[],
      icon: ShieldAlert,
      groupParagraphsWithListItems: true,
    },
    {
      id: "class6",
      title: t("Accordion.items.class6.title"),
      subtitle: t("Accordion.items.class6.short"),
      paragraphs: t.raw("Accordion.items.class6.paragraphs") as string[],
      listItems: t.raw("Accordion.items.class6.listItems") as string[],
      icon: Biohazard,
      groupParagraphsWithListItems: true,
    },
    {
      id: "class7",
      title: t("Accordion.items.class7.title"),
      subtitle: t("Accordion.items.class7.short"),
      paragraphs: t.raw("Accordion.items.class7.paragraphs") as string[],
      listItems: t.raw("Accordion.items.class7.listItems") as string[],
      icon: Radiation,
    },
    {
      id: "class8",
      title: t("Accordion.items.class8.title"),
      subtitle: t("Accordion.items.class8.short"),
      paragraphs: t.raw("Accordion.items.class8.paragraphs") as string[],
      listItems: t.raw("Accordion.items.class8.listItems") as string[],
      icon: FlaskConical,
    },
    {
      id: "class9",
      title: t("Accordion.items.class9.title"),
      subtitle: t("Accordion.items.class9.short"),
      paragraphs: t.raw("Accordion.items.class9.paragraphs") as string[],
      listItems: t.raw("Accordion.items.class9.listItems") as string[],
      icon: Battery,
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
        imageSrc="/images/transport-adr/transport-adr-01.webp"
        imageAlt={t("section_1.alt")}
        headingLevel="h1"
      />

      <RequestQuoteSection />

      <FlipCardsSection
        eyebrow={t("cards.eyebrow")}
        title={t("cards.title")}
        description={t("cards.description")}
        items={ADR_CARDS}
      />

      <AccordionSection
        sectionTitle={t("Accordion.title")}
        sectionIntro={t("Accordion.intro")}
        items={items}
        defaultValue="class1"
      />

      {/* SECTION_2 */}
      <InfoTextSection
        title={t("section_2.title")}
        introParagraphs={t.raw("section_2.introParagraphs") as string[]}
        listTitle={t("section_2.listTitle")}
        listItems={
          t.raw("section_2.groups") as Array<{
            label?: string;
            text: string;
          }>
        }
        outroParagraphs={t.raw("section_2.outroParagraphs") as string[]}
      />

      <FeatureHighlightSection
        eyebrow={t("highlight.eyebrow")}
        title={t("highlight.title")}
        description={t("highlight.description")}
        items={ADR_FEATURES}
      />

      {/* SECTION_3 */}
      <InfoTextSection
        title={t("section_3.title")}
        introParagraphs={t.raw("section_3.paragraphs") as string[]}
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
