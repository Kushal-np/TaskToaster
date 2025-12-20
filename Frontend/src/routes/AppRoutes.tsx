import { Routes, Route } from 'react-router-dom';

// Layouts
import AppLayout from '../components/layout/AppLayout';
import DashboardLayout from '../components/layout/DashboardLayout';

// Route Guards
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import ClubAdminRoutes from './ClubAdminRoutes';

// Public Pages
import LandingPage from '../pages/public/LandingPage';
import LoginPage from '../pages/public/LoginPage';
import RegisterPage from '../pages/public/RegisterPage';
import ForgotPasswordPage from '../pages/public/ForgotPasswordPage';
import PublicAgendaPage from '../pages/public/PublicAgendaPage';

// Onboarding Pages
import OnboardingPage from '../pages/onboarding/OnboardingPage';
import CreateClubPage from '../pages/onboarding/CreateClubPage';
import JoinClubPage from '../pages/onboarding/JoinClubPage';
import SetupCompletePage from '../pages/onboarding/SetupCompletePage';

// Main App Pages
import NotificationsPage from '../pages/dashboard/NotificationsPage';
import ProfilePage from '../pages/profile/ProfilePage';
import EditProfilePage from '../pages/profile/EditProfilePage';
import RoleHistoryPage from '../pages/profile/RoleHistoryPage';
import SpeechesPage from '../pages/profile/SpeechesPage';
import TableTopicsPage from '../pages/profile/TableTopicsPage';
import PathwaysPage from '../pages/profile/PathwaysPage';
import ClubDirectoryPage from '../pages/clubs/ClubDirectoryPage';
import ClubDashboardPage from '../pages/clubs/ClubDashboardPage';
import ClubSettingsPage from '../pages/clubs/ClubSettingsPage';
import MemberManagementPage from '../pages/clubs/MemberManagementPage';
import ClubCalendarPage from '../pages/clubs/ClubCalendarPage';
import MeetingCalendarPage from '../pages/meetings/MeetingCalendarPage';
import CreateMeetingPage from '../pages/meetings/CreateMeetingPage';
import MeetingDetailPage from '../pages/meetings/MeetingDetailPage';
import EditMeetingPage from '../pages/meetings/EditMeetingPage';
import AgendaBuilderPage from '../pages/meetings/AgendaBuilderPage';
import LiveMeetingPage from '../pages/meetings/LiveMeetingPage';
import MeetingReportsPage from '../pages/meetings/MeetingReportsPage';
import GuestDirectoryPage from '../pages/guests/GuestDirectoryPage';
import AddGuestPage from '../pages/guests/AddGuestPage';
import GuestProfilePage from '../pages/guests/GuestProfilePage';
import EventsCalendarPage from '../pages/events/EventsCalendarPage';
import EventDetailPage from '../pages/events/EventDetailPage';
import CreateEventPage from '../pages/events/CreateEventPage';
import EditEventPage from '../pages/events/EditEventPage';
import MyRSVPsPage from '../pages/events/MyRSVPsPage';
import TemplateGalleryPage from '../pages/templates/TemplateGalleryPage';
import CreateTemplatePage from '../pages/templates/CreateTemplatePage';
import EditTemplatePage from '../pages/templates/EditTemplatePage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import Navbar from '../components/layout/Navbar';

const AppRoutes = () => {
  return (
    <div>
      <Navbar/>
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoutes />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/public/agenda/:meetingId" element={<PublicAgendaPage />} />
      </Route>

      {/* Authenticated Routes */}
      <Route element={<PrivateRoutes />}>
        <Route element={<AppLayout />}>
          {/* Onboarding */}
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/onboarding/create-club" element={<CreateClubPage />} />
          <Route path="/onboarding/join-club" element={<JoinClubPage />} />
          <Route path="/onboarding/complete" element={<SetupCompletePage />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
          </Route>

          {/* Profile */}
          <Route path="/profile" element={<ProfilePage />}>
            <Route index element={<RoleHistoryPage />} />
            <Route path="roles" element={<RoleHistoryPage />} />
            <Route path="speeches" element={<SpeechesPage />} />
            <Route path="table-topics" element={<TableTopicsPage />} />
            <Route path="pathways" element={<PathwaysPage />} />
          </Route>
          <Route path="/profile/edit" element={<EditProfilePage />} />

          {/* Clubs */}
          <Route path="/clubs" element={<ClubDirectoryPage />} />
          <Route path="/clubs/:clubId" element={<ClubDashboardPage />} />
          <Route path="/clubs/:clubId/calendar" element={<ClubCalendarPage />} />
          <Route element={<ClubAdminRoutes />}>
            <Route path="/clubs/:clubId/settings" element={<ClubSettingsPage />} />
            <Route path="/clubs/:clubId/members" element={<MemberManagementPage />} />
          </Route>

          {/* Meetings */}
          <Route path="/meetings" element={<MeetingCalendarPage />} />
          <Route path="/meetings/create/:clubId" element={<CreateMeetingPage />} />
          <Route path="/meetings/:id" element={<MeetingDetailPage />} />
          <Route path="/meetings/:id/edit" element={<EditMeetingPage />} />
          <Route path="/meetings/:id/agenda" element={<AgendaBuilderPage />} />
          <Route path="/meetings/:id/live" element={<LiveMeetingPage />} />
          <Route path="/meetings/:id/reports" element={<MeetingReportsPage />} />

          {/* Guests */}
          <Route path="/guests" element={<GuestDirectoryPage />} />
          <Route path="/guests/add" element={<AddGuestPage />} />
          <Route path="/guests/:guestId" element={<GuestProfilePage />} />

          {/* Events */}
          <Route path="/events" element={<EventsCalendarPage />} />
          <Route path="/events/create" element={<CreateEventPage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />
          <Route path="/events/:id/edit" element={<EditEventPage />} />
          <Route path="/my-rsvps" element={<MyRSVPsPage />} />

          {/* Templates */}
          <Route path="/templates" element={<TemplateGalleryPage />} />
          <Route path="/templates/create" element={<CreateTemplatePage />} />
          <Route path="/templates/:id/edit" element={<EditTemplatePage />} />
        </Route>
      </Route>
    </Routes>
    </div>
  );
};

export default AppRoutes;