import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messages = {
    ...(await import(`../../messages/${locale}/common.json`)).default,
    ...(await import(`../../messages/${locale}/nav.json`)).default,
    ...(await import(`../../messages/${locale}/home.json`)).default,
    ...(await import(`../../messages/${locale}/careers.json`)).default,
    ...(await import(`../../messages/${locale}/about.json`)).default,
    ...(await import(`../../messages/${locale}/blog-faq.json`)).default,
    ...(await import(`../../messages/${locale}/transport.json`)).default,
    ...(await import(`../../messages/${locale}/bursa.json`)).default,
    ...(await import(`../../messages/${locale}/legal.json`)).default,
    ...(await import(`../../messages/${locale}/carriers.json`)).default,
  };

  return {
    locale,
    messages,
  };
});
