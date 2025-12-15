import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://www.crystal-logistics-services.com/";

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
