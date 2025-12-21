'use client'

import { useEffect } from 'react'

export default function GTMDelay() {
    useEffect(() => {
        let gtmLoaded = false

        const loadGTM = () => {
                if (gtmLoaded) return
                gtmLoaded = true

                const s = document.createElement('script')
                s.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-K3P77WV'
                s.async = true
                document.head.appendChild(s)
            }

        ;['scroll', 'mousemove', 'touchstart'].forEach(event =>
            window.addEventListener(event, loadGTM, { once: true })
        )
    }, [])

    return null
}
