// 'use client';

// import { useEffect, useState } from 'react';
// import { stationProps } from '@/app/station/page';
// import { FaUserCog, FaServer, FaEdit, FaTrash } from 'react-icons/fa';
// import Swal from 'sweetalert2';
// import EditComponent from '@/components/EditComponent';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/store';
// import { translate } from '@/translations/translate';
// import { stationCardTranslations } from '@/translations/stationPage/stationCard';
// import { IoIosPerson } from "react-icons/io";

// interface Props {
//   station: stationProps;
//   setRefetchStation: React.Dispatch<React.SetStateAction<boolean>>;
// }

// export default function StationCard({ station, setRefetchStation }: Props) {
//   const [showOperator, setShowOperator] = useState(false);
//   const [showProvider, setShowProvider] = useState(false);
//   const [showEditComponent, setShowEditComponent] = useState(false);
//   const [deleting, setDeleting] = useState(false);
//   const [windowWidth, setWindowWidth] = useState(0);

//   const lang = useSelector((state: RootState) => state.language.language);
//   const t = (key: string) => translate(stationCardTranslations, lang, key).text;

//   useEffect(() => {
//     const handleResize = () => setWindowWidth(window.innerWidth);
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const apiKeyPreview = station.VFD_provider_TAPIkey?.slice(0, windowWidth < 768 ? 20 : 40);

//   const handleEdit = () => setShowEditComponent(true);

//   const handleDelete = async () => {
//     setDeleting(true);
//     const confirm = await Swal.fire({
//       title: 'Are you sure?',
//       text: `Delete "${station.RetailStationName}"?`,
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#e11d48',
//       cancelButtonColor: '#6b7280',
//       confirmButtonText: 'Delete'
//     });

//     if (!confirm.isConfirmed) return setDeleting(false);

//     try {
//       const token = sessionStorage.getItem('access_token');
//       const res = await fetch(`/api/stations/delete-station?id=${station.id}`, {
//         method: 'DELETE',
//         headers: { 'Authorization': `${token}` }
//       });

//       if (!res.ok) {
//         const error = await res.json();
//         throw new Error(error?.error || 'Delete failed');
//       }

//       Swal.fire({ icon: 'success', title: 'Deleted!', timer: 1500, showConfirmButton: false });
//       setRefetchStation(prev => !prev);
//     } catch (err: any) {
//       Swal.fire({ icon: 'error', title: 'Error', text: err.message });
//     }

//     setDeleting(false);
//   };

//   return (
//     <div className="relative bg-white border rounded-2xl shadow-sm hover:shadow-md transition p-6 w-full">
//       {showEditComponent && (
//         <div className="absolute z-50 top-20 left-1/2 -translate-x-1/2 bg-white p-4 shadow rounded-xl">
//           <EditComponent
//             station={station}
//             showEditComponent={showEditComponent}
//             setShowEditComponent={setShowEditComponent}
//             setRefetchStation={setRefetchStation}
//           />
//         </div>
//       )}

//       {/* Header */}
//       <div className="flex items-start justify-between mb-4">
//         <div>
//           <h2 className="text-xl font-semibold text-gray-800">{station.RetailStationName}</h2>
//           <div className="mt-2 flex flex-wrap gap-2 text-sm text-gray-600">
//             <span className="bg-gray-100 px-2 py-1 rounded-2xl">{t('license')}: {station.EWURALicenseNo}</span>
//             <span className="bg-gray-100 px-2 py-1 rounded-2xl">{t('totalNumberTanks')}: {station.TotalNoTanks}</span>
//             <span className="bg-gray-100 px-2 py-1 rounded-2xl">{t('personEmail')}: {station.ContactPersonEmailAddress}</span>
//             <span className="bg-gray-100 px-2 py-1 rounded-2xl">{t('personPhone')}: {station.ContactPersonPhone}</span>
//             <span className="bg-gray-100 px-2 py-1 rounded-2xl">{t('tax')}: {station.Tax_office}</span>
//             <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-2xl">{t('region')}: {station.RegionName}</span>
//             <span className="bg-green-100 text-green-800 px-2 py-1 rounded-2xl">{t('district')}: {station.DistrictName}</span>
//           </div>
//         </div>
//         <div className="flex gap-3 text-gray-500 text-lg">
//           <FaUserCog className="w-6 h-6 hover:text-blue-600 cursor-pointer" onClick={() => setShowOperator(p => !p)} />
//           <FaServer className="w-6 h-6 hover:text-green-600 cursor-pointer" onClick={() => setShowProvider(p => !p)} />
//           <IoIosPerson className="w-6 h-6 hover:text-green-600 cursor-pointer" onClick={() => setShowProvider(p => !p)} />
//         </div>
//       </div>

