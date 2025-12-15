"use client";

import { useState, type ComponentProps } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ArrowUpRight, ChevronDown, X } from "lucide-react";
import LocaleSwitcherSelect from "@/components/next-intl/LocaleSwitcherSelect";
import { SheetContentNoClose } from "@/components/ui/SheetContentNoClose";
import NavigationLink from "@/components/next-intl/NavigationLink";

type Href = ComponentProps<typeof NavigationLink>["href"];

type NavbarProps = {
  logoSrc?: string;
  logo?: React.ReactNode;
  logoHref?: Href;
};

type NavItem = {
  href: Href;
  labelKey: string;
  submenu?: {
    href: Href;
    labelKey: string;
    submenu?: { href: Href; labelKey: string }[];
  }[];
};

function hrefToPath(href: Href): string {
  return typeof href === "string" ? href : (href.pathname as string);
}

export default function Navbar({
                                 logoSrc = "/cls-logo.svg",
                                 logo,
                                 logoHref = "/",
                               }: NavbarProps) {
  const pathname = usePathname() ?? "/";
  const locale = useLocale();
  const t = useTranslations("Navbar");

  const normalizedPathname = pathname.startsWith(`/${locale}`)
      ? pathname.slice(locale.length + 1) || "/"
      : pathname;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMain, setOpenMain] = useState<string | null>(null);
  const [openSub, setOpenSub] = useState<string | null>(null);

  const [quoteOpen, setQuoteOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const quoteUrl =
      locale === "ro"
          ? "https://forms.monday.com/forms/embed/d822b77b6d1ae8edf0cc2c81a9989ce9?r=euc1"
          : "https://forms.monday.com/forms/embed/0dd269a68887c5ca2de17dd4dead0648?r=euc1";

  const toggleMain = (href: Href) => {
    const key = hrefToPath(href);
    setOpenMain((prev) => (prev === key ? null : key));
  };

  const toggleSub = (href: Href) => {
    const key = hrefToPath(href);
    setOpenSub((prev) => (prev === key ? null : key));
  };

  const NAV: NavItem[] = [
    { href: "/", labelKey: "nav.home" },
    { href: "/despre-noi", labelKey: "nav.despreNoi" },
    {
      href: "/solutii",
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
        {
          href: "/transport-multimodal",
          labelKey: "submenu.transport.multimodal",
        },
      ],
    },
    { href: "/transportatori", labelKey: "nav.transportatori" },
    { href: "/blog", labelKey: "nav.blog" },
    { href: "/contact", labelKey: "nav.contact" },
  ];

  const LogoNode = logo ? (
      <span className="flex items-center">{logo}</span>
  ) : (
      <>
        <Image
            src={logoSrc}
            alt="Logo Desktop"
            width={140}
            height={90}
            priority
            className="hidden h-12 w-auto lg:block"
        />
        <Image
            src="/logo.svg"
            alt="Logo Mobile"
            width={90}
            height={60}
            priority
            className="block h-12 w-auto lg:hidden"
        />
      </>
  );

  return (
      <>
        <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-neutral-900 text-white">
          <div className="grid h-20 w-full grid-cols-[auto_1fr_auto] items-center gap-4 px-5 md:px-8 xl:px-10">
            {/* LOGO */}
            <NavigationLink
                href={logoHref}
                aria-label={t("a11y.home")}
                className="flex items-center"
            >
              {LogoNode}
            </NavigationLink>

            {/* DESKTOP NAV */}
            <nav className="relative z-50 hidden w-full justify-center lg:flex">
              <ul className="flex items-center gap-12">
                {NAV.map((item) => {
                  const itemPath = hrefToPath(item.href);
                  const active =
                      itemPath === "/"
                          ? normalizedPathname === "/"
                          : normalizedPathname.startsWith(itemPath);

                  return (
                      <li
                          key={itemPath}
                          className="relative group"
                          onMouseEnter={(e) => e.currentTarget.classList.add("open")}
                          onMouseLeave={(e) =>
                              e.currentTarget.classList.remove("open")
                          }
                      >
                        <NavigationLink
                            href={item.href}
                            className={`text-base font-semibold tracking-wide transition-colors hover:text-[#FFD500] ${
                                active ? "text-[#FFD500]" : "text-white/80"
                            }`}
                        >
                          {t(item.labelKey)}
                        </NavigationLink>

                        {item.submenu && (
                            <div
                                className="
                          invisible absolute left-0 top-full mt-0 min-w-[220px]
                          rounded-lg border border-neutral-700 bg-neutral-900 py-2
                          opacity-0 shadow-lg transition-all duration-300 ease-out
                          group-[.open]:visible group-[.open]:opacity-100
                        "
                            >
                              {item.submenu.map((sub) => {
                                const subPath = hrefToPath(sub.href);
                                return (
                                    <div key={subPath} className="relative group/sub">
                                      <NavigationLink
                                          href={sub.href}
                                          className="
                                  flex items-center justify-between
                                  px-4 py-2 text-sm text-[#FFD500]
                                  transition-colors duration-200
                                  hover:bg-neutral-800 hover:text-white
                                "
                                      >
                                        {t(sub.labelKey)}
                                        {sub.submenu && (
                                            <ChevronDown className="h-4 w-4 rotate-[-90deg] opacity-60 transition group-hover/sub:opacity-100" />
                                        )}
                                      </NavigationLink>

                                      {sub.submenu && (
                                          <div
                                              className="
                                    invisible absolute left-full top-0 ml-1 min-w-[200px]
                                    rounded-lg border border-neutral-700 bg-neutral-900 py-2
                                    opacity-0 shadow-lg transition-all duration-300 ease-out
                                    group-hover/sub:visible group-hover/sub:opacity-100
                                  "
                                          >
                                            {sub.submenu.map((deep) => {
                                              const deepPath = hrefToPath(deep.href);
                                              return (
                                                  <NavigationLink
                                                      key={deepPath}
                                                      href={deep.href}
                                                      className="block px-4 py-2 text-sm text-[#FFD500] transition hover:bg-neutral-800 hover:text-white"
                                                  >
                                                    {t(deep.labelKey)}
                                                  </NavigationLink>
                                              );
                                            })}
                                          </div>
                                      )}
                                    </div>
                                );
                              })}
                            </div>
                        )}
                      </li>
                  );
                })}
              </ul>
            </nav>

            {/* DESKTOP ACTIONS */}
            <div className="hidden items-center gap-5 lg:flex">
              <button
                  onClick={() => {
                    setLoading(true);
                    setQuoteOpen(true);
                  }}
                  className="group relative inline-flex items-center justify-center overflow-hidden whitespace-nowrap rounded-full border border-yellow-400 bg-yellow-400 px-14 py-2 text-[15px] font-semibold text-black transition-all duration-300"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-white transition-transform duration-500 ease-out group-hover:scale-x-100" />
                <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-black">
                {t("cta.quote")}
              </span>
              </button>

              <LocaleSwitcherSelect />
            </div>

            {/* MOBILE */}
            <div className="flex items-center justify-end gap-2 lg:hidden">
              <button
                  onClick={() => {
                    setLoading(true);
                    setQuoteOpen(true);
                  }}
                  className="relative z-10 inline-flex items-center justify-center rounded-full bg-[#FFD500] px-5 py-2 text-base font-semibold text-black transition-colors hover:bg-[#FFDD33]"
              >
                {t("cta.short")}
                <ArrowUpRight className="ml-1 h-5 w-5" />
              </button>

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

                <SheetContentNoClose className="flex h-[100dvh] w-screen flex-col overflow-hidden border-none bg-neutral-900 px-8 pt-8 text-white">
                  <div className="mb-8 flex items-center justify-between">
                    <Image
                        src="/logo.svg"
                        alt="Logo Mobile Menu"
                        width={90}
                        height={60}
                        className="h-12 w-auto"
                    />
                    <button
                        className="rounded-lg p-2 hover:bg-white/10"
                        onClick={() => setIsMenuOpen(false)}
                    >
                      <X className="h-8 w-8" />
                    </button>
                  </div>

                  <div className="flex-1 overscroll-contain overflow-y-auto pr-1 [-webkit-overflow-scrolling:touch]">
                    <nav>
                      <ul className="space-y-2">
                        {NAV.map((item) => {
                          const itemPath = hrefToPath(item.href);
                          const active =
                              itemPath === "/"
                                  ? normalizedPathname === "/"
                                  : normalizedPathname.startsWith(itemPath);

                          return (
                              <li key={itemPath}>
                                {item.submenu ? (
                                    <>
                                      <div
                                          className={`flex items-center justify-between rounded-lg px-3.5 py-2.5 ${
                                              active ? "bg-white/10" : ""
                                          }`}
                                      >
                                        <NavigationLink
                                            href={item.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex-1 text-lg font-medium"
                                        >
                                          {t(item.labelKey)}
                                        </NavigationLink>

                                        <button
                                            onClick={() => toggleMain(item.href)}
                                            className="rounded-md p-2 hover:bg-white/10"
                                        >
                                          <ChevronDown
                                              className={`h-5 w-5 transition-transform ${
                                                  openMain === itemPath
                                                      ? "rotate-180"
                                                      : ""
                                              }`}
                                          />
                                        </button>
                                      </div>

                                      {openMain === itemPath && (
                                          <ul className="ml-4 mt-1 space-y-1 border-l border-white/10 pl-3">
                                            {item.submenu.map((sub) => {
                                              const subPath = hrefToPath(sub.href);
                                              return (
                                                  <li key={subPath}>
                                                    {!sub.submenu ? (
                                                        <NavigationLink
                                                            href={sub.href}
                                                            onClick={() =>
                                                                setIsMenuOpen(false)
                                                            }
                                                            className="block px-3 py-1.5 text-base text-[#FFD500] hover:text-white"
                                                        >
                                                          {t(sub.labelKey)}
                                                        </NavigationLink>
                                                    ) : (
                                                        <>
                                                          <div className="flex items-center justify-between px-3 py-1.5">
                                                            <NavigationLink
                                                                href={sub.href}
                                                                onClick={() =>
                                                                    setIsMenuOpen(false)
                                                                }
                                                                className="flex-1 text-base text-[#FFD500] hover:text-white"
                                                            >
                                                              {t(sub.labelKey)}
                                                            </NavigationLink>

                                                            <button
                                                                onClick={(e) => {
                                                                  e.stopPropagation();
                                                                  toggleSub(sub.href);
                                                                }}
                                                                className="ml-2 rounded-md p-2 hover:bg-white/10"
                                                            >
                                                              <ChevronDown
                                                                  className={`h-4 w-4 transition-transform ${
                                                                      openSub === subPath
                                                                          ? "rotate-180"
                                                                          : ""
                                                                  }`}
                                                              />
                                                            </button>
                                                          </div>

                                                          {openSub === subPath && (
                                                              <ul className="ml-4 mt-1 space-y-1 border-l border-white/10 pl-3">
                                                                {sub.submenu.map((deep) => {
                                                                  const deepPath = hrefToPath(
                                                                      deep.href
                                                                  );
                                                                  return (
                                                                      <li key={deepPath}>
                                                                        <NavigationLink
                                                                            href={deep.href}
                                                                            onClick={() =>
                                                                                setIsMenuOpen(false)
                                                                            }
                                                                            className="block px-3 py-1.5 text-base text-[#FFD500] hover:text-white"
                                                                        >
                                                                          {t(deep.labelKey)}
                                                                        </NavigationLink>
                                                                      </li>
                                                                  );
                                                                })}
                                                              </ul>
                                                          )}
                                                        </>
                                                    )}
                                                  </li>
                                              );
                                            })}
                                          </ul>
                                      )}
                                    </>
                                ) : (
                                    <NavigationLink
                                        href={item.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`block rounded-lg px-3.5 py-2.5 text-lg font-medium hover:bg-white/10 ${
                                            active ? "bg-white/10" : ""
                                        }`}
                                    >
                                      {t(item.labelKey)}
                                    </NavigationLink>
                                )}
                              </li>
                          );
                        })}
                      </ul>
                    </nav>
                  </div>

                  <div className="mt-7 space-y-4">
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

                    <NavigationLink
                        href="/contact"
                        onClick={() => setIsMenuOpen(false)}
                        className="block w-full rounded-xl bg-[#E0B400] px-4 py-2.5 text-center text-base font-semibold text-black hover:bg-[#F2C200]"
                    >
                      {locale === "ro" ? "Contactează-ne" : "Contact us"}
                    </NavigationLink>

                    <div className="flex justify-end rounded-lg border border-white/10 p-3.5">
                      <LocaleSwitcherSelect />
                    </div>
                  </div>
                </SheetContentNoClose>
              </Sheet>
            </div>
          </div>
        </header>

        {/* POPUP */}
        {quoteOpen && (
            <div
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
                onClick={() => setQuoteOpen(false)}
            >
              <div
                  className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
              >
                <button
                    onClick={() => setQuoteOpen(false)}
                    className="absolute right-4 top-4 z-20 rounded-full bg-black/20 p-2 hover:bg-black/30"
                >
                  <X className="h-6 w-6 text-black" />
                </button>

                <div className="relative h-[80vh] w-full">
                  {loading && (
                      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-neutral-200 border-t-yellow-500" />
                        <p className="mt-4 text-sm text-neutral-700 md:text-base">
                          {locale === "ro"
                              ? "Se încarcă formularul…"
                              : "Loading form…"}
                        </p>
                      </div>
                  )}

                  <iframe
                      src={quoteUrl}
                      className="absolute inset-0 h-full w-full"
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
