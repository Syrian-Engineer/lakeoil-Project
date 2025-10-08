import FileDashboard from "./shared/file/dashboard";

// ✅ Match the official Next.js App Router type pattern
export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | undefined>>;
}) {
  // Works whether searchParams is a Promise or not
  const raw = (await searchParams) ?? {};
  const sp = raw as Record<string, string | undefined>;

  const stationSerial = sp.station || "all";

  return (
    <div>
      <FileDashboard stationSerial={stationSerial} />
    </div>
  );
}
