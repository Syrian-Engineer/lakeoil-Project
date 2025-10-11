import type { Pump } from "./PumpCard";

export default function Pump({ pump }: { pump: Pump }) {
  const statusColor = pump.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600";
  const statusText = pump.active ? "⛽ Filling..." : "Idle";

  return (
    <div className="rounded-2xl shadow-md p-5 bg-white border border-gray-100 hover:shadow-lg transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-xl text-gray-800">
          {pump.pumpName}
        </h2>
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${statusColor}`}
        >
          {statusText}
        </span>
      </div>

      {/* Product Info */}
      <div className="text-sm text-gray-500 mb-3">
        <span className="font-medium text-gray-700">Product:</span> {pump.product}
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-3 text-gray-700 text-sm">
        <div>
          <p className="font-medium">Pump ID</p>
          <p className="text-gray-500">{pump.id}</p>
        </div>
        <div>
          <p className="font-medium">Price</p>
          <p className="text-gray-500">{pump.price.toFixed(2)} SAR/L</p>
        </div>
        <div>
          <p className="font-medium">Volume</p>
          <p className="text-gray-500">{pump.volume.toFixed(2)} L</p>
        </div>
        <div>
          <p className="font-medium">Amount</p>
          <p className="text-gray-500">{pump.amount.toFixed(2)} SAR</p>
        </div>
      </div>

      {/* Optional transaction ID */}
      {pump.transactionId && (
        <div className="mt-4 text-xs text-gray-400">
          Transaction ID: {pump.transactionId}
        </div>
      )}
    </div>
  );
}
