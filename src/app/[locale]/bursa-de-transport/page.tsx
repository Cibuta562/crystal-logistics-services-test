"use client";
// import next-intl
import { useTranslations } from "next-intl";

// HERO SECTION
import PageHero from "@/components/site/PageHero";

// CONTENT SPLIT SECTION
import { ContentSplitRight } from "@/components/site/ContentSplitSection";

// FORM _ REQUEST A QUOTE
import RequestQuoteSection from "@/components/site/RequestQuoteSection";

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

import BursaAccordions from "@/components/site/BursaAccordion";

export default function BursaDeTransportPage() {
  const t = useTranslations("Transport.BursaDeTransport");

  const items: AccordionItemData[] = [
    {
      id: "class1",
      title: t("Accordion.items.class1.title"),
      subtitle: t("Accordion.items.class1.short"),
      paragraphs: t.raw("Accordion.items.class1.paragraphs") as string[],
    },
    {
      id: "class2",
      title: t("Accordion.items.class2.title"),
      subtitle: t("Accordion.items.class2.short"),
      paragraphs: t.raw("Accordion.items.class2.paragraphs") as string[],
    },
    {
      id: "class3",
      title: t("Accordion.items.class3.title"),
      subtitle: t("Accordion.items.class3.short"),
      paragraphs: t.raw("Accordion.items.class3.paragraphs") as string[],
    },
    {
      id: "class4",
      title: t("Accordion.items.class4.title"),
      subtitle: t("Accordion.items.class4.short"),
      paragraphs: t.raw("Accordion.items.class4.paragraphs") as string[],
    },
    {
      id: "class5",
      title: t("Accordion.items.class5.title"),
      subtitle: t("Accordion.items.class5.short"),
      paragraphs: t.raw("Accordion.items.class5.paragraphs") as string[],
    },
  ];

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Schimbă background aici */}
      <PageHero
        eyebrow={t("Header.section")}
        title={t("Header.title")}
        imageSrc="/images/bursa-de-transport/banner-bursa-de-transport.jpg"
        imageAlt={t("Header.alt")}
        imageClassName="object-cover object-center"
      />

      {/* SECTION_1 */}
      <ContentSplitRight
        title={t("section_1.title")}
        paragraphs={t.raw("section_1.paragraphs") as string[]}
        imageSrc="/images/bursa-de-transport/bursa-de-transport-01.jpg"
        imageAlt={t("section_1.alt")}
        headingLevel="h1"
      />

      <BursaAccordions />

      <RequestQuoteSection />

      <AccordionSection
        sectionTitle={t("Accordion.title")}
        sectionIntro={t("Accordion.intro")}
        items={items}
        defaultValue="class1"
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
