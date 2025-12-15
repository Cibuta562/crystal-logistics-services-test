"use client";
// import next-intl
import { useTranslations } from "next-intl";

import { Play, Pause } from "lucide-react";

// HERO SECTION
import PageHero from "@/components/site/PageHero";

// CONTENT SPLIT SECTION
import { ContentSplitLeft } from "@/components/site/ContentSplitSection";

// FORM _ REQUEST A QUOTE
import RequestQuoteSection from "@/components/site/RequestQuoteSection";

// SUBSERVICES
import SubservicesGridSection, {
  SubserviceItem,
} from "@/components/site/SubservicesGridSection";

// INFO TEXT
import InfoTextSection from "@/components/site/InfoTextSection";

// FLIP CARDS
// import FlipCardsSection, {
//   FlipCardItem,
// } from "@/components/site/FlipCardsSection";

// STATS
import AnimatedStatsSection from "@/components/site/AnimatedStatsSection";

// ACCORDION
import AccordionSection, {
  AccordionItemData,
} from "@/components/site/AccordionSection";

// !IMPORTANT - adaugă ultimele postări

// WHY WORK WITH US
import WhyWorkWithUsSection from "@/components/site/WhyWorkWithUsSection";

// NEWSLETTER
import NewsletterFormSection from "@/components/site/NewsletterFormSection";

// CONTACT CTA
import ContactCtaSection from "@/components/site/ContactCtaSection";

// FOOTER
import Footer from "@/components/site/Footer";
import { useRef, useState } from "react";

