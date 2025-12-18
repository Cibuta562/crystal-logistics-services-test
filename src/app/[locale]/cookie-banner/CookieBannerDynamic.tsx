"use client";

import dynamic from "next/dynamic";

const CookieBannerDynamic = dynamic(
    () => import("./CookieBanner"),
    { ssr: false }
);

export default CookieBannerDynamic;
