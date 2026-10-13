
import Link from "next/link";

type Destination = {
  _id: string;
  name: string;
  district: string;
  description: string;
  category: string;
};

export default async function DestinationDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await fetch(
    `http://localhost:3000/destinations/${id}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-3xl font-bold">
          Destination not found
        </h1>
        <Link href="/" className="mt-6 inline-block text-emerald-700">
          ← Back to Destinations
        </Link>
      </main>
    );
  }

  const destination: Destination = await response.json();

  const image =
    destination.name.toLowerCase() === "sigiriya"
      ? "/images/sigiriya.jpg"
      : destination.name.toLowerCase() === "ella"
        ? "/images/ella.jpg"
        : destination.name.toLowerCase() === "galle fort"
          ? "/images/galle-fort.jpg"
          : "/images/sigiriya.jpg";

  return (
    <main className="min-h-screen bg-emerald-50 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="font-medium text-emerald-700">
          ← Back to Destinations
        </Link>

        <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-lg">
          <img
            src={image}
            alt={`Photo of ${destination.name}`}
            className="h-80 w-full object-cover"
          />

          <div className="p-8">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-800">
              {destination.category}
            </span>

            <h1 className="mt-5 text-4xl font-bold text-gray-900">
              {destination.name}
            </h1>

            <p className="mt-3 text-gray-600">
              📍 {destination.district} District, Sri Lanka
            </p>

            <p className="mt-6 text-lg leading-8 text-gray-700">
              {destination.description}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
