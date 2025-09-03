import DailyReporstCard from "@/components/DailyReportsCard";
import DailyReporstList from "@/components/DailyReportsList";
import { Suspense } from "react";

 export default function page ({searchParams}:{searchParams:{per_page?:string,page?:string}}){

    return(
        <div>
            <Suspense fallback={<LoadingSpinner />} >
                <DailyReporstList searchParams={searchParams} />
            </Suspense>
            {/* <DailyReporstCard /> */}
        </div>
    )
}


function LoadingSpinner(){
  return(
    <div className="flex justify-center items-center p-10">
      <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
}
