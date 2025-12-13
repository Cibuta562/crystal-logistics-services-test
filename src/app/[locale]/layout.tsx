import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";

import InvalidLocale from "./InvalidLocale";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/site/Navbar";
import CookieBanner from "@/components/CookieConsent/CookieBanner";
import Script from "next/script"; // 👈 IMPORTANT: import Script

// Load Raleway with desired weights
const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Crystal Logistics",
  description: "Crystal Logistics Services",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return <InvalidLocale />;
  }

  return (
    <html lang={locale} className={raleway.className} suppressHydrationWarning>
      <head>
        {/* 🌐 Google Analytics Script */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-6FWM0KXD6P"
        />

        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6FWM0KXD6P');
          `}
        </Script>
      </head>

      <body
        className={`${raleway.variable} antialiased`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider>
          <Navbar />
          {children}
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
