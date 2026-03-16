import { RouterProvider, useRouter } from './context/RouterContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BlogPage           from './pages/BlogPage'
import ResearchPage       from './pages/ResearchPage'
import ContactPage        from './pages/ContactPage'
import PaymentEthicsPage  from './pages/PaymentEthicsPage'
import AboutPage          from './pages/ContactPage'  

import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import TherapistsPage from './pages/TherapistsPage'
import TherapistDetailPage from './pages/TherapistDetailPage'
import BookingPage from './pages/BookingPage'
import AssessmentsPage from './pages/AssessmentsPage'
import AssessmentTakePage from './pages/AssessmentTakePage'
import ResourcesPage from './pages/ResourcesPage'
import CoursesPage from './pages/CoursesPage'
import MyAccountPage from './pages/Myaccountpage'

import SignInPage from './pages/SignInPage'
import RegisterPage from './pages/RegisterPage'
import StorePage from './pages/StorePage'
import ClientPortalPage from './pages/ClientsPortalPage'

import CommunityPage from './pages/CommunityPage'
import AIToolsPage from './pages/AitoolsPage'
import DisordersPage from './pages/DisordersPage'
import PsychologicalViewPage from './pages/PsychologicalViewPage'

const ROUTES = {
  '/':                   HomePage,
  '/services':           ServicesPage,
  '/therapists':         TherapistsPage,
  '/therapist-detail':   TherapistDetailPage,
  '/book':               BookingPage,
  '/assessments':        AssessmentsPage,
  '/assessment-take':    AssessmentTakePage,
  '/resources':          ResourcesPage,
  '/courses':            CoursesPage,
  '/blog':               BlogPage,
  '/contact':            ContactPage,
  '/signin':             SignInPage,
  '/register':           RegisterPage,
  '/store':              StorePage,
  '/portal':             ClientPortalPage,
  '/research':           ResearchPage,
  '/community':          CommunityPage,
  '/ai-tools':           AIToolsPage,
  '/account':            MyAccountPage,
  '/disorders':          DisordersPage,
  '/psychological-view': PsychologicalViewPage,
 
  '/payment':     PaymentEthicsPage,
  '/about':       ContactPage,
}

function AppRoutes() {
  const { currentPath } = useRouter()
  const Page = ROUTES[currentPath] || HomePage
  return <Page />
}

export default function App() {
  return (
    <RouterProvider>
      <div className="app">
        <Navbar />
        <AppRoutes />
        <Footer />
      </div>
    </RouterProvider>
  )
}