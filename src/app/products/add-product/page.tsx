// "use client";

import AddProductForm from "@/components/AddProductForm";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// interface NewProductPayload {
//   name: string;
//   product_id: number;
//   coefficient: number;
//   color: string;
// }

// export default function page() {
//   const router = useRouter();
//   const [form, setForm] = useState<NewProductPayload>({
//     name: "",
//     product_id: 0,
//     coefficient: 0.0001,
//     color: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const backendUrl = localStorage.getItem("backend_url");

//   async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch("/api/products/add-new-product", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//             Authorization: sessionStorage.getItem("access_token") || "",
//             "x-backend-url": backendUrl || "",
//         },
//         body: JSON.stringify(form),
//       });

//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.error || data.message || "Failed to add product");
//       }

//       router.push("/products");
//     } catch (err: any) {
//       setError(err.message || "Unable to create product");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
//       <h1 className="text-2xl font-bold mb-4">Add Product</h1>

//       {error && (
//         <div className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//           {error}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium mb-1">Name</label>
//           <input
//             value={form.name}
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//             className="input w-full"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Product ID</label>
//           <input
//             type="number"
//             value={form.product_id}
//             onChange={(e) => setForm({ ...form, product_id: Number(e.target.value) })}
//             className="input w-full"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Coefficient</label>
//           <input
//             type="number"
//             step="0.0001"
//             value={form.coefficient}
//             onChange={(e) => setForm({ ...form, coefficient: Number(e.target.value) })}
//             className="input w-full"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Color</label>
//           <input
//             value={form.color}
//             onChange={(e) => setForm({ ...form, color: e.target.value })}
//             className="input w-full"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//         >
//           {loading ? "Saving..." : "Save Product"}
//         </button>
//       </form>
//     </div>
//   );
// }


export default function Page() {
  return <AddProductForm />;
}