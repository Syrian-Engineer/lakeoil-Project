import { cookies } from "next/headers";
import DailyReporstCard from "./DailyReportsCard";
import { redirect } from "next/navigation";

export default async function DailyReporstList({searchParams}:{searchParams:{per_page?:string,page?:string}}) {

  const access_token = (await cookies()).get("access_token")?.value;

  if(!searchParams.per_page || !searchParams.page){
    redirect("?per_page=1&page=1")
  }

  const per_page = searchParams.per_page   
  const page = searchParams.page

  const response = await fetch(`http://78.189.54.28:2500/daily_report?per_page=${per_page}&page=${page}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${access_token}`,
    },
    cache: "no-store", // prevent caching if you want fresh data
  });

  const result = await response.json();
  if(!result){
    throw new Error("There Is No Daily Reports")
  }
  console.log(result)
  const dailyReports = result.reports; // likely an array
  const pages = result.pagination.pages

  return <DailyReporstCard dailyReports={dailyReports} pages={pages} />;
}