// import DailyReporstList from "@/components/DailyReportsList";
// import { Suspense } from "react";

//  export default function page ({searchParams}:{searchParams:{per_page?:string,page?:string}}){

//     return(
//         <div>
//             <Suspense fallback={<LoadingSpinner />} >
//                 <DailyReporstList searchParams={searchParams} />
//             </Suspense>
//         </div>
//     )
// }


// function LoadingSpinner(){
//   return(
//     <div className="flex justify-center items-center p-10">
//       <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//     </div>
//   )
// }



import DailyReporstList from "@/components/DailyReportsList";
import { Suspense } from "react";

export default function Page({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <DailyReporstList
          searchParams={{
            per_page: searchParams.per_page as string | undefined,
            page: searchParams.page as string | undefined,
          }}
        />
      </Suspense>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center p-10">
      <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
