import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import JobsPage from './pages/JobsPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import PostJobPage from './pages/PostJobPage.jsx';
import MyJobsPage from './pages/MyJobsPage.jsx';
import JobDetailPage from './pages/JobDetailPage.jsx';
import ApplyPage from './pages/ApplyPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import AppliedJobsPage from './pages/AppliedJobsPage.jsx';
import EmployerApplicationsPage from './pages/EmployerApplicationsPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import SavedJobsPage from './pages/SavedJobsPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import CompaniesPage from './pages/CompaniesPage.jsx';
import CompanyPage from './pages/CompanyPage.jsx';
import AlertsPage from './pages/AlertsPage.jsx';
import AlertMatchesPage from './pages/AlertMatchesPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<JobsPage />} />
        <Route path="/welcome" element={<HomePage />} />
        <Route element={<ProtectedRoute />}><Route path="/dashboard" element={<DashboardPage />} /><Route path="/saved-jobs" element={<SavedJobsPage />} /><Route path="/alerts" element={<AlertsPage />} /><Route path="/alerts/:id" element={<AlertMatchesPage />} /><Route path="/admin" element={<AdminPage />} /></Route>
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:id" element={<JobDetailPage />} />
        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="/companies/:name" element={<CompanyPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage mode="register" />} />
        <Route path="/jobs/:id/apply" element={<ApplyPage />} />
        <Route element={<ProtectedRoute />}><Route path="/post-job" element={<PostJobPage />} /><Route path="/my-jobs" element={<MyJobsPage />} /><Route path="/applications" element={<EmployerApplicationsPage />} /><Route path="/profile" element={<ProfilePage />} /><Route path="/applied-jobs" element={<AppliedJobsPage />} /></Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

