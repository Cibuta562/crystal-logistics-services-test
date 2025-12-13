"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Organizatii() {
  const t = useTranslations("Organizatii");

  const organizatii = [
    "/images/licenta1.png",
    "/images/licenta2.png",
    "/images/licenta3.png",
    "/images/licenta4.png",
    "/images/licenta5.png",
  ];

  const clienti = [
    "/images/client1.webp",
    "/images/client2.webp",
    "/images/client3.webp",
    "/images/client4.webp",
    "/images/client5.webp",
  ];

  return (
    <div className="w-full bg-white py-16 px-4 md:px-10 flex flex-col items-center overflow-hidden">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12">
        <LogoSection title={t("orgTitle")} logos={organizatii} />
        <LogoSection title={t("clientsTitle")} logos={clienti} />
      </div>
    </div>
  );
}

function LogoSection({ title, logos }: { title: string; logos: string[] }) {
  const looped = [...logos, ...logos];

  return (
    <div className="flex flex-col items-center md:items-start">
      <div className="w-full mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-1 w-8 bg-yellow-500 rounded-full" />
          <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        </div>
      </div>

      <div className="relative w-full overflow-hidden bg-white rounded-xl shadow-sm py-6 px-2">
        <motion.div
          className="flex items-center gap-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 25, repeat: Infinity }}
        >
          {looped.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="relative w-24 h-24 md:w-28 md:h-28 shrink-0 hover:scale-105 transition-transform duration-300"
            >
              <Image
                src={src}
                alt={`logo-${i}`}
                fill
                sizes="(max-width: 768px) 96px, 112px"
                className="object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
