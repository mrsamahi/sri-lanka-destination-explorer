
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/auth/login`,
  {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await response.json();
      sessionStorage.setItem("adminToken", data.accessToken);

      router.push("/admin/dashboard");
    } catch {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* HEADER */}
      <header className="bg-[var(--brand-primary-dark)] text-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5">
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
            className="text-sm font-medium text-white/80 transition hover:text-gold"
          >
            ← Back to Website
          </Link>
        </nav>
      </header>

      {/* LOGIN SECTION */}
      <section className="relative flex min-h-[calc(100vh-84px)] items-center justify-center overflow-hidden px-5 py-16">
        {/* DECORATIVE BACKGROUND */}
        <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-emerald-200/35 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-amber-200/35 blur-3xl" />

        <div className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-[32px] border border-[var(--brand-border)] bg-white shadow-2xl shadow-emerald-950/10 lg:grid-cols-2">
          {/* LEFT BRAND PANEL */}
          <div className="relative hidden min-h-[580px] overflow-hidden bg-[var(--brand-primary-dark)] p-12 text-white lg:flex lg:flex-col lg:justify-between">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('/images/kandy.jpg')",
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-b from-[#062b24]/85 via-[#062b24]/60 to-[#062b24]/95" />

            <div className="relative z-10">
              <span className="inline-flex rounded-full border border-white/30 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-md">
                Administration Portal
              </span>
            </div>

            <div className="relative z-10">
              <div className="mb-5 h-1 w-14 rounded-full bg-gold" />

              <h2 className="font-serif text-5xl font-semibold leading-tight">
                Curating
                <br />
                unforgettable
                <br />
                <span className="italic text-gold">
                  journeys.
                </span>
              </h2>

              <p className="mt-6 max-w-sm text-base leading-8 text-white/80">
                Manage destinations and help travelers discover
                the extraordinary beauty of Sri Lanka.
              </p>
            </div>
          </div>

          {/* RIGHT LOGIN PANEL */}
          <div className="flex items-center px-7 py-12 sm:px-12 lg:px-14">
            <div className="animate-fade-up w-full">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--brand-primary)]/10 text-2xl text-brand">
                ✦
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand">
                Welcome Back
              </p>

              <h1 className="mt-4 font-serif text-4xl font-semibold text-[var(--brand-text)]">
                Admin Login
              </h1>

              <p className="mt-4 leading-7 text-[var(--brand-muted)]">
                Sign in to manage Sri Lanka&apos;s destinations.
              </p>

              <form onSubmit={handleLogin} className="mt-9 space-y-6">
                {error && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                  >
                    {error}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="username"
                    className="mb-2 block text-sm font-semibold text-[var(--brand-text)]"
                  >
                    Username
                  </label>

                  <input
                    id="username"
                    type="text"
                    autoComplete="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="Enter your username"
                    required
                    className="w-full rounded-xl border border-[var(--brand-border)] bg-[var(--brand-background)] px-5 py-4 text-[var(--brand-text)] outline-none transition duration-300 placeholder:text-[var(--brand-muted)] focus:border-brand focus:bg-white focus:ring-4 focus:ring-emerald-600/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-[var(--brand-text)]"
                  >
                    Password
                  </label>

                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full rounded-xl border border-[var(--brand-border)] bg-[var(--brand-background)] px-5 py-4 text-[var(--brand-text)] outline-none transition duration-300 placeholder:text-[var(--brand-muted)] focus:border-brand focus:bg-white focus:ring-4 focus:ring-emerald-600/10"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-brand px-6 py-4 font-bold text-white shadow-lg shadow-emerald-950/10 transition duration-300 hover:-translate-y-1 hover:bg-[var(--brand-primary-dark)] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  {loading ? (
                    "Signing in..."
                  ) : (
                    <>
                      Sign In to Dashboard
                      <span aria-hidden="true">→</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-9 border-t border-[var(--brand-border)] pt-6">
                <p className="text-center text-xs leading-6 text-[var(--brand-muted)]">
                  Restricted access for authorized administrators.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
