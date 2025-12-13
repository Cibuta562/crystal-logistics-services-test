// app/[locale]/transport-autoturisme/page.tsx
import Image from "next/image";
import Link from "next/link";
import {
  Car,
  ShieldCheck,
  Globe2,
  ClipboardList,
  Truck,
  Phone,
  Clock3,
  ShoppingBag,
  Boxes,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

function SectionContainer({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`w-full py-16 md:py-20 lg:py-24 ${className}`}>
      <div className="mx-auto w-full max-w-[1400px] px-4 md:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  align = "left",
  className = "",
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <header
      className={`mb-10 md:mb-12 ${
        align === "center" ? "text-center" : ""
      } ${className}`}
    >
      {eyebrow && (
        <div
          className={`mb-4 h-[3px] w-16 rounded-full bg-crystal-yellow ${
            align === "center" ? "mx-auto" : ""
          }`}
        />
      )}
      <h2 className="text-balance text-2xl font-semibold leading-tight text-slate-900 md:text-3xl lg:text-[32px]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-3xl text-balance text-sm text-slate-500 md:text-base leading-relaxed mx-auto">
          {description}
        </p>
      )}
    </header>
  );
}

function WhyWorkWithUsStrip() {
  const items = [
    {
      icon: Phone,
      label: "Asistență transport",
      sub: "24/7",
    },
    {
      icon: Clock3,
      label: "Răspundem la toate cererile",
      sub: "în cel mult 90 de minute",
    },
    {
      icon: Truck,
      label: "Transportul este",
      sub: "asigurat",
    },
    {
      icon: ShoppingBag,
      label: "Preț corect",
      sub: "al serviciilor",
    },
    {
      icon: Boxes,
      label: "Pachet complet",
      sub: "de servicii",
    },
  ];

  return (
    <SectionContainer className="bg-white border-t border-slate-100">
      <SectionHeader
        eyebrow=""
        title="De ce să lucrezi cu noi?"
        align="left"
        className="mb-8"
      />
      <div className="grid gap-10 md:grid-cols-5">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center text-center gap-4"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-crystal-yellow">
              <item.icon className="h-8 w-8 stroke-[1.6]" />
            </div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-900">
              {item.label}
              <br />
              {item.sub}
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}

export default function TransportAutoturismePage() {
  return (
    <main className="bg-white text-slate-900">
      {/* HERO – TEXT + IMAGINE */}
      <SectionContainer>
        <div className="grid gap-10 lg:grid-cols-[1.1fr,1.1fr] items-center">
          <div>
            <div className="mb-4 h-[3px] w-16 rounded-full bg-crystal-yellow" />
            <h1 className="mb-4 text-balance text-3xl font-semibold leading-tight md:text-4xl lg:text-[38px]">
              Transport auto sigur cu Crystal Logistics Services
            </h1>
            <p className="mb-4 text-base leading-relaxed text-slate-600">
              La Crystal Logistics Services, oferim soluții de transport auto pe
              platformă la standarde internaționale. Fiecare vehicul pe care îl
              transportăm este tratat cu grijă maximă, cu proceduri clare de
              încărcare, fixare și descărcare.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              Echipele noastre specializate se ocupă de fiecare etapă: de la
              planificarea traseului până la livrarea în siguranță la
              destinație, astfel încât autoturismele tale să ajungă în perfectă
              stare.
            </p>
          </div>

          <div className="overflow-hidden rounded-[24px] shadow-sm">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src="/images/transport-autoturisme-hero.jpg"
                alt="Transport autoturisme pe platformă"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* SECȚIUNE ALBASTRĂ – CARDS CU HOVER */}
      <SectionContainer className="bg-crystal-navy text-white">
        <SectionHeader
          eyebrow="Transport autoturisme"
          title="Caracteristicile serviciilor noastre de transport auto"
          description="Înțelegem că fiecare vehicul are particularități, de aceea adaptăm platformele, sistemele de prindere și traseele pentru a oferi un transport auto sigur, eficient și previzibil."
          align="center"
          className="text-white"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Car,
              title: "Platforme adaptate",
              short:
                "Platforme dedicate pentru vehicule de serie, de lux sau colecție.",
              long: "Folosim platforme moderne, adaptate pentru vehicule cu garda joasă, autoturisme de lux sau flote mixte. Fiecare platformă este echipată cu rampe și sisteme de fixare optimizate pentru siguranță și acces ușor.",
            },
            {
              icon: ShieldCheck,
              title: "Siguranță înainte de toate",
              short:
                "Proceduri stricte de fixare, verificări și asigurare completă.",
              long: "Implementăm proceduri standardizate de fixare a vehiculului, folosind chingi și sisteme de ancorare certificate. Toate cursele sunt acoperite de asigurare, iar vehiculele sunt verificate suplimentar înainte de plecare.",
            },
            {
              icon: Globe2,
              title: "Acoperire geografică extinsă",
              short:
                "Transport intern și internațional cu monitorizare permanentă.",
              long: "Oferim transport de autoturisme atât la nivel național, cât și internațional, cu rute optimizate și timp de tranzit clari. Comunicăm transparent statusul transportului pe toată durata acestuia.",
            },
          ].map((item) => (
            <HoverCard key={item.title} openDelay={80} closeDelay={80}>
              <HoverCardTrigger asChild>
                <Card className="group flex h-full cursor-pointer flex-col border border-slate-800/40 bg-slate-900/40 px-6 py-7 transition hover:-translate-y-1 hover:border-crystal-yellow/60 hover:bg-slate-900/70">
                  <CardContent className="flex flex-col gap-4 p-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-crystal-yellow/10 text-crystal-yellow">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-200">
                      {item.short}
                    </p>
                    <span className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-crystal-yellow/80">
                      Află mai multe
                    </span>
                  </CardContent>
                </Card>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 border-crystal-yellow/40 bg-slate-950 text-slate-50">
                <p className="text-sm leading-relaxed">{item.long}</p>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </SectionContainer>

      {/* SECȚIUNE ALBASTRĂ – CARACTERISTICI EXTINSE */}
      <SectionContainer className="bg-crystal-navy text-white">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeader
              eyebrow=""
              title="Platforme deschise sau acoperite"
              description="Alegem împreună tipul de platformă potrivit: deschisă – pentru vizibilitate și acces rapid, sau acoperită – pentru protecție suplimentară a vehiculelor sensibile."
              align="left"
              className="text-white"
            />
            <ul className="space-y-3 text-sm leading-relaxed text-slate-100">
              <li className="flex gap-3">
                <span className="mt-[6px] h-[6px] w-[6px] rounded-full bg-crystal-yellow" />
                <span>
                  <strong>Platforme deschise:</strong> ideale pentru transportul
                  flotelor, mașinilor rulate sau autoturismelor standard.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-[6px] h-[6px] w-[6px] rounded-full bg-crystal-yellow" />
                <span>
                  <strong>Platforme acoperite:</strong> recomandate pentru
                  vehicule premium, colecții sau mașini cu valoare ridicată.
                </span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-10">
            <div>
              <SectionHeader
                eyebrow=""
                title="Capacitate variată"
                description="De la o singură mașină până la flote întregi – dimensionăm soluția în funcție de volum și destinație."
                align="left"
                className="text-white mb-4"
              />
              <ul className="space-y-3 text-sm leading-relaxed text-slate-100">
                <li className="flex gap-3">
                  <span className="mt-[6px] h-[6px] w-[6px] rounded-full bg-crystal-yellow" />
                  <span>
                    Platforme cu o singură poziție, perfecte pentru vehicule
                    speciale sau livrări dedicate.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-[6px] h-[6px] w-[6px] rounded-full bg-crystal-yellow" />
                  <span>
                    Platforme cu 6–8 poziții pentru transport de flote sau
                    achiziții multiple.
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex items-start gap-4">
              <ClipboardList className="mt-1 h-8 w-8 text-crystal-yellow" />
              <div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  Asigurare completă și consultanță
                </h3>
                <p className="text-sm leading-relaxed text-slate-100">
                  Toate transporturile de autoturisme beneficiază de acoperire
                  de asigurare, iar echipa noastră te consiliază în privința
                  documentelor, a pregătirii vehiculului și a condițiilor
                  specifice de încărcare/descărcare.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* SECȚIUNE DUBLĂ – PARTENER & REZERVARE */}
      <SectionContainer>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader
              eyebrow=""
              title="Un partener de încredere în transportul auto"
              description={undefined}
            />
            <p className="text-base leading-relaxed text-slate-600">
              Ani de experiență în transportul auto pe platformă ne permit să
              gestionăm cu ușurință proiecte simple sau complexe: de la
              transportul unei singure mașini până la relocarea unei flote
              întregi. Punem accent pe comunicare clară și pe respectarea
              termenelor agreate.
            </p>
          </div>

          <div>
            <SectionHeader
              eyebrow=""
              title="Rezervă transportul auto acum"
              description={undefined}
            />
            <p className="mb-5 text-base leading-relaxed text-slate-600">
              Dacă ai nevoie de un transport rapid sau planifici din timp un
              transport auto internațional, echipa Crystal Logistics Services
              îți poate oferi o ofertă personalizată, adaptată rutelor și
              volumelor tale.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-crystal-yellow px-10 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-900 transition hover:bg-crystal-yellow hover:text-crystal-navy"
            >
              Contactează-ne
            </Link>
          </div>
        </div>
      </SectionContainer>

      {/* CTA ALBASTRU */}
      <SectionContainer className="bg-crystal-navy text-white">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-semibold md:text-3xl">
              Contactează-ne astăzi pentru o ofertă de transport autoturisme
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-200 md:text-base">
              Spune-ne de unde, până unde și ce tip de vehicule dorești să
              transporți, iar noi îți vom pregăti rapid o propunere completă de
              transport auto pe platformă.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-crystal-yellow px-10 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-crystal-yellow hover:text-crystal-navy"
          >
            Contactați-ne
          </Link>
        </div>
      </SectionContainer>

      {/* STRIP – DE CE SĂ LUCREZI CU NOI */}
      <WhyWorkWithUsStrip />
    </main>
  );
}
