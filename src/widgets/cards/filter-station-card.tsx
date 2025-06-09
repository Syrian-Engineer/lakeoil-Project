// // import { useForm } from "react-hook-form";
// // import { Button } from "rizzui/button";

// // interface Props{
// //       setRefetchStations: React.Dispatch<React.SetStateAction<boolean>>;
// //       setShowFilterCard: React.Dispatch<React.SetStateAction<boolean>>;
// // }

// // interface Props1{
// //     EWURALicenseNo:string,
// //     LicenseeTraSerialNo:string
// // }

// // export default function StationFilterCard ({setRefetchStations,setShowFilterCard}:Props){
// //     const form = useForm<Props1>();
// //     const {register,handleSubmit} = form

// //     const handleDiscardButton = ()=>{

// //         setRefetchStations((prev)=>!prev)
// //         setShowFilterCard(false)
// //     }

// //     const onSubmit = (filterdData:Props1)=>{
// //         console.log(filterdData);
// //     }
// //     return(
// //         <div>
// //             <form action="" onSubmit={handleSubmit(onSubmit)}>
// //                 <input 
// //                     type="text" 
// //                     placeholder="EWURALicenseNo"
// //                     {...register("EWURALicenseNo")}
// //                 />

// //                 <input 
// //                     type="text" 
// //                     placeholder="LicenseeTraSerialNo"
// //                     {...register("LicenseeTraSerialNo")}
// //                 />
// //                 <Button
// //                     type="submit"
// //                 >
// //                     Save Filters
// //                 </Button>
// //             </form>

// //             <Button
// //              onClick={handleDiscardButton}
// //             >
// //                 Discard
// //             </Button>
// //         </div>
// //     )
// // }




// import { stationProps } from "@/app/station/page";
// import { RootState } from "@/store";
// import { stationFilterCardTranslations } from "@/translations/stationPage/filterCard";
// import { translate } from "@/translations/translate";
// import { useForm } from "react-hook-form";
// import { useSelector } from "react-redux";
// import { Button } from "rizzui/button";
// import Swal from "sweetalert2";


// interface Props {
//   setRefetchStations: React.Dispatch<React.SetStateAction<boolean>>;
//   setShowFilterCard: React.Dispatch<React.SetStateAction<boolean>>;
//   setFilteredStation: React.Dispatch<React.SetStateAction<stationProps | null>>;
// }

// export interface Props1 {
//   EWURALicenseNo: string;
//   LicenseeTraSerialNo: string;
// }

// export default function StationFilterCard({
//   setRefetchStations,
//   setShowFilterCard,
//   setFilteredStation
// }: Props) {
//   const form = useForm<Props1>();
//   const { register, handleSubmit } = form;

//   const handleDiscardButton = () => {
//     setRefetchStations((prev) => !prev);
//     setShowFilterCard(false);
//   };

//   const onSubmit = async (filteredData: Props1) => {
//         try {
//             console.log(filteredData);
//             const access_token = sessionStorage.getItem("access_token");

//             const response = await fetch("/api/station/get-station-byEwura", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `${access_token}`,
//             },
//             body: JSON.stringify({
//                 "EWURALicenseNo": filteredData.EWURALicenseNo,
//                 "LicenseeTraSerialNo": filteredData.LicenseeTraSerialNo,
//             }),
//             });
//               console.log("EWURALicenseNo",filteredData.EWURALicenseNo)
//               console.log("LicenseeTraSerialNo",filteredData.LicenseeTraSerialNo)
//             if (!response.ok) {
//             Swal.fire({
//                 icon: "error",
//                 title: "Error",
//                 text: "Failed to fetch station data. Please check your input.",
//             });
//             return;
//             }

//             const station: stationProps = await response.json();
//             console.log(station);

//             Swal.fire({
//             icon: "success",
//             title: "Success",
//             text: "Station data fetched successfully!",
//             });
//                setFilteredStation(station); // 👉 send to parent
//             // Optional: Close filter card or trigger refetch here
//                setRefetchStations((prev) => !prev);
//                setShowFilterCard(false);

//         } catch (error) {
//             console.error(error);
//             Swal.fire({
//             icon: "error",
//             title: "Unexpected Error",
//             text: "Something went wrong. Please try again later.",
//             });
//         }
//     };

