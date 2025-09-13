// import { cookies } from "next/headers";
// import TankCard from "./TankCard";

// export default async function TankCardList() {
//   const access_token = (await cookies()).get("access_token")?.value;

//   if (!access_token) {
//     throw new Error("No access token found");
//   }

//   // Run both requests in parallel
//   const [tanksRes, stationsRes] = await Promise.all([
//     fetch("http://central.oktin.ak4tek.com:3950/ak4tek/tanks/all", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization:`${access_token}`,
//       },
//     }),
//     fetch("http://central.oktin.ak4tek.com:3950/stationinfo/all", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization:`${access_token}`,
//       },
//     }),
//   ]);

//     if (!tanksRes.ok) {
//     throw new Error("There Is No Tanks");
//   }
//   if (!stationsRes.ok) {
//     throw new Error("There Is No Stations");
//   }

//   const tanksResult = await tanksRes.json();
//   const stationsResult = await stationsRes.json();

//   console.log("Tanks result:", tanksResult);
//   console.log("Stations result:", stationsResult);
  

//   const tanks = tanksResult.data || [];
//   const stations = stationsResult.data || [];

//   return <TankCard tanks1={tanks} stations={stations} />;
// }




import { cookies } from "next/headers";
import TankCard from "./TankCard";

export default async function TankCardList() {
  const access_token = (await cookies()).get("access_token")?.value;

  if (!access_token) {
    throw new Error("No access token found");
  }

  // Run both requests in parallel
  const [tanksRes, stationsRes] = await Promise.all([
    fetch("http://central.oktin.ak4tek.com:3950/ak4tek/tanks/all", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${access_token}`,
      },
    }),
    fetch("http://central.oktin.ak4tek.com:3950/stationinfo/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${access_token}`,
      },
    }),
  ]);

  if (!tanksRes.ok) throw new Error("There Are No Tanks");
  if (!stationsRes.ok) throw new Error("There Are No Stations");

  const tanksResult = await tanksRes.json();
  const stationsResult = await stationsRes.json();

  const tanks = tanksResult.data || [];
  const stations = stationsResult.data || [];

  // Group tanks by LicenseeTraSerialNo
  const tanksByStation: Record<string, typeof tanks> = {};

  stations.forEach((station: any) => {
    const serialNo = station.LicenseeTraSerialNo;
    tanksByStation[serialNo] = tanks.filter(
      (tank: any) => tank.LicenseeTraSerialNo === serialNo
    );
  });

  // Optional: Attach tanks array to each station object
  const stationsWithTanks = stations.map((station: any) => ({
    ...station,
    tanks: tanksByStation[station.LicenseeTraSerialNo] || [],
  }));

  console.log("Stations with Tanks:", stationsWithTanks);

  return <TankCard tanks1={stationsWithTanks} />;
}
