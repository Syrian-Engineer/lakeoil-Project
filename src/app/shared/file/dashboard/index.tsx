import StorageReport from './storage-report';
import FileStats from './file-stats';
import StorageSummary from './storage-summary';


export default function FileDashboard() {
  return (
    <div className="@container">
      <FileStats className="mb-5 2xl:mb-8" />
      <div className="mb-6 grid grid-cols-1 gap-6 @4xl:grid-cols-12 2xl:mb-8 2xl:gap-8">
        <StorageReport className="@container @4xl:col-span-8 @[96.937rem]:col-span-9" />
        <StorageSummary className="@4xl:col-span-4 @[96.937rem]:col-span-3" />
      </div>
    </div>
  );
}
