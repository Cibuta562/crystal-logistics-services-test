"use client";

import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const SECTION_CONTAINER =
    "mx-auto w-full max-w-[1400px] px-4 sm:px-8 lg:px-12";

export type AccordionItemData = {
  id: string;
  title: string;
  subtitle?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  paragraphs?: string[];
  listItems?: string[];
  content?: React.ReactNode;
  groupParagraphsWithListItems?: boolean;
};

interface AccordionSectionProps {
  id?: string;
  items: AccordionItemData[];
  sectionTitle?: string;
  sectionIntro?: string;
  defaultValue?: string;
  className?: string;
}

export default function AccordionSection({
                                           id,
                                           items,
                                           sectionTitle,
                                           sectionIntro,
                                           defaultValue,
                                           className,
                                         }: AccordionSectionProps) {
  return (
      <section id={id} className={cn("bg-white", className)}>
        <div className={`${SECTION_CONTAINER} py-20`}>
          {sectionTitle && (
              <div className="mb-12">
                <div className="mb-4 h-[3px] w-16 bg-[#FFD500]" />
                <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
                  {sectionTitle}
                </h2>
                {sectionIntro && (
                    <p className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-700">
                      {sectionIntro}
                    </p>
                )}
              </div>
          )}

          <Accordion
              type="single"
              collapsible
              defaultValue={defaultValue}
              className="space-y-4"
          >
            {items.map((item) => {
              const Icon = item.icon;

              const hasPairing =
                  item.groupParagraphsWithListItems &&
                  item.paragraphs &&
                  item.listItems &&
                  item.paragraphs.length === item.listItems.length &&
                  item.paragraphs.length > 0;

              return (
                  <AccordionItem
                      key={item.id}
                      value={item.id}
                      className={cn(
                          "rounded-xl border border-neutral-200 bg-white shadow-sm",
                          "transition-all duration-200",
                          "data-[state=open]:border-[#FFD500]"
                      )}
                  >
                    <AccordionTrigger
                        className={cn(
                            "flex w-full items-center justify-between gap-4 px-6 py-5 text-left",
                            "no-underline hover:no-underline",
                            "rounded-t-xl",
                            "transition-colors",
                            "data-[state=open]:bg-[#FFD500] data-[state=open]:text-black"
                        )}
                    >
                      <div className="flex items-center gap-4">
                        {Icon && (
                            <div
                                className={cn(
                                    "flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-700",
                                    "transition-all",
                                    "data-[state=open]:bg-white/20 data-[state=open]:text-black"
                                )}
                            >
                              <Icon className="h-5 w-5" />
                            </div>
                        )}

                        <div>
                          <p className="text-base font-semibold tracking-tight">
                            {item.title}
                          </p>
                          {item.subtitle && (
                              <p className="mt-1 text-base text-neutral-600">
                                {item.subtitle}
                              </p>
                          )}
                        </div>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="border-t border-neutral-200 px-6 pb-6 pt-5 text-base leading-relaxed text-neutral-700">
                      {item.content ? (
                          item.content
                      ) : hasPairing ? (
                          <div className="space-y-4">
                            {item.paragraphs!.map((p, idx) => (
                                <div key={idx}>
                                  <p className="font-semibold text-neutral-900">{p}</p>

                                  {item.listItems?.[idx] && (
                                      <ul className="mt-2 ml-5 list-disc marker:text-[#FFD500]">
                                        <li>
                                          <em>{item.listItems[idx]}</em>
                                        </li>
                                      </ul>
                                  )}
                                </div>
                            ))}
                          </div>
                      ) : (
                          <div className="space-y-4">
                            {item.paragraphs?.map((p, idx) => (
                                <p key={idx}>{p}</p>
                            ))}

                            {item.listItems && item.listItems.length > 0 && (
                                <ul className="ml-5 list-disc space-y-1 marker:text-[#FFD500]">
                                  {item.listItems.map((li, idx) => (
                                      <li key={idx}>{li}</li>
                                  ))}
                                </ul>
                            )}
                          </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </section>
  );
}
