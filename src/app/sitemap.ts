import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const BASE_URL = "https://crystal-logistics-services-test-o77nc3ud8-cibuta562s-projects.vercel.app/";

export default function sitemap(): MetadataRoute.Sitemap {
    const entries: MetadataRoute.Sitemap = [];

    const locales = routing.locales;
    const pathnames = routing.pathnames;

    for (const locale of locales) {
        for (const [internalPath, localizedPaths] of Object.entries(pathnames)) {
            // HOMEPAGE
            if (internalPath === "/") {
                entries.push({
                    url: `${BASE_URL}/${locale}`,
                    lastModified: new Date(),
                    changeFrequency: "weekly",
                    priority: 1,
                });
                continue;
            }

            // PATH IDENTIC ÎN TOATE LIMBILE
            if (typeof localizedPaths === "string") {
                entries.push({
                    url: `${BASE_URL}/${locale}${localizedPaths}`,
                    lastModified: new Date(),
                    changeFrequency: "monthly",
                    priority: 0.8,
                });
                continue;
            }

            // PATH DIFERIT PE LIMBI
            if (locale === "ro") {
                // RO = internalPath
                entries.push({
                    url: `${BASE_URL}/${locale}${internalPath}`,
                    lastModified: new Date(),
                    changeFrequency: "monthly",
                    priority: 0.8,
                });
                continue;
            }

            const translatedPath = localizedPaths[locale as keyof typeof localizedPaths];
            if (!translatedPath) continue;

            entries.push({
                url: `${BASE_URL}/${locale}${translatedPath}`,
                lastModified: new Date(),
                changeFrequency: "monthly",
                priority: 0.8,
            });
        }
    }

    return entries;
}
