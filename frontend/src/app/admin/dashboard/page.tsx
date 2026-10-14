
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [destinations, setDestinations] = useState<
  { _id: string; name: string; district: string; category: string }[]
>([]);
const [error, setError] = useState("");

  
  useEffect(() => {
    const token = sessionStorage.getItem("adminToken");

    if (!token) {
      router.replace("/admin/login");
      return;
    }

    async function loadDestinations() {
      try {
        const response = await fetch("http://localhost:3000/destinations");

        if (!response.ok) {
          throw new Error("Failed to load destinations");
        }

        const data = await response.json();
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

  try {
    const response = await fetch(
      `http://localhost:3000/destinations/${id}`,
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
  }
}


  if (loading) {
    return <p className="p-8">Checking admin login...</p>;
  }

  return (
    <main className="min-h-screen bg-emerald-50 p-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-slate-900">
            Admin Dashboard
          </h1>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-600 px-5 py-2 text-white"
          >
            Logout
          </button>
        </div>

        <p className="mt-6 text-slate-700">
          Welcome to Sri Lanka Destination Explorer administration.
        </p>
        
        <section className="mt-8">
          <h2 className="mb-4 text-2xl font-semibold text-slate-900">
            Manage Destinations
          </h2>
        
        <button
        onClick={() => router.push("/admin/add")}
        className="mb-5 rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800"
        >
        + Add Destination
        </button>

          {error && (
            <p className="mb-4 rounded-lg bg-red-50 p-3 text-red-700">
              {error}
            </p>
          )}

          {destinations.length === 0 && !error ? (
            <p className="text-slate-600">No destinations found.</p>
          ) : (
            <div className="space-y-4">
              {destinations.map((destination) => (
                <div
                  key={destination._id}
                  className="rounded-xl bg-white p-5 shadow-sm"
                >
                  <h3 className="text-xl font-bold text-slate-900">
                    {destination.name}
                  </h3>
                  <p className="mt-1 text-slate-600">
                    {destination.district} · {destination.category}
                  </p>

                <button
                onClick={() => router.push(`/admin/edit/${destination._id}`)}
                className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                Edit
                </button>

                
                <button
                onClick={() => handleDelete(destination._id, destination.name)}
                className="ml-3 mt-3 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                >
                Delete
                </button>


                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
