'use client';

import { useForm } from 'react-hook-form';
import { Button } from 'rizzui';
import { stationProps } from '../page';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';



export default function Page() {
    const route = useRouter();
    const form = useForm<stationProps>();
    const {register,handleSubmit} = form

  const handleFormSubmit = async (newStation:stationProps)=>{
    try{

        const accessToken = sessionStorage.getItem("access_token");

        if (!accessToken) {
            console.warn("No token found in sessionStorage")
            return
            }
        
            const response = await fetch("/api/stations/create-new-station",{
                method:"POST",
                headers:{
                    Authorization:`${accessToken}`
                },
                body:JSON.stringify({
                    Distributor_Id: newStation.Distributor_Id,
                    RetailStationName: newStation.RetailStationName,
                    EWURALicenseNo: newStation.EWURALicenseNo,
                    EWURA_URL: newStation.EWURA_URL,
                    OperatorTin: newStation.OperatorTin,
                    Operator_XTin: newStation.Operator_XTin,
                    OperatorVrn: newStation.OperatorVrn,
                    OperatorUIN: newStation.OperatorUIN,
                    OperatorName: newStation.OperatorName,
                    LicenseeTraSerialNo: newStation.LicenseeTraSerialNo,
                    RegionName: newStation.RegionName,
                    DistrictName: newStation.DistrictName,
                    WardName: newStation.WardName,
                    Zone: newStation.Zone,
                    ContactPersonEmailAddress: newStation.ContactPersonEmailAddress,
                    ContactPersonPhone: newStation.ContactPersonPhone,
                    default_printer_IP: newStation.default_printer_IP,
                    station_url_or_IP: newStation.station_url_or_IP,
                    VFD_provider: newStation.VFD_provider,
                    VFD_provider_URL: newStation.VFD_provider_URL,
                    VFD_provider_userName: newStation.VFD_provider_userName,
                    VFD_provider_userPass: newStation.VFD_provider_userPass,
                    VFD_provider_TAPIkey: newStation.VFD_provider_TAPIkey,
                    Tax_office:newStation.Tax_office,
                    automation_server_url:newStation.automation_server_url,
                    automation_server_username:newStation.automation_server_username,
                    automation_server_pass:newStation.automation_server_pass,
                    TotalNoTanks:newStation.TotalNoTanks,
                    x_active_business:newStation.x_active_business,
                    mobile_group1:newStation.mobile_group1,
                    mobile_group2:newStation.mobile_group2
                })
            })

        if (!response.ok) {
            const err = await response.json();
            console.error("Submission failed:", err);
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: err?.error || 'Something went wrong!',
            });
            return;
            }

        const data = await response.json();
        
        // ✅ Show success Swal
        Swal.fire({
        icon: 'success',
        title: 'Station Added',
        text: 'The station was added successfully!',
        confirmButtonColor: '#16a34a', // Tailwind green-600
        }).then(()=>{
            route.push("/station")
        });


    }catch(error:any){
        console.error(error);

            Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error?.message || 'An unexpected error occurred.',
            });
    }
  }

  return (
    <div className="flex flex-col gap-2 p-4 scroll-smooth">
        {/* Form Sections */}
      <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="flex flex-col gap-32 mt-4">
            {/* Info 1 */}
            <div className="space-y-4 scroll-mt-24">
              <h2 className="text-xl font-bold">Basic Station Info</h2>
              <input placeholder="Retail Station Name" className="input"{...register("RetailStationName")} />
              <input placeholder="EWURA License No" className="input" {...register("EWURALicenseNo")} />
              <input placeholder="EWURA URL" className="input" {...register("EWURA_URL")} />
              <input placeholder="Distributor ID" className="input" type="number" {...register("Distributor_Id")} />
              <input placeholder="Operator TIN" className="input" type="number"{...register("OperatorTin")} />
              <input placeholder="Operator XTIN" className="input" {...register("Operator_XTin")} />
              <input placeholder="Operator VRN" className="input" {...register("OperatorVrn")} />
            </div>
            {/* Info 2 */}
            <div className="space-y-4 scroll-mt-24">
              <h2 className="text-xl font-bold">Operator Details</h2>
              <input placeholder="Operator UIN" className="input" {...register("OperatorUIN")} />
              <input placeholder="Operator Name" className="input" {...register("OperatorName")} />
              <input placeholder="Licensee TRA Serial No" className="input" {...register("LicenseeTraSerialNo")} />
              <input placeholder="Region Name" className="input" {...register("RegionName")} />
              <input placeholder="District Name" className="input" {...register("DistrictName")} />
              <input placeholder="Ward Name" className="input" {...register("WardName")} />
              <input placeholder="Zone" className="input" {...register("Zone")} />
            </div>
            {/* Info 3 */}
            <div className="space-y-4 scroll-mt-24">
              <h2 className="text-xl font-bold">Contact & Station Info</h2>
              <input placeholder="Contact Email" className="input" {...register("ContactPersonEmailAddress")} />
              <input placeholder="Contact Phone" className="input" type="number" {...register("ContactPersonPhone")} />
              <input placeholder="Printer IP" className="input" {...register("default_printer_IP")} />
              <input placeholder="Station IP/URL" className="input" {...register("station_url_or_IP")} />
              <input placeholder="Business Type" className="input" {...register("x_active_business")} />
              <input placeholder="Total Number of Tanks" className="input" type="number" {...register("TotalNoTanks")} />
              <input placeholder="Mobile Group 1 (comma-separated)" className="input" {...register("mobile_group1")} />
              <input placeholder="Mobile Group 2 (comma-separated)" className="input" {...register("mobile_group2")} />
            </div>
            {/* Info 4 */}
            <div className="space-y-4 scroll-mt-24">
              <h2 className="text-xl font-bold">VFD & Automation</h2>
              <input placeholder="VFD Provider" className="input" {...register("VFD_provider")} />
              <input placeholder="VFD Provider URL" className="input" {...register("VFD_provider_URL")} />
              <input placeholder="VFD Username" className="input" {...register("VFD_provider_userName")} />
              <input placeholder="VFD Password" className="input" {...register("VFD_provider_userPass")} />
              <input placeholder="VFD API Key" className="input" {...register("VFD_provider_TAPIkey")} />
              <input placeholder="Tax Office" className="input" {...register("Tax_office")} />
              <input placeholder="Automation Server URL" className="input" {...register("automation_server_url")} />
              <input placeholder="Automation Username" className="input" {...register("automation_server_username")} />
              <input placeholder="Automation Password" className="input" {...register("automation_server_pass")} />
            </div>
              {/* Submit Button */}
              <div className='w-full'>
                <Button className="w-full mt-4" type='submit'>Add Station</Button>
              </div>
          </div>
      </form>
    </div>
  );
}
