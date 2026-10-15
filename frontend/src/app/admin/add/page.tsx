
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

type FormField =
  | "name"
  | "district"
  | "description"
  | "category"
  | "imageUrl"
  | "latitude"
  | "longitude";

export default function AddDestinationPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    district: "",
    description: "",
    category: "",
    imageUrl: "",
    latitude: "",
    longitude: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateField(field: FormField, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const token = sessionStorage.getItem("adminToken");

    if (!token) {
      router.push("/admin/login");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/destinations`,
        {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          latitude: Number(form.latitude),
          longitude: Number(form.longitude),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create destination");
      }

      router.push("/admin/dashboard");
    } catch {
      setError("Could not add destination. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-[var(--brand-border)] bg-[var(--brand-background)] px-5 py-4 text-[var(--brand-text)] outline-none transition duration-300 placeholder:text-[var(--brand-muted)] focus:border-brand focus:bg-white focus:ring-4 focus:ring-emerald-600/10";

  const labelClass =
    "mb-2 block text-sm font-semibold text-[var(--brand-text)]";

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

          <Link
            href="/admin/dashboard"
            className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-medium transition hover:border-gold hover:text-gold"
          >
            ← Back to Dashboard
          </Link>
        </nav>
      </header>

      {/* PAGE INTRO */}
      <section className="relative overflow-hidden bg-[var(--brand-primary-dark)] px-6 pt-12 pb-28 text-white">
        <div className="pointer-events-none absolute -right-20 -bottom-40 h-96 w-96 rounded-full border border-gold/20" />

        <div className="relative mx-auto max-w-5xl animate-fade-up">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold">
              Destination Management
            </span>
          </div>

          <h1 className="font-serif text-4xl font-semibold sm:text-6xl">
            Add a new
            <br />
            <span className="italic text-gold">destination.</span>
          </h1>

          <p className="mt-5 max-w-xl leading-8 text-white/75">
            Introduce travelers to another extraordinary place
            in Sri Lanka.
          </p>
        </div>
      </section>

      {/* FORM */}
      <section className="relative z-10 mx-auto -mt-14 max-w-5xl px-5 pb-20">
        <form
          onSubmit={handleSubmit}
          className="animate-fade-up overflow-hidden rounded-[28px] border border-[var(--brand-border)] bg-white shadow-xl shadow-emerald-950/10"
        >
          <div className="border-b border-[var(--brand-border)] px-6 py-8 sm:px-10">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-2xl">
                ✦
              </span>

              <div>
                <h2 className="font-serif text-2xl font-semibold text-[var(--brand-text)]">
                  Destination Details
                </h2>
                <p className="mt-1 text-sm text-[var(--brand-muted)]">
                  Complete the information below to add a place.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8 px-6 py-9 sm:px-10">
            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            {/* BASIC INFORMATION */}
            <div>
              <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-brand">
                01 / Basic Information
              </h3>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Destination Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(event) =>
                      updateField("name", event.target.value)
                    }
                    placeholder="e.g. Sigiriya"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="district" className={labelClass}>
                    District *
                  </label>
                  <input
                    id="district"
                    type="text"
                    required
                    value={form.district}
                    onChange={(event) =>
                      updateField("district", event.target.value)
                    }
                    placeholder="e.g. Matale"
                    className={inputClass}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="category" className={labelClass}>
                    Category *
                  </label>
                  <input
                    id="category"
                    type="text"
                    required
                    value={form.category}
                    onChange={(event) =>
                      updateField("category", event.target.value)
                    }
                    placeholder="e.g. Historical, Cultural, Nature"
                    className={inputClass}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="description" className={labelClass}>
                    Description *
                  </label>
                  <textarea
                    id="description"
                    required
                    rows={5}
                    value={form.description}
                    onChange={(event) =>
                      updateField("description", event.target.value)
                    }
                    placeholder="Describe what makes this destination special..."
                    className={`${inputClass} resize-y`}
                  />
                </div>
              </div>
            </div>

            <div className="h-px bg-[var(--brand-border)]" />

            {/* LOCATION */}
            <div>
              <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-brand">
                02 / Geographic Location
              </h3>

              <p className="mb-5 text-sm leading-7 text-[var(--brand-muted)]">
                Accurate coordinates allow travelers to see live
                weather conditions for this destination.
              </p>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="latitude" className={labelClass}>
                    Latitude *
                  </label>
                  <input
                    id="latitude"
                    type="number"
                    step="any"
                    min="-90"
                    max="90"
                    required
                    value={form.latitude}
                    onChange={(event) =>
                      updateField("latitude", event.target.value)
                    }
                    placeholder="e.g. 7.957"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="longitude" className={labelClass}>
                    Longitude *
                  </label>
                  <input
                    id="longitude"
                    type="number"
                    step="any"
                    min="-180"
                    max="180"
                    required
                    value={form.longitude}
                    onChange={(event) =>
                      updateField("longitude", event.target.value)
                    }
                    placeholder="e.g. 80.760"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            <div className="h-px bg-[var(--brand-border)]" />

            {/* IMAGE */}
            <div>
              <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-brand">
                03 / Destination Photography
              </h3>

              <label htmlFor="imageUrl" className={labelClass}>
                Image URL (Optional)
              </label>

              <input
                id="imageUrl"
                type="url"
                value={form.imageUrl}
                onChange={(event) =>
                  updateField("imageUrl", event.target.value)
                }
                placeholder="https://example.com/destination.jpg"
                className={inputClass}
              />

              <p className="mt-3 text-sm text-[var(--brand-muted)]">
                Add a public image URL, or leave this blank.
                Colombo, Kandy, and Galle already have built-in photographs.
              </p>
            </div>
          </div>

          {/* FORM ACTIONS */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--brand-border)] bg-[var(--brand-background)] px-6 py-7 sm:px-10">
            <Link
              href="/admin/dashboard"
              className="rounded-full px-5 py-3 text-sm font-semibold text-[var(--brand-muted)] transition hover:text-brand"
            >
              ← Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="brand-button disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                "Saving Destination..."
              ) : (
                <>
                  <span aria-hidden="true">+</span>
                  Add Destination
                  <span aria-hidden="true">→</span>
                </>
              )}
            </button>
          </div>
        </form>
      </section>

      <footer className="bg-[var(--brand-primary-dark)] px-6 py-7 text-center text-sm text-white/65">
        © 2026 Sri Lanka Destination Explorer · Admin Portal
      </footer>
    </main>
  );
}
