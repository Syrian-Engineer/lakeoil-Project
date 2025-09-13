// "use client"
// import { TankProp, ProductProp } from "@/app/tanks/page";
// import { useState, useEffect } from "react";
// import { FaPencilAlt } from "react-icons/fa";
// import { SlPlus } from "react-icons/sl";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import Tank from "./Tank";
// import { Button } from "rizzui/button";
// import { stationProps } from "@/app/station/page";

// interface Props{
//     tanks1:TankProp[]
//     stations?:stationProps[]
// }


// export default function TankCard({tanks1,stations}:Props){
//       const [tanks, setTanks] = useState<TankProp[]>(tanks1);
//       const [products,setProducts] = useState<ProductProp[]>([])
//       const [access_token,setAcess_token] = useState<string | null>(null)
    
//       useEffect(()=>{
//         if(typeof window !== "undefined"){
//           setAcess_token(sessionStorage.getItem("access_token"));
//         }
//       },[])
    

//     //for tanks 
//     useEffect(()=>{
//         setTanks(tanks1)
//     },[tanks1])
    
//       const MySwal = withReactContent(Swal);
    
//       const handleAddTank = async () => {
//         const { value: formValues } = await MySwal.fire({
//           title: "Add New Tank",
//           html: `
//             <div class="flex flex-col space-y-4 text-left">
//               <label class="font-semibold">Tank Name</label>
//               <input id="swal-input-name" class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter tank name" />
      
//               <label class="font-semibold">Product</label>
//               <select id="swal-input-product" class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
//                 <option value="1">Unleaded</option>
//                 <option value="2">Diesel</option>
//                 <option value="3">Kerosene</option>
//               </select>
      
//               <label class="font-semibold">Capacity</label>
//               <input type="number" id="swal-input-capacity" class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter capacity" />
      
//               <label class="font-semibold">Minimum Level for Authorization</label>
//               <input type="number" id="swal-input-minlevel" class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter minimum level" />
//             </div>
//           `,
//           focusConfirm: false,
//           showCancelButton: true,
//           confirmButtonText: "Process",
//           preConfirm: () => {
//             const name = (document.getElementById("swal-input-name") as HTMLInputElement).value.trim();
//             const product_id = (document.getElementById("swal-input-product") as HTMLSelectElement).value;
//             const capacity = (document.getElementById("swal-input-capacity") as HTMLInputElement).value;
//             const min_level = (document.getElementById("swal-input-minlevel") as HTMLInputElement).value;
      
//             if (!name || !product_id || !capacity || !min_level) {
//               MySwal.showValidationMessage("Please fill out all fields");
//               return;
//             }
      
//             return {
//               name,
//               product_id: parseInt(product_id, 10),
//               capacity: parseInt(capacity, 10),
//               min_level: parseInt(min_level, 10),
//             };
//           },
//         });
      
//         if (formValues) {
//           try {
//             const res = await fetch("/api/tanks/add-tank", {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify(formValues),
//             });
//             if (!res.ok) throw new Error("Failed to add tank");
//             MySwal.fire("Success", "Tank added successfully", "success");
//             // fetchTanks();
//           } catch (error) {
//             MySwal.fire("Error", (error as Error).message || "Failed to add tank", "error");
//           }
//         }
//       };
    
//       // Just a placeholder edit handler, customize as needed
//       const handleEditTank = async () => {
//         const MySwal = withReactContent(Swal);
      
//         // Show first alert with tank selection
//         const { value: selectedTankId } = await MySwal.fire({
//           title: "Select Tank to Edit",
//           input: 'select',
//           inputOptions: tanks.reduce((opts, tank) => {
//             opts[tank.id] = tank.tank_name;
//             return opts;
//           }, {} as Record<number, string>),
//           inputPlaceholder: 'Select a tank',
//           showCancelButton: true,
//         });
      
//         if (!selectedTankId) return; // user cancelled or no selection
      
//         try {
//           // Fetch tank details by selected id
//           const res = await fetch('/api/tanks/get-tank', {
//             method: 'POST',
//             headers: { 
//                 'Content-Type': 'application/json',
//                 Authorization :`${access_token}`
//              },
//             body: JSON.stringify({ id: Number(selectedTankId) }),
//           });
//           if (!res.ok) throw new Error("Failed to fetch tank details");
      
//           const { data: tank } = await res.json();
      
//           // Show edit form with pre-filled values
//           const { value: formValues } = await MySwal.fire({
//             title: "Edit Tank",
//             html: `
//               <div class="flex flex-col space-y-4 text-left">
//                 <label class="font-semibold">Tank Name</label>
//                 <input id="swal-input-name" class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value="${tank.name}" />
        
//                 <label class="font-semibold">Product</label>
//                 <select id="swal-input-product" class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
//                   ${products.map(product => `<option value="${product.id}" ${product.id === tank.product_id ? 'selected' : ''}>${product.name}</option>`).join('')}
//                 </select>
        
