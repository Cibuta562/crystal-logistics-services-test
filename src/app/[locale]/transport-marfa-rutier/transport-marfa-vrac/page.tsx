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

// ACCORDION
import AccordionSection, {
  AccordionItemData,
} from "@/components/site/AccordionSection";

// INFO TEXT
import InfoTextSection from "@/components/site/InfoTextSection";

// WHY WORK WITH US
import WhyWorkWithUsSection from "@/components/site/WhyWorkWithUsSection";

// CONTACT CTA
import ContactCtaSection from "@/components/site/ContactCtaSection";

// FOOTER
import Footer from "@/components/site/Footer";

// ICONS
import { Truck, ShieldCheck, Package, Clock, Earth } from "lucide-react";

export default function TransportMarfaVracPage() {
  const t = useTranslations("Transport.Rutier.MarfaVrac");

  const items: AccordionItemData[] = [
    {
      id: "class1",
      title: t("Accordion.items.class1.title"),
      paragraphs: t.raw("Accordion.items.class1.paragraphs") as string[],
    },
    {
      id: "class2",
      title: t("Accordion.items.class2.title"),
      paragraphs: t.raw("Accordion.items.class2.paragraphs") as string[],
    },
    {
      id: "class3",
      title: t("Accordion.items.class3.title"),
      paragraphs: t.raw("Accordion.items.class3.paragraphs") as string[],
    },
    {
      id: "class4",
      title: t("Accordion.items.class4.title"),
      paragraphs: t.raw("Accordion.items.class4.paragraphs") as string[],
    },
    {
      id: "class5",
      title: t("Accordion.items.class5.title"),
      paragraphs: t.raw("Accordion.items.class5.paragraphs") as string[],
    },
    {
      id: "class6",
      title: t("Accordion.items.class6.title"),
      paragraphs: t.raw("Accordion.items.class6.paragraphs") as string[],
    },
  ];

  const MARFA_VRAC_FEATURES: FeatureItem[] = [
    {
      icon: Truck,
      title: t("highlight.items.card1.title"),
      description: t.raw("highlight.items.card1.description") as string[],
    },
    {
      icon: Clock,
      title: t("highlight.items.card2.title"),
      description: t.raw("highlight.items.card2.description") as string[],
    },
    {
      icon: Earth,
      title: t("highlight.items.card3.title"),
      description: t.raw("highlight.items.card3.description") as string[],
    },
    {
      icon: ShieldCheck,
      title: t("highlight.items.card4.title"),
      description: t.raw("highlight.items.card4.description") as string[],
    },
    {
      icon: Package,
      title: t("highlight.items.card5.title"),
      description: t.raw("highlight.items.card5.description") as string[],
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
        imageSrc="/images/transport-marfa-vrac/transport-marfa-vrac-01.webp"
        imageAlt={t("section_1.alt")}
        headingLevel="h1"
      />

      <RequestQuoteSection />

      <FeatureHighlightSection
        eyebrow={t("highlight.eyebrow")}
        title={t("highlight.title")}
        description={t("highlight.description")}
        items={MARFA_VRAC_FEATURES}
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
        paragraphs={t.raw("section_2.paragraphs") as string[]}
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
