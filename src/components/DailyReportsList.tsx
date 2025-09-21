import { cookies } from "next/headers";
import DailyReporstCard from "./DailyReportsCard";
import { redirect } from "next/navigation";

interface Props {
  start_date:string,
  end_date:string,
  report_no:number
  per_page:string,
  page:string
  station:string
}

export default async function DailyReporstList({start_date,end_date,report_no,per_page,page,station}:Props) {

  const access_token = (await cookies()).get("access_token")?.value;

  if(!per_page || !page){
    redirect("?per_page=1&page=1")
  }
  // Encode start_date and end_date for URL safety
  const encodedStart = encodeURIComponent(start_date);
  const encodedEnd = encodeURIComponent(end_date);
// &report_no=${report_no}
  const response = await fetch(`http://central.oktin.ak4tek.com:3950/daily_report?start_date=${encodedStart}&end_date=${encodedEnd}&per_page=${per_page}&page=${page}&EWURALicenseNo=${station}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${access_token}`,
    },
    next:{revalidate:100}
  });

  const result = await response.json();
  if(!result){
    throw new Error("There Is No Daily Reports")
  }
  console.log(result)
  const dailyReports = result.reports || []; // likely an array
  const pages = result?.pagination?.pages || 1;
  const totalReprots = result?.pagination?.total ||0;

  return <DailyReporstCard dailyReports={dailyReports} pages={pages} totalReports={totalReprots} />;
}