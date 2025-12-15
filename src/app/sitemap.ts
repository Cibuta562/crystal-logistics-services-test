import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getAllBlogSlugs } from "@/lib/blogServer";

const BASE_URL =
    "https://crystal-logistics-services-test-o77nc3ud8-cibuta562s-projects.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const entries: MetadataRoute.Sitemap = [];
    const { locales, pathnames } = routing;

    // 🔹 PAGINI STATICE
    for (const locale of locales) {
        for (const [internalPath, localizedPaths] of Object.entries(pathnames)) {
            if (internalPath.includes("admin")) continue;
            if (internalPath.includes("[slug]")) continue;

            if (internalPath === "/") {
                entries.push({
                    url: `${BASE_URL}/${locale}`,
                    changeFrequency: "weekly",
                    priority: 1,
                });
                continue;
            }

            const path =
                typeof localizedPaths === "string"
                    ? localizedPaths
                    : locale === "ro"
                        ? internalPath
                        : localizedPaths[locale];

            if (!path) continue;

            entries.push({
                url: `${BASE_URL}/${locale}${path}`,
                changeFrequency: "monthly",
                priority: 0.8,
            });
        }
    }

    // 🔹 BLOG POSTS (CORECT 🔥)
    for (const locale of locales) {
        const posts = await getAllBlogSlugs(locale);

        for (const post of posts) {
            entries.push({
                url: `${BASE_URL}/${locale}/blog/${post.slug}`,
                lastModified: post.updatedAt,
                changeFrequency: "weekly",
                priority: 0.9,
            });
        }
    }

    return entries;
}