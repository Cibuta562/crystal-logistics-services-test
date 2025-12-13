import { Check, ExternalLink } from "lucide-react";

type Point = { strong: string; text?: string };

type Props = {
  title?: string;
  points?: Point[];
  ctaHref?: string;
  ctaLabel?: string;
  // Dacă ai un clip vertical (mp4) sau un <iframe> (ex. TikTok), îl pui aici
  video?: React.ReactNode;
};

export default function WhyUsSection({
  title = "CU CE NE OCUPĂM",
  points = [
    {
      strong: "Transport rutier internațional",
      text: "(FTL/LTL, frigo, ADR, agabaritic)",
    },
    {
      strong: "Multimodal & intermodal",
      text: "(rutier–feroviar/maritim/aerian)",
    },
    {
      strong: "Contracte la termen & tracționist",
      text: "(predictibilitate + cost stabil)",
    },
    { strong: "Spot & express", text: "(reacție rapidă, rute critice)" },
    {
      strong: "Documente & formalități vamale",
      text: "",
    },
    {
      strong: "Depozitare, cross-dock, distribuție",
      text: "",
    },
    {
      strong: "Asigurări cargo & conformitate",
      text: "",
    },
    {
      strong: "Consultanță logistică & optimizare costuri",
      text: "",
    },
  ],
  ctaHref = "/cerere-oferta",
  ctaLabel = "Cere o cotație",
  video,
}: Props) {
  return (
    <section className="mx-auto w-full px-4 py-12 sm:px-6 lg:px-20">
      <div className="grid items-start gap-10 lg:grid-cols-2">
        {/* Col stânga: heading + listă + CTA */}
        <div>
          <div className="mb-6 flex items-center gap-3">
            <span className="h-6 w-1 rounded-full bg-amber-400" aria-hidden />
            <h2 className="text-2xl font-extrabold tracking-tight text-neutral-800 sm:text-3xl">
              {title}
            </h2>
          </div>

          <ul className="space-y-3 text-lg leading-8 text-neutral-700">
            {points.map((p, i) => (
              <li key={i} className="flex gap-3">
                <Check className="mt-1 h-5 w-5 shrink-0 text-amber-400" />
                <p>
                  <span className="font-semibold text-neutral-800">
                    {p.strong}
                  </span>
                  {p.text ? <span> {p.text}</span> : null}
                </p>
              </li>
            ))}
          </ul>

          {/* CTA segmentat */}
          <div className="mt-8 max-w-xl">
            <div className="flex overflow-hidden rounded-2xl border border-neutral-200 shadow-sm">
              <a
                href={ctaHref}
                className="flex-1 px-6 py-4 text-center text-base font-semibold text-neutral-800 hover:bg-neutral-50"
              >
                {ctaLabel}
              </a>
              <a
                href={ctaHref}
                aria-label={ctaLabel}
                className="grid place-items-center px-5"
                style={{ background: "#F0B90B" /* amber-ish solid */ }}
              >
                <ExternalLink className="h-5 w-5 text-neutral-900" />
              </a>
            </div>
          </div>
        </div>

        {/* Col dreapta: card video / embed */}
        <div className="mx-auto w-full max-w-sm lg:ml-auto">
          <div className="overflow-hidden rounded-3xl border border-neutral-200 shadow-lg">
            {video ?? <div className="aspect-[9/16] w-full bg-neutral-100" />}
          </div>
        </div>
      </div>
    </section>
  );
}
