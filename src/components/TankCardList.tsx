import { cookies } from "next/headers";
import TankCard from "./TankCard";

export default async function TankCardList() {
  const access_token = (await cookies()).get("access_token")?.value;

  if (!access_token) {
    throw new Error("No access token found");
  }

  // ⏳ Add 5 sec delay
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // Run both requests in parallel
  const [tanksRes, stationsRes] = await Promise.all([
    fetch("http://central.oktin.ak4tek.com:3950/ak4tek/tanks/all", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:`${access_token}`,
      },
      next:{revalidate:100}
    }),
    fetch("http://central.oktin.ak4tek.com:3950/stationinfo/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:`${access_token}`,
      },
      next:{revalidate:100}
    }),
  ]);

    if (!tanksRes.ok) {
    throw new Error("There Is No Tanks");
  }
  if (!stationsRes.ok) {
    throw new Error("There Is No Stations");
  }

  const tanksResult = await tanksRes.json();
  const stationsResult = await stationsRes.json();

  console.log("Tanks result:", tanksResult);
  console.log("Stations result:", stationsResult);
  

  const tanks = tanksResult.data || [];
  const stations = stationsResult.data || [];

  return <TankCard tanks1={tanks} stations={stations} />;
}
