// import { FaDatabase } from "react-icons/fa";
// import { MdLocalGasStation } from "react-icons/md";

// interface Props{
//     stations_length:number | undefined,
//     tanks_length:number | undefined
// }
// export default function TankSummary ({stations_length,tanks_length}:Props){
//     return(
//         <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl shadow-sm">
//         <h2 className="text-xl font-semibold mb-4">Summary</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//           {/* Stations */}
//           <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow hover:shadow-md transition">
//             <div className="p-3 rounded-full bg-blue-100 text-blue-600">
//               <MdLocalGasStation className="h-6 w-6" />
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Stations</p>
//               <p className="text-2xl font-bold">{stations_length ?? 0}</p>
//             </div>
//           </div>

//           {/* Tanks */}
//           <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow hover:shadow-md transition">
//             <div className="p-3 rounded-full bg-green-100 text-green-600">
//               <FaDatabase className="h-6 w-6" />
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Tanks</p>
//               <p className="text-2xl font-bold">{tanks_length ?? 0}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
// }




import { MdLocalGasStation } from "react-icons/md";
import { FaDatabase, FaSyncAlt } from "react-icons/fa";

interface TankSummaryProps {
  stations_length?: number;
  tanks_length: number;
  lastUpdate: Date | null;
  onRefresh: () => void;
}

export default function TankSummary({
  stations_length,
  tanks_length,
  lastUpdate,
  onRefresh,
}: TankSummaryProps) {
  return (
    <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Summary</h2>
        <button
          onClick={onRefresh}
          title="Refresh data"
          className="p-2 rounded-full bg-white shadow hover:rotate-90 transition-transform duration-500"
        >
          <FaSyncAlt className="text-blue-600 h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-3">
        {/* Stations */}
        <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600">
            <MdLocalGasStation className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Stations</p>
            <p className="text-2xl font-bold">{stations_length ?? 0}</p>
          </div>
        </div>

        {/* Tanks */}
        <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow">
          <div className="p-3 rounded-full bg-green-100 text-green-600">
            <FaDatabase className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Tanks</p>
            <p className="text-2xl font-bold">{tanks_length}</p>
          </div>
        </div>
      </div>

      {/* Last update */}
      <p className="text-xs text-gray-500">
        Last update:{" "}
        {lastUpdate ? lastUpdate.toLocaleTimeString() : "Not fetched yet"}
      </p>
    </div>
  );
}
