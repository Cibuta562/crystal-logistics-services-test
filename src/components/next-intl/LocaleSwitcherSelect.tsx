"use client";

import { useState, useTransition } from "react";
import { useParams } from "next/navigation";
import { Locale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { ChevronsUpDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import clsx from "clsx";

export default function LocaleSwitcherSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const t = useTranslations("Navbar.locale");
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const currentLocale = (params?.locale as string) || "ro";

  const locales = [
    { code: "ro", label: t("short.ro") },
    { code: "en", label: t("short.en") },
    { code: "de", label: t("short.de") },
    { code: "fr", label: t("short.fr") },
    { code: "it", label: t("short.it") },
    { code: "pl", label: t("short.pl") },
  ];

  function handleChange(nextLocale: Locale) {
    setOpen(false);
    startTransition(() => {
      router.replace(
        // @ts-expect-error params match route
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }

  return (
    <div
      className={clsx(
        "flex items-center justify-between w-full rounded-lg py-2 text-sm text-white/80",
        isPending && "opacity-50 transition-opacity"
      )}
    >
      {/* === Label (hidden on desktop) === */}
      <span className="font-medium text-white/70 block lg:hidden">
        {t("label")}
      </span>

      {/* === Dropdown === */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button className="inline-flex items-center gap-1 rounded-md bg-transparent text-white font-semibold text-base hover:text-[#F4BD19] focus:outline-none">
            {locales.find((l) => l.code === currentLocale)?.label || "RO"}
            <ChevronsUpDown className="h-4 w-4 opacity-70" />
          </button>
        </PopoverTrigger>

        <PopoverContent
          align="end"
          className="w-24 rounded-md border border-white/10 bg-neutral-900 p-1 shadow-md"
        >
          {locales.map((loc) => (
            <button
              key={loc.code}
              onClick={() => handleChange(loc.code as Locale)}
              className={clsx(
                "w-full text-left px-3 py-1.5 rounded-md font-semibold transition-colors text-white hover:bg-white/10",
                currentLocale === loc.code && "bg-white/10"
              )}
            >
              {loc.label}
            </button>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
}
