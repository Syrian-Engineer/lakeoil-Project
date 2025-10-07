
import PumpCardsServer from '@/components/server/pump/PumpCardsServer';

export default function page() {
 
  return (
    <div className="grid grid-cols-1 gap-6 @container 3xl:gap-8">
      <PumpCardsServer  />
      
    </div>
  );   
}
