'use client';

import { stationProps } from "@/app/station/page";
import { useForm } from "react-hook-form";
import { Button } from "rizzui/button";
import Swal from 'sweetalert2';
import { useEffect, useState } from "react";

interface Props {
  station: stationProps;
  showEditComponent: boolean;
  setShowEditComponent: (showEditComponent: boolean) => void;
  setRefetchStation: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditComponent({
  station,
  showEditComponent,
  setShowEditComponent,
  setRefetchStation
}: Props) {
  const form = useForm<stationProps>({
    defaultValues: station,
  });

  const { register, handleSubmit, reset } = form;
  const [handleButtonSpinner,setHandleButtonSpinner] = useState(false);

  useEffect(() => {
    reset(station);
  }, [station, reset]);

  const handleFormSubmit = async (newStationData: stationProps) => {
  try {
    setHandleButtonSpinner(true);
    const access_token = sessionStorage.getItem("access_token");

    // ✅ Fix `created_date` if it's a string (convert to ISO format)

    const response = await fetch(`/api/stations/update-station?id=${station.id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          Authorization: `${access_token}`,
      },
      body: JSON.stringify({
         Distributor_Id: newStationData.Distributor_Id,
                    RetailStationName: newStationData.RetailStationName,
                    EWURALicenseNo: newStationData.EWURALicenseNo,
                    EWURA_URL: newStationData.EWURA_URL,
                    OperatorTin: newStationData.OperatorTin,
                    Operator_XTin: newStationData.Operator_XTin,
                    OperatorVrn: newStationData.OperatorVrn,
                    OperatorUIN: newStationData.OperatorUIN,
                    OperatorName: newStationData.OperatorName,
                    LicenseeTraSerialNo: newStationData.LicenseeTraSerialNo,
                    RegionName: newStationData.RegionName,
                    DistrictName: newStationData.DistrictName,
                    WardName: newStationData.WardName,
                    Zone: newStationData.Zone,
                    ContactPersonEmailAddress: newStationData.ContactPersonEmailAddress,
                    ContactPersonPhone: newStationData.ContactPersonPhone,
                    default_printer_IP: newStationData.default_printer_IP,
                    station_url_or_IP: newStationData.station_url_or_IP,
                    VFD_provider: newStationData.VFD_provider,
                    VFD_provider_URL: newStationData.VFD_provider_URL,
                    VFD_provider_userName: newStationData.VFD_provider_userName,
                    VFD_provider_userPass: newStationData.VFD_provider_userPass,
                    VFD_provider_TAPIkey: newStationData.VFD_provider_TAPIkey,
                    Tax_office:newStationData.Tax_office,
                    automation_server_url:newStationData.automation_server_url,
                    automation_server_username:newStationData.automation_server_username,
                    automation_server_pass:newStationData.automation_server_pass,
                    TotalNoTanks:newStationData.TotalNoTanks,
                    x_active_business:newStationData.x_active_business,
                    mobile_group1:newStationData.mobile_group1,
                    mobile_group2:newStationData.mobile_group2
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.error || "Failed to update station.");
    }

    setHandleButtonSpinner(false);

    await Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: 'The station was updated successfully.',
      confirmButtonColor: '#16a34a',
    });

    setShowEditComponent(false);
    setRefetchStation((prev)=>!prev);
  } catch (error: any) {
    console.error(error);
    await Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message || 'An unexpected error occurred.',
    });
  }
};

const handleDiscardClick = ()=>{
    setShowEditComponent(false)
}

  return (
    <div className="p-6 bg-white shadow rounded-xl max-h-[80vh] overflow-y-auto">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="flex flex-col gap-12">
          {/* Info 1 */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Basic Station Info</h2>
            <input placeholder="Retail Station Name" className="input" {...register("RetailStationName")} />
            <input placeholder="EWURA License No" className="input" {...register("EWURALicenseNo")} />
            <input placeholder="EWURA URL" className="input" {...register("EWURA_URL")} />
            <input placeholder="Distributor ID" type="number" className="input" {...register("Distributor_Id")} />
            <input placeholder="Operator TIN" type="number" className="input" {...register("OperatorTin")} />
            <input placeholder="Operator XTIN" className="input" {...register("Operator_XTin")} />
            <input placeholder="Operator VRN" className="input" {...register("OperatorVrn")} />
          </div>

          {/* Info 2 */}
          <div className="space-y-4">
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
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Contact & Station Info</h2>
            <input placeholder="Contact Email" type="email" className="input" {...register("ContactPersonEmailAddress")} />
            <input placeholder="Contact Phone" type="number" className="input" {...register("ContactPersonPhone")} />
            <input placeholder="Printer IP" className="input" {...register("default_printer_IP")} />
            <input placeholder="Station IP/URL" className="input" {...register("station_url_or_IP")} />
            <input placeholder="Business Type" className="input" {...register("x_active_business")} />
            <input placeholder="Total Number of Tanks" type="number" className="input" {...register("TotalNoTanks")} />
            <input placeholder="Mobile Group 1 (comma-separated)" className="input" {...register("mobile_group1")} />
            <input placeholder="Mobile Group 2 (comma-separated)" className="input" {...register("mobile_group2")} />
          </div>

          {/* Info 4 */}
          <div className="space-y-4">
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
          <div className="flex justify-end">
            <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600" disabled={handleButtonSpinner}>
                {handleButtonSpinner ? (
                    <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                        <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        />
                        <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                        />
                    </svg>
                    Updating...
                    </span>
                ) : (
                    "Update"
                )}
            </Button>

          </div>
        </div>
      </form>
      {/* Discard Button */}
        <div className="flex">
            <Button 
             className="bg-blue-500 text-white hover:bg-blue-600"
             onClick={handleDiscardClick}
             >
              Discard
            </Button>
          </div>
    </div>
  );
}
