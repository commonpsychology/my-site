import { useRouter } from '../context/RouterContext'

const authPages = ['/signin', '/register']

export default function Footer() {
  const { navigate, currentPath } = useRouter()

  if (authPages.includes(currentPath)) return null

  const link = (path) => (e) => { e.preventDefault(); navigate(path) }

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="navbar-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer', marginBottom: '1rem' }}>
            <div className="logo-mark" style={{ background: 'var(--green-mid)' }}>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: 20, height: 20, fill: 'white' }}>
                <path d="M12 2C8.5 2 5.5 4.5 5 8c-.3 2 .5 4 2 5.5L12 22l5-8.5c1.5-1.5 2.3-3.5 2-5.5C18.5 4.5 15.5 2 12 2zm0 9a3 3 0 110-6 3 3 0 010 6z"/>
              </svg>
            </div>
            <div>
              <div className="logo-text" style={{ color: 'white' }}>Puja Samargi</div>
              <div className="logo-sub" style={{ color: 'var(--earth-light)' }}>Mental Wellness Center</div>
            </div>
          </div>
          <p>A compassionate mental health platform for Nepal — connecting clients with certified therapists and providing tools for everyday wellness.</p>
          <div className="footer-social">
            {['📘', '📸', '🐦', '▶️'].map((s, i) => (
              <div className="social-btn" key={i}>{s}</div>
            ))}
          </div>
        </div>

        <div className="footer-col">
          <h5>Services</h5>
          <ul>
            <li><a href="#" onClick={link('/book')}>Individual Therapy</a></li>
            <li><a href="#" onClick={link('/services')}>Couples Counseling</a></li>
            <li><a href="#" onClick={link('/services')}>Family Therapy</a></li>
            <li><a href="#" onClick={link('/services')}>Child Psychology</a></li>
            <li><a href="#" onClick={link('/book')}>Online Sessions</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>Resources</h5>
          <ul>
            <li><a href="#" onClick={link('/assessments')}>Assessments</a></li>
            <li><a href="#" onClick={link('/blog')}>Blog & Articles</a></li>
            <li><a href="#" onClick={link('/resources')}>Free Worksheets</a></li>
            <li><a href="#" onClick={link('/courses')}>Online Courses</a></li>
            <li><a href="#" onClick={link('/store')}>Books & Workbooks</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>Company</h5>
          <ul>
            <li><a href="#" onClick={link('/contact')}>About Us</a></li>
            <li><a href="#" onClick={link('/therapists')}>Our Therapists</a></li>
            <li><a href="#" onClick={link('/contact')}>Become a Therapist</a></li>
            <li><a href="#" onClick={link('/contact')}>Privacy Policy</a></li>
            <li><a href="#" onClick={link('/contact')}>Contact</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2025 Puja Samargi Mental Wellness. All rights reserved. Kathmandu, Nepal.</span>
        <span>🌿 Built with compassion for mental health</span>
      </div>
    </footer>
  )
}