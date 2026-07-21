// ─────────────────────────────────────────────
//  App.tsx — Root application with MVC structure
// ─────────────────────────────────────────────

import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';

// ── Auth layer ─────────────────────────────────────────────────────────
import { AuthProvider, ProtectedRoute } from '@/auth';

// ── Global store ───────────────────────────────────────────────────────
import { CMSProvider } from '@/store';

// ── Animations ─────────────────────────────────────────────────────────
import PageTransition from '@/components/animations/PageTransition';

// ── Shared ─────────────────────────────────────────────────────────────
import ScrollToTop from '@/components/shared/ScrollToTop';

// ── Feature pages ──────────────────────────────────────────────────────
import Home               from '@/features/home/Home.page';
import About              from '@/features/about/About.page';
import ServicesPage       from '@/features/services/Services.page';
import IELTS              from '@/features/ielts/IELTS.page';
import PTE                from '@/features/pte/PTE.page';
import Destinations       from '@/features/destinations/Destinations.page';
import CountryDetail      from '@/features/destinations/CountryDetail.page';
import TurkeyDetail       from '@/features/destinations/TurkeyDetail.page';
import HungaryDetail      from '@/features/destinations/HungaryDetail.page';
import CanadaDetail       from '@/features/destinations/CanadaDetail.page';
import NewZealandDetail   from '@/features/destinations/NewZealandDetail.page';
import IrelandDetail      from '@/features/destinations/IrelandDetail.page';
import SwedenDetail       from '@/features/destinations/SwedenDetail.page';
import MalaysiaDetail     from '@/features/destinations/MalaysiaDetail.page';
import CyprusDetail       from '@/features/destinations/CyprusDetail.page';
import USADetail          from '@/features/destinations/USADetail.page';
import FinlandDetail      from '@/features/destinations/FinlandDetail.page';
import UKDetail           from '@/features/destinations/UKDetail.page';
import AustraliaDetail    from '@/features/destinations/AustraliaDetail.page';
import Contact            from '@/features/contact/Contact.page';
import Apply              from '@/features/apply/Apply.page';
import ApplyIELTS         from '@/features/apply/ApplyIELTS.page';
import ApplyPTE           from '@/features/apply/ApplyPTE.page';
import FreeConsultation   from '@/features/apply/FreeConsultation.page';
import Events             from '@/features/events/Events.page';
import Success            from '@/features/apply/Success.page';
import NotFound           from '@/features/NotFound.page';

// ── Admin feature ──────────────────────────────────────────────────────
import AdminLogin         from '@/features/admin/AdminLogin.page';
import EmployeeLogin      from '@/features/admin/EmployeeLogin.page';
import StudentLogin       from '@/features/admin/StudentLogin.page';
import AdminLayout        from '@/features/admin/components/AdminLayout';
import AdminDashboard     from '@/features/admin/AdminDashboard.page';
import AdminAds           from '@/features/admin/AdminAds.page';
import AdminTeam          from '@/features/admin/AdminTeam.page';
import AdminCourses       from '@/features/admin/AdminCourses.page';
import AdminPlaceholder   from '@/features/admin/components/Placeholder';
import ManageHome         from '@/features/admin/pages/ManageHome';
import ManageIELTS        from '@/features/admin/pages/ManageIELTS';
import ManagePTE          from '@/features/admin/pages/ManagePTE';
import ManageAbout        from '@/features/admin/pages/ManageAbout';
import ManageDestinations from '@/features/admin/pages/ManageDestinations';
import ManageServices     from '@/features/admin/pages/ManageServices';
import ManageEvents       from '@/features/admin/pages/ManageEvents';
import ManageContact      from '@/features/admin/pages/ManageContact';
import ManageEnquiries    from '@/features/admin/pages/ManageEnquiries';
import ManageTestQueries from '@/features/admin/pages/ManageTestQueries';
import ManageContactSubmissions from '@/features/admin/pages/ManageContactSubmissions';
import AdminSettings from '@/features/admin/pages/AdminSettings.page';

const queryClient = new QueryClient();

