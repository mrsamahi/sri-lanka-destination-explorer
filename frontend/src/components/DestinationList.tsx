
"use client";

import Link from "next/link";
import { useState } from "react";

type Destination = {
  _id: string;
  name: string;
  district: string;
  description: string;
  category: string;
  imageUrl?: string;
};

export default function DestinationList({
  destinations,
}: {
  destinations: Destination[];
}) {
  const [search, setSearch] = useState("");

  const filteredDestinations = destinations.filter((destination) =>
    [
      destination.name,
      destination.district,
      destination.category,
    ]
      .some((value) =>
        value.toLowerCase().includes(search.toLowerCase())
      )
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name, district, or category..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="mb-8 w-full rounded-xl border border-slate-300 bg-white px-5 py-4 text-slate-900 outline-none focus:border-emerald-600"
      />

      {filteredDestinations.length === 0 ? (
        <p className="text-slate-600">
          No matching destinations found.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDestinations.map((destination) => (
            <article
              key={destination._id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" 
            >
                
        <div className="mb-5 overflow-hidden rounded-xl">
        <img
            
            src={
            destination.name.toLowerCase() === "sigiriya"
                ? "/images/sigiriya.jpg"
                : destination.name.toLowerCase() === "ella"
                ? "/images/ella.jpg"
                : destination.name.toLowerCase() === "galle fort"
                    ? "/images/galle-fort.jpg"
                    : "/images/sigiriya.jpg"
            }

            alt={`Photo of ${destination.name}`}
            className="h-48 w-full object-cover"
        />
        </div>

              <span className="text-sm font-semibold text-emerald-700">
                {destination.category}
              </span>

              <h4 className="mt-2 text-2xl font-bold text-slate-900">
                {destination.name}
              </h4>

              <p className="mt-1 text-sm text-slate-500">
                {destination.district} District
              </p>

              <p className="mt-4 text-slate-600">
                {destination.description}
              </p>
              
            <Link
            href={`/destinations/${destination._id}`}
            className="mt-5 inline-block rounded-lg bg-emerald-700 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
            >
            View Details →
            </Link>

            </article>
          ))}
        </div>
      )}
    </div>
  );
}
