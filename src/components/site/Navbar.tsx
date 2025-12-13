"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Mail, Menu, ArrowUpRight, ChevronDown, X } from "lucide-react";
import LocaleSwitcherSelect from "@/components/next-intl/LocaleSwitcherSelect";
import { useLocale } from "next-intl";
import { SheetContentNoClose } from "@/components/ui/SheetContentNoClose";

type NavbarProps = {
  logoSrc?: string;
  logo?: React.ReactNode;
  logoHref?: string;
};

type NavItem = {
  href: string;
  labelKey: string;
  submenu?: {
    href: string;
    labelKey: string;
    submenu?: { href: string; labelKey: string }[];
  }[];
};

export default function Navbar({
  logoSrc = "/cls-logo.svg",
  logo,
  logoHref = "/",
}: NavbarProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("Navbar");

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMain, setOpenMain] = useState<string | null>(null);
  const [openSub, setOpenSub] = useState<string | null>(null);

  // === POPUP STATE ===
  const [quoteOpen, setQuoteOpen] = useState(false);

  const [loading, setLoading] = useState(true);


  const quoteUrl =
    locale === "ro"
      ? "https://forms.monday.com/forms/embed/d822b77b6d1ae8edf0cc2c81a9989ce9?r=euc1"
      : "https://forms.monday.com/forms/embed/0dd269a68887c5ca2de17dd4dead0648?r=euc1";

  const toggleMain = (href: string) =>
    setOpenMain((prev) => (prev === href ? null : href));
  const toggleSub = (href: string) =>
    setOpenSub((prev) => (prev === href ? null : href));

  const NAV: NavItem[] = [
    { href: "/", labelKey: "nav.home" },

    { href: "/despre-noi", labelKey: "nav.despreNoi" },

    {
      href: "/solutii", // ✅ PAGINĂ PRINCIPALĂ TRANSPORT
      labelKey: "nav.transport",
      submenu: [
        {
          href: "/transport-marfa-rutier",
          labelKey: "submenu.transport.road",
          submenu: [
            {
              href: "/transport-marfa-rutier/transport-intern-si-international",
              labelKey: "submenu.transport.roadSub.transportInt",
            },
            {
              href: "/transport-marfa-rutier/relocari-internationale",
              labelKey: "submenu.transport.roadSub.relocari",
            },
            {
              href: "/transport-marfa-rutier/transport-armament",
              labelKey: "submenu.transport.roadSub.armament",
            },
            {
              href: "/transport-marfa-rutier/transport-agabaritic",
              labelKey: "submenu.transport.roadSub.agabaritic",
            },
            {
              href: "/transport-marfa-rutier/transport-frigo",
              labelKey: "submenu.transport.roadSub.frigo",
            },
            {
              href: "/transport-marfa-rutier/transport-adr",
              labelKey: "submenu.transport.roadSub.adr",
            },
            {
              href: "/transport-marfa-rutier/transport-marfa-vrac",
              labelKey: "submenu.transport.roadSub.marfaVrac",
            },
            {
              href: "/transport-autoturisme",
              labelKey: "submenu.transport.roadSub.autoturisme",
            },
            {
              href: "/alte-servicii",
              labelKey: "submenu.transport.roadSub.other",
            },
            {
              href: "/bursa-de-transport",
              labelKey: "submenu.transport.roadSub.bursa",
            },
          ],
        },
        { href: "/transport-maritim", labelKey: "submenu.transport.sea" },
        { href: "/transport-aerian", labelKey: "submenu.transport.air" },
        { href: "/transport-feroviar", labelKey: "submenu.transport.rail" },
        { href: "/transport-multimodal", labelKey: "submenu.transport.multimodal" },
      ],
    },

    { href: "/transportatori", labelKey: "nav.transportatori" },
    { href: "/blog", labelKey: "nav.blog" },
    { href: "/contact", labelKey: "nav.contact" },
  ];


  return (
    <>
      {/* ======================== NAVBAR ======================== */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-neutral-900 text-white">
        <div className="grid h-20 w-full grid-cols-[auto_1fr_auto] items-center gap-4 px-5 md:px-8 xl:px-10">
          {/* === LOGO === */}
          <Link
              href={logoHref}
              aria-label={t("a11y.home")}
              className="flex items-center"
          >
            {/* LOGO DESKTOP */}
            <Image
                src={logoSrc}
                alt="Logo Desktop"
                width={140}
                height={90}
                priority
                className="hidden lg:block h-12 w-auto"
            />

            {/* LOGO MOBILE */}
            <Image
                src="/logo.svg"   // <-- aici pui logo-ul pentru mobil
                alt="Logo Mobile"
                width={90}
                height={60}
                priority
                className="block lg:hidden h-12 w-auto"
            />
          </Link>


          {/* === DESKTOP NAV === */}

          <nav className="hidden lg:flex w-full justify-center relative z-50">
            <ul className="flex items-center gap-12">
              {NAV.map((item) => {
                const active =
                    item.href === "/"
                        ? pathname === "/"
                        : pathname?.startsWith(item.href);

                return (
                  <li
                    key={item.href}
                    className="relative group"
                    onMouseEnter={(e) => e.currentTarget.classList.add("open")}
                    onMouseLeave={(e) =>
                      e.currentTarget.classList.remove("open")
                    }
                  >
                    <Link
                      href={item.href}
                      className={`text-base font-semibold tracking-wide transition-colors hover:text-[#FFD500] ${
                        active ? "text-[#FFD500]" : "text-white/80"
                      }`}
                    >
                      {t(item.labelKey)}
                    </Link>

                    {item.submenu && (
                      <div
                        className="
                          invisible opacity-0 absolute left-0 top-full mt-0
                          group-[.open]:visible group-[.open]:opacity-100
                          transition-all duration-300 ease-out
                          bg-neutral-900 border border-neutral-700 rounded-lg shadow-lg
                          min-w-[220px] py-2
                        "
                      >
                        {item.submenu.map((sub) => (
                          <div key={sub.href} className="relative group/sub">
                            <Link
                              href={sub.href}
                              className="
                                block px-4 py-2 text-sm text-[#FFD500]
                                hover:bg-neutral-800 hover:text-white
                                transition-colors duration-200 flex justify-between items-center
                              "
                            >
                              {t(sub.labelKey)}

                              {sub.submenu && (
                                <ChevronDown className="h-4 w-4 rotate-[-90deg] opacity-60 group-hover/sub:opacity-100 transition" />
                              )}
                            </Link>

                            {/* SUBMENU LEVEL 2 */}
                            {sub.submenu && (
                              <div
                                className="
                                  absolute left-full top-0 ml-1
                                  bg-neutral-900 border border-neutral-700 rounded-lg shadow-lg
                                  min-w-[200px] py-2
                                  opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible
                                  transition-all duration-300 ease-out
                                "
                              >
                                {sub.submenu.map((deep) => (
                                  <Link
                                    key={deep.href}
                                    href={deep.href}
                                    className="block px-4 py-2 text-sm text-[#FFD500] hover:bg-neutral-800 hover:text-white transition"
                                  >
                                    {t(deep.labelKey)}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* === DESKTOP ACTIONS === */}
          <div className="hidden lg:flex items-center gap-5">
            {/* CTA — DESCHIDE POPUP */}
            <button
                onClick={() => {
                  setLoading(true);
                  setQuoteOpen(true);
                }}

                className="relative overflow-hidden group inline-flex items-center justify-center
                border border-yellow-400 rounded-full px-14 py-2 text-[15px] font-semibold
                bg-yellow-400 text-black transition-all duration-300 whitespace-nowrap"
            >
              <span className="absolute inset-0 bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
              <span className="relative z-10 flex items-center gap-2 group-hover:text-black transition-colors duration-300">
                {t("cta.quote")}
              </span>
            </button>

            <LocaleSwitcherSelect />
          </div>

          {/* === MOBILE NAV === */}
          <div className="flex lg:hidden items-center justify-end gap-2">
            {/* CTA — DESCHIDE POPUP */}
            <button
                onClick={() => {
                  setLoading(true);
                  setQuoteOpen(true);
                }}

                className="relative z-10 inline-flex items-center justify-center rounded-full bg-[#FFD500] px-5 py-2 text-base font-semibold text-black hover:bg-[#FFDD33] transition-colors"
            >
              {t("cta.short")}
              <ArrowUpRight className="ml-1 h-5 w-5" />
            </button>

            {/* === MOBILE MENU BUTTON FIXED (THIS WAS MISSING!) === */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                {!isMenuOpen && (
                  <button
                    className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-white hover:bg-white/10"
                    aria-label={t("a11y.menu")}
                  >
                    <Menu className="h-7 w-7" />
                  </button>
                )}
              </SheetTrigger>

              <SheetContentNoClose
                  className="h-[100dvh] w-screen bg-neutral-900 text-white px-8 pt-8 border-none flex flex-col overflow-hidden">
                {/* HEADER */}
                <div className="flex items-center justify-between mb-8">
                  <Image
                      src="/logo.svg"
                      alt="Logo Mobile Menu"
                      width={90}
                      height={60}
                      className="h-12 w-auto"
                  />

                  <button
                      className="p-2 rounded-lg hover:bg-white/10"
                      onClick={() => setIsMenuOpen(false)}
                  >
                    <X className="h-8 w-8"/>
                  </button>
                </div>


                {/* NAV */}
                <div
                    className="
    flex-1
    overflow-y-auto
    overscroll-contain
    pr-1
    [-webkit-overflow-scrolling:touch]
  "
                >
                  <nav>
                    <ul className="space-y-2">
                      {NAV.map((item) => {
                        const active = pathname?.startsWith(item.href);
                        return (
                            <li key={item.href}>
                              {item.submenu ? (
                                  <>
                                    {/* ROW: Link + Chevron */}
                                    <div
                                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg ${
                                            active ? "bg-white/10" : ""
                                        }`}
                                    >
                                      {/* LINK — merge direct la pagina */}
                                      <Link
                                          href={item.href}
                                          onClick={() => setIsMenuOpen(false)}
                                          className="flex-1 text-lg font-medium"
                                      >
                                        {t(item.labelKey)}
                                      </Link>

                                      {/* CHEVRON — doar deschide/închide submenu */}
                                      <button
                                          onClick={() => toggleMain(item.href)}
                                          className="p-2 rounded-md hover:bg-white/10"
                                      >
                                        <ChevronDown
                                            className={`h-5 w-5 transition-transform ${
                                                openMain === item.href ? "rotate-180" : ""
                                            }`}
                                        />
                                      </button>
                                    </div>

                                    {/* SUBMENU LEVEL 1 */}
                                    {openMain === item.href && (
                                        <ul className="ml-4 mt-1 space-y-1 border-l border-white/10 pl-3">
                                          {item.submenu.map((sub) => (
                                              <li key={sub.href}>
                                                {!sub.submenu ? (
                                                    <Link
                                                        href={sub.href}
                                                        onClick={() => setIsMenuOpen(false)}
                                                        className="block px-3 py-1.5 text-base text-[#FFD500] hover:text-white"
                                                    >
                                                      {t(sub.labelKey)}
                                                    </Link>
                                                ) : (
                                                    <>
                                                      {/* Submenu Toggle */}
                                                      <div className="flex items-center justify-between px-3 py-1.5">
                                                        {/* TEXTUL — NAVIGHEAZĂ */}

                                                        <Link
                                                            href={sub.href}
                                                            onClick={() => setIsMenuOpen(false)}
                                                            className="flex-1 text-base text-[#FFD500] hover:text-white"
                                                        >
                                                          {t(sub.labelKey)}
                                                        </Link>

                                                        {/* SĂGEATA — DOAR DESCHIDE SUBMENIUL */}
                                                        <button
                                                            onClick={(e) => {
                                                              e.stopPropagation();   // <-- foarte important!
                                                              toggleSub(sub.href);
                                                            }}
                                                            className="p-2 ml-2 rounded-md hover:bg-white/10"
                                                        >
                                                          <ChevronDown
                                                              className={`h-4 w-4 transition-transform ${
                                                                  openSub === sub.href ? "rotate-180" : ""
                                                              }`}
                                                          />
                                                        </button>
                                                      </div>


                                                      {/* SUBMENU LEVEL 2 */}
                                                      {openSub === sub.href && (
                                                          <ul className="ml-4 mt-1 space-y-1 border-l border-white/10 pl-3">
                                                            {sub.submenu.map((deep) => (
                                                                <li key={deep.href}>
                                                                  <Link
                                                                      href={deep.href}
                                                                      onClick={() => setIsMenuOpen(false)}
                                                                      className="block px-3 py-1.5 text-base text-[#FFD500] hover:text-white"
                                                                  >
                                                                    {t(deep.labelKey)}
                                                                  </Link>
                                                                </li>
                                                            ))}
                                                          </ul>
                                                      )}
                                                    </>
                                                )}
                                              </li>
                                          ))}
                                        </ul>
                                    )}
                                  </>
                              ) : (
                                  <Link
                                      href={item.href}
                                      onClick={() => setIsMenuOpen(false)}
                                      className={`block rounded-lg px-3.5 py-2.5 text-lg font-medium hover:bg-white/10 ${
                                          active ? "bg-white/10" : ""
                                      }`}
                                  >
                                    {t(item.labelKey)}
                                  </Link>
                              )}

                            </li>
                        );
                      })}
                    </ul>
                  </nav>
                </div>

                  {/* MOBILE ACTIONS */}
                  <div className="mt-7 space-y-4">
                    {/* POPUP BUTTON */}
                    <button
                        onClick={() => {
                          setQuoteOpen(true);
                          setIsMenuOpen(false);
                          setLoading(true);
                        }}
                        className="w-full rounded-xl bg-[#E0B400] px-4 py-2.5 text-base font-semibold text-black hover:bg-[#F2C200]"
                    >
                      {t("cta.quote")}
                    </button>

                    <Link
                        href="/contact"
                        onClick={() => setIsMenuOpen(false)}
                        className="w-full block text-center rounded-xl bg-[#E0B400] px-4 py-2.5 text-base font-semibold text-black hover:bg-[#F2C200]"
                    >
                      {locale === "ro" ? "Contactează-ne" : "Contact us"}
                    </Link>

                    <div className="rounded-lg border border-white/10 p-3.5 flex justify-end">
                      <LocaleSwitcherSelect/>
                    </div>
                  </div>
              </SheetContentNoClose>
            </Sheet>
          </div>
        </div>
      </header>

      {/* ======================== POPUP MODAL ======================== */}
      {/* ======================== POPUP MODAL ======================== */}
      {quoteOpen && (
          <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] px-4"
              onClick={() => setQuoteOpen(false)}
          >
            <div
                className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden relative"
                onClick={(e) => e.stopPropagation()}
            >
              <button
                  onClick={() => setQuoteOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/30 z-20"
              >
                <X className="w-6 h-6 text-black" />
              </button>

              {/* CONTAINER RELATIV */}
              <div className="relative w-full h-[80vh]">
                {/* === LOADING ANIMATION === */}
                {loading && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white">
                      <div className="h-10 w-10 rounded-full border-4 border-neutral-200 border-t-yellow-500 animate-spin" />
                      <p className="mt-4 text-neutral-700 text-sm md:text-base">
                        {locale === "ro" ? "Se încarcă formularul…" : "Loading form…"}
                      </p>

                      <div className="mt-2 flex gap-1">
                        <span className="h-2 w-2 bg-yellow-500 rounded-full animate-bounce [animation-delay:-0.2s]" />
                        <span className="h-2 w-2 bg-yellow-500 rounded-full animate-bounce [animation-delay:-0.1s]" />
                        <span className="h-2 w-2 bg-yellow-500 rounded-full animate-bounce" />
                      </div>
                    </div>
                )}

                {/* === IFRAME === */}
                <iframe
                    src={quoteUrl}
                    className="absolute inset-0 w-full h-full"
                    allow="fullscreen; clipboard-write"
                    loading="lazy"
                    onLoad={() => setLoading(false)}
                    onError={() => setLoading(false)}
                />
              </div>
            </div>
          </div>
      )}

    </>
  );
}
