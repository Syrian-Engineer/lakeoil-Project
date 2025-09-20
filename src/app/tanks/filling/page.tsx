import FillingCardList from "@/components/FillingCardList";
import { Suspense } from "react";

export default function page (){
    return(
        <div>
            <Suspense fallback={<LoadingSpinner />}>
                <FillingCardList />
            </Suspense>
        </div>
    )
}


function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center p-10">
      <div className="h-10 w-10 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}