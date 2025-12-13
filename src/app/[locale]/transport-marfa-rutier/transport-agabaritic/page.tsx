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

// FEATURES
import FeatureHighlightSection, {
  FeatureItem,
} from "@/components/site/FeatureHighlightSection";

// SPECIALIZED VECHICLES AGABARITIC
import SpecializedVehiclesSection from "@/components/site/SpecializedVehiclesSection";

// WHY WORK WITH US
import WhyWorkWithUsSection from "@/components/site/WhyWorkWithUsSection";

// NEWSLETTER
import NewsletterFormSection from "@/components/site/NewsletterFormSection";

// CONTACT CTA
import ContactCtaSection from "@/components/site/ContactCtaSection";

// FOOTER
import Footer from "@/components/site/Footer";

// ICONS
import { Shield, Globe2, Route } from "lucide-react";

export default function TransportAgabariticPage() {
  const t = useTranslations("Transport.Rutier.Agabaritic");

  const AGABARITIC_FEATURES: FeatureItem[] = [
    {
      icon: Route,
      title: t("highlight.items.card1.title"),
      description: t("highlight.items.card1.description"),
    },
    {
      icon: Shield,
      title: t("highlight.items.card2.title"),
      description: t("highlight.items.card2.description"),
    },
    {
      icon: Globe2,
      title: t("highlight.items.card3.title"),
      description: t("highlight.items.card3.description"),
    },
  ];

  const section3RawItems = t.raw("section_3.listItems") as string[];

  const section3ListItems = section3RawItems.map((_, index) =>
    t.rich(`section_3.listItems.${index}`, {
      strong: (chunks) => (
        <span className="font-semibold text-neutral-900">{chunks}</span>
      ),
    })
  );

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
        imageSrc="/images/transport-agabaritic/transport-agabaritic-01.webp"
        imageAlt={t("section_1.alt")}
        headingLevel="h1"
      />

      <RequestQuoteSection />

      <FeatureHighlightSection
        eyebrow={t("highlight.eyebrow")}
        title={t("highlight.title")}
        description={t("highlight.description")}
        items={AGABARITIC_FEATURES}
      />

      <SpecializedVehiclesSection />

      {/* SECTION_2 */}
      <ContentSplitRight
        title={t("section_2.title")}
        paragraphs={t.raw("section_2.paragraphs") as string[]}
        imageSrc="/images/transport-agabaritic/transport-agabaritic-02.webp"
        imageAlt={t("section_2.alt")}
        headingLevel="h1"
      />

      {/* SECTION_3 */}
      <ContentSplitLeft
        title={t("section_3.title")}
        imageSrc="/example.jpg"
        imageAlt={t("section_3.alt")}
        headingLevel="h1"
        listType="unordered"
        listItems={section3ListItems}
      />

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
