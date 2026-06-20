"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface NewProductPayload {
  name: string;
  product_id: number;
  coefficient: number;
  color: string;
}

export default function AddProductForm() {
  const router = useRouter();

  const [form, setForm] = useState<NewProductPayload>({
    name: "",
    product_id: 0,
    coefficient: 0.0001,
    color: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const backendUrl =
        localStorage.getItem("backend_url");

      const response = await fetch(
        "/api/products/add-new-product",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              sessionStorage.getItem("access_token") ||
              "",
            "x-backend-url": backendUrl || "",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            data.message ||
            "Failed to add product"
        );
      }

      router.push("/products");
    } catch (err: any) {
      setError(
        err.message || "Unable to create product"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <h1 className="text-2xl font-bold mb-6">
        Add Product
      </h1>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm mb-2">
            Name
          </label>

          <input
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="w-full border rounded-xl px-4 py-3"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-2">
            Product ID
          </label>

          <input
            type="number"
            value={form.product_id}
            onChange={(e) =>
              setForm({
                ...form,
                product_id: Number(
                  e.target.value
                ),
              })
            }
            className="w-full border rounded-xl px-4 py-3"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-2">
            Coefficient
          </label>

          <input
            type="number"
            step="0.0001"
            value={form.coefficient}
            onChange={(e) =>
              setForm({
                ...form,
                coefficient: Number(
                  e.target.value
                ),
              })
            }
            className="w-full border rounded-xl px-4 py-3"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-2">
            Color
          </label>

          <input
            type="color"
            value={form.color || "#2563eb"}
            onChange={(e) =>
              setForm({
                ...form,
                color: e.target.value,
              })
            }
            className="h-12 w-24 border rounded-xl"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : "Save Product"}
        </button>
      </form>
    </div>
  );
}