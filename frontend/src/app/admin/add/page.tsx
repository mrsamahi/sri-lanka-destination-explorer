
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
      const response = await fetch("http://localhost:3000/destinations", {
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

  return (
    <main className="min-h-screen bg-emerald-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-xl space-y-4 rounded-xl bg-white p-6 shadow"
      >
        <h1 className="text-3xl font-bold text-slate-900">
          Add Destination
        </h1>

        {error && <p className="text-red-600">{error}</p>}

        {(
          [
            ["name", "Destination Name"],
            ["district", "District"],
            ["category", "Category"],
            ["imageUrl", "Image URL (optional)"],
            ["latitude", "Latitude"],
            ["longitude", "Longitude"],
          ] as const
        ).map(([field, label]) => (
          <label key={field} className="block text-slate-700">
            <span className="mb-1 block font-medium">{label}</span>
            <input
              type={field === "latitude" || field === "longitude" ? "number" : "text"}
              step={field === "latitude" || field === "longitude" ? "any" : undefined}
              required={field !== "imageUrl"}
              value={form[field]}
              onChange={(event) =>
                setForm({ ...form, [field]: event.target.value })
              }
              className="w-full rounded-lg border border-slate-300 p-3 text-slate-900"
            />
          </label>
        ))}

        <label className="block text-slate-700">
          <span className="mb-1 block font-medium">Description</span>
          <textarea
            required
            rows={4}
            value={form.description}
            onChange={(event) =>
              setForm({ ...form, description: event.target.value })
            }
            className="w-full rounded-lg border border-slate-300 p-3 text-slate-900"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-emerald-700 p-3 font-semibold text-white disabled:opacity-50"
        >
          {loading ? "Saving..." : "Add Destination"}
        </button>
      </form>
    </main>
  );
}
