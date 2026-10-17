
import Link from "next/link";

type Destination = {
  _id: string;
  name: string;
  district: string;
  description: string;
  category: string;
  imageUrl?: string;
};

type Weather = {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  temperatureUnit: string;
  humidityUnit: string;
  windSpeedUnit: string;
};

const destinationImages: Record<string, string> = {
  colombo: "/images/colombo.jpg",
  kandy: "/images/kandy.jpg",
  galle: "/images/Galle.jpg",
};

export default async function DestinationDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let destination: Destination | null = null;
let weather: Weather | null = null;

try {
  const [destinationResponse, weatherResponse] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/destinations/${id}`, {
      cache: "no-store",
    }),
    fetch(
  `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/destinations/${id}/weather`,
  {
      cache: "no-store",
    }).catch(() => null),
  ]);

  if (destinationResponse.ok) {
    destination = (await destinationResponse.json()) as Destination;
  }

  if (weatherResponse?.ok) {
    weather = (await weatherResponse.json()) as Weather;
  }
} catch {
  // Show a friendly message if the destination API is unavailable.
}

if (!destination) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <span className="mb-6 text-6xl">🧭</span>
      <h1 className="font-serif text-4xl font-semibold text-[var(--brand-text)]">
        Destination unavailable
      </h1>
      <p className="mt-4 max-w-md text-[var(--brand-muted)]">
        We couldn&apos;t load this destination right now.
        Please try again shortly.
      </p>
      <Link href="/" className="brand-button mt-8">
        ← Return to Home
      </Link>
    </main>
  );
}

const imageSrc =
  destination.imageUrl ||
  destinationImages[destination.name.toLowerCase()] ||
  "";

  return (
    <main className="min-h-screen bg-background">
      {/* NAVIGATION */}
      <header className="bg-[var(--brand-primary-dark)] text-white">
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

          <Link
            href="/"
            className="rounded-full border border-white/35 px-5 py-2.5 text-sm font-medium transition hover:border-gold hover:bg-gold hover:text-[var(--brand-primary-dark)]"
          >
            ← All Destinations
          </Link>
        </nav>
      </header>

      {/* CINEMATIC DESTINATION HERO */}
      <section className="relative min-h-[480px] overflow-hidden bg-[var(--brand-primary-dark)] sm:min-h-[570px]">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={`Scenic view of ${destination.name}, Sri Lanka`}
            className={`absolute inset-0 h-full w-full object-cover ${
              destination.name.toLowerCase() === "colombo"
                ? "object-top"
                : "object-center"
            }`}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-brand to-[var(--brand-primary-dark)]" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#061f1a]/90 via-[#061f1a]/25 to-black/10" />

        <div className="relative mx-auto flex min-h-[480px] max-w-7xl flex-col justify-end px-6 py-16 text-white sm:min-h-[570px]">
          <div className="animate-fade-up">
            <span className="inline-flex rounded-full border border-white/35 bg-white/15 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-md">
              {destination.category}
            </span>

            <h1 className="mt-6 max-w-full font-serif text-[clamp(1.5rem,7vw,6rem)] font-semibold leading-tight tracking-tight [overflow-wrap:anywhere]">
              {destination.name}
            </h1>

            <p className="mt-5 flex items-center gap-2 text-lg text-white/85">
              <span className="text-gold">●</span>
              {destination.district} District, Sri Lanka
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          {/* DESTINATION STORY */}
          <div className="animate-fade-up">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand">
                Explore the Destination
              </span>
            </div>

            <h2 className="font-serif text-4xl font-semibold leading-tight text-[var(--brand-text)] sm:text-5xl">
              Discover the beauty
              <br />
              of <span className="italic text-brand">{destination.name}.</span>
            </h2>

            <p className="mt-8 max-w-2xl text-lg leading-9 text-[var(--brand-muted)]">
              {destination.description}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <span className="rounded-full border border-[var(--brand-border)] bg-white px-5 py-3 text-sm font-medium text-[var(--brand-text)]">
                📍 {destination.district}
              </span>

              <span className="rounded-full border border-[var(--brand-border)] bg-white px-5 py-3 text-sm font-medium text-[var(--brand-text)]">
                ✦ {destination.category}
              </span>

              <span className="rounded-full border border-[var(--brand-border)] bg-white px-5 py-3 text-sm font-medium text-[var(--brand-text)]">
                🇱🇰 Sri Lanka
              </span>
            </div>

            <Link href="/" className="brand-button mt-12">
              ← Explore More Destinations
            </Link>
          </div>

          {/* LIVE WEATHER CARD */}
          <aside className="premium-card h-fit">
            <div className="bg-[var(--brand-primary-dark)] p-8 text-white">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">
                    Weather Insights
                  </p>
                  <h2 className="mt-3 font-serif text-3xl font-semibold">
                    Current Weather
                  </h2>
                  <p className="mt-2 text-sm text-white/65">
                    Live conditions in {destination.name}
                  </p>
                </div>

                <span aria-hidden="true" className="text-5xl">
                  ☀️
                </span>
              </div>

              {weather && (
                <div className="mt-8 flex items-end gap-3">
                  <span className="text-6xl font-light tracking-tight">
                    {weather.temperature}
                    <span className="text-3xl">
                      {weather.temperatureUnit}
                    </span>
                  </span>
                </div>
              )}
            </div>

            <div className="p-8">
              {weather ? (
                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-4 border-b border-[var(--brand-border)] pb-5">
                    <span className="text-[var(--brand-muted)]">
                      ☁️ Conditions
                    </span>
                    <span className="text-right font-semibold text-[var(--brand-text)]">
                      {weather.condition}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 border-b border-[var(--brand-border)] pb-5">
                    <span className="text-[var(--brand-muted)]">
                      💧 Humidity
                    </span>
                    <span className="font-semibold text-[var(--brand-text)]">
                      {weather.humidity}
                      {weather.humidityUnit}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[var(--brand-muted)]">
                      🍃 Wind Speed
                    </span>
                    <span className="font-semibold text-[var(--brand-text)]">
                      {weather.windSpeed} {weather.windSpeedUnit}
                    </span>
                  </div>

                  <p className="pt-5 text-xs leading-6 text-[var(--brand-muted)]">
                    Weather data provided by Open-Meteo.
                    Conditions may change throughout the day.
                  </p>
                </div>
              ) : (
                <div className="py-5 text-center">
                  <p className="text-4xl">🌤️</p>
                  <p className="mt-4 font-semibold text-[var(--brand-text)]">
                    Weather temporarily unavailable
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--brand-muted)]">
                    Destination information is still available.
                    Please check the weather again later.
                  </p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[var(--brand-primary-dark)] px-6 py-10 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5">
          <p className="font-serif text-2xl font-semibold">
            Discover <span className="italic text-gold">Sri Lanka.</span>
          </p>

          <Link
            href="/"
            className="text-sm text-white/75 transition hover:text-gold"
          >
            ← Back to Destinations
          </Link>
        </div>
      </footer>
    </main>
  );
}
