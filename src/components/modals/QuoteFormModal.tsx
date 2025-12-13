"use client";

import { useLocale } from "next-intl";
import { X } from "lucide-react";
import { motion as m } from "framer-motion";

export default function QuoteFormModal({
                                           isOpen,
                                           onClose,
                                       }: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const locale = useLocale();

    if (!isOpen) return null;

    const mondayFormUrl =
        locale === "ro"
            ? "https://forms.monday.com/forms/embed/d822b77b6d1ae8edf0cc2c81a9989ce9?r=euc1"
            : "https://forms.monday.com/forms/embed/0dd269a68887c5ca2de17dd4dead0648?r=euc1";

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <m.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative bg-neutral-900 rounded-2xl shadow-2xl w-[90%] max-w-3xl overflow-hidden border border-white/10"
            >
                {/* CLOSE BUTTON */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20"
                >
                    <X className="w-6 h-6 text-white" />
                </button>

                {/* MONDAY FORM */}
                <iframe
                    src={mondayFormUrl}
                    className="w-full h-[80vh]"
                    style={{ border: "0" }}
                ></iframe>
            </m.div>
        </div>
    );
}
