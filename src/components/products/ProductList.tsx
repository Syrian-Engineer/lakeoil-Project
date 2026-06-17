"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  product_id?: number;
  coefficient?: number;
  color?: string;
  sku?: string;
  price?: number;
}

interface FormState {
  name: string;
  product_id: number;
  coefficient: number;
  color: string;
}

const emptyForm: FormState = {
  name: "",
  product_id: 0,
  coefficient: 0.0001,
  color: "",
};

export default function ProductList() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const access_token =
    typeof window !== "undefined"
      ? sessionStorage.getItem("access_token")
      : null;

  const backend =
    typeof window !== "undefined"
      ? localStorage.getItem("backend_url")
      : null;

  // redirect if not logged in
  useEffect(() => {
    if (!access_token) router.push("/signin");
  }, [access_token, router]);

  // GET PRODUCTS
  const fetchProducts = useCallback(async () => {
    if (!access_token) return;

    try {
      setLoading(true);

      const res = await fetch("/api/products/get-products", {
        headers: {
          Authorization: access_token,
          "x-backend-url": backend || "",
        },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed");

      setProducts(Array.isArray(data.data) ? data.data : data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [access_token, backend]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // ADD PRODUCT (simple open form)
  function handleAdd() {
    setSelectedId(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  // EDIT → fetch product by ID
  async function handleEdit(id: string) {
    try {
      setLoading(true);

      const res = await fetch(
        `/api/products/get-product-by-id?id=${id}`,
        {
          headers: {
            Authorization: access_token || "",
            "x-backend-url": backend || "",
          },
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to load product");

      const product = data.data || data;

      setSelectedId(id);

      setForm({
        name: product.name || "",
        product_id: product.product_id || 0,
        coefficient: product.coefficient || 0.0001,
        color: product.color || "",
      });

      setShowForm(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // SAVE (ADD or EDIT)
  async function handleSave() {
    try {
      setLoading(true);

      if (selectedId) {
        // EDIT
        const res = await fetch(
          `/api/products/edit-product?id=${selectedId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: access_token || "",
              "x-backend-url": backend || "",
            },
            body: JSON.stringify(form),
          }
        );

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Update failed");

        setProducts((prev) =>
          prev.map((p) =>
            p.id === selectedId ? { ...p, ...form } : p
          )
        );
      } else {
        // ADD
        await fetch("/api/products/add-new-product", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: access_token || "",
            "x-backend-url": backend || "",
          },
          body: JSON.stringify(form),
        });

        await fetchProducts();
      }

      setShowForm(false);
      setForm(emptyForm);
      setSelectedId(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // DELETE
  async function remove(id: string) {
    await fetch(`/api/products/delete-product?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: access_token || "",
        "x-backend-url": backend || "",
      },
    });

    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="bg-white p-4 rounded shadow">

      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-bold">Products</h2>

        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Add
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="text-red-600 mb-2">{error}</div>
      )}

      {/* FORM */}
      {showForm && (
        <div className="border p-3 mb-4 bg-gray-50 rounded">
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="input"
          />

          <input
            type="number"
            placeholder="Product ID"
            value={form.product_id}
            onChange={(e) =>
              setForm({
                ...form,
                product_id: Number(e.target.value),
              })
            }
            className="input"
          />

          <input
            type="number"
            step="0.0001"
            placeholder="Coefficient"
            value={form.coefficient}
            onChange={(e) =>
              setForm({
                ...form,
                coefficient: Number(e.target.value),
              })
            }
            className="input"
          />

          <input
            placeholder="Color"
            value={form.color}
            onChange={(e) =>
              setForm({ ...form, color: e.target.value })
            }
            className="input"
          />

          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-green-600 text-white px-3 py-1 mt-2 rounded"
          >
            {selectedId ? "Update" : "Save"}
          </button>
        </div>
      )}

      {/* LIST */}
      {products.map((p) => (
        <div
          key={p.id}
          className="flex justify-between border p-2 mb-2 rounded"
        >
          <div>
            <div className="font-medium">{p.name}</div>
            <div className="text-sm text-gray-500">
              {p.sku} • ${p.price?.toFixed(2)}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(p.id)}
              className="bg-gray-200 px-2 py-1 rounded"
            >
              Edit
            </button>

            <button
              onClick={() => remove(p.id)}
              className="bg-red-600 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}