
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type DestinationForm = {
  name: string;
  district: string;
  description: string;
  category: string;
  imageUrl: string;
  latitude: string;
  longitude: string;
};

export default function EditDestinationPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [form, setForm] = useState<DestinationForm>({
    name: "",
    district: "",
    description: "",
    category: "",
    imageUrl: "",
    latitude: "",
    longitude: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("adminToken");

    if (!token) {
      router.replace("/admin/login");
      return;
    }

    async function loadDestination() {
      try {
        const response = await fetch(
          `http://localhost:3000/destinations/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to load destination");
        }

        const data = await response.json();

        setForm({
          name: data.name,
          district: data.district,
          description: data.description,
          category: data.category,
          imageUrl: data.imageUrl || "",
          latitude: String(data.latitude),
          longitude: String(data.longitude),
        });
      } catch {
        setError("Could not load destination.");
      } finally {
        setLoading(false);
      }
    }

    loadDestination();
  }, [id, router]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const token = sessionStorage.getItem("adminToken");

    if (!token) {
      router.push("/admin/login");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(
        `http://localhost:3000/destinations/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...form,
            latitude: Number(form.latitude),
            longitude: Number(form.longitude),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update destination");
      }

      router.push("/admin/dashboard");
    } catch {
      setError("Could not update destination. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="p-8">Loading destination...</p>;
  }

  return (
    <main className="min-h-screen bg-emerald-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-xl space-y-4 rounded-xl bg-white p-6 shadow"
      >
        <h1 className="text-3xl font-bold text-slate-900">
          Edit Destination
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
              type={
                field === "latitude" || field === "longitude"
                  ? "number"
                  : "text"
              }
              step={
                field === "latitude" || field === "longitude"
                  ? "any"
                  : undefined
              }
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
          disabled={saving}
          className="w-full rounded-lg bg-emerald-700 p-3 font-semibold text-white disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </main>
  );
}
