
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

  
let weather: Weather | null = null;

try {
  const weatherResponse = await fetch(
    `http://localhost:3000/destinations/${id}/weather`,
    { cache: "no-store" }
  );

  if (weatherResponse.ok) {
    weather = (await weatherResponse.json()) as Weather;
  }
} catch {
  // The destination page should still work if weather is unavailable.
}


  

  return (
    <main className="min-h-screen bg-emerald-50 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="font-medium text-emerald-700">
          ← Back to Destinations
        </Link>

        <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-lg">
          
        {destination.imageUrl ? (
        <img
            src={destination.imageUrl}
            alt={`Photo of ${destination.name}`}
            className="h-80 w-full object-cover"
        />
        ) : (
        <div className="flex h-80 items-center justify-center bg-emerald-100 text-3xl font-bold text-emerald-800">
            {destination.name}
        </div>
        )}


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

            <section className="mt-8 rounded-xl bg-emerald-50 p-6">
            <h2 className="text-2xl font-bold text-gray-900">
                Current Weather
            </h2>

            {weather ? (
                <div className="mt-4 space-y-3 text-gray-700">
                <p>
                    🌡️ Temperature: {weather.temperature}
                    {weather.temperatureUnit}
                </p>

                <p>
                    ☁️ Condition: {weather.condition}
                </p>

                <p>
                    💧 Humidity: {weather.humidity}
                    {weather.humidityUnit}
                </p>

                <p>
                    💨 Wind Speed: {weather.windSpeed}{" "}
                    {weather.windSpeedUnit}
                </p>
                </div>
            ) : (
                <p className="mt-4 text-gray-600">
                Weather information is temporarily unavailable.
                </p>
            )}
            </section>


          </div>
        </div>
      </div>
    </main>
  );
}
