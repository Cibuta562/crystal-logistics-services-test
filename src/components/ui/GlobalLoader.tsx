"use client";

import { motion } from "framer-motion";

export default function GlobalLoader() {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-neutral-900">
            <div className="relative w-[280px] h-[120px]">

                {/* DRUM */}
                <div className="absolute bottom-6 left-0 w-full h-[2px] overflow-hidden">
                    <motion.div
                        className="w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{
                            duration: 1.2,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                    />
                </div>

                {/* CAMION */}
                <motion.div
                    className="absolute bottom-8 left-0 flex items-end"
                    animate={{ x: ["-20%", "120%"] }}
                    transition={{
                        duration: 1.6,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                >
                    {/* CABINĂ */}
                    <div className="w-16 h-10 bg-[#FFD500] rounded-sm relative">
                        <div className="absolute left-2 top-2 w-3 h-3 bg-black/40 rounded-sm" />
                    </div>

                    {/* REMORCĂ */}
                    <div className="w-24 h-8 bg-[#FFD500] ml-1 rounded-sm" />

                    {/* ROȚI */}
                    <div className="absolute -bottom-3 left-3 flex gap-14">
                        <Wheel />
                        <Wheel />
                    </div>
                </motion.div>

                {/* TEXT */}
                <motion.p
                    className="absolute -bottom-10 w-full text-center text-sm text-white/70 tracking-wide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    Transport in motion…
                </motion.p>
            </div>
        </div>
    );
}

/* ============================
   WHEEL COMPONENT
============================= */
function Wheel() {
    return (
        <motion.div
            className="w-5 h-5 rounded-full border-2 border-neutral-800 bg-black"
            animate={{ rotate: 360 }}
            transition={{
                duration: 0.4,
                repeat: Infinity,
                ease: "linear",
            }}
        />
    );
}
