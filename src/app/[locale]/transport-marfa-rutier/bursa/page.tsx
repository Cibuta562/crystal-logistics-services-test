import SlantedHeader from "@/components/site/PageHero";
import Footer from "@/components/site/Footer";

export default function RoadExchangePage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <SlantedHeader
        eyebrow="CAPACITATE"
        title="BURSA DE TRANSPORT RUTIER"
        bgClassName="bg-amber-400"
        // angleColorClassName="bg-neutral-800"
        desktopMinHeightClassName="min-h-[33vh]"
      />

      <section className="mx-auto max-w-6xl px-4 py-12 space-y-8">
        <header className="space-y-3">
          <p className="text-sm font-semibold tracking-wide text-amber-600">
            MATCHING RAPID MARFĂ & CAMIOANE
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Bursa noastră de transport conectează încărcături și capacitate
          </h1>
          <p className="max-w-2xl text-neutral-600">
            Gestionăm zilnic cereri și oferte de transport printr-o rețea
            extinsă de transportatori parteneri, astfel încât să găsim soluția
            optimă pentru marfa ta.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4 text-sm text-neutral-700">
            <h2 className="text-lg font-semibold">
              Pentru clienți / expeditori
            </h2>
            <p>
              Ai nevoie de camion rapid pentru o cursă specifică sau pentru
              volum recurent? Îți identificăm opțiunile disponibile și îți
              oferim transparență în preț și timp de tranzit.
            </p>
            <ul className="space-y-1">
              <li>• Soluții pentru spot și contract</li>
              <li>• Evaluare parteneri și performanță</li>
              <li>• Status proactiv în caz de excepții</li>
            </ul>
          </div>

          <div className="space-y-4 text-sm text-neutral-700">
            <h2 className="text-lg font-semibold">Pentru transportatori</h2>
            <p>
              Dacă ai camioane disponibile, te ajutăm să le menții încărcate
              prin curse potrivite profilului tău.
            </p>
            <ul className="space-y-1">
              <li>• Acces la cereri variate de transport</li>
              <li>• Colaborări pe termen lung</li>
              <li>• Comunicare clară și termene corecte</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
