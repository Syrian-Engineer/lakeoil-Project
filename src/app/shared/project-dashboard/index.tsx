import { Box } from 'rizzui/box';
import ProjectSummary from './project-summary';

export default function ProjectDashboard() {
  return (
    <Box className="@container/pd">
      <Box className="grid grid-flow-row grid-cols-1 gap-6 @3xl/pd:grid-cols-12 3xl:gap-8">
        <ProjectSummary className="@3xl/pd:col-span-full @7xl/pd:col-span-8" />
      </Box>
    </Box>
  );
}
