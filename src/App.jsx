import { RouterProvider, useRouter } from './context/RouterContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

/* ── Existing pages ── */
import HomePage            from './pages/HomePage'
import ServicesPage        from './pages/ServicesPage'
import TherapistsPage      from './pages/TherapistsPage'
import TherapistDetailPage from './pages/TherapistDetailPage'
import BookingPage         from './pages/BookingPage'
import AssessmentsPage     from './pages/AssessmentsPage'
import AssessmentTakePage  from './pages/AssessmentTakePage'
import ResourcesPage       from './pages/ResourcesPage'
import CoursesPage         from './pages/CoursesPage'
import BlogPage            from './pages/BlogPage'
import ResearchPage        from './pages/ResearchPage'
import ContactPage         from './pages/ContactPage'
import PaymentEthicsPage   from './pages/PaymentEthicsPage'
import SignInPage          from './pages/SignInPage'
import RegisterPage        from './pages/RegisterPage'
import StorePage           from './pages/StorePage'
import ClientPortalPage    from './pages/ClientsPortalPage'
import CommunityPage       from './pages/CommunityPage'
import AIToolsPage         from './pages/AitoolsPage'
import MyAccountPage       from './pages/Myaccountpage'
import DisordersPage       from './pages/DisordersPage'
import PsychologicalViewPage from './pages/PsychologicalViewPage'
import WorkshopsPage       from './pages/WorkshopPage'
import SocialWorkPage      from './pages/SocialworkPage'
import GalleryPage         from './pages/GalleryPage'
import VolunteerPage       from './pages/VolunteerPage'

/* ── New pages ── */
import PaymentPage         from './pages/Paymentpage'
import StaffLoginPage      from './pages/StaffloginPage'
import AdminDashboard      from './pages/AdmindashboardPage'
import TherapistDashboard  from './pages/TherapistdashboardPage'

const ROUTES = {
  '/':                   HomePage,
  '/services':           ServicesPage,
  '/therapists':         TherapistsPage,
  '/therapist-detail':   TherapistDetailPage,
  '/book':               BookingPage,
  '/payment':            PaymentPage,
  '/payment-info':       PaymentEthicsPage,
  '/assessments':        AssessmentsPage,
  '/assessment-take':    AssessmentTakePage,
  '/resources':          ResourcesPage,
  '/courses':            CoursesPage,
  '/blog':               BlogPage,
  '/research':           ResearchPage,
  '/contact':            ContactPage,
  '/about':              ContactPage,
  '/signin':             SignInPage,
  '/register':           RegisterPage,
  '/store':              StorePage,
  '/portal':             ClientPortalPage,
  '/community':          CommunityPage,
  '/ai-tools':           AIToolsPage,
  '/account':            MyAccountPage,
  '/disorders':          DisordersPage,
  '/psychological-view': PsychologicalViewPage,
  '/workshops':          WorkshopsPage,
  '/social-work':        SocialWorkPage,
  '/gallery':            GalleryPage,
  '/volunteer':          VolunteerPage,
  '/staff':              StaffLoginPage,
  '/staff/admin':        AdminDashboard,
  '/staff/therapist':    TherapistDashboard,
}

const NO_SHELL_PAGES = new Set([
  '/signin',
  '/register',
  '/payment',
  '/staff',
  '/staff/admin',
  '/staff/therapist',
])

const NO_FOOTER_PAGES = new Set([
  '/portal',
  '/account',
])

function AppRoutes() {
  const { currentPath } = useRouter()
  const Page       = ROUTES[currentPath] || HomePage
  const hideShell  = NO_SHELL_PAGES.has(currentPath)
  const hideFooter = NO_FOOTER_PAGES.has(currentPath)

  if (hideShell) return <Page />

  return (
    <>
      <Navbar />
      <Page />
      {!hideFooter && <Footer />}
    </>
  )
}

export default function App() {
  return (
    <RouterProvider>
      <div className="app">
        <AppRoutes />
      </div>
    </RouterProvider>
  )
}