import DailyReporstList from "@/components/DailyReportsList";
import { Suspense } from "react";

// Make the signature compatible with the generated type
export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<any>;
}) {
  // Await defensively: works whether it's a Promise or a plain object
  const raw = (await searchParams) ?? {};
  const sp = raw as Record<string, string | undefined>;

  const start_date = sp.start_date ?? "";
  const end_date = sp.end_date ?? "";
  const report_no = Number(sp.report_no);
  const per_page = sp.per_page ?? "";
  const page = sp.page ?? "";
  const station = sp.station ?? ""

  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <DailyReporstList
          start_date={start_date}
          end_date={end_date}
          report_no={report_no}
          per_page={per_page}
          page={page}
          station={station}
        />
      </Suspense>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center p-10">
      <div className="h-10 w-10 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

