import { cookies } from "next/headers";
import DailyReporstCard from "./DailyReportsCard";
import { redirect } from "next/navigation";

export default async function DailyReporstList({searchParams}:{searchParams:{perpage?:string,page?:string}}) {

  const access_token = (await cookies()).get("access_token")?.value;

  if(!searchParams.perpage || !searchParams.page){
    redirect("?perpage=1&page=1")
  }

  const perpage = searchParams.perpage!   //“Trust me, this value will never be undefined here.”
  const page = searchParams.page!

  const response = await fetch(`http://78.189.54.28:2500/daily_report?per_page=${perpage}&page=${page}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${access_token}`,
    },
    cache: "no-store", // prevent caching if you want fresh data
  });

  const result = await response.json();
  const dailyReports = result.reports; // likely an array
  const pages = result.pages

  return <DailyReporstCard dailyReports={dailyReports} pages={pages} />;
}
