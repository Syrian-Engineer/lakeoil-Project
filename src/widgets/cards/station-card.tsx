'use client'

import { useEffect, useState } from "react";
import { stationProps } from "@/app/station/page";
import { FaUserCog, FaServer, FaEdit, FaTrash } from "react-icons/fa";
import Swal from 'sweetalert2';
import EditComponent from "@/components/EditComponent";

interface Props {
  station: stationProps;
  setRefetchStation: React.Dispatch<React.SetStateAction<boolean>>;

}

export default function StationCard({ station,setRefetchStation }: Props) {
  const [showOperator, setShowOperator] = useState(false);
  const [showProvider, setShowProvider] = useState(false);
  const [showEditComponent,setShowEditComponent] = useState(false);
  const [handleDeleteButtonSpinner,setHandleDeleteButtonSpinner] = useState(false);

  const handleEdit =  () => {
    setShowEditComponent(true);
  };

   const handleDelete = async () => {
    console.log(station.id)
    setHandleDeleteButtonSpinner(true);
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete "${station.RetailStationName}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        const accessToken = sessionStorage.getItem("access_token");

        const response = await fetch(`/api/stations/delete-station?id=${station.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `${accessToken}`
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData?.error || "Failed to delete station.");
        }
        setHandleDeleteButtonSpinner(false);
        await Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'The station was deleted successfully.',
          confirmButtonColor: '#16a34a'
        });

        // for re-fetch Stations
        setRefetchStation((prev) => !prev);

      } catch (error: any) {
        console.error("Delete error:", error);

        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message || 'An unexpected error occurred.',
        });
      }
    }
  };

  return (
    <div className="w-full h-fit  border rounded-xl p-4 shadow hover:shadow-md transition duration-300 bg-white">
        {showEditComponent && (
          <div className=" w-fit h-fit absolute top-20 z-50 bg-gray-300 rounded-2xl left-80 right-10">
            <EditComponent 
             station={station} 
             showEditComponent={showEditComponent} 
             setShowEditComponent={setShowEditComponent}
             setRefetchStation={setRefetchStation}
              />
          </div>
        )}
      {/* Header: Station Info + Action Buttons */}
      <div className="flex justify-between items-start mb-2">
        <div className="mb-3">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    {station.RetailStationName}
                </h2>

                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700">
                    <span className="bg-gray-100 px-2 py-1 rounded-full">
                    <strong>License:</strong> {station.EWURALicenseNo}
                    </span>

                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    <strong>Region:</strong> {station.RegionName}
                    </span>

                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    <strong>District:</strong> {station.DistrictName}
                    </span>
                </div>
        </div>

        {/* Edit & Delete Buttons in top-right */}
        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            className="flex items-center gap-1 text-sm px-3 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            <FaEdit className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-1 text-sm px-3 py-1.5 rounded bg-red-600 text-white hover:bg-red-700"
          >
            <FaTrash className="w-4 h-4" />
             {handleDeleteButtonSpinner ? (
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
                    Deleting
                    </span>
                ) : (
                    "Delete"
                )}
          </button>
        </div>
      </div>

      {/* Icons Row Below Info */}
      <div className="flex gap-3 mt-2 mb-3">
        <FaUserCog
          className="w-5 h-5 text-blue-600 cursor-pointer"
          onClick={() => setShowOperator((prev) => !prev)}
          title="View Operator Info"
        />
        <FaServer
          className="w-5 h-5 text-green-600 cursor-pointer"
          onClick={() => setShowProvider((prev) => !prev)}
          title="View Provider Info"
        />
      </div>

      {/* Operator Info */}
      {showOperator && (
        <div className="mt-3 bg-blue-50 p-3 rounded text-sm text-blue-900">
          <h3 className="font-medium mb-1">Operator Details</h3>
          <p><strong>Name:</strong> {station.OperatorName}</p>
          <p><strong>TIN:</strong> {station.OperatorTin}</p>
          <p><strong>XTIN:</strong> {station.Operator_XTin}</p>
          <p><strong>VRN:</strong> {station.OperatorVrn}</p>
          <p><strong>UIN:</strong> {station.OperatorUIN}</p>
        </div>
      )}

      {/* Provider Info */}
      {showProvider && (
        <div className="mt-3 bg-green-50 p-3 rounded text-sm text-green-900">
          <h3 className="font-medium mb-1">VFD Provider Details</h3>
          <p><strong>Provider:</strong> {station.VFD_provider}</p>
          <p><strong>URL:</strong> {station.VFD_provider_URL}</p>
          <p><strong>Username:</strong> {station.VFD_provider_userName}</p>
          <div className="relative group w-fit">
            <p className="text-ellipsis overflow-hidden whitespace-nowrap max-w-xs cursor-help">
              <strong>API Key:</strong> {station.VFD_provider_TAPIkey.slice(0, 40)}...
            </p>

            {/* Tooltip */}
            <div className="absolute z-10 bottom-full mb-1 left-0 hidden group-hover:block bg-gray-900 text-white text-xs rounded px-2 py-1 max-w-sm break-words shadow-lg">
              {station.VFD_provider_TAPIkey}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
