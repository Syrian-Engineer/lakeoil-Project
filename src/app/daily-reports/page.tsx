import DailyReporstList from "@/components/DailyReportsList";
import { Suspense } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

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
    <div className="flex flex-col items-center justify-center py-12">
      <div className="rounded-full bg-blue-100 p-4 shadow-lg">
        <AiOutlineLoading3Quarters
          className="h-9 w-9 animate-spin text-blue-600"
        />
      </div>

      <span className="mt-4 text-sm font-medium tracking-wide text-gray-600">
        Loading data...
      </span>
    </div>
  );
}

