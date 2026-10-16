
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Destination = {
  _id: string;
  name: string;
  district: string;
  category: string;
  imageUrl?: string;
  description: string;
};

const destinationImages: Record<string, string> = {
  colombo: "/images/colombo.jpg",
  kandy: "/images/kandy.jpg",
  galle: "/images/Galle.jpg",
};

export default function AdminDashboard() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("adminToken");

    if (!token) {
      router.replace("/admin/login");
      return;
    }

    async function loadDestinations() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/destinations`
        );

        if (!response.ok) {
          throw new Error("Failed to load destinations");
        }

        const data = (await response.json()) as Destination[];
        setDestinations(data);
      } catch {
        setError("Could not load destinations. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadDestinations();
  }, [router]);

  function handleLogout() {
    sessionStorage.removeItem("adminToken");
    router.push("/admin/login");
  }

  async function handleDelete(id: string, name: string) {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${name}?`
    );

    if (!confirmed) return;

    const token = sessionStorage.getItem("adminToken");

    if (!token) {
      router.push("/admin/login");
      return;
    }

    setError("");
    setDeletingId(id);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/destinations/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      setDestinations((current) =>
        current.filter((destination) => destination._id !== id)
      );
    } catch {
      setError("Could not delete destination. Please try again.");
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="text-center">
          <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-[var(--brand-border)] border-t-brand" />
          <p className="font-medium text-[var(--brand-muted)]">
            Preparing your dashboard...
          </p>
        </div>
      </main>
    );
  }

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
                Admin Portal
              </span>
            </span>
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-medium transition hover:border-gold hover:text-gold"
            >
              View Website ↗
            </Link>

            <button
              onClick={handleLogout}
              className="rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium transition hover:bg-white/20"
            >
              Log Out
            </button>
          </div>
        </nav>
      </header>

      {/* DASHBOARD HERO */}
      <section className="relative overflow-hidden bg-[var(--brand-primary-dark)] px-6 pt-14 pb-24 text-white">
        <div className="pointer-events-none absolute -top-28 -right-20 h-80 w-80 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-8 -bottom-40 h-96 w-96 rounded-full border border-gold/20" />

        <div className="relative mx-auto max-w-7xl animate-fade-up">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="text-xs font-bold uppercase tracking-[0.28em] text-gold">
              Destination Management
            </span>
          </div>

          <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-6xl">
            Welcome to your
            <br />
            <span className="italic text-gold">dashboard.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-white/75">
            Curate and manage the destinations travelers discover
            across Sri Lanka.
          </p>
        </div>
      </section>

      {/* STATISTICS */}
      <section className="relative z-10 mx-auto -mt-12 max-w-7xl px-6">
        <div className="grid gap-5 sm:grid-cols-3">
          <div className="premium-card p-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-muted)]">
              Total Destinations
            </p>
            <p className="mt-4 font-serif text-5xl font-semibold text-brand">
              {destinations.length}
            </p>
            <p className="mt-3 text-sm text-[var(--brand-muted)]">
              Places in your collection
            </p>
          </div>

          <div className="premium-card p-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-muted)]">
              Categories
            </p>
            <p className="mt-4 font-serif text-5xl font-semibold text-brand">
              {new Set(destinations.map((item) => item.category)).size}
            </p>
            <p className="mt-3 text-sm text-[var(--brand-muted)]">
              Different travel experiences
            </p>
          </div>

          <div className="premium-card p-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-muted)]">
              Districts
            </p>
            <p className="mt-4 font-serif text-5xl font-semibold text-brand">
              {new Set(destinations.map((item) => item.district)).size}
            </p>
            <p className="mt-3 text-sm text-[var(--brand-muted)]">
              Areas represented
            </p>
          </div>
        </div>
      </section>

      {/* DESTINATION MANAGEMENT */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-9 bg-gold" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand">
                Your Collection
              </span>
            </div>

            <h2 className="font-serif text-4xl font-semibold text-[var(--brand-text)]">
              Manage <span className="italic text-brand">Destinations.</span>
            </h2>

            <p className="mt-4 text-[var(--brand-muted)]">
              Add new places, update information, or remove destinations.
            </p>
          </div>

          <Link
            href="/admin/add"
            className="brand-button"
          >
            <span className="text-xl" aria-hidden="true">
              +
            </span>
            Add Destination
          </Link>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-700"
          >
            {error}
          </div>
        )}

        {destinations.length === 0 && !error ? (
          <div className="rounded-3xl border border-[var(--brand-border)] bg-white px-8 py-20 text-center">
            <p className="text-5xl">🧭</p>
            <h3 className="mt-5 font-serif text-3xl font-semibold text-[var(--brand-text)]">
              No destinations yet
            </h3>
            <p className="mt-3 text-[var(--brand-muted)]">
              Add your first destination to begin building your collection.
            </p>
            <Link href="/admin/add" className="brand-button mt-7">
              + Add Your First Destination
            </Link>
          </div>
        ) : (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => {
              const imageSrc =
                destination.imageUrl ||
                destinationImages[destination.name.toLowerCase()] ||
                "";

              return (
                <article
                  key={destination._id}
                  className="premium-card group flex flex-col"
                >
                  <div className="relative h-52 overflow-hidden bg-[var(--brand-primary-dark)]">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={`View of ${destination.name}`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-2xl font-semibold text-white">
                        {destination.name}
                      </div>
                    )}

                    <span className="absolute top-4 left-4 rounded-full bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[var(--brand-primary-dark)] shadow-md">
                      {destination.category}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="min-w-0 max-w-full break-words font-serif text-2xl font-semibold leading-snug text-[var(--brand-text)] sm:text-3xl [overflow-wrap:anywhere]">
                      {destination.name}
                    </h3>

                    <p className="mt-2 flex min-w-0 items-start gap-2 text-sm font-medium text-[var(--brand-muted)]">
                      <span aria-hidden="true" className="shrink-0">
                        📍
                      </span>
                      <span className="min-w-0 break-words">
                        {destination.district} District, Sri Lanka
                      </span>
                    </p>

                    <p className="mt-4 break-words text-sm leading-7 text-[var(--brand-muted)]">
                      {destination.description || "No description added yet."}
                    </p>

                    <div className="mt-7 flex flex-wrap gap-3 border-t border-[var(--brand-border)] pt-6">
                      <Link
                        href={`/admin/edit/${destination._id}`}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white transition hover:bg-[var(--brand-primary-dark)]"
                      >
                        ✎ Edit
                      </Link>

                      <button
                        onClick={() =>
                          handleDelete(destination._id, destination.name)
                        }
                        disabled={deletingId === destination._id}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-bold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {deletingId === destination._id ? (
                        "Deleting..."
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M3 6h18" />
                            <path d="M8 6V4h8v2" />
                            <path d="M19 6l-1 14H6L5 6" />
                            <path d="M10 10v7" />
                            <path d="M14 10v7" />
                          </svg>
                          <span>Delete</span>
                        </>
                      )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="bg-[var(--brand-primary-dark)] px-6 py-8 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-sm text-white/65">
          <p>© 2026 Sri Lanka Destination Explorer</p>
          <p>Administrator Dashboard</p>
        </div>
      </footer>
    </main>
  );
}
