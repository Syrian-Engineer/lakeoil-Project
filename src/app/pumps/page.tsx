'use client';

import { useSearchParams } from 'next/navigation';
import PumpCardsGrid from './component/PumpCardsGrid';

export default function page() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name"); // From URL: ?name=Pump1

  return (
    <div className="grid grid-cols-1 gap-6 @container 3xl:gap-8">
      <PumpCardsGrid selectedPumpName={name} />
    </div>
  );
}
