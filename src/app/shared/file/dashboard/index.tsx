// import StorageReport from './storage-report';
// import FileStats from './file-stats';
// import StorageSummary from './storage-summary';
// import StationSelector from './StationSelector';

// interface Props {
//   stationSerial:string
// }
// export default function FileDashboard({stationSerial}:Props) {

//   return (
//     <div className="@container">
//       <StationSelector />
//       <FileStats className="mb-5 2xl:mb-8" stationSerial={stationSerial}/>
//       <div className="mb-6 grid grid-cols-1 gap-6 @4xl:grid-cols-12 2xl:mb-8 2xl:gap-8">
//         <StorageReport className="@container @4xl:col-span-8 @[96.937rem]:col-span-9" stationSerial={stationSerial} />
//         <StorageSummary className="@4xl:col-span-4 @[96.937rem]:col-span-3" />
//       </div>
//     </div>
//   );
// }

import StorageReport from './storage-report';
import FileStats from './file-stats';
import StorageSummary from './storage-summary';
import StationSelector from './StationSelector';

interface Props {
  stationSerial: string;
}

export default function FileDashboard({ stationSerial }: Props) {
  return (
    <div className="@container">
      <StationSelector />
      <FileStats className="mb-5 2xl:mb-8" stationSerial={stationSerial} />

      {/* Make StorageReport full width */}
      <div className="mb-6 w-full">
        <StorageReport
          className="w-full"
          stationSerial={stationSerial}
        />
      </div>

      {/* StorageSummary can remain in a grid if needed */}
      <div className="mb-6 grid grid-cols-1 gap-6 @4xl:grid-cols-12 2xl:mb-8 2xl:gap-8">
        <StorageSummary className="@4xl:col-span-4 @[96.937rem]:col-span-3" />
      </div>
    </div>
  );
}
