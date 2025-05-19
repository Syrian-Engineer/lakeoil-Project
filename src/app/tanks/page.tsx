'use client';

import Tank from "@/components/Tank";
import { useEffect, useState } from "react";
import { Button } from "rizzui/button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { SlPlus } from "react-icons/sl";
import { FaPencilAlt } from "react-icons/fa";



export interface TankProp {
  capacity: number;
  id: number;
  min_level: number;
  name: string;
  product_id: number;
  probes: Probe[];
}

export interface Probe {
  id: number;
  identification_code: string;
  ave_temp: number;
  com_port: string;
  f_lvl: number;
  fuel_offset: number;
  length: number;
  physical_id: number;
  tank_id: number;
  temp_1: number;
  temp_2: number;
  temp_3: number;
  temp_4: number;
  temp_5: number;
  w_lvl: number;
  water_offset: number;
}

export interface ProductProp{
  coefficient:number,
  description:string,
  id:number,
  liter_price:number,
  name:string
}

export default function Page() {
  const [tanks, setTanks] = useState<TankProp[]>([]);
  const [products,setProducts] = useState<ProductProp[]>([])
  const [loading, setLoading] = useState<boolean>(true);

  // for fetching tanks
  const fetchTanks = async () => {
    try {
      const res = await fetch("/api/tanks/get-tanks", {
        credentials: "include",
      });
      const data = await res.json();
      setTanks(data.tanks.data.page_records || []);
    } catch (err) {
      console.error("Failed to fetch tanks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    fetchTanks();
  }, []);

  // for fetching products
  useEffect(()=>{
    if(typeof window === "undefined"){
      return;
    }
    const fetchProduct = async()=>{
      try{
        const res = await fetch("/api/tanks/get-products");
        const data = await res.json();
        setProducts(data.data.page_records || [])
      }catch(err){
        console.error("Failed To Fetch Prodcts",err)
      }
    }
    fetchProduct();
  },[])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  const MySwal = withReactContent(Swal);

  const handleAddTank = async () => {
    const { value: formValues } = await MySwal.fire({
      title: "Add New Tank",
      html: `
        <div class="flex flex-col space-y-4 text-left">
          <label class="font-semibold">Tank Name</label>
          <input id="swal-input-name" class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter tank name" />
  
          <label class="font-semibold">Product</label>
          <select id="swal-input-product" class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="1">Unleaded</option>
            <option value="2">Diesel</option>
            <option value="3">Kerosene</option>
          </select>
  
          <label class="font-semibold">Capacity</label>
          <input type="number" id="swal-input-capacity" class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter capacity" />
  
          <label class="font-semibold">Minimum Level for Authorization</label>
          <input type="number" id="swal-input-minlevel" class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter minimum level" />
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Process",
      preConfirm: () => {
        const name = (document.getElementById("swal-input-name") as HTMLInputElement).value.trim();
        const product_id = (document.getElementById("swal-input-product") as HTMLSelectElement).value;
        const capacity = (document.getElementById("swal-input-capacity") as HTMLInputElement).value;
        const min_level = (document.getElementById("swal-input-minlevel") as HTMLInputElement).value;
  
        if (!name || !product_id || !capacity || !min_level) {
          MySwal.showValidationMessage("Please fill out all fields");
          return;
        }
  
        return {
          name,
          product_id: parseInt(product_id, 10),
          capacity: parseInt(capacity, 10),
          min_level: parseInt(min_level, 10),
        };
      },
    });
  
    if (formValues) {
      try {
        const res = await fetch("/api/tanks/add-tank", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        });
        if (!res.ok) throw new Error("Failed to add tank");
        MySwal.fire("Success", "Tank added successfully", "success");
        fetchTanks();
      } catch (error) {
        MySwal.fire("Error", (error as Error).message || "Failed to add tank", "error");
      }
    }
  };

  // Just a placeholder edit handler, customize as needed
  const handleEditTank = async () => {
    const MySwal = withReactContent(Swal);
  
    // Show first alert with tank selection
    const { value: selectedTankId } = await MySwal.fire({
      title: "Select Tank to Edit",
      input: 'select',
      inputOptions: tanks.reduce((opts, tank) => {
        opts[tank.id] = tank.name;
        return opts;
      }, {} as Record<number, string>),
      inputPlaceholder: 'Select a tank',
      showCancelButton: true,
    });
  
    if (!selectedTankId) return; // user cancelled or no selection
  
    try {
      // Fetch tank details by selected id
      const res = await fetch('/api/tanks/get-tank', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: Number(selectedTankId) }),
      });
      if (!res.ok) throw new Error("Failed to fetch tank details");
  
      const { data: tank } = await res.json();
  
      // Show edit form with pre-filled values
      const { value: formValues } = await MySwal.fire({
        title: "Edit Tank",
        html: `
          <div class="flex flex-col space-y-4 text-left">
            <label class="font-semibold">Tank Name</label>
            <input id="swal-input-name" class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value="${tank.name}" />
    
            <label class="font-semibold">Product</label>
            <select id="swal-input-product" class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              ${products.map(product => `<option value="${product.id}" ${product.id === tank.product_id ? 'selected' : ''}>${product.name}</option>`).join('')}
            </select>
    
            <label class="font-semibold">Capacity</label>
            <input type="number" id="swal-input-capacity" class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value="${tank.capacity}" />
    
            <label class="font-semibold">Minimum Level for Authorization</label>
            <input type="number" id="swal-input-minlevel" class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value="${tank.min_level}" />
          </div>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Save Changes",
        preConfirm: () => {
          const name = (document.getElementById("swal-input-name") as HTMLInputElement).value.trim();
          const product_id = (document.getElementById("swal-input-product") as HTMLSelectElement).value;
          const capacity = (document.getElementById("swal-input-capacity") as HTMLInputElement).value;
          const min_level = (document.getElementById("swal-input-minlevel") as HTMLInputElement).value;
  
          if (!name || !product_id || !capacity || !min_level) {
            MySwal.showValidationMessage("Please fill out all fields");
            return;
          }
  
          return {
            id: tank.id,
            name,
            product_id: parseInt(product_id, 10),
            capacity: parseInt(capacity, 10),
            min_level: parseInt(min_level, 10),
          };
        }
      });
  
      if (!formValues) return; // user cancelled or validation failed
  
      // Send edited tank data to backend
      const updateRes = await fetch('/api/tanks/edit-tank', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials:"include",
        body: JSON.stringify(formValues),
      });
  
      if (!updateRes.ok) throw new Error("Failed to update tank");
  
      MySwal.fire("Success", "Tank updated successfully", "success");
      fetchTanks(); // refresh list with updated tank
    } catch (error) {
      MySwal.fire("Error", (error as Error).message || "Failed to update tank", "error");
    }
  };
  


  
  return (
    <>
      <div className="flex items-center justify-start gap-3 mb-4">
        <Button
          variant="outline"
          className="p-2"
          onClick={handleAddTank}
          aria-label="Add Tank"
          title="Add Tank"
        >
          <SlPlus className="h-6 w-6 text-primary" />
        </Button>

        <Button
          variant="outline"
          className="p-2"
          onClick={handleEditTank}
          aria-label="Edit Tank"
          title="Edit Tank"
        >
          <FaPencilAlt className="h-6 w-6 text-primary" />
        </Button>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 xlPlus:grid-cols-3 gap-3">
        {tanks.map((tank) => {
          const product = products.find((p) => p.id === tank.product_id);
          const productName = product ? product.name : "Unknown";
          return (
            <div key={tank.id} className="w-full">
              <Tank tank={tank} productName={productName} />
            </div>
          );
        })}
      </div>
    </>
  );
}