export default function TransportRutierPage() {
  const t = useTranslations("Transport.Rutier.General");

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handlePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      // când dă PLAY: PORNEȘTE CU SUNET
      videoRef.current.muted = false;
      setIsMuted(false);

      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const SUBSERVICES: SubserviceItem[] = [
    {
      key: "agabaritic",
      title: t("Subservicii.agabaritic.title"),
      description: t("Subservicii.agabaritic.description"),
      href: "/transport-marfa-rutier/transport-agabaritic",
      imageSrc: "/images/transport-marfa-rutier/transport-agabaritic.webp",
      imageAlt: t("Subservicii.agabaritic.alt"),
    },
    {
      key: "adr",
      title: t("Subservicii.adr.title"),
      description: t("Subservicii.adr.description"),
      href: "/transport-marfa-rutier/transport-adr",
      imageSrc: "/images/transport-marfa-rutier/transport-adr.webp",
      imageAlt: t("Subservicii.adr.alt"),
    },
    {
      key: "frigo",
      title: t("Subservicii.frigo.title"),
      description: t("Subservicii.frigo.description"),
      href: "/transport-marfa-rutier/transport-frigo",
      imageSrc: "/images/transport-marfa-rutier/transport-frigo.webp",
      imageAlt: t("Subservicii.frigo.alt"),
    },
    {
      key: "marfaVrac",
      title: t("Subservicii.marfaVrac.title"),
      description: t("Subservicii.marfaVrac.description"),
      href: "/transport-marfa-rutier/transport-marfa-vrac",
      imageSrc: "/images/transport-marfa-rutier/transport-marfa-vrac.webp",
      imageAlt: t("Subservicii.marfaVrac.alt"),
    },
    {
      key: "relocariInternationale",
      title: t("Subservicii.relocariInternationale.title"),
      description: t("Subservicii.relocariInternationale.description"),
      href: "/transport-marfa-rutier/relocari-internationale",
      imageSrc: "/images/transport-marfa-rutier/relocari-internationale.webp",
      imageAlt: t("Subservicii.relocariInternationale.alt"),
    },
    {
      key: "distributieNationala",
      title: t("Subservicii.distributieNationala.title"),
      description: t("Subservicii.distributieNationala.description"),
      href: "/contact",
      imageSrc: "/images/transport-marfa-rutier/distributie-nationala.webp",
      imageAlt: t("Subservicii.distributieNationala.alt"),
    },
    // {
    //   key: "logisticaTarguri",
    //   title: t("Subservicii.logisticaTarguri.title"),
    //   description: t("Subservicii.logisticaTarguri.description"),
    //   href: "/transport-marfa-rutier/logistica-pentru-targuri-si-expozitii-internationale",
    //   imageSrc: "/images/transport-marfa-rutier/distributie-nationala.webp",
    //   imageAlt: t("Subservicii.logisticaTarguri.alt"),
    // },
    // {
    //   key: "transportArmament",
    //   title: t("Subservicii.transportArmament.title"),
    //   description: t("Subservicii.transportArmament.description"),
    //   href: "/transport-marfa-rutier/transport-armament",
    //   imageSrc: "/images/transport-marfa-rutier/distributie-nationala.webp",
    //   imageAlt: t("Subservicii.transportArmament.alt"),
    // },
  ];

  const items: AccordionItemData[] = [
    {
      id: "class1",
      title: t("Accordion.items.class1.title"),
      subtitle: t("Accordion.items.class1.short"),
      paragraphs: t.raw("Accordion.items.class1.paragraphs") as string[],
      listItems: t.raw("Accordion.items.class1.listItems") as string[],
      groupParagraphsWithListItems: true,
    },
    {
      id: "class2",
      title: t("Accordion.items.class2.title"),
      paragraphs: t.raw("Accordion.items.class2.paragraphs") as string[],
      listItems: t.raw("Accordion.items.class2.listItems") as string[],
      groupParagraphsWithListItems: true,
    },
    {
      id: "class3",
      title: t("Accordion.items.class3.title"),
      paragraphs: t.raw("Accordion.items.class3.paragraphs") as string[],
      listItems: t.raw("Accordion.items.class3.listItems") as string[],
      groupParagraphsWithListItems: true,
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
      {/*<ContentSplitRight*/}
      {/*    title={t("section_1.title")}*/}
      {/*    paragraphs={t.raw("section_1.paragraphs") as string[]}*/}
      {/*    videoSrc="/videos/transport-rutier-vertical.mp4"*/}
      {/*    videoPoster="/images/transport-marfa-rutier/video-poster.jpg"*/}
      {/*    headingLevel="h1"*/}
      {/*    listType="unordered"*/}
      {/*    listItems={t.raw("section_2.listItems") as string[]}*/}
      {/*/>*/}

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-stretch">
          {/* LEFT TEXT */}
          <div className="flex flex-col justify-center space-y-5">
            <div className="mb-0 h-[3px] w-16 bg-[#FFD500]" />
            <h2 className="text-3xl md:text-4xl font-bold">
              {t("section_1.title")}
            </h2>

            {(t.raw("section_1.paragraphs") as string[]).map((p, i) => (
              <p key={i} className="text-neutral-700 leading-relaxed">
                {p}
              </p>
            ))}

            <span
              className="absolute inset-0 bg-yellow-400 scale-x-0 origin-left
                           group-hover:scale-x-100 transition-transform duration-500 ease-out"
            />
          </div>

          {/* RIGHT VIDEO */}
          <div className="flex flex-col justify-center gap-4">
            {/* VIDEO FĂRĂ AUTOPLAY + PLAY/PAUSE + UNMUTE */}
            <div className="relative h-[70vh] md:h-[70vh] rounded-2xl overflow-hidden shadow-xl group">
              <video
                ref={videoRef}
                src="/videos/rutier.webm"
                muted={isMuted}
                loop
                playsInline
                className="w-full h-full object-cover"
              />

              {/* PLAY / PAUSE BUTTON */}
              <button
                onClick={handlePlayPause}
                className="
        absolute inset-0 flex items-center justify-center
        bg-black/0 group-hover:bg-black/30 transition
      "
              >
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {isPlaying ? (
                    <Pause className="w-16 h-16 text-white" />
                  ) : (
                    <Play className="w-16 h-16 text-white" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/*<section className="py-20">*/}
      {/*  <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-stretch">*/}

      {/*    /!* LEFT TEXT *!/*/}
      {/*    <div className="flex flex-col justify-center space-y-5">*/}
      {/*      <div className="mb-0 h-[3px] w-16 bg-[#FFD500]"/>*/}
      {/*      <h2 className="text-3xl md:text-4xl font-bold">*/}
      {/*        {t("section_1.title")}*/}
      {/*      </h2>*/}

      {/*      {(t.raw("section_1.paragraphs") as string[]).map((p, i) => (*/}
      {/*          <p key={i} className="text-neutral-700 leading-relaxed">*/}
      {/*            {p}*/}
      {/*          </p>*/}
      {/*      ))}*/}

      {/*      <span*/}
      {/*          className="absolute inset-0 bg-yellow-400 scale-x-0 origin-left*/}
      {/*                   group-hover:scale-x-100 transition-transform duration-500 ease-out"*/}
      {/*      />*/}

      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}

      {/*SECTION_2*/}
      <ContentSplitLeft
        title={t("section_2.title")}
        paragraphs={t.raw("section_2.paragraphs") as string[]}
        imageSrc="/images/homeBanner.webp"
        imageAlt={t("section_2.alt")}
        headingLevel="h1"
        listType="unordered"
        listItems={t.raw("section_2.listItems") as string[]}
      />

      <RequestQuoteSection />

      {/* SECTION_3 */}
      <ContentSplitLeft
        eyebrow={t("section_3.eyebrow")}
        title={t("section_3.title")}
        titleHref="/transport-marfa-rutier/transport-intern-si-international"
        titleTarget="_self"
        subtitle={t("section_3.subtitle")}
        paragraphs={t.raw("section_3.paragraphs") as string[]}
        imageSrc="/images/transport-marfa-rutier/camion-crystal-logistics-02.jpg"
        imageAlt={t("section_3.alt")}
        headingLevel="h1"
      />

      <SubservicesGridSection
        id="subservicii"
        eyebrow={t("Subservicii.eyebrow")}
        title={t("Subservicii.title")}
        description={t("Subservicii.description")}
        items={SUBSERVICES}
      />

      {/* SECTION_4 */}
      <InfoTextSection
        title={t("section_4.title")}
        paragraphs={t.raw("section_4.paragraphs") as string[]}
      />

      <AnimatedStatsSection />

      <AccordionSection
        sectionTitle={t("Accordion.title")}
        sectionIntro={t("Accordion.intro")}
        items={items}
        defaultValue="class1"
      />

      {/* LATEST POSTS */}

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
