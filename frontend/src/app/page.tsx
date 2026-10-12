import DestinationList from "@/components/DestinationList";
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
    const response = await fetch("http://localhost:3000/destinations", {
      cache: "no-store",
    });

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
    <main className="min-h-screen bg-slate-50">
      <header className="bg-emerald-800 px-6 py-5 text-white">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-2xl font-bold">
            Sri Lanka Destination Explorer
          </h1>
          <p className="mt-1 text-sm text-emerald-100">
            Discover the beauty of Sri Lanka
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <p className="mb-4 font-semibold text-emerald-700">
          Welcome to Sri Lanka
        </p>

        <h2 className="text-4xl font-bold text-slate-900 md:text-6xl">
          Explore the Pearl of the Indian Ocean
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          Discover breathtaking landscapes, ancient heritage,
          beautiful beaches, and unforgettable destinations
          across Sri Lanka.
        </p>

        <a
          href="#destinations"
          className="mt-8 inline-block rounded-full bg-emerald-700 px-8 py-3 font-semibold text-white hover:bg-emerald-800"
        >
          Explore Destinations
        </a>
      </section>

      <section
        id="destinations"
        className="mx-auto max-w-6xl px-6 pb-20"
      >
        <h3 className="mb-6 text-3xl font-bold text-slate-900">
          Popular Destinations
        </h3>

        <DestinationList destinations={destinations} />
        
      </section>

      <footer className="bg-slate-900 px-6 py-6 text-center text-sm text-white">
        Sri Lanka Destination Explorer
      </footer>
    </main>
  );
}
