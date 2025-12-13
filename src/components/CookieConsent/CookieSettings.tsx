"use client";

import {useEffect, useState} from "react";
import {useTranslations} from "next-intl";
import {
    CookiePreferences,
    getPreferences,
    savePreferences,
    enableAnalytics
} from "./cookieHelpers";

export default function CookieSettings({onClose}: {onClose: () => void}) {
    const t = useTranslations("cookie");

    const [prefs, setPrefs] = useState<CookiePreferences>({
        functional: true,
        analytics: false,
        marketing: false
    });

    useEffect(() => {
        const saved = getPreferences();
        if (saved) setPrefs(saved);
    }, []);

    const save = () => {
        savePreferences(prefs);
        enableAnalytics();
        onClose();
    };

    return (
        <div
            className="
                fixed inset-0 z-[10000]
                flex items-center justify-center
                bg-black/60 backdrop-blur-sm
            "
        >
            <div
                className="
                    bg-neutral-900
                    text-white
                    p-6 rounded-xl w-full max-w-lg
                    border border-white/10
                    shadow-2xl
                "
            >

                <h2 className="text-xl font-semibold mb-4 text-white">
                    {t("settingsTitle")}
                </h2>

                {/* OPTIONS */}
                <div className="space-y-4 text-sm text-white/80">

                    {/* Functional (always on) */}
                    <div className="flex items-center justify-between">
                        <span>{t("functional")}</span>
                        <input type="checkbox" checked disabled />
                    </div>

                    {/* Analytics */}
                    <div className="flex items-center justify-between">
                        <span>{t("analytics")}</span>
                        <input
                            type="checkbox"
                            checked={prefs.analytics}
                            onChange={(e) =>
                                setPrefs((p) => ({
                                    ...p,
                                    analytics: e.target.checked
                                }))
                            }
                        />
                    </div>

                    {/* Marketing */}
                    <div className="flex items-center justify-between">
                        <span>{t("marketing")}</span>
                        <input
                            type="checkbox"
                            checked={prefs.marketing}
                            onChange={(e) =>
                                setPrefs((p) => ({
                                    ...p,
                                    marketing: e.target.checked
                                }))
                            }
                        />
                    </div>
                </div>

                {/* CTA BUTTONS */}
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="
                            px-4 py-2 rounded-md text-sm
                            bg-neutral-700 border border-white/10
                            hover:bg-neutral-600 transition
                        "
                    >
                        {t("close")}
                    </button>

                    <button
                        onClick={save}
                        className="
                            px-4 py-2 rounded-md text-sm font-semibold
                            bg-yellow-400 text-black
                            hover:bg-yellow-300 transition
                        "
                    >
                        {t("save")}
                    </button>
                </div>

            </div>
        </div>
    );
}
