
import Link from "next/link";
import DestinationList from "@/components/DestinationList";
import NavigationMenu from "@/components/NavigationMenu";
export const dynamic = "force-dynamic";

type Destination = {
  _id: string;
  name: string;
  district: string;
  description: string;
  category: string;
  imageUrl?: string;
};

async function getDestinations(): Promise<Destination[]> {
  try {
    const response = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/destinations`,
  {
    cache: "no-store",
  }
);

    if (!response.ok) {
      throw new Error("Failed to fetch destinations");
    }

    return response.json();
  } catch (error) {
    console.error("Error loading destinations:", error);
    return [];
  }
}

export default async function Home() {
  const destinations = await getDestinations();

  return (
    <main className="min-h-screen bg-background">
      {/* NAVIGATION */}
      <header className="relative z-20 border-b border-white/15 bg-[var(--brand-primary-dark)] text-white">
        <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/70 text-2xl">
              ✺
            </span>

            <span className="flex flex-col">
              <span className="text-lg font-bold tracking-wide">
                CEYLON
              </span>
              <span className="text-[10px] uppercase tracking-[0.28em] text-white/70">
                Destination Explorer
              </span>
            </span>
          </Link>

          <NavigationMenu />
        </nav>
      </header>

      {/* CINEMATIC HERO */}
      <section className="relative flex min-h-[660px] items-center overflow-hidden bg-[var(--brand-primary-dark)]">
        <div
          className="absolute inset-0 bg-cover bg-top"
          style={{
            backgroundImage: "url('/images/colombo.jpg')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#062b24]/95 via-[#062b24]/75 to-[#062b24]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#062b24]/55 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 text-white">
          <div className="animate-fade-up max-w-3xl">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="text-xs font-bold uppercase tracking-[0.32em] text-gold">
                Discover Sri Lanka
              </span>
            </div>

            <h1 className="max-w-3xl font-serif text-5xl leading-[1.1] font-medium tracking-tight sm:text-6xl lg:text-7xl">
              An island of
              <br />
              <span className="italic text-[#f2d394]">
                extraordinary
              </span>
              <br />
              experiences.
            </h1>

            <p className="mt-8 max-w-xl text-base leading-8 text-white/85 sm:text-lg">
              From timeless heritage cities to tropical coastlines,
              discover the beauty, culture, and unforgettable
              destinations of Sri Lanka.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a
                href="#destinations"
                className="inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 font-bold text-[#18302a] shadow-xl shadow-black/15 transition duration-300 hover:-translate-y-1 hover:bg-[#e9be70]"
              >
                Explore Destinations
                <span aria-hidden="true">↗</span>
              </a>

              <span className="text-sm text-white/75">
                Your journey begins here
              </span>
            </div>
          </div>
        </div>

      
      </section>

      {/* FEATURE STRIP */}
      <section className="relative z-10 mx-auto -mt-9 max-w-6xl px-6">
        <div className="grid gap-4 rounded-3xl border border-[var(--brand-border)] bg-white p-7 shadow-xl shadow-emerald-950/10 sm:grid-cols-3 sm:gap-0">
          <div className="flex items-center gap-4 px-4 py-2">
            <span className="text-3xl">🌿</span>
            <div>
              <p className="font-bold text-[var(--brand-text)]">
                Natural Beauty
              </p>
              <p className="mt-1 text-sm text-[var(--brand-muted)]">
                Landscapes worth exploring
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-[var(--brand-border)] px-4 py-2 sm:border-x">
            <span className="text-3xl">🏛️</span>
            <div>
              <p className="font-bold text-[var(--brand-text)]">
                Rich Heritage
              </p>
              <p className="mt-1 text-sm text-[var(--brand-muted)]">
                Stories across centuries
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 px-4 py-2">
            <span className="text-3xl">☀️</span>
            <div>
              <p className="font-bold text-[var(--brand-text)]">
                Live Weather
              </p>
              <p className="mt-1 text-sm text-[var(--brand-muted)]">
                Plan with current conditions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section
        id="destinations"
        className="mx-auto max-w-7xl scroll-mt-12 px-6 py-24"
      >
        <div className="mb-12 max-w-3xl">
          

          <h2 className="font-serif text-4xl leading-tight font-semibold text-[var(--brand-text)] sm:text-5xl">
            Places that stay
            <span className="italic text-brand"> with you.</span>
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--brand-muted)]">
            Explore Sri Lanka&apos;s captivating destinations.
            Find your next adventure, discover local highlights,
            and check live weather before you go.
          </p>
        </div>

        <DestinationList destinations={destinations} />
      </section>

      {/* FOOTER */}
      <footer className="bg-[var(--brand-primary-dark)] px-6 py-14 text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 border-b border-white/15 pb-10 md:flex-row">
          <div>
            <p className="font-serif text-3xl font-semibold">
              Discover <span className="italic text-gold">Sri Lanka.</span>
            </p>
            <p className="mt-3 max-w-sm text-sm leading-7 text-white/65">
              Explore the island&apos;s extraordinary destinations,
              heritage, and natural beauty.
            </p>
          </div>

          
        </div>

        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3 pt-7 text-xs text-white/55">
          <p>© 2026 Sri Lanka Destination Explorer</p>
          <p>Made to celebrate the Pearl of the Indian Ocean</p>
        </div>
      </footer>
    </main>
  );
}
