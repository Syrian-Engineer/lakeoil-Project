// // app/widgets/PumpCardsServer.tsx (or wherever appropriate)
// import PumpCardsGrid from "@/app/pumps/component/PumpCardsGrid";

// interface Pump {
//   id: number;
//   name: string;
//   code: number;
//   approval: number;
//   virtual_totalizer: number;
//   mechanical_totalizer: number;
//   is_connected: number;
//   is_disconnected: number;
// }

// // This is a server component
// export default async function PumpCardsServer() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/proxy/pumps`, {
//     // make sure it runs on the server
//     cache: 'no-store',
//   });

//   const data = await res.json();

//   const pumps: Pump[] = data?.data?.page_records || [];

//   return <PumpCardsGrid pumps={pumps}  />;
// }





import PumpCardsGrid from "@/app/pumps/component/PumpCardsGrid";
import { headers } from 'next/headers';

export interface Pump {
  id: number;
  name: string;
  code: number;
  approval: number;
  virtual_totalizer: number;
  mechanical_totalizer: number;
  is_connected: number;
  is_disconnected: number;
}

export default async function PumpCardsServer() {

  const cookie = (await headers()).get('cookie');

  const res = await fetch('http://10.8.0.39:6900/pumps/getall', {
    headers:{
        cookie:cookie||""
    },
    credentials: 'include', // include this just in case your backend expects it
    cache: 'no-store',
  });

  if (!res.ok) {
    console.error('❌ Backend fetch failed with status:', res.status);
    return <div>Failed to load pump data.</div>;
  }

  const data = await res.json();
  const pumps: Pump[] = data?.data?.page_records || [];

  return <PumpCardsGrid pumps={pumps} />;
}
