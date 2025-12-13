import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["ro", "en", "de", "fr", "it", "pl"],

  // Used when no locale matches
  defaultLocale: "ro",
  // localePrefix: 'as-needed',

  pathnames: {
    // If all locales use the same pathname, a single
    // external path can be used for all locales
    "/": "/",
    "/stiri": "/stiri",
    "/cookies": "/cookies",
    "/privacy": "/privacy",

    // If locales use different paths, you can
    // specify the relevant external pathnames

    // TRANSPORT MARFĂ RUTIER
    "/transport-marfa-rutier": {
      en: "/road-freight-transport",
      de: "/strassenguterverkehr",
      fr: "/transport-routier-de-marchandises",
      it: "/trasporto-merci-su-strada",
      pl: "/transport-drogowy-towarow",
    },

    // > TRANSPORT INTERN ȘI INTERNAȚIONAL
    "/transport-marfa-rutier/transport-intern-si-international": {
      en: "/road-freight-transport/domestic-and-international-transport",
      de: "/strassenguterverkehr/interner-und-internationaler-verkehr",
      fr: "/transport-routier-de-marchandises/transport-interne-et-international",
      it: "/trasporto-merci-su-strada/trasporto-interno-e-internazionale",
      pl: "/transport-drogowy-towarow/transport-wewnetrzny-i-miedzynarodowy",
    },

    // > RELOCĂRI INTERNAȚIONALE
    "/transport-marfa-rutier/relocari-internationale": {
      en: "/road-freight-transport/international-relocations",
      de: "/strassenguterverkehr/internationale-umsiedlungen",
      fr: "/transport-routier-de-marchandises/les-delocalisations-internationales",
      it: "/trasporto-merci-su-strada/trasferimenti-internazionali",
      pl: "/transport-drogowy-towarow/relokacje-miedzynarodowe",
    },

    // > TRANSPORT AGABARITIC
    "/transport-marfa-rutier/transport-agabaritic": {
      // !important -> transport-agabaritic în ro
      en: "/road-freight-transport/transport-agabaritic/",
      // !important -> transport-agabaritic în ro
      de: "/strassenguterverkehr/transport-agabaritic/",
      fr: "/transport-routier-de-marchandises/transport-agabaritique",
      it: "/trasporto-merci-su-strada/trasporto-agabarico",
      pl: "/transport-drogowy-towarow/transport-agabarytow",
    },

    // > TRANSPORT FRIGO
    "/transport-marfa-rutier/transport-frigo": {
      // !important -> transport-frigo în ro
      en: "/road-freight-transport/transport-frigo",
      // !important -> transport-frigo în ro
      de: "/strassenguterverkehr/transport-frigo/",
      // !important -> transport-frigo în ro
      fr: "/transport-routier-de-marchandises/transport-frigo",
      // !important -> transport-frigo în ro
      it: "/trasporto-merci-su-strada/transport-frigo",
      // !important -> transport-frigo în ro
      pl: "/transport-drogowy-towarow/transport-frigo/",
    },

    // > TRANSPORT ADR
    "/transport-marfa-rutier/transport-adr": {
      en: "/road-freight-transport/adr-transport",
      de: "/strassenguterverkehr/adr-transport",
      // !important -> transport-adr în ro
      fr: "/transport-routier-de-marchandises/transport-adr",
      it: "/trasporto-merci-su-strada/trasporto-adr",
      // !important -> transport-adr în ro
      pl: "/transport-drogowy-towarow/transport-adr/",
    },

    // > TRANSPORT MARFĂ VRAC
    "/transport-marfa-rutier/transport-marfa-vrac": {
      en: "/road-freight-transport/bulk-cargo-transport",
      // !important -> transport-marfa-vrac în ro
      de: "/strassenguterverkehr/transport-marfa-vrac",
      // !important -> transport-marfa-vrac în ro
      fr: "/transport-routier-de-marchandises/transport-marfa-vrac",
      // !important -> transport-marfa-vrac în ro
      it: "/trasporto-merci-su-strada/transport-marfa-vrac",
      // !important -> transport-marfa-vrac în ro
      pl: "/transport-drogowy-towarow/transport-marfa-vrac",
    },

    // > TRANSPORT MARFĂ VRAC
    "/transport-marfa-rutier/transport-armament": {
      en: "/road-freight-transport/weapons-transport",
      de: "/strassenguterverkehr/waffentransport",
      fr: "/transport-routier-de-marchandises/transport-armament",
      it: "/trasporto-merci-su-strada/transport-armament",
      pl: "/transport-drogowy-towarow/transport-armament",
    },

    // TRANSPORT AUTOTURISME
    "/transport-autoturisme": {
      en: "/car-transport",
      de: "/autotransport",
      fr: "/transport-de-voitures",
      it: "/trasporto-auto",
      pl: "/transport-samochodowy",
    },

    // TRANSPORT MULTIMODAL
    "/transport-multimodal": {
      en: "/transport-multimodal",
      de: "/transport-multimodal",
      fr: "/le-transport-multimodal",
      it: "/trasporto-multimodale",
      pl: "/transport-multimodalny",
    },

    // TRANSPORT FEROVIAR
    "/transport-feroviar": {
      en: "/rail-transport",
      de: "/schienenverkehr",
      fr: "/transport-ferroviaire",
      it: "/trasporto-ferroviario",
      pl: "/transport-kolejowy",
    },

    // TRANSPORT MARITIM
    "/transport-maritim": {
      en: "/sea-freight",
      de: "/transport-maritim",
      fr: "/transport-maritime",
      it: "/trasporto-marittimo",
      pl: "/transport-morski",
    },

    // TRANSPORT AERIAN
    "/transport-aerian": {
      en: "/air-transport",
      de: "/luftverkehr",
      fr: "/transport-aerian",
      it: "/trasporto-aereo",
      pl: "/transport-lotniczy",
    },

    // TRANSPORT CONTAINER RUTIER
    "/transport-container-rutier": {
      en: "/road-container-transport",
      de: "/strassencontainertransport",
      fr: "/transport-routier-de-conteneurs",
      it: "/trasporto-di-container-su-strada",
      pl: "/transport-drogowy-kontenerow",
    },

    // TRANSPORT CU CISTERNA
    "/transport-cu-cisterna": {
      en: "/tanker-transport",
      de: "/tanker-transport",
      fr: "/transport-par-camion-citerne",
      it: "/trasporto-in-cisterna",
      pl: "/transport-cysternami",
    },

    // TRANSPORT CU CAMION BASCULABIL
    "/transport-cu-camion-basculabil": {
      en: "/tipper-truck-transport",
      de: "/kipper-transport",
      fr: "/transport-par-camion-a-benne-basculante",
      it: "/trasporto-con-autocarro-ribaltabile",
      pl: "/transport-wywrotka",
    },

    // LOGISTICĂ PENTRU TÂRGURI ȘI EXPOZIȚII INTERNAȚIONALE
    "/logistica-pentru-targuri-si-expozitii-internationale": {
      en: "/logistics-for-international-fairs-and-exhibitions",
      de: "/logistik-fur-internationale-messen-und-ausstellungen",
      fr: "/logistica-pentru-targuri-si-expozitii-internationale",
      it: "/logistica-pentru-targuri-si-expozitii-internationale",
      pl: "/logistica-pentru-targuri-si-expozitii-internationale",
    },

    // DISTRIBUȚIE NAȚIONALĂ
    "/distributie-nationala": {
      en: "/national-distribution",
      de: "/nationale-verteilung",
      fr: "/distribution-nationale",
      it: "/distribuzione-nazionale",
      pl: "/dystrybucja-krajowa",
    },

    // SOLUTII
    "/solutii": {
      en: "/solutions",
      de: "/lösungen",
      fr: "/solutions",
      it: "/soluzioni",
      pl: "/rozwiazania",
    },

    // ALTE SERVICII
    "/alte-servicii": {
      en: "/other-services",
      de: "/andere-dienstleistungen",
      fr: "/autres-services",
      it: "/altri-servizi",
      pl: "/inne-usługi",
    },

    // BURSA DE TRANSPORT
    "/bursa-de-transport": {
      en: "/transport-exchange",
      de: "/transportboerse",
      fr: "/bourse-de-transport",
      it: "/scambio-di-trasporto",
      pl: "/giełda-transportowa",
    },

    // TRANSPORTATORI
    "/transportatori": {
      en: "/carriers",
      de: "/trager",
      fr: "/porteurs",
      it: "/vettori",
      pl: "/przewoznicy",
    },

    // CARIEERE
    "/cariere": {
      en: "/careers",
      de: "/karrieren",
      fr: "/carrieres",
      it: "/carriere",
      pl: "/kariery",
    },

    // DESPRE NOI
    "/despre-noi": {
      en: "/about-us",
      de: "/über-uns",
      fr: "/a-propos-de-nous",
      it: "/chi-siamo",
      pl: "/o-nas",
    },

    // CONTACT
    "/contact": {
      en: "/contact",
      de: "/kontakt",
      fr: "/contact",
      it: "/contatto",
      pl: "/kontakt",
    },

    // RECENZII - !important nu e actualizată
    "/recenzii": {
      en: "/recenzii",
      de: "/recenzii",
      fr: "/recenzii",
      it: "/recenzii",
      pl: "/recenzii",
    },

    // TEREMENI ȘI CONDIȚII
    "/termeni-si-conditii": {
      en: "/terms-and-conditions",
      de: "/bedingungen-und-konditionen",
      fr: "/conditions-generales",
      it: "/termini-e-condizioni",
      pl: "/zasady-i-warunki/",
    },

    // EXIT
    // "/services": {
    //   ro: "/leistungen",
    // },

    // Encoding of non-ASCII characters is handled
    // automatically where relevant
    // "/about": {
    //   ro: "/über-uns",
    // },

    // Dynamic params are supported via square brackets
    // "/news/[articleSlug]": {
    //   ro: "/neuigkeiten/[articleSlug]",
    // },

    // Static pathnames that overlap with dynamic segments
    // will be prioritized over the dynamic segment
    // "/news/just-in": {
    //   ro: "/neuigkeiten/aktuell",
    // },

    // Also (optional) catch-all segments are supported
    // "/categories/[...slug]": {
    //   ro: "/kategorien/[...slug]",
    // },
  },
});
