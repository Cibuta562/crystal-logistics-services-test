'use client'

import dynamic from 'next/dynamic'

// 🔥 Client-only components
const Navbar = dynamic(() => import('@/components/site/Navbar'), {
    ssr: false,
})

const CookieBannerDynamic = dynamic(
    () => import('@/app/[locale]/cookie-banner/CookieBannerDynamic'),
    { ssr: false }
)

const GTMDelay = dynamic(() => import('@/components/site/GTMDelay'), {
    ssr: false,
})

export default function ClientProviders({
                                            children,
                                        }: {
    children: React.ReactNode
}) {
    return (
        <>
            <GTMDelay />
            <Navbar />
            {children}
            <CookieBannerDynamic />
        </>
    )
}
