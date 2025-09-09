import DailyReporstList from "@/components/DailyReportsList";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
    const params = await searchParams
    const start_date = params?.start_date|| ""
    const end_date = params?.end_date|| ""
    const report_no =Number(params?.report_no)
    const per_page = params?.per_page ?? "" // so if there is not it will be 1 by default
    const page = params?.page ?? ""
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
