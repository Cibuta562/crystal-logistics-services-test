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

// ACCORDION
import AccordionSection, {
  AccordionItemData,
} from "@/components/site/AccordionSection";

// WHY WORK WITH US
import WhyWorkWithUsSection from "@/components/site/WhyWorkWithUsSection";

// NEWSLETTER
import NewsletterFormSection from "@/components/site/NewsletterFormSection";

// CONTACT CTA
import ContactCtaSection from "@/components/site/ContactCtaSection";

// FOOTER
import Footer from "@/components/site/Footer";

const SECTION_CONTAINER = "mx-auto w-full max-w-[1400px] px-4 sm:px-8 lg:px-12";

export default function TransportFeroviarPage() {
  const t = useTranslations("Transport.Feroviar");

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
    {
      id: "class7",
      title: t("Accordion.items.class7.title"),
      paragraphs: t.raw("Accordion.items.class7.paragraphs") as string[],
    },
  ];

  const AUDIENCE_ITEMS = ["card1", "card2", "card3", "card4", "card5"];
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Schimbă background aici */}
      <PageHero
        eyebrow={t("Header.section")}
        title={t("Header.title")}
        imageSrc="/images/transport-feroviar/feroviarHero.webp"
        imageAlt={t("Header.alt")}
        imageClassName="object-cover object-center"
      />

      <ContentSplitRight
        title={t("section_1.title")}
        paragraphs={t.raw("section_1.paragraphs") as string[]}
        imageSrc="/images/transport-feroviar/transport-feroviar.webp"
        imageAlt={t("section_1.alt")}
        headingLevel="h1"
      />

      <RequestQuoteSection />

      <AccordionSection
        sectionTitle={t("Accordion.title")}
        sectionIntro={t("Accordion.intro")}
        items={items}
        defaultValue="class1"
      />

      <section className="bg-[#154568] text-white">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-8 lg:px-12 py-16">
          <div>
            <div className="mb-4 h-[3px] w-16 bg-[#FFD500]" />
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              {t("tractionSection.title")}
            </h2>

            <ul className="mt-8 space-y-4 text-[15px] leading-relaxed text-slate-100">
              <li className="flex gap-3">
                <span className="mt-[6px] inline-block h-[6px] w-[6px] rounded-full bg-[#FFD500]" />
                <div>
                  <p className="font-semibold">
                    {t("tractionSection.items.item1.title")}
                  </p>
                  <p className="mt-1">
                    {"– "}
                    {t("tractionSection.items.item1.description")}
                  </p>
                </div>
              </li>

              <li className="flex gap-3">
                <span className="mt-[6px] inline-block h-[6px] w-[6px] rounded-full bg-[#FFD500]" />
                <div>
                  <p className="font-semibold">
                    {t("tractionSection.items.item2.title")}
                  </p>
                  <p className="mt-1">
                    {"– "}
                    {t("tractionSection.items.item2.description")}
                  </p>
                </div>
              </li>

              <li className="flex gap-3">
                <span className="mt-[6px] inline-block h-[6px] w-[6px] rounded-full bg-[#FFD500]" />
                <div>
                  <p className="font-semibold">
                    {t("tractionSection.items.item3.title")}
                  </p>
                  <p className="mt-1">
                    {"– "}
                    {t("tractionSection.items.item3.description")}
                  </p>
                </div>
              </li>

              <li className="flex gap-3">
                <span className="mt-[6px] inline-block h-[6px] w-[6px] rounded-full bg-[#FFD500]" />
                <div>
                  <p className="font-semibold">
                    {t("tractionSection.items.item4.title")}
                  </p>
                  <p className="mt-1">
                    {"– "}
                    {t("tractionSection.items.item4.description")}
                  </p>
                </div>
              </li>

              <li className="flex gap-3">
                <span className="mt-[6px] inline-block h-[6px] w-[6px] rounded-full bg-[#FFD500]" />
                <div>
                  <p className="font-semibold">
                    {t("tractionSection.items.item5.title")}
                  </p>
                  <p className="mt-1">
                    {"– "}
                    {t("tractionSection.items.item5.description")}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white text-neutral-900">
        <div className={`${SECTION_CONTAINER} py-16`}>
          <div className="mb-10">
            <div className="mb-4 h-[3px] w-16 bg-[#FFD500]" />
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              {t("audience.title")}
            </h2>
            <p className="mt-4 max-w-4xl text-[15px] leading-relaxed text-neutral-700">
              {t("audience.intro1")}
            </p>
            <p className="mt-1 max-w-4xl text-[15px] leading-relaxed text-neutral-700">
              {t("audience.intro2")}
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-5">
            {AUDIENCE_ITEMS.map((key, index) => (
              <div key={key} className="flex flex-col">
                <div>
                  <p className="text-3xl font-light text-neutral-900">
                    {index + 1}
                  </p>
                  <div className="mt-2 mb-6 h-[3px] w-12 bg-[#FFD500]" />
                </div>

                <h3 className="text-lg font-semibold leading-snug text-neutral-900">
                  {t(`audience.items.${key}.title`)}
                </h3>

                <p className="mt-3 text-[15px] leading-relaxed text-neutral-700">
                  {t(`audience.items.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContentSplitLeft
        title={t("section_2.title")}
        paragraphs={t.raw("section_2.paragraphs") as string[]}
        imageSrc="/images/transport-feroviar/transport-marfa-pe-calea-ferata.jpg"
        imageAlt={t("section_2.alt")}
        headingLevel="h1"
        listType="ordered"
        listItems={t.raw("section_2.listItems") as string[]}
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