//       {/* Actions */}
//       <div className="flex justify-end gap-2 mt-4">
//         <button
//           onClick={handleEdit}
//           className="flex items-center gap-2 px-3 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm"
//         >
//           <FaEdit /> {t('edit')}
//         </button>
//         <button
//           onClick={handleDelete}
//           className="flex items-center gap-2 px-3 py-1.5 rounded bg-red-600 text-white hover:bg-red-700 text-sm"
//           disabled={deleting}
//         >
//           {deleting ? (
//             <>
//               <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
//                 <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
//               </svg>
//               {t('deleting')}
//             </>
//           ) : (
//             <>
//               <FaTrash /> {t('Delete')}
//             </>
//           )}
//         </button>
//       </div>

//       {/* Operator Info */}
//       {showOperator && (
//         <div className="mt-4 bg-blue-50 border border-blue-100 p-4 rounded text-sm">
//           <h3 className="font-semibold text-blue-700 mb-2">Operator Info</h3>
//           <div className="space-y-1 text-blue-800">
//             <p><strong>{t('name')}:</strong> {station.OperatorName}</p>
//             <p><strong>TIN:</strong> {station.OperatorTin}</p>
//             <p><strong>XTIN:</strong> {station.Operator_XTin}</p>
//             <p><strong>VRN:</strong> {station.OperatorVrn}</p>
//             <p><strong>UIN:</strong> {station.OperatorUIN}</p>
//           </div>
//         </div>
//       )}

//       {/* Provider Info */}
//       {showProvider && (
//         <div className="mt-4 bg-green-50 border border-green-100 p-4 rounded text-sm">
//           <h3 className="font-semibold text-green-700 mb-2">Provider Info</h3>
//           <div className="space-y-1 text-green-800">
//             <p><strong>{t('provider')}:</strong> {station.VFD_provider}</p>
//             <p><strong>{t('URL')}:</strong> {station.VFD_provider_URL}</p>
//             <p><strong>{t('username')}:</strong> {station.VFD_provider_userName}</p>
//             <div className="relative group">
//               <p className="truncate cursor-help">
//                 <strong>{t('APIKey')}:</strong> {apiKeyPreview}...
//               </p>
//               <div className="absolute left-0 mt-1 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded shadow z-10 max-w-xs break-words">
//                 {station.VFD_provider_TAPIkey}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }





'use client';

import { useEffect, useState } from 'react';
import { stationProps } from '@/app/station/page';
import { FaUserCog, FaServer, FaEdit, FaTrash } from 'react-icons/fa';
import { IoIosPerson } from "react-icons/io";
import Swal from 'sweetalert2';
import EditComponent from '@/components/EditComponent';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { translate } from '@/translations/translate';
import { stationCardTranslations } from '@/translations/stationPage/stationCard';

interface Props {
  station: stationProps;
  setRefetchStation: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function StationCard({ station, setRefetchStation }: Props) {
  const [showOperator, setShowOperator] = useState(false);
  const [showProvider, setShowProvider] = useState(false);
  const [showPersonInfo, setShowPersonInfo] = useState(false);
  const [showEditComponent, setShowEditComponent] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  const lang = useSelector((state: RootState) => state.language.language);
  const t = (key: string) => translate(stationCardTranslations, lang, key).text;
  const license = translate(stationCardTranslations,lang,"license");


  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const apiKeyPreview = station.VFD_provider_TAPIkey?.slice(0, windowWidth < 768 ? 20 : 40);

  const handleEdit = () => setShowEditComponent(true);

  const handleDelete = async () => {
    setDeleting(true);
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: `Delete "${station.RetailStationName}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Delete'
    });

    if (!confirm.isConfirmed) return setDeleting(false);

    try {
      const token = sessionStorage.getItem('access_token');
      const res = await fetch(`/api/stations/delete-station?id=${station.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `${token}` }
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.error || 'Delete failed');
      }