//                 <label class="font-semibold">Capacity</label>
//                 <input type="number" id="swal-input-capacity" class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value="${tank.capacity}" />
        
//                 <label class="font-semibold">Minimum Level for Authorization</label>
//                 <input type="number" id="swal-input-minlevel" class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value="${tank.min_level}" />
//               </div>
//             `,
//             focusConfirm: false,
//             showCancelButton: true,
//             confirmButtonText: "Save Changes",
//             preConfirm: () => {
//               const name = (document.getElementById("swal-input-name") as HTMLInputElement).value.trim();
//               const product_id = (document.getElementById("swal-input-product") as HTMLSelectElement).value;
//               const capacity = (document.getElementById("swal-input-capacity") as HTMLInputElement).value;
//               const min_level = (document.getElementById("swal-input-minlevel") as HTMLInputElement).value;
      
//               if (!name || !product_id || !capacity || !min_level) {
//                 MySwal.showValidationMessage("Please fill out all fields");
//                 return;
//               }
      
//               return {
//                 id: tank.id,
//                 name,
//                 product_id: parseInt(product_id, 10),
//                 capacity: parseInt(capacity, 10),
//                 min_level: parseInt(min_level, 10),
//               };
//             }
//           });
      
//           if (!formValues) return; // user cancelled or validation failed
      
//           // Send edited tank data to backend
//           const updateRes = await fetch('/api/tanks/edit-tank', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             credentials:"include",
//             body: JSON.stringify(formValues),
//           });
      
//           if (!updateRes.ok) throw new Error("Failed to update tank");
      
//           MySwal.fire("Success", "Tank updated successfully", "success");
//         //   fetchTanks(); // refresh list with updated tank
//         } catch (error) {
//           MySwal.fire("Error", (error as Error).message || "Failed to update tank", "error");
//         }
//       };
      
//     return(
// <>
//       <div className="flex items-center justify-start gap-3 mb-4">
//         <Button
//           variant="outline"
//           className="p-2"
//           onClick={handleAddTank}
//           aria-label="Add Tank"
//           title="Add Tank"
//         >
//           <SlPlus className="h-6 w-6 text-primary" />
//         </Button>

//         <Button
//           variant="outline"
//           className="p-2"
//           onClick={handleEditTank}
//           aria-label="Edit Tank"
//           title="Edit Tank"
//         >
//           <FaPencilAlt className="h-6 w-6 text-primary" />
//         </Button>
//       </div>

//       <div className="w-full grid grid-cols-1 md:grid-cols-2 xlPlus:grid-cols-3 gap-3">
//         {tanks.map((tank) => {
//           return (
//             <div key={tank.id} className="w-full">
//               <Tank tanks={tank} />
//             </div>
//           );
//         })}
//       </div>
//     </>
//     )
// }





// "use client";
// import { TankProp, ProductProp } from "@/app/tanks/page";
// import { useState, useEffect } from "react";
// import { FaPencilAlt } from "react-icons/fa";
// import { SlPlus } from "react-icons/sl";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import Tank from "./Tank";
// import { Button } from "rizzui/button";
// import { stationProps } from "@/app/station/page";

// interface Props {
//   tanks1: TankProp[];
//   stations?: stationProps[];
// }

// export default function TankCard({ tanks1, stations }: Props) {
//   const [tanks, setTanks] = useState<TankProp[]>(tanks1);
//   const [access_token, setAccessToken] = useState<string | null>(null);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       setAccessToken(sessionStorage.getItem("access_token"));
//     }
//   }, []);

//   useEffect(() => {
//     setTanks(tanks1);
//   }, [tanks1]);

//   const MySwal = withReactContent(Swal);

//   // Group tanks by LicenseeTraSerialNo
//   const groupedTanks: Record<string, TankProp[]> = {};
//   stations?.forEach((station) => {
//     groupedTanks[station.LicenseeTraSerialNo] =
//       tanks.filter(
//         (tank) => tank.LicenseeTraSerialNo === station.LicenseeTraSerialNo
//       ) || [];
//   });

//   // Add handlers for Add/Edit Tank (kept your original handlers)
//   const handleAddTank = async () => {
//     const { value: formValues } = await MySwal.fire({
//       title: "Add New Tank",
//       html: `
//         <div class="flex flex-col space-y-4 text-left">
//           <label class="font-semibold">Tank Name</label>
//           <input id="swal-input-name" class="border px-3 py-2 rounded" placeholder="Enter tank name" />
//           <label class="font-semibold">Product</label>
//           <select id="swal-input-product" class="border px-3 py-2 rounded">
//             <option value="1">Unleaded</option>
//             <option value="2">Diesel</option>
//             <option value="3">Kerosene</option>
//           </select>
//           <label class="font-semibold">Capacity</label>
//           <input type="number" id="swal-input-capacity" class="border px-3 py-2 rounded" placeholder="Enter capacity" />
//           <label class="font-semibold">Minimum Level for Authorization</label>
//           <input type="number" id="swal-input-minlevel" class="border px-3 py-2 rounded" placeholder="Enter minimum level" />
//         </div>
//       `,
//       focusConfirm: false,
//       showCancelButton: true,
//       confirmButtonText: "Process",
//       preConfirm: () => {
//         const name = (document.getElementById(
//           "swal-input-name"
//         ) as HTMLInputElement).value.trim();
//         const product_id = (document.getElementById(
//           "swal-input-product"
//         ) as HTMLSelectElement).value;
//         const capacity = (document.getElementById(
//           "swal-input-capacity"
//         ) as HTMLInputElement).value;
//         const min_level = (document.getElementById(
//           "swal-input-minlevel"
//         ) as HTMLInputElement).value;

