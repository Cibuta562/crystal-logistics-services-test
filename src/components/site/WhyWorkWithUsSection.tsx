"use client";

import { useTranslations } from "next-intl";
import {
  PhoneCall,
  Clock3,
  Truck,
  ClipboardCheck,
  Package,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

const SECTION_CONTAINER =
    "mx-auto w-full max-w-[1400px] px-4 sm:px-8 lg:px-12";

type WhyUsVariant = "light" | "dark";

interface WhyWorkWithUsSectionProps {
  variant?: WhyUsVariant;
  className?: string;
}

const WHY_US_ITEMS = [
  { icon: PhoneCall, key: "assistance" },
  { icon: Clock3, key: "response" },
  { icon: Truck, key: "insured" },
  { icon: ClipboardCheck, key: "fairPrice" },
  { icon: Package, key: "fullPackage" },
] as const;

function useFadeInOnce<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !ref.current) return;

    const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.2 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [mounted]);

  return { ref, visible, mounted };
}


export default function WhyWorkWithUsSection({
                                               variant = "dark",
                                               className,
                                             }: WhyWorkWithUsSectionProps) {
  const s = useTranslations("Components");
  const isDark = variant === "dark";

  return (
      <section
          className={cn(isDark ? "bg-[#171717]" : "bg-white", "w-full", className)}
      >
        <div
            className={cn(
                SECTION_CONTAINER,
                "py-20",
                isDark ? "text-white" : "text-neutral-900"
            )}
        >
          {/* Titlu */}
          <div className="mb-10">
            <div className="mb-3 h-[3px] w-16 bg-[#FFD500]" />
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {s("whyUs.title")}
            </h2>
          </div>

          {/* GRID */}
          <div
              className="
            grid gap-8 grid-cols-2 lg:grid-cols-5
            justify-items-center lg:justify-items-stretch
          "
          >
            {WHY_US_ITEMS.map((item, index) => {
              const Icon = item.icon;
              const label = s(`whyUs.items.${item.key}`);
              const { ref, visible } = useFadeInOnce<HTMLParagraphElement>();

              const isLastSingleOnMobile =
                  WHY_US_ITEMS.length % 2 !== 0 &&
                  index === WHY_US_ITEMS.length - 1;

              return (
                  <div
                      key={item.key}
                      className={cn(
                          "flex flex-col items-center gap-4 text-center",
                          "transition-transform duration-300 ease-out hover:-translate-y-1",
                          "max-w-[150px] md:max-w-none",
                          isLastSingleOnMobile && "col-span-2 lg:col-span-1"
                      )}
                  >
                    {/* ICON – fără animație la scroll */}
                    <div
                        className={cn(
                            "flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full border",
                            "transition-all duration-300",
                            isDark
                                ? "border-white/40 bg-transparent"
                                : "border-[#FFD500]/50 bg-white shadow-sm",
                            "hover:shadow-lg hover:shadow-[#FFD500]/20"
                        )}
                    >
                      <Icon
                          className={cn(
                              "h-6 w-6 md:h-7 md:w-7",
                              isDark ? "text-white" : "text-[#FFD500]"
                          )}
                      />
                    </div>

                    {/* TEXT – FADE ONLY */}
                    <p
                        ref={ref}
                        className={cn(
                            "text-sm font-medium leading-snug",
                            "transition-opacity duration-700 ease-out",
                            visible ? "opacity-100" : "opacity-0"
                        )}
                        style={{ transitionDelay: `${index * 120}ms` }}
                    >
                      {label}
                    </p>
                  </div>
              );
            })}
          </div>
        </div>
      </section>
  );
}
