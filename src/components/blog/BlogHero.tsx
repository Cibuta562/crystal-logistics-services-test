"use client";
// import next-intl
import { useTranslations } from "next-intl";

// HERO SECTION
import PageHero from "@/components/site/PageHero";

export default function BlogHero() {
  const t = useTranslations("Blog");
  return (
    <>
      <PageHero
        eyebrow={t("Header.section")}
        title={t("Header.title")}
        imageSrc="/images/blog_banner.jpg"
        imageAlt={t("Header.alt")}
        imageClassName="object-cover object-center"
      />
    </>
  );
}
