import DailyReporstList from "@/components/DailyReportsList";
import { Suspense } from "react";

export default function Page({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
    const start_date = searchParams?.start_date||""
    const end_date = searchParams?.start_date||""
    const report_no =Number(searchParams?.report_no)
    const per_page = searchParams?.per_page ??"" // so if there is not it will be 1 by default
    const page = searchParams?.page ??""
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <DailyReporstList start_date={start_date!} end_date={end_date!} report_no={report_no!} per_page={per_page} page={page}/>
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
