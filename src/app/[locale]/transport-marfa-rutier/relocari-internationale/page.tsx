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

// INFO TEXT
import InfoTextSection from "@/components/site/InfoTextSection";

// ACCORDION
import AccordionSection, {
  AccordionItemData,
} from "@/components/site/AccordionSection";

// WHY WORK WITH US
import WhyWorkWithUsSection from "@/components/site/WhyWorkWithUsSection";

// FOOTER
import Footer from "@/components/site/Footer";

export default function RelocariInternationalePage() {
  const t = useTranslations("Transport.Rutier.Relocari");

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
        imageSrc="/images/relocari-internationale/split-one.jpg"
        imageAlt={t("section_1.alt")}
        headingLevel="h1"
      />

      <RequestQuoteSection />

      {/* SECTION_2 */}
      <InfoTextSection
        title={t("section_2.title")}
        paragraphs={t.raw("section_2.paragraphs") as string[]}
      />

      {/* SECTION_3 */}
      <ContentSplitRight
        title={t("section_3.title")}
        paragraphs={t.raw("section_3.paragraphs") as string[]}
        imageSrc="/images/relocari-internationale/incarcarea-efectelor-personale.webp"
        imageAlt={t("section_3.alt")}
        headingLevel="h1"
      />

      {/* SECTION_4 */}
      <ContentSplitLeft
        title={t("section_4.title")}
        paragraphs={t.raw("section_4.paragraphs") as string[]}
        imageSrc="/images/relocari-internationale/depozitarea-bunurilor.webp"
        imageAlt={t("section_4.alt")}
        headingLevel="h1"
      />

      {/* SECTION_5 */}
      <ContentSplitRight
        title={t("section_5.title")}
        paragraphs={t.raw("section_5.paragraphs") as string[]}
        imageSrc="/images/relocari-internationale/transport-sigur.webp"
        imageAlt={t("section_5.alt")}
        headingLevel="h1"
      />

      {/* SECTION_6 */}
      <ContentSplitLeft
        title={t("section_6.title")}
        paragraphs={t.raw("section_6.paragraphs") as string[]}
        imageSrc="/images/relocari-internationale/descarcarea-la-destinatie.webp"
        imageAlt={t("section_6.alt")}
        headingLevel="h1"
      />

      {/* SECTION_7 */}
      <InfoTextSection
        title={t("section_7.title")}
        paragraphs={t.raw("section_7.paragraphs") as string[]}
      />

      {/* SECTION_8 */}
      <InfoTextSection
        title={t("section_8.title")}
        paragraphs={t.raw("section_8.paragraphs") as string[]}
      />

      <AccordionSection
        sectionTitle={t("Accordion.title")}
        sectionIntro={t("Accordion.intro")}
        items={items}
        defaultValue="class1"
      />

      {/* SECTION_9 */}
      <InfoTextSection
        title={t("section_9.title")}
        paragraphs={t.raw("section_9.paragraphs") as string[]}
      />

      <WhyWorkWithUsSection />

      <Footer />
    </main>
  );
}
