"use client";

import { AutoRefillRecords, RefillRecords } from "./FillingCardList";

interface Props {
  refillRecords: RefillRecords[];
  autoRefillRecords: AutoRefillRecords[];
}

export default function FillingCard({ refillRecords, autoRefillRecords }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Manual Refill Records */}
      <div className="bg-white rounded-lg shadow-md p-4 border">
        <h2 className="text-lg font-semibold mb-3 text-blue-600">Manual Refill Records</h2>
        {refillRecords.length > 0 ? (
          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {refillRecords.map((record) => (
              <div
                key={record.id}
                className="p-3 rounded-md border bg-gray-50 hover:shadow-sm transition"
              >
                <p><span className="font-semibold">Product:</span> {record.product}</p>
                <p><span className="font-semibold">Supplier:</span> {record.supplier_name}</p>
                <p><span className="font-semibold">Driver:</span> {record.driver_name}</p>
                <p><span className="font-semibold">Volume:</span> {record.fuel_volume} L</p>
                <p><span className="font-semibold">Date:</span> {new Date(record.issue_date).toLocaleString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No manual refill records available.</p>
        )}
      </div>

      {/* Auto Refill Records */}
      <div className="bg-white rounded-lg shadow-md p-4 border">
        <h2 className="text-lg font-semibold mb-3 text-green-600">Auto Refill Records</h2>
        {autoRefillRecords.length > 0 ? (
          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {autoRefillRecords.map((record) => (
              <div
                key={record.id}
                className="p-3 rounded-md border bg-gray-50 hover:shadow-sm transition"
              >
                <p><span className="font-semibold">Product:</span> {record.product}</p>
                <p><span className="font-semibold">Volume:</span> {record.fuel_volume} L</p>
                <p><span className="font-semibold">Start Level:</span> {record.start_fuel_mm} mm</p>
                <p><span className="font-semibold">End Level:</span> {record.end_fuel_mm} mm</p>
                <p><span className="font-semibold">Date:</span> {new Date(record.issue_date).toLocaleString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No auto refill records available.</p>
        )}
      </div>
    </div>
  );
}