//         if (!name || !product_id || !capacity || !min_level) {
//           MySwal.showValidationMessage("Please fill out all fields");
//           return;
//         }

//         return {
//           name,
//           product_id: parseInt(product_id, 10),
//           capacity: parseInt(capacity, 10),
//           min_level: parseInt(min_level, 10),
//         };
//       },
//     });

//     if (formValues) {
//       try {
//         const res = await fetch("/api/tanks/add-tank", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(formValues),
//         });
//         if (!res.ok) throw new Error("Failed to add tank");
//         MySwal.fire("Success", "Tank added successfully", "success");
//       } catch (error) {
//         MySwal.fire("Error", (error as Error).message || "Failed to add tank", "error");
//       }
//     }
//   };

//   const handleEditTank = async () => {
//     // your existing edit tank code here
//   };

//   return (
//     <>
//       <div className="flex items-center justify-start gap-3 mb-4">
//         <Button variant="outline" className="p-2" onClick={handleAddTank}>
//           <SlPlus className="h-6 w-6 text-primary" />
//         </Button>
//         <Button variant="outline" className="p-2" onClick={handleEditTank}>
//           <FaPencilAlt className="h-6 w-6 text-primary" />
//         </Button>
//       </div>

//       <div className="space-y-8">
//         {stations?.map((station) => (
//           <div key={station.LicenseeTraSerialNo}>
//             <h2 className="text-lg font-semibold mb-2">{station.RetailStationName}</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 xlPlus:grid-cols-3 gap-3">
//               {groupedTanks[station.LicenseeTraSerialNo]?.map((tank) => (
//                 <Tank key={tank.id} tanks={tank} />
//               ))}
//               {groupedTanks[station.LicenseeTraSerialNo]?.length === 0 && (
//                 <p className="text-gray-500 col-span-full">No tanks for this station</p>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }



"use client";
import { TankProp, ProductProp } from "@/app/tanks/page";
import { useState, useEffect } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { SlPlus } from "react-icons/sl";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Tank from "./Tank";
import { Button } from "rizzui/button";
import { stationProps } from "@/app/station/page";

interface Props {
  tanks1: TankProp[];
  stations?: stationProps[];
}

export default function TankCard({ tanks1, stations }: Props) {
  const [tanks, setTanks] = useState<TankProp[]>(tanks1);
  const [access_token, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAccessToken(sessionStorage.getItem("access_token"));
    }
  }, []);

  useEffect(() => {
    setTanks(tanks1);
  }, [tanks1]);

  const MySwal = withReactContent(Swal);

  // Group tanks by LicenseeTraSerialNo
  const groupedTanks: Record<string, TankProp[]> = {};
  stations?.forEach((station) => {
    groupedTanks[station.LicenseeTraSerialNo] =
      tanks.filter(
        (tank) => tank.LicenseeTraSerialNo === station.LicenseeTraSerialNo
      ) || [];
  });

  const handleAddTank = async () => {
    // Your existing add tank code...
  };

  const handleEditTank = async () => {
    // Your existing edit tank code...
  };

  return (
    <>
      <div className="flex items-center justify-start gap-3 mb-4">
        <Button variant="outline" className="p-2" onClick={handleAddTank}>
          <SlPlus className="h-6 w-6 text-primary" />
        </Button>
        <Button variant="outline" className="p-2" onClick={handleEditTank}>
          <FaPencilAlt className="h-6 w-6 text-primary" />
        </Button>
      </div>

      <div className="space-y-4">
        {stations?.map((station) => (
          <div
            key={station.LicenseeTraSerialNo}
            className="bg-white rounded-lg shadow-md p-4 mb-4"
          >
            <h2 className="text-lg font-semibold mb-2">{station.RetailStationName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xlPlus:grid-cols-3 gap-3">
              {groupedTanks[station.LicenseeTraSerialNo]?.map((tank) => (
                <Tank key={tank.id} tanks={tank} />
              ))}
              {groupedTanks[station.LicenseeTraSerialNo]?.length === 0 && (
                <p className="text-gray-500 col-span-full">No tanks for this station</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
