// "use client";

// import React, { useEffect, useState, useCallback } from "react";
// import { useRouter } from "next/navigation";

// interface Product {
//   id: string;
//   name: string;
//   product_id?: number;
//   coefficient?: number;
//   color?: string;
//   sku?: string;
//   price?: number;
// }

// interface FormState {
//   name: string;
//   product_id: number;
//   coefficient: number;
//   color: string;
// }

// const emptyForm: FormState = {
//   name: "",
//   product_id: 0,
//   coefficient: 0.0001,
//   color: "",
// };

// export default function ProductList() {
//   const router = useRouter();

//   const [products, setProducts] = useState<Product[]>([]);
//   const [form, setForm] = useState<FormState>(emptyForm);
//   const [showForm, setShowForm] = useState(false);
//   const [selectedId, setSelectedId] = useState<string | null>(null);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const access_token =
//     typeof window !== "undefined"
//       ? sessionStorage.getItem("access_token")
//       : null;

//   const backend =
//     typeof window !== "undefined"
//       ? localStorage.getItem("backend_url")
//       : null;

//   // redirect if not logged in
//   useEffect(() => {
//     if (!access_token) router.push("/signin");
//   }, [access_token, router]);

//   // GET PRODUCTS
//   const fetchProducts = useCallback(async () => {
//     if (!access_token) return;

//     try {
//       setLoading(true);

//       const res = await fetch("/api/products/get-products", {
//         headers: {
//           Authorization: access_token,
//           "x-backend-url": backend || "",
//         },
//       });

//       const data = await res.json();

//       if (!res.ok) throw new Error(data.error || "Failed");

//       setProducts(Array.isArray(data.data) ? data.data : data);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [access_token, backend]);

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   // ADD PRODUCT (simple open form)
//   function handleAdd() {
//     setSelectedId(null);
//     setForm(emptyForm);
//     setShowForm(true);
//   }

//   // EDIT → fetch product by ID
//   async function handleEdit(id: string) {
//     try {
//       setLoading(true);

//       const res = await fetch(
//         `/api/products/get-product-by-id?id=${id}`,
//         {
//           headers: {
//             Authorization: access_token || "",
//             "x-backend-url": backend || "",
//           },
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) throw new Error(data.error || "Failed to load product");

//       const product = data.data || data;

//       setSelectedId(id);

//       setForm({
//         name: product.name || "",
//         product_id: product.product_id || 0,
//         coefficient: product.coefficient || 0.0001,
//         color: product.color || "",
//       });

//       setShowForm(true);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   // SAVE (ADD or EDIT)
//   async function handleSave() {
//     try {
//       setLoading(true);

//       if (selectedId) {
//         // EDIT
//         const res = await fetch(
//           `/api/products/edit-product?id=${selectedId}`,
//           {
//             method: "PUT",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: access_token || "",
//               "x-backend-url": backend || "",
//             },
//             body: JSON.stringify(form),
//           }
//         );

//         const data = await res.json();
//         if (!res.ok) throw new Error(data.error || "Update failed");

//         setProducts((prev) =>
//           prev.map((p) =>
//             p.id === selectedId ? { ...p, ...form } : p
//           )
//         );
//       } else {
//         // ADD
//         await fetch("/api/products/add-new-product", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: access_token || "",
//             "x-backend-url": backend || "",
//           },
//           body: JSON.stringify(form),
//         });

//         await fetchProducts();
//       }

//       setShowForm(false);
//       setForm(emptyForm);
//       setSelectedId(null);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   // DELETE
//   async function remove(id: string) {
//     await fetch(`/api/products/delete-product?id=${id}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: access_token || "",
//         "x-backend-url": backend || "",
//       },
//     });

//     setProducts((prev) => prev.filter((p) => p.id !== id));
//   }

//   return (
//     <div className="bg-white p-4 rounded shadow">

//       {/* HEADER */}
//       <div className="flex justify-between mb-4">
//         <h2 className="text-lg font-bold">Products</h2>

//         <button
//           onClick={handleAdd}
//           className="bg-blue-600 text-white px-3 py-1 rounded"
//         >
//           Add
//         </button>
//       </div>

//       {/* ERROR */}
//       {error && (
//         <div className="text-red-600 mb-2">{error}</div>
//       )}

//       {/* FORM */}
//       {showForm && (
//         <div className="border p-3 mb-4 bg-gray-50 rounded">
//           <input
//             placeholder="Name"
//             value={form.name}
//             onChange={(e) =>
//               setForm({ ...form, name: e.target.value })
//             }
//             className="input"
//           />

