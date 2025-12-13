"use client";

import Link from "next/link";

const SECTION_CONTAINER = "mx-auto w-full max-w-[1400px] px-4 sm:px-8 lg:px-12";

interface ContactCtaSectionProps {
  id?: string;
  title?: string; // ✅ un singur titlu
  messages: string[]; // ✅ mai multe paragrafe
  buttonLabel: string;
  href?: string;
  sectionClassName?: string;
}

export default function ContactCtaSection({
  id,
  title,
  messages,
  buttonLabel,
  href = "/contact",
  sectionClassName = "bg-white text-neutral-900",
}: ContactCtaSectionProps) {
  return (
    <section id={id} className={sectionClassName}>
      <div className={`${SECTION_CONTAINER} py-10`}>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          {/* === TEXT === */}
          <div className="max-w-5xl space-y-3">
            {title && (
              <p className="text-xl font-semibold leading-tight md:text-2xl">
                {title}
              </p>
            )}

            {messages.map((paragraph, index) => (
              <p key={index} className="text-md font-medium leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* === CTA BUTTON (same animation as navbar) === */}
          <Link
            href={href}
            className="relative overflow-hidden group inline-flex items-center justify-center
              border border-[#FFD500] rounded-full
              px-10 py-2.5 text-[15px] font-semibold
              bg-[#FFD500] text-black
              transition-all duration-300 whitespace-nowrap"
          >
            <span
              className="absolute inset-0 bg-white origin-left scale-x-0 group-hover:scale-x-100
                transition-transform duration-500 ease-out"
            ></span>
            <span className="relative z-10 flex items-center gap-2 group-hover:text-black transition-colors duration-300">
              {buttonLabel}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
