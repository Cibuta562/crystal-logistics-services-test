import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";

import InvalidLocale from "./InvalidLocale";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/site/Navbar";

import Script from "next/script";
import CookieBannerDynamic from "@/app/[locale]/cookie-banner/CookieBannerDynamic";

// Load Raleway font
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
        {/* ✅ Google Tag Manager */}
          <Script id="gtm-consent-default" strategy="beforeInteractive">
              {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}

    gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      wait_for_update: 1000
    });
  `}
          </Script>


          {/* ✅ GTM – EXACT codul tău */}
          <Script
              id="gtm-head"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                  __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-K3P77WV');
            `,
              }}
          />
      </head>

      <body
          className={`${raleway.variable} antialiased`}
          suppressHydrationWarning
      >
      {/* ✅ Google Tag Manager (noscript) */}
      <noscript>
        <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K3P77WV"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>

      <NextIntlClientProvider>
        <Navbar />
        {children}
        <CookieBannerDynamic />
      </NextIntlClientProvider>
      </body>
      </html>
  );
}
