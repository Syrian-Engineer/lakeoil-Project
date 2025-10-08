import FileDashboard from "./shared/file/dashboard";

interface PageProps {
  searchParams: {
    station?: string; // this will be the serial number from the URL
  };
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams
  const stationSerial = params.station || "all";

  return (
    <div>
      <FileDashboard stationSerial={stationSerial} />
    </div>
  );
}
