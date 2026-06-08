"use client";

import React, { useState } from "react";

interface Product {
  id: string;
  name: string;
  sku?: string;
  price?: number;
}

const initialProducts: Product[] = [
  { id: "1", name: "Diesel", sku: "D-01", price: 1.23 },
  { id: "2", name: "Premium", sku: "P-01", price: 1.45 },
];

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({ name: "", sku: "", price: "" });

  function openCreate() {
    setEditing(null);
    setForm({ name: "", sku: "", price: "" });
    setShowForm(true);
  }

  function openEdit(p: Product) {
    setEditing(p);
    setForm({ name: p.name, sku: p.sku ?? "", price: String(p.price ?? "") });
    setShowForm(true);
  }

  function save() {
    if (!form.name.trim()) return;
    if (editing) {
      setProducts((prev) => prev.map((x) => (x.id === editing.id ? { ...x, name: form.name, sku: form.sku, price: Number(form.price) } : x)));
    } else {
      const newProduct: Product = { id: String(Date.now()), name: form.name, sku: form.sku, price: Number(form.price) };
      setProducts((prev) => [newProduct, ...prev]);
    }
    setShowForm(false);
  }

  function remove(id: string) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Products</h2>
        <div className="flex gap-2">
          <button
            onClick={openCreate}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>
      </div>

      {showForm && (
        <div className="mb-4 p-3 border rounded bg-gray-50">
          <div className="grid gap-2">
            <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />
            <input placeholder="SKU" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} className="input" />
            <input placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="input" />
            <div className="flex gap-2">
              <button
                onClick={save}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Save
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {products.map((p) => (
          <div key={p.id} className="flex items-center justify-between p-3 border rounded">
            <div>
              <div className="font-medium">{p.name}</div>
              <div className="text-sm text-gray-500">{p.sku} • ${p.price?.toFixed(2)}</div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => openEdit(p)}
                className="px-2 py-1 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => remove(p.id)}
                className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
