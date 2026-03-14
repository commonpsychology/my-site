import { RouterProvider, useRouter } from './context/RouterContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import TherapistsPage from './pages/TherapistsPage'
import TherapistDetailPage from './pages/TherapistDetailPage'
import BookingPage from './pages/BookingPage'
import AssessmentsPage from './pages/AssessmentsPage'
import AssessmentTakePage from './pages/AssessmentTakePage'
import ResourcesPage from './pages/ResourcesPage'
import CoursesPage from './pages/CoursesPage'
import BlogPage from './pages/BlogPage'
import ContactPage from './pages/ContactPage'
import SignInPage from './pages/SignInPage'
import RegisterPage from './pages/RegisterPage'
import StorePage from './pages/StorePage'

function AppRoutes() {
  const { currentPath } = useRouter()
  const routes = {
    '/':                  <HomePage />,
    '/services':          <ServicesPage />,
    '/therapists':        <TherapistsPage />,
    '/therapist-detail':  <TherapistDetailPage />,
    '/book':              <BookingPage />,
    '/assessments':       <AssessmentsPage />,
    '/assessment-take':   <AssessmentTakePage />,
    '/resources':         <ResourcesPage />,
    '/courses':           <CoursesPage />,
    '/blog':              <BlogPage />,
    '/contact':           <ContactPage />,
    '/signin':            <SignInPage />,
    '/register':          <RegisterPage />,
    '/store':             <StorePage />,
  }
  return routes[currentPath] || <HomePage />
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