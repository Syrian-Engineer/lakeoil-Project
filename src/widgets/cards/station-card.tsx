'use client'

import { useState } from "react";
import { stationProps } from "@/app/station/page";
import { FaUserCog, FaServer, FaEdit, FaTrash } from "react-icons/fa";

interface Props {
  station: stationProps;
}

export default function StationCard({ station }: Props) {
  const [showOperator, setShowOperator] = useState(false);
  const [showProvider, setShowProvider] = useState(false);

  const handleEdit = () => {
    console.log("Edit clicked for", station.id);
  };

  const handleDelete = () => {
    console.log("Delete clicked for", station.id);
  };

  return (
    <div className="w-full border rounded-xl p-4 shadow hover:shadow-md transition duration-300 bg-white">
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
            Delete
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
          <p><strong>API Key:</strong> {station.VFD_provider_TAPIkey}</p>
        </div>
      )}
    </div>
  );
}