      Swal.fire({ icon: 'success', title: 'Deleted!', timer: 1500, showConfirmButton: false });
      setRefetchStation(prev => !prev);
    } catch (err: any) {
      Swal.fire({ icon: 'error', title: 'Error', text: err.message });
    }

    setDeleting(false);
  };

  return (
    <div className={`relative bg-white border rounded-2xl shadow-sm hover:shadow-md transition p-6 w-full ${license.className} `}>
      {showEditComponent && (
        <div className="absolute z-50 top-20 left-1/2 -translate-x-1/2 bg-white p-4 shadow rounded-xl">
          <EditComponent
            station={station}
            showEditComponent={showEditComponent}
            setShowEditComponent={setShowEditComponent}
            setRefetchStation={setRefetchStation}
          />
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{station.RetailStationName}</h2>
          <div className="mt-2 flex flex-wrap gap-2 text-sm text-gray-600">
            <span className="bg-gray-100 px-2 py-1 rounded-2xl">{t('license')}: {station.EWURALicenseNo}</span>
            <span className="bg-gray-100 px-2 py-1 rounded-2xl">{t('totalNumberTanks')}: {station.TotalNoTanks}</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-2xl">{t('region')}: {station.RegionName}</span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-2xl">{t('district')}: {station.DistrictName}</span>
          </div>
        </div>
        <div className="flex gap-3 text-gray-500 text-lg">
          <FaUserCog className="w-6 h-6 hover:text-blue-600 cursor-pointer" onClick={() => setShowOperator(p => !p)} />
          <FaServer className="w-6 h-6 hover:text-green-600 cursor-pointer" onClick={() => setShowProvider(p => !p)} />
          <IoIosPerson className="w-6 h-6 hover:text-purple-600 cursor-pointer" onClick={() => setShowPersonInfo(p => !p)} />
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={handleEdit}
          className="flex items-center gap-2 px-3 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm"
        >
          <FaEdit /> {t('edit')}
        </button>
        <button
          onClick={handleDelete}
          className="flex items-center gap-2 px-3 py-1.5 rounded bg-red-600 text-white hover:bg-red-700 text-sm"
          disabled={deleting}
        >
          {deleting ? (
            <>
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              {t('deleting')}
            </>
          ) : (
            <>
              <FaTrash /> {t('Delete')}
            </>
          )}
        </button>
      </div>

      {/* Operator Info */}
      {showOperator && (
        <div className="mt-4 bg-blue-50 border border-blue-100 p-4 rounded text-sm">
          <h3 className="font-semibold text-blue-700 mb-2">Operator Info</h3>
          <div className="space-y-1 text-blue-800">
            <p><strong>{t('name')}:</strong> {station.OperatorName}</p>
            <p><strong>TIN:</strong> {station.OperatorTin}</p>
            <p><strong>XTIN:</strong> {station.Operator_XTin}</p>
            <p><strong>VRN:</strong> {station.OperatorVrn}</p>
            <p><strong>UIN:</strong> {station.OperatorUIN}</p>
          </div>
        </div>
      )}

      {/* Provider Info */}
      {showProvider && (
        <div className="mt-4 bg-green-50 border border-green-100 p-4 rounded text-sm">
          <h3 className="font-semibold text-green-700 mb-2">Provider Info</h3>
          <div className="space-y-1 text-green-800">
            <p><strong>{t('provider')}:</strong> {station.VFD_provider}</p>
            <p><strong>{t('URL')}:</strong> {station.VFD_provider_URL}</p>
            <p><strong>{t('username')}:</strong> {station.VFD_provider_userName}</p>
            <div className="relative group">
              <p className="truncate cursor-help">
                <strong>{t('APIKey')}:</strong> {apiKeyPreview}...
              </p>
              <div className="absolute left-0 mt-1 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded shadow z-10 max-w-xs break-words">
                {station.VFD_provider_TAPIkey}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Person Info */}
      {showPersonInfo && (
        <div className="mt-4 bg-purple-50 border border-purple-100 p-4 rounded text-sm">
          <h3 className="font-semibold text-purple-700 mb-2">{t('personInfo') || 'Contact Person Info'}</h3>
          <div className="space-y-1 text-purple-800">
            <p><strong>{t('personEmail') || 'Email'}:</strong> {station.ContactPersonEmailAddress}</p>
            <p><strong>{t('personPhone') || 'Phone'}:</strong> {station.ContactPersonPhone}</p>
            <p><strong>{t('tax') || 'Tax Office'}:</strong> {station.Tax_office}</p>
          </div>
        </div>
      )}
    </div>
  );
}
