// "use client";

// import React, { useEffect, useState } from "react";

// interface RegionPrice {
//   id: number;
//   region_name: string;
//   product_id: number;
//   product_name: string;
//   station_product_id: number;
//   liter_price: number;
//   updated_at: string;
//   updated_by: number;
// }

// export default function RegionPrice() {
//   const [regionPrices, setRegionPrices] = useState<
//     Record<string, RegionPrice[]>
//   >({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchRegionPrices = async () => {
//       try {
//         const accessToken = sessionStorage.getItem("access_token");
//         const backendUrl = localStorage.getItem("backend_url");

//         // Fetch all regions
//         const regionsResponse = await fetch(
//           "/api/regoinprices/get-regoins",
//           {
//             method: "GET",
//             headers: {
//               Authorization: accessToken || "",
//               "x-backend-url": backendUrl || "",
//             },
//           }
//         );

//         const regionsData = await regionsResponse.json();

//         if (!regionsResponse.ok) {
//           throw new Error(regionsData.error || "Failed to fetch regions");
//         }

//         const regions: string[] = regionsData.data || [];

//         const grouped: Record<string, RegionPrice[]> = {};

//         // Fetch prices for each region
//         await Promise.all(
//           regions.map(async (region) => {
//             console.log(region);
//             const response = await fetch(
//               "/api/regoinprices/get-regoin-by-name",
//               {
//                 method: "GET",
//                 headers: {
//                   Authorization: accessToken || "",
//                   "x-backend-url": backendUrl || "",
//                   region_name:`${region}`
//                 },
//               }
//             );

//             const data = await response.json();

//             grouped[region] = data.data || [];
//           })
//         );

//         setRegionPrices(grouped);
//       } catch (error) {
//         console.error("Failed to fetch region prices:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRegionPrices();
//   }, []);

//   return (
//     <div className="bg-white rounded shadow p-4">
//       <h2 className="text-lg font-semibold mb-4">Region Prices</h2>

//       {loading ? (
//         <p className="text-gray-500">Loading region prices...</p>
//       ) : (
//         <div className="space-y-6">
//           {Object.entries(regionPrices).map(([region, products]) => (
//             <div
//               key={region}
//               className="border rounded-lg p-4"
//             >
//               <h3 className="text-md font-bold mb-3">{region}</h3>

//               {products.length === 0 ? (
//                 <p className="text-sm text-gray-500">
//                   No prices available.
//                 </p>
//               ) : (
//                 <div className="space-y-2">
//                   {products.map((product) => (
//                     <div
//                       key={product.id}
//                       className="flex justify-between items-center border-b pb-2"
//                     >
//                       <div>
//                         <p className="font-medium">
//                           {product.product_name}
//                         </p>
//                         <p className="text-xs text-gray-500">
//                           Updated: {product.updated_at}
//                         </p>
//                       </div>

//                       <div className="font-semibold">
//                         {product.liter_price}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }




"use client";

import React, { useEffect, useState } from "react";

interface RegionPrice {
  id: number;
  region_name: string;
  product_id: number;
  product_name: string;
  station_product_id: number;
  liter_price: number;
  updated_at: string;
  updated_by: number;
}

export default function RegionPrice() {
  const [regionPrices, setRegionPrices] = useState<
    Record<string, RegionPrice[]>
  >({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegionPrices = async () => {
      try {
        const accessToken = sessionStorage.getItem("access_token");
        const backendUrl = localStorage.getItem("backend_url");

        const regionsResponse = await fetch(
          "/api/regoinprices/get-regoins",
          {
            method: "GET",
            headers: {
              Authorization: accessToken || "",
              "x-backend-url": backendUrl || "",
            },
          }
        );

        const regionsData = await regionsResponse.json();

        if (!regionsResponse.ok) {
          throw new Error(regionsData.error || "Failed to fetch regions");
        }

        const regions: string[] = regionsData.data || [];

        const grouped: Record<string, RegionPrice[]> = {};

        await Promise.all(
          regions.map(async (region) => {
            const response = await fetch(
              "/api/regoinprices/get-regoin-by-name",
              {
                method: "GET",
                headers: {
                  Authorization: accessToken || "",
                  "x-backend-url": backendUrl || "",
                  region_name: region,
                },
              }
            );

            const data = await response.json();
            grouped[region] = data.data || [];
          })
        );

        setRegionPrices(grouped);
      } catch (error) {
        console.error("Failed to fetch region prices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegionPrices();
  }, []);

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Regional Fuel Prices
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Latest prices grouped by region
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Object.entries(regionPrices).map(([region, products]) => (
            <div
              key={region}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="px-5 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
                <h3 className="font-bold text-lg">{region}</h3>
              </div>

              <div className="p-4">
                {products.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">
                    No prices available
                  </div>
                ) : (
                  <div className="space-y-3">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between rounded-xl border border-slate-100 p-3 hover:bg-slate-50 transition-colors"
                      >
                        <div>
                          <h4 className="font-medium text-slate-800">
                            {product.product_name}
                          </h4>

                          <p className="text-xs text-slate-400 mt-1">
                            {new Date(
                              product.updated_at
                            ).toLocaleString()}
                          </p>
                        </div>

                        <div className="bg-green-50 text-green-700 px-3 py-2 rounded-lg font-bold text-lg">
                          {product.liter_price}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}