import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://crystal-logistics-services-test-o77nc3ud8-cibuta562s-projects.vercel.app/";

    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
