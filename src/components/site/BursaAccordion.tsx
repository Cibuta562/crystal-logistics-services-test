"use client";

import { useTranslations } from "next-intl";
import {
  SplitAccordionSection,
  AccordionItemData,
} from "@/components/site/SplitAccordionSection";

const CLIENT_IDS = [
  "class1",
  "class2",
  "class3",
  "class4",
  "class5",
  "class6",
  "class7",
];
const CARRIER_IDS = [
  "class1",
  "class2",
  "class3",
  "class4",
  "class5",
  "class6",
];

export default function BursaAccordions() {
  const tClient = useTranslations("Bursa.Client");
  const tCarrier = useTranslations("Bursa.Carrier");

  const buildItems = (
    t: ReturnType<typeof useTranslations>,
    ids: string[]
  ): AccordionItemData[] => {
    return ids.map((id) => {
      const listItems = (t.raw(`Accordion.items.${id}.listItems`) ??
        []) as string[];

      const shortFromList = listItems[0] ?? "";
      const shortKey = t(`Accordion.items.${id}.short`);
      const subtitle =
        typeof shortKey === "string" && shortKey.trim().length > 0
          ? shortKey
          : shortFromList;

      return {
        id,
        title: t(`Accordion.items.${id}.title`),
        subtitle,
        // păstrăm astea doar dacă vrei să le refolosești în alte componente
        listItems,
        paragraphs: t.raw(`Accordion.items.${id}.paragraphs`) as string[],
      };
    });
  };

  const clientItems = buildItems(tClient, CLIENT_IDS);
  const carrierItems = buildItems(tCarrier, CARRIER_IDS);

  return (
    <SplitAccordionSection
      id="bursa-beneficii"
      left={{
        eyebrow: tClient("eyebrow"),
        title: tClient("title"),
        intro: tClient("intro"),
        items: clientItems,
        defaultValue: "class1",
      }}
      right={{
        eyebrow: tCarrier("eyebrow"),
        title: tCarrier("title"),
        intro: tCarrier("intro"),
        items: carrierItems,
        defaultValue: "class1",
      }}
    />
  );
}
