import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'
import Script from 'next/script'

import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { routing } from '@/i18n/routing'

import InvalidLocale from './InvalidLocale'
import ClientProviders from '@/components/site/ClientProviders'
import '../globals.css'

// 🔤 Google Font
const raleway = Raleway({
    variable: '--font-raleway',
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'Crystal Logistics',
    description: 'Crystal Logistics Services',
}

export function generateStaticParams() {
    return routing.locales.map(locale => ({ locale }))
}

type Props = {
    children: React.ReactNode
    params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params

    if (!hasLocale(routing.locales, locale)) {
        return <InvalidLocale />
    }

    return (
        <html lang={locale} className={raleway.className}>
        <head>
            {/* ✅ GDPR Consent – no GTM load */}
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
        </head>

        <body className={`${raleway.variable} antialiased`}>
        <NextIntlClientProvider>
            <ClientProviders>{children}</ClientProviders>
        </NextIntlClientProvider>
        </body>
        </html>
    )
}
