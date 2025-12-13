"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import GlobalLoader from "@/components/ui/GlobalLoader";

export default function PageTransition({
                                           children,
                                       }: {
    children: React.ReactNode;
}) {
    const [ready, setReady] = useState(false);

    // ✅ RULEAZĂ O SINGURĂ DATĂ, LA PRIMUL MOUNT
    useEffect(() => {
        const t = setTimeout(() => {
            setReady(true);
        }, 450); // poți ajusta durata dacă vrei

        return () => clearTimeout(t);
    }, []);

    // ✅ CÂT TIMP ready = false, ARĂTĂ LOADER GLOBAL
    if (!ready) return <GlobalLoader />;

    // ✅ DUPĂ CE A DISPĂRUT LOADER-UL, DOAR FADE/STAGGER PE CONȚINUT
    return (
        <motion.div
            initial="hidden"
            animate="show"
            variants={{
                hidden: {},
                show: {
                    transition: {
                        staggerChildren: 0.06,
                    },
                },
            }}
        >
            {children}
        </motion.div>
    );
}
