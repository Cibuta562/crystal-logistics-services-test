"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

const SECTION_CONTAINER = "mx-auto w-full max-w-[1400px] px-4 sm:px-8 lg:px-12";

type VehicleConfig = {
  id: string;
  mainImage: string;
  sideImage: string;
};

const VEHICLES: VehicleConfig[] = [
  {
    id: "platformaDreaptaDeschisa",
    mainImage: "/images/transport-agabaritic/platforma-dreapta-deschisa.webp",
    sideImage:
      "/images/transport-agabaritic/platforma-dreapta-deschisa-ie.webp",
  },
  {
    id: "plataformaLasata",
    mainImage: "/images/transport-agabaritic/platforma-lasata.webp",
    sideImage: "/images/transport-agabaritic/platforma-lasata-ie.webp",
  },
  {
    id: "gondola",
    mainImage: "/images/transport-agabaritic/gondola.webp",
    sideImage: "/images/transport-agabaritic/gondola-ie.webp",
  },
  {
    id: "gondola4axe",
    mainImage: "/images/transport-agabaritic/gondola-4-axe.webp",
    sideImage: "/images/transport-agabaritic/gondola-4-axe-ie.webp",
  },
  {
    id: "trailerExtensibil",
    mainImage: "/images/transport-agabaritic/trailer-extensibil.webp",
    sideImage: "/images/transport-agabaritic/trailer-extensibil-ie.webp",
  },
  {
    id: "trailereCuAlveole",
    mainImage: "/images/transport-agabaritic/trailer-cu-alveole.webp",
    sideImage: "/images/transport-agabaritic/trailer-cu-alveole-ie.webp",
  },
  {
    id: "platformaLasata2",
    mainImage: "/images/transport-agabaritic/platforma-lasata-2.webp",
    sideImage: "/images/transport-agabaritic/platforma-lasata-2-ie.webp",
  },
];

export default function SpecializedVehiclesSection() {
  const t = useTranslations("Transport.Rutier.Agabaritic.specializedVehicles");

  return (
    <section className={`${SECTION_CONTAINER} py-16`}>
      <div className="max-w-3xl">
        <div className="mb-6">
          <div className="mb-4 h-[3px] w-16 bg-[#FFD500]" />
          <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
            {t("title")}
          </h2>
        </div>
        <p className="text-[15px] leading-relaxed text-neutral-700">
          {t("intro")}
        </p>
      </div>

      <div className="mt-12 space-y-14">
        {VEHICLES.map((vehicle, index) => {
          const titleKey = `items.${vehicle.id}.title` as const;
          const descriptionKey = `items.${vehicle.id}.description` as const;
          const altMainKey = `items.${vehicle.id}.altMain` as const;
          const altSideKey = `items.${vehicle.id}.altSide` as const;

          return (
            <div
              key={vehicle.id}
              className="grid items-stretch gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]"
            >
              <div className="flex flex-col">
                <div>
                  <div className="mb-4 h-[3px] w-16 bg-[#FFD500]" />
                  <h3 className="text-xl font-extrabold tracking-tight">
                    {t(titleKey, { index: index + 1 })}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-neutral-700">
                    {t(descriptionKey)}
                  </p>
                </div>

                <div className="mt-6 overflow-hidden">
                  <div className="relative aspect-[1200/205] w-full">
                    <Image
                      src={vehicle.mainImage}
                      alt={t(altMainKey, { defaultValue: t(titleKey) })}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-[24px] shadow-md">
                <div className="relative h-full aspect-[16/9]">
                  <Image
                    src={vehicle.sideImage}
                    alt={t(altSideKey, {
                      defaultValue: `${t(titleKey)} - vedere laterală`,
                    })}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
