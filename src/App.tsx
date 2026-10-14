import { RouterProvider, useRouter } from '@/router/Router';
import { StoreProvider } from '@/store/ComplaintStore';
import { LandingPage } from '@/pages/LandingPage';
import { AuthPage } from '@/pages/AuthPage';
import { ComplaintDetails } from '@/pages/ComplaintDetails';
import { CitizenLayout } from '@/components/layout/CitizenLayout';
import { DepartmentLayout } from '@/components/layout/DepartmentLayout';
import { CitizenDashboard } from '@/pages/citizen/CitizenDashboard';
import { ReportComplaint } from '@/pages/citizen/ReportComplaint';
import { MyComplaints } from '@/pages/citizen/MyComplaints';
import { ComplaintHistory } from '@/pages/citizen/ComplaintHistory';
import { DepartmentDashboard } from '@/pages/department/DepartmentDashboard';
import { AssignedComplaints } from '@/pages/department/AssignedComplaints';
import { PriorityOverview } from '@/pages/department/PriorityOverview';
import { DepartmentWorkspace } from '@/pages/department/DepartmentWorkspace';

function Routes() {
  const { path } = useRouter();

  // Complaint details: /complaint/:id
  const complaintMatch = path.match(/^\/complaint\/(.+)$/);
  if (complaintMatch) {
    return <ComplaintDetails id={complaintMatch[1]} />;
  }

  // Auth
  if (path === '/login') return <AuthPage mode="login" />;
  if (path === '/signup') return <AuthPage mode="signup" />;

  // Citizen portal
  if (path === '/citizen/dashboard')
    return <CitizenLayout><CitizenDashboard /></CitizenLayout>;
  if (path === '/citizen/report')
    return <CitizenLayout><ReportComplaint /></CitizenLayout>;
  if (path === '/citizen/complaints')
    return <CitizenLayout><MyComplaints /></CitizenLayout>;
  if (path === '/citizen/history')
    return <CitizenLayout><ComplaintHistory /></CitizenLayout>;

  // Department portal
  if (path === '/department/dashboard')
    return <DepartmentLayout><DepartmentDashboard /></DepartmentLayout>;
  if (path === '/department/assigned')
    return <DepartmentLayout><AssignedComplaints /></DepartmentLayout>;
  if (path === '/department/priority')
    return <DepartmentLayout><PriorityOverview /></DepartmentLayout>;

  // Department workspace: /department/workspace/:id
  const workspaceMatch = path.match(/^\/department\/workspace\/(.+)$/);
  if (workspaceMatch) {
    return <DepartmentLayout><DepartmentWorkspace id={workspaceMatch[1]} /></DepartmentLayout>;
  }

  // Default: landing
  return <LandingPage />;
}

export default function App() {
  return (
    <RouterProvider>
      <StoreProvider>
        <Routes />
      </StoreProvider>
    </RouterProvider>
  );
}
