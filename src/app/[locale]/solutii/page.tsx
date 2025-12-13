"use client";

// import next-intl
import { useTranslations } from "next-intl";

import { Play, Pause } from "lucide-react";
// HERO SECTION
import PageHero from "@/components/site/PageHero";

// FORM _ REQUEST A QUOTE
import RequestQuoteSection from "@/components/site/RequestQuoteSection";

// WHY WORK WITH US
import WhyWorkWithUsSection from "@/components/site/WhyWorkWithUsSection";

// FOOTER
import Footer from "@/components/site/Footer";

import NewsletterFormSection from "@/components/site/NewsletterFormSection";
import SubservicesGridSection, {
  SubserviceItem,
} from "@/components/site/SubservicesGridSection";

// UI
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

export default function SolutiiPage() {
  const s = useTranslations("Services");
  const t = useTranslations("Transport.Solutii");

  /* ================= SUBSERVICII ================= */
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
  ];

  /* ================= SERVICE CARDS (din BasicHero) ================= */
  const SERVICE_CARDS = [
    {
      key: "road",
      img: "/images/rutier.webp",
      link: "/transport-marfa-rutier",
    },
    {
      key: "maritime",
      img: "/images/maritim.webp",
      link: "/transport-maritim",
    },
    { key: "air", img: "/images/aerian.webp", link: "/transport-aerian" },
    { key: "rail", img: "/images/feroviar.webp", link: "/transport-feroviar" },
  ] as const;

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

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* ================= HERO ================= */}
      <PageHero
        eyebrow={t("Header.section")}
        title={t("Header.title")}
        imageSrc="/images/heroSolutii.jpg"
        imageAlt={t("Header.alt")}
        imageClassName="object-cover object-center"
      />

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-stretch">
          {/* LEFT TEXT */}
          <div className="flex flex-col justify-center space-y-5">
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
            <div className="relative h-[60vh] md:h-[60vh] rounded-2xl overflow-hidden shadow-xl group">
              <video
                ref={videoRef}
                src="/videos/about.webm"
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

      <RequestQuoteSection />

      {/* ================= SERVICII (IDENTIC BASIC HERO) ================= */}
      <section className="relative z-40 bg-neutral-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-center gap-6 mb-16">
            <span className="block h-[2px] w-16 bg-yellow-500" />
            <h2 className="text-center text-4xl md:text-5xl font-normal">
              {s("title")}
            </h2>
            <span className="block h-[2px] w-16 bg-yellow-500" />
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {SERVICE_CARDS.map(({ key, img, link }) => (
              <div
                key={key}
                className="bg-white text-black rounded-md overflow-hidden shadow-lg"
              >
                <div className="relative w-full h-56">
                  <Image
                    src={img}
                    alt={s(`cards.${key}.title`)}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="block h-6 w-[3px] bg-yellow-500" />
                    <h3 className="text-xl font-normal">
                      {s(`cards.${key}.title`)}
                    </h3>
                  </div>

                  <p className="text-gray-800 whitespace-pre-line leading-relaxed mb-6">
                    {s(`cards.${key}.text`)}
                  </p>

                  <Link href={link} className="inline-flex flex-col group">
                    <span className="flex items-center gap-2 text-black font-medium">
                      {s("learnMore")}
                      <ChevronRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </span>
                    <span className="block h-[2px] w-14 bg-yellow-500 mt-1 group-hover:w-20 transition-all" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SubservicesGridSection
        id="subservicii"
        eyebrow={t("Subservicii.eyebrow")}
        title={t("Subservicii.title")}
        description={t("Subservicii.description")}
        items={SUBSERVICES}
      />

      {/*<AccordionSection*/}
      {/*    sectionTitle={t("Accordion.title")}*/}
      {/*    sectionIntro={t("Accordion.intro")}*/}
      {/*    items={items}*/}
      {/*    defaultValue="class1"*/}
      {/*/>*/}

      <WhyWorkWithUsSection />
      <NewsletterFormSection />
      <Footer />
    </main>
  );
}
