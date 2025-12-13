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

// SUBSERVICES
import SubservicesCardsSection, {
  ServiceShowcaseItem,
} from "@/components/site/SubservicesCardsSection";

// INFO TEXT
import InfoTextSection from "@/components/site/InfoTextSection";

// WHY WORK WITH US
import WhyWorkWithUsSection from "@/components/site/WhyWorkWithUsSection";

// CONTACT CTA
import ContactCtaSection from "@/components/site/ContactCtaSection";

// FOOTER
import Footer from "@/components/site/Footer";

// ICONS
import { Truck } from "lucide-react";

export default function TransportInternInternationalPage() {
  const t = useTranslations("Transport.Rutier.TransportInt");

  const INT_FEATURES: FeatureItem[] = [
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

  const items: ServiceShowcaseItem[] = [
    {
      key: "fleet-mini",
      title: t("Subservices.items.fleetMini.title"),
      description: t("Subservices.items.fleetMini.description"),
      groupedItems: [
        {
          key: "sprinter",
          title: t("Subservices.items.fleetMini.groupedItems.sprinter.title"),
          description: t(
            "Subservices.items.fleetMini.groupedItems.sprinter.description"
          ),
          imageSrc:
            "/images/transport-intern-si-international/sprinter-prelata-carosat.webp",
          imageAlt: t(
            "Subservices.items.fleetMini.groupedItems.sprinter.imageAlt"
          ),
          href: t("Subservices.items.fleetMini.groupedItems.sprinter.href"),
        },
        {
          key: "van75",
          title: t("Subservices.items.fleetMini.groupedItems.van75.title"),
          description: t(
            "Subservices.items.fleetMini.groupedItems.van75.description"
          ),
          imageSrc:
            "/images/transport-intern-si-international/camioneta-prelata-carosat.webp",
          imageAlt: t(
            "Subservices.items.fleetMini.groupedItems.van75.imageAlt"
          ),
          href: t("Subservices.items.fleetMini.groupedItems.van75.href"),
        },
        {
          key: "van10",
          title: t("Subservices.items.fleetMini.groupedItems.van10.title"),
          description: t(
            "Subservices.items.fleetMini.groupedItems.van10.description"
          ),
          imageSrc:
            "/images/transport-intern-si-international/camion-prelata-carosat.webp",
          imageAlt: t(
            "Subservices.items.fleetMini.groupedItems.van10.imageAlt"
          ),
          href: t("Subservices.items.fleetMini.groupedItems.van10.href"),
        },
      ],
    },

    {
      key: "marfa-generala",
      title: t("Subservices.items.marfa_generala.title"),
      description: t("Subservices.items.marfa_generala.description"),
      imageSrc: "/images/transport-intern-si-international/marfa-generala.webp",
      imageAlt: t("Subservices.items.marfa_generala.imageAlt"),
      href: t("Subservices.items.marfa_generala.href"),
    },

    {
      key: "agabaritic",
      title: t("Subservices.items.agabaritic.title"),
      description: t("Subservices.items.agabaritic.description"),
      imageSrc:
        "/images/transport-intern-si-international/trailer-agabaritic.webp",
      imageAlt: t("Subservices.items.agabaritic.imageAlt"),
      href: t("Subservices.items.agabaritic.href"),
    },
    {
      key: "marafa_agabaritica",
      title: t("Subservices.items.marafa_agabaritica.title"),
      description: t("Subservices.items.marafa_agabaritica.description"),
      imageSrc:
        "/images/transport-intern-si-international/marfa-agabaritica.webp",
      imageAlt: t("Subservices.items.marafa_agabaritica.imageAlt"),
      href: t("Subservices.items.marafa_agabaritica.href"),
    },
    {
      key: "camion_cu_semiremorca_basculabila",
      title: t("Subservices.items.camion_cu_semiremorca_basculabila.title"),
      description: t(
        "Subservices.items.camion_cu_semiremorca_basculabila.description"
      ),
      imageSrc:
        "/images/transport-intern-si-international/camion-cu-semiremorca-basculabila.webp",
      imageAlt: t(
        "Subservices.items.camion_cu_semiremorca_basculabila.imageAlt"
      ),
      href: "/contact",
    },
    {
      key: "marfa_vrac_basculanta",
      title: t("Subservices.items.marfa_vrac_basculanta.title"),
      description: t("Subservices.items.marfa_vrac_basculanta.description"),
      imageSrc:
        "/images/transport-intern-si-international/marfa-vrac-basculanta.webp",
      imageAlt: t("Subservices.items.marfa_vrac_basculanta.imageAlt"),
      href: "/contact",
    },
    {
      key: "sasiu_container",
      title: t("Subservices.items.sasiu_container.title"),
      description: t("Subservices.items.sasiu_container.description"),
      imageSrc:
        "/images/transport-intern-si-international/sasiu-container.webp",
      imageAlt: t("Subservices.items.sasiu_container.imageAlt"),
      href: "/contact",
    },
    {
      key: "containere",
      title: t("Subservices.items.containere.title"),
      description: t("Subservices.items.containere.description"),
      imageSrc: "/images/transport-intern-si-international/containere.webp",
      imageAlt: t("Subservices.items.containere.imageAlt"),
      href: "/contact",
    },
    {
      key: "cisterna_pentru_lichide",
      title: t("Subservices.items.cisterna_pentru_lichide.title"),
      description: t("Subservices.items.cisterna_pentru_lichide.description"),
      imageSrc:
        "/images/transport-intern-si-international/cisterna-pentru-lichide.webp",
      imageAlt: t("Subservices.items.cisterna_pentru_lichide.imageAlt"),
      href: "/contact",
    },

    {
      key: "marafa_lichida_cisterna",
      title: t("Subservices.items.marafa_lichida_cisterna.title"),
      description: t("Subservices.items.marafa_lichida_cisterna.description"),
      imageSrc:
        "/images/transport-intern-si-international/marfa-lichida-cisterna.webp",
      imageAlt: t("Subservices.items.marafa_lichida_cisterna.imageAlt"),
      href: "/contact",
    },

    {
      key: "platforma_pentru_transport_autoturisme",
      title: t(
        "Subservices.items.platforma_pentru_transport_autoturisme.title"
      ),
      description: t(
        "Subservices.items.platforma_pentru_transport_autoturisme.description"
      ),
      imageSrc:
        "/images/transport-intern-si-international/platforma-pentru-transport-autoturisme.webp",
      imageAlt: t(
        "Subservices.items.platforma_pentru_transport_autoturisme.imageAlt"
      ),
      href: t("Subservices.items.platforma_pentru_transport_autoturisme.href"),
    },

    {
      key: "autoturisme_platforma_pentru_auto",
      title: t("Subservices.items.autoturisme_platforma_pentru_auto.title"),
      description: t(
        "Subservices.items.autoturisme_platforma_pentru_auto.description"
      ),
      imageSrc:
        "/images/transport-intern-si-international/autoturisme-platforma-pentru-auto.webp",
      imageAlt: t(
        "Subservices.items.autoturisme_platforma_pentru_auto.imageAlt"
      ),
      href: t("Subservices.items.autoturisme_platforma_pentru_auto.href"),
    },

    {
      key: "camion_pentru_marfuri_periculoase",
      title: t("Subservices.items.camion_pentru_marfuri_periculoase.title"),
      description: t(
        "Subservices.items.camion_pentru_marfuri_periculoase.description"
      ),
      imageSrc:
        "/images/transport-intern-si-international/camion-pentru-marfuri-periculoase.webp",
      imageAlt: t(
        "Subservices.items.camion_pentru_marfuri_periculoase.imageAlt"
      ),
      href: t("Subservices.items.camion_pentru_marfuri_periculoase.href"),
    },

    {
      key: "marfa_periculoasa_adr",
      title: t("Subservices.items.marfa_periculoasa_adr.title"),
      description: t("Subservices.items.marfa_periculoasa_adr.description"),
      imageSrc:
        "/images/transport-intern-si-international/marfa-periculoasa-adr.webp",
      imageAlt: t("Subservices.items.marfa_periculoasa_adr.imageAlt"),
      href: t("Subservices.items.marfa_periculoasa_adr.href"),
    },
    {
      key: "camion_frigorific_frigo",
      title: t("Subservices.items.camion_frigorific_frigo.title"),
      description: t("Subservices.items.camion_frigorific_frigo.description"),
      imageSrc:
        "/images/transport-intern-si-international/camion-frigorific-frigo.webp",
      imageAlt: t("Subservices.items.camion_frigorific_frigo.imageAlt"),
      href: t("Subservices.items.camion_frigorific_frigo.href"),
    },

    {
      key: "marfa_frigorifica_frigo",
      title: t("Subservices.items.marfa_frigorifica_frigo.title"),
      description: t("Subservices.items.marfa_frigorifica_frigo.description"),
      imageSrc:
        "/images/transport-intern-si-international/marfa-frigorifica-frigo.webp",
      imageAlt: t("Subservices.items.marfa_frigorifica_frigo.imageAlt"),
      href: t("Subservices.items.marfa_frigorifica_frigo.href"),
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
        imageSrc="/images/transport-intern-si-international/camioane-crystal-logistics-01.jpg"
        imageAlt={t("section_1.alt")}
        headingLevel="h1"
      />

      <RequestQuoteSection />

      <FeatureHighlightSection
        eyebrow={t("highlight.eyebrow")}
        title={t("highlight.title")}
        items={INT_FEATURES}
      />

      <SubservicesCardsSection
        id="subservicii"
        eyebrow={t("Subservices.eyebrow")}
        title={t("Subservices.title")}
        intro={t("Subservices.intro")}
        ctaLabel={t("Subservices.ctaLabel")}
        items={items}
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
