import FileDashboard from "./shared/file/dashboard";

interface PageProps {
  searchParams: {
    station?: string; // this will be the serial number from the URL
  };
}

export default function Page({ searchParams }: PageProps) {
  const stationSerial = searchParams.station || "all";

  return (
    <div>
      <FileDashboard stationSerial={stationSerial} />
    </div>
  );
}