// ─────────────────────────────────────────────
//  Animated Routes
// ─────────────────────────────────────────────
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* ── Public Routes ── */}
        <Route path="/"                  element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about"             element={<PageTransition><About /></PageTransition>} />
        <Route path="/services"          element={<PageTransition><ServicesPage /></PageTransition>} />
        <Route path="/ielts"             element={<PageTransition><IELTS /></PageTransition>} />
        <Route path="/pte"               element={<PageTransition><PTE /></PageTransition>} />
        <Route path="/destinations"      element={<PageTransition><Destinations /></PageTransition>} />
        <Route path="/destinations/turkey" element={<PageTransition><TurkeyDetail /></PageTransition>} />
        <Route path="/destinations/hungary" element={<PageTransition><HungaryDetail /></PageTransition>} />
        <Route path="/destinations/canada" element={<PageTransition><CanadaDetail /></PageTransition>} />
        <Route path="/destinations/new-zealand" element={<PageTransition><NewZealandDetail /></PageTransition>} />
        <Route path="/destinations/ireland" element={<PageTransition><IrelandDetail /></PageTransition>} />
        <Route path="/destinations/sweden" element={<PageTransition><SwedenDetail /></PageTransition>} />
        <Route path="/destinations/malaysia" element={<PageTransition><MalaysiaDetail /></PageTransition>} />
        <Route path="/destinations/cyprus" element={<PageTransition><CyprusDetail /></PageTransition>} />
        <Route path="/destinations/usa" element={<PageTransition><USADetail /></PageTransition>} />
        <Route path="/destinations/finland" element={<PageTransition><FinlandDetail /></PageTransition>} />
        <Route path="/destinations/uk" element={<PageTransition><UKDetail /></PageTransition>} />
        <Route path="/destinations/australia" element={<PageTransition><AustraliaDetail /></PageTransition>} />
        <Route path="/destinations/:country" element={<PageTransition><CountryDetail /></PageTransition>} />
        <Route path="/contact"           element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/apply"             element={<PageTransition><Apply /></PageTransition>} />
        <Route path="/apply-ielts"       element={<PageTransition><ApplyIELTS /></PageTransition>} />
        <Route path="/apply-pte"         element={<PageTransition><ApplyPTE /></PageTransition>} />
        <Route path="/free-consultation" element={<PageTransition><FreeConsultation /></PageTransition>} />
        <Route path="/events"            element={<PageTransition><Events /></PageTransition>} />
        <Route path="/success"           element={<PageTransition><Success /></PageTransition>} />

        {/* ── Auth Routes ── */}
        <Route path="/admin/login"    element={<PageTransition><AdminLogin /></PageTransition>} />
        <Route path="/employee/login" element={<PageTransition><EmployeeLogin /></PageTransition>} />
        <Route path="/student/login"  element={<PageTransition><StudentLogin /></PageTransition>} />

        {/* ── Protected Admin Routes ── */}
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index                      element={<AdminDashboard />} />
          <Route path="dashboard"           element={<AdminDashboard />} />
          <Route path="team"                element={<AdminTeam />} />
          <Route path="courses"             element={<AdminCourses />} />
          <Route path="ads"                 element={<AdminAds />} />
          <Route path="pages/home"          element={<ManageHome />} />
          <Route path="pages/ielts"         element={<ManageIELTS />} />
          <Route path="pages/pte"           element={<ManagePTE />} />
          <Route path="pages/about"         element={<ManageAbout />} />
          <Route path="pages/destinations"  element={<ManageDestinations />} />
          <Route path="pages/services"      element={<ManageServices />} />
          <Route path="pages/events"        element={<ManageEvents />} />
          <Route path="pages/contact"       element={<ManageContact />} />
          <Route path="enquiries"           element={<ManageEnquiries />} />
          <Route path="contact-submissions" element={<ManageContactSubmissions />} />
          <Route path="test-queries"        element={<ManageTestQueries />} />
          <Route path="media"               element={<AdminPlaceholder title="Gallery & Media Manager" />} />
          <Route path="destinations"        element={<AdminPlaceholder title="Destinations Manager" />} />
          <Route path="settings"            element={<AdminSettings />} />
        </Route>

        {/* ── Protected Employee Routes ── */}
        <Route path="/employee" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index                      element={<AdminDashboard />} />
          <Route path="dashboard"           element={<AdminDashboard />} />
          <Route path="team"                element={<AdminTeam />} />
          <Route path="courses"             element={<AdminCourses />} />
          <Route path="ads"                 element={<AdminAds />} />
          <Route path="pages/home"          element={<ManageHome />} />
          <Route path="pages/ielts"         element={<ManageIELTS />} />
          <Route path="pages/pte"           element={<ManagePTE />} />
          <Route path="pages/about"         element={<ManageAbout />} />
          <Route path="pages/destinations"  element={<ManageDestinations />} />
          <Route path="pages/services"      element={<ManageServices />} />
          <Route path="pages/events"        element={<ManageEvents />} />
          <Route path="pages/contact"       element={<ManageContact />} />
          <Route path="enquiries"           element={<ManageEnquiries />} />
          <Route path="contact-submissions" element={<ManageContactSubmissions />} />
          <Route path="test-queries"        element={<ManageTestQueries />} />
          <Route path="media"               element={<AdminPlaceholder title="Gallery & Media Manager" />} />
          <Route path="destinations"        element={<AdminPlaceholder title="Destinations Manager" />} />
        </Route>

        {/* ── 404 ── */}
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

// ─────────────────────────────────────────────
//  App — Provider Hierarchy
//  AuthProvider > CMSProvider > QueryClient > UI > Router
// ─────────────────────────────────────────────
const App = () => (
  <HelmetProvider>
    <AuthProvider>
      <CMSProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <AnimatedRoutes />
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </CMSProvider>
    </AuthProvider>
  </HelmetProvider>
);

export default App;