//           <input
//             type="number"
//             placeholder="Product ID"
//             value={form.product_id}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 product_id: Number(e.target.value),
//               })
//             }
//             className="input"
//           />

//           <input
//             type="number"
//             step="0.0001"
//             placeholder="Coefficient"
//             value={form.coefficient}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 coefficient: Number(e.target.value),
//               })
//             }
//             className="input"
//           />

//           <input
//             placeholder="Color"
//             value={form.color}
//             onChange={(e) =>
//               setForm({ ...form, color: e.target.value })
//             }
//             className="input"
//           />

//           <button
//             onClick={handleSave}
//             disabled={loading}
//             className="bg-green-600 text-white px-3 py-1 mt-2 rounded"
//           >
//             {selectedId ? "Update" : "Save"}
//           </button>
//         </div>
//       )}

//       {/* LIST */}
//       {products.map((p) => (
//         <div
//           key={p.id}
//           className="flex justify-between border p-2 mb-2 rounded"
//         >
//           <div>
//             <div className="font-medium">{p.name}</div>
//             <div className="text-sm text-gray-500">
//               {p.sku} • ${p.price?.toFixed(2)}
//             </div>
//           </div>

//           <div className="flex gap-2">
//             <button
//               onClick={() => handleEdit(p.id)}
//               className="bg-gray-200 px-2 py-1 rounded"
//             >
//               Edit
//             </button>

//             <button
//               onClick={() => remove(p.id)}
//               className="bg-red-600 text-white px-2 py-1 rounded"
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }










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
    router.push("/products/add-product");
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
  <div className="bg-slate-50 p-6">
    {/* HEADER */}
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          Products
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Manage all available products
        </p>
      </div>

      <button
        onClick={handleAdd}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-medium shadow-sm transition"
      >
        + Add Product
      </button>
    </div>

    {/* ERROR */}
    {error && (
      <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-600">
        {error}
      </div>
    )}

    {/* FORM */}
    {showForm && (
      <div className="mb-6 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="font-semibold text-lg text-slate-800 mb-5">
          {selectedId ? "Edit Product" : "Create Product"}
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-600 mb-2">
              Product Name
            </label>

            <input
              placeholder="Enter product name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-2">
              Product ID
            </label>

            <input
              type="number"
              placeholder="Enter product ID"
              value={form.product_id}
              onChange={(e) =>
                setForm({
                  ...form,
                  product_id: Number(e.target.value),
                })
              }
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-2">
              Coefficient
            </label>

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
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-2">
              Product Color
            </label>

            <div className="flex gap-3 items-center">
              <input
                type="color"
                value={form.color || "#2563eb"}
                onChange={(e) =>
                  setForm({
                    ...form,
                    color: e.target.value,
                  })
                }
                className="h-12 w-20 border rounded-xl cursor-pointer"
              />

              <div
                className="w-10 h-10 rounded-full border"
                style={{
                  backgroundColor:
                    form.color || "#2563eb",
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl font-medium transition disabled:opacity-50"
          >
            {selectedId
              ? "Update Product"
              : "Save Product"}
          </button>

          <button
            onClick={() => {
              setShowForm(false);
              setSelectedId(null);
              setForm(emptyForm);
            }}
            className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-5 py-2 rounded-xl transition"
          >
            Cancel
          </button>
        </div>
      </div>
    )}

    {/* LOADING */}
    {loading && (
      <div className="flex justify-center py-12">
        <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )}

    {/* EMPTY STATE */}
    {!loading && products.length === 0 && (
      <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
        <p className="text-slate-500">
          No products found.
        </p>
      </div>
    )}

    {/* PRODUCTS GRID */}
    {!loading && products.length > 0 && (
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-200"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg text-slate-800">
                  {p.name}
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Product ID: {p.product_id}
                </p>
              </div>

              {p.color && (
                <div
                  className="w-6 h-6 rounded-full border border-slate-300"
                  style={{
                    backgroundColor: p.color,
                  }}
                />
              )}
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-500">
                  Coefficient
                </span>

                <span className="font-medium text-slate-700">
                  {p.coefficient}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  SKU
                </span>

                <span className="font-medium text-slate-700">
                  {p.sku || "-"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Price
                </span>

                <span className="font-bold text-green-600">
                  $
                  {typeof p.price === "number"
                    ? p.price.toFixed(2)
                    : "0.00"}
                </span>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => handleEdit(p.id)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-xl font-medium transition"
              >
                Edit
              </button>

              <button
                onClick={() => remove(p.id)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl font-medium transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
}