//     // for translations
//     const lang = useSelector((state:RootState)=>state.language.language);
//     const discard = translate(stationFilterCardTranslations,lang,"discard");
//     const saveFilters = translate(stationFilterCardTranslations,lang,"saveFilters");

//   return (
//     <div className="max-w-md w-full p-6 bg-white rounded-xl shadow-md border mx-auto">
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <div>
//           <input
//             type="text"
//             placeholder="EWURA License No"
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             {...register("EWURALicenseNo")}
//           />
//         </div>

//         <div>
//           <input
//             type="text"
//             placeholder="Licensee Tra Serial No"
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             {...register("LicenseeTraSerialNo")}
//           />
//         </div>

//         <div className="flex justify-between gap-4 pt-2">
//           <Button
//             type="button"
//             variant="outline"
//             className={`w-full bg-gray-100 text-gray-800 hover:bg-gray-200 ${discard.className}`}
//             onClick={handleDiscardButton}
//           >
//             {discard.text}
//           </Button>
//           <Button type="submit" className={`w-full ${saveFilters.className}`}>
//             {saveFilters.text}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }









import { stationProps } from "@/app/station/page";
import { RootState } from "@/store";
import { stationFilterCardTranslations } from "@/translations/stationPage/filterCard";
import { translate } from "@/translations/translate";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Button } from "rizzui/button";
import Swal from "sweetalert2";

interface Props {
  setRefetchStations: React.Dispatch<React.SetStateAction<boolean>>;
  setShowFilterCard: React.Dispatch<React.SetStateAction<boolean>>;
  setFilteredStation: React.Dispatch<React.SetStateAction<stationProps | null>>;
}

export interface Props1 {
  EWURALicenseNo: string;
  LicenseeTraSerialNo: string;
}

export default function StationFilterCard({
  setRefetchStations,
  setShowFilterCard,
  setFilteredStation,
}: Props) {
  const form = useForm<Props1>();
  const { register, handleSubmit } = form;

  const handleDiscardButton = () => {
    setRefetchStations((prev) => !prev);
    setShowFilterCard(false);
  };

  const onSubmit = async (filteredData: Props1) => {
    try {
      const access_token = sessionStorage.getItem("access_token");

      const response = await fetch("/api/station/get-station-byEwura", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${access_token}`,
        },
        body: JSON.stringify(filteredData),
      });

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch station data. Please check your input.",
        });
        return;
      }

      const station: stationProps = await response.json();

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Station data fetched successfully!",
      });

      setFilteredStation(station);
      setRefetchStations((prev) => !prev);
      setShowFilterCard(false);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Unexpected Error",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  const lang = useSelector((state: RootState) => state.language.language);
  const discard = translate(stationFilterCardTranslations, lang, "discard");
  const saveFilters = translate(stationFilterCardTranslations, lang, "saveFilters");

  return (
    <div className=" w-full p-6 bg-white rounded-xl shadow-md border mx-auto">
      <h2 className="mb-3">Filter Stations</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="EWURALicenseNo" className="block text-sm font-medium text-gray-700 mb-1">
              EWURA License No
            </label>
            <input
              id="EWURALicenseNo"
              type="text"
              placeholder="Enter EWURA License No"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("EWURALicenseNo")}
            />
          </div>

          <div>
            <label htmlFor="LicenseeTraSerialNo" className="block text-sm font-medium text-gray-700 mb-1">
              Licensee Tra Serial No
            </label>
            <input
              id="LicenseeTraSerialNo"
              type="text"
              placeholder="Enter Licensee Tra Serial No"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("LicenseeTraSerialNo")}
            />
          </div>
        </div>

        <div className="flex justify-between gap-4 pt-2">
          <Button
            type="button"
            variant="outline"
            className={`w-full bg-gray-100 text-gray-800 hover:bg-gray-200 ${discard.className}`}
            onClick={handleDiscardButton}
          >
            {discard.text}
          </Button>
          <Button type="submit" className={`w-full ${saveFilters.className}`}>
            {saveFilters.text}
          </Button>
        </div>
      </form>
    </div>
  );
}
