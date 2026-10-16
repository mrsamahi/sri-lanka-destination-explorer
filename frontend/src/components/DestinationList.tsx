
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

const destinationImages: Record<string, string> = {
  colombo: "/images/colombo.jpg",
  kandy: "/images/kandy.jpg",
  galle: "/images/Galle.jpg",
};

export default function DestinationList({
  destinations,
}: {
  destinations: Destination[];
}) {
  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
const destinationsPerPage = 6;

  const filteredDestinations = destinations.filter((destination) => {
    const searchText = search.trim().toLowerCase();

    const matchesSearch = [
  destination.name,
  destination.district,
  destination.category,
].some((value) =>
  value.toLowerCase().includes(searchText)
);

const matchesCategory =
  selectedCategory === "All" ||
  destination.category.toLowerCase() ===
    selectedCategory.toLowerCase();

return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(
  filteredDestinations.length / destinationsPerPage
);

const paginatedDestinations = filteredDestinations.slice(
  (currentPage - 1) * destinationsPerPage,
  currentPage * destinationsPerPage
);

  return (
    <div>
      {/* SEARCH BAR */}
      <div className="relative mb-12">
        <div className="pointer-events-none absolute top-10 left-7 flex -translate-y-1/2 items-center justify-center text-3xl text-[var(--brand-primary)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </div>

        <input
          type="search"
          placeholder="Search destinations..."
          aria-label="Search destinations"
          value={search}
          onChange={(event) => {
  setSearch(event.target.value);
  setCurrentPage(1);
}}
          className="h-20 w-full rounded-2xl border border-[var(--brand-border)] bg-white pr-6 pl-20 text-lg text-[var(--brand-text)] shadow-md outline-none transition duration-300 placeholder:text-[var(--brand-muted)] focus:border-brand focus:shadow-xl focus:shadow-emerald-950/10"
        />

      </div>

      {/* CATEGORY FILTERS */}
<div className="mb-10 flex flex-wrap gap-3">
  {["All", ...new Set(destinations.map((d) => d.category))].map(
    (category) => (
      <button
        key={category}
        type="button"
        onClick={() => {
  setSelectedCategory(category);
  setCurrentPage(1);
}}
        aria-pressed={selectedCategory === category}
        className={`min-h-11 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 active:scale-95 ${
          selectedCategory === category
            ? "bg-brand text-white shadow-md"
            : "border border-[var(--brand-border)] bg-white text-[var(--brand-text)] hover:border-brand hover:text-brand"
        }`}
      >
        {category}
      </button>
    )
  )}
</div>

      {/* EMPTY SEARCH RESULT */}
      {filteredDestinations.length === 0 ? (
        <div className="rounded-3xl border border-[var(--brand-border)] bg-white px-8 py-16 text-center shadow-sm">
          <div className="mb-4 text-5xl">🧭</div>

          <h3 className="font-serif text-2xl font-semibold text-[var(--brand-text)]">
            No destinations found
          </h3>

          <p className="mt-3 text-[var(--brand-muted)]">
            Try searching for another destination, district, or category.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
         {paginatedDestinations.map((destination) => {
            const imageSrc =
              destination.imageUrl ||
              destinationImages[destination.name.toLowerCase()] ||
              "";

            return (
              <article
                key={destination._id}
                className="premium-card group flex h-full flex-col"
              >
                {/* DESTINATION IMAGE */}
                <Link
                  href={`/destinations/${destination._id}`}
                  className="relative block overflow-hidden"
                  aria-label={`Explore ${destination.name}`}
                >
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={`Beautiful view of ${destination.name}, Sri Lanka`}
                      className="h-64 w-full object-cover sm:h-72"
                    />
                  ) : (
                    <div className="flex h-64 items-center justify-center bg-[var(--brand-primary-dark)] text-3xl font-semibold text-white sm:h-72">
                      {destination.name}
                    </div>
                  )}

                  {/* IMAGE GRADIENT */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                  {/* FLOATING CATEGORY BADGE */}
                  <span className="absolute top-5 left-5 rounded-full border border-white/40 bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[var(--brand-primary-dark)] shadow-md backdrop-blur-md">
                    {destination.category}
                  </span>

                  {/* FLOATING ARROW */}
                  <span
                    aria-hidden="true"
                    className="absolute right-5 bottom-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/90 text-xl text-[var(--brand-primary-dark)] shadow-lg transition duration-300 group-hover:-translate-y-1 group-hover:rotate-45 group-hover:bg-gold"
                  >
                    ↗
                  </span>
                </Link>

                {/* CARD CONTENT */}
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="min-w-0 max-w-full break-words font-serif text-2xl font-semibold leading-snug tracking-tight text-[var(--brand-text)] transition-colors duration-300 group-hover:text-brand sm:text-3xl [overflow-wrap:anywhere]">
                    {destination.name}
                  </h3>

                  <div className="mt-2 flex min-w-0 items-start gap-2 text-sm font-medium text-[var(--brand-muted)]">
                    <span aria-hidden="true" className="shrink-0 text-[var(--brand-secondary)]">
                      📍
                    </span>
                    <span className="min-w-0 break-words">
                      {destination.district} District, Sri Lanka
                    </span>
                  </div>

                  <p className="mt-4 flex-1 leading-7 text-[var(--brand-muted)]">
                    {destination.description}
                  </p>

                  <div className="mt-7 border-t border-[var(--brand-border)] pt-5">
                    <Link
                      href={`/destinations/${destination._id}`}
                      className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-brand px-4 py-3 text-center text-sm font-bold uppercase tracking-wide text-white shadow-md transition duration-300 hover:bg-[var(--brand-primary-dark)] hover:shadow-lg active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                    >
                      Discover Destination
                      <span aria-hidden="true" className="text-lg">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
                </div>
      )}

      {/* PAGINATION CONTROLS */}
      {totalPages > 1 && (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={currentPage === 1}
            className="min-h-12 rounded-xl bg-brand px-6 py-3 font-semibold text-white transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← Previous
          </button>

          <span className="text-sm font-semibold text-[var(--brand-text)]">
            Page {currentPage} of {totalPages}
          </span>

          <button
            type="button"
            onClick={() =>
              setCurrentPage((page) => Math.min(totalPages, page + 1))
            }
            disabled={currentPage === totalPages}
            className="min-h-12 rounded-xl bg-brand px-6 py-3 font-semibold text-white transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
