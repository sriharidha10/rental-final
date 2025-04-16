import './styles/main.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import VehicleList from './VehicleList';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Header */}
        <header className="header">
          <div className="nav-container">
            <div className="nav-left">
              <Link to="/" className="logo">
                VehicleRental
              </Link>
            </div>
            <nav className="nav-links">
              <Link to="/cars" className="nav-link">Cars</Link>
              <Link to="/bikes" className="nav-link">Bikes</Link>
              <Link to="/bicycles" className="nav-link">Bicycles</Link>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <div className="hero">
          <div className="hero-content">
            <h1>Find Your Perfect Ride</h1>
            <p>Choose from our wide selection of vehicles. Whether you need a car, bike, or bicycle, we've got you covered.</p>
           
          </div>
        </div>

        {/* Main Content */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/cars" replace />} />
            <Route path="/cars" element={<VehicleList type="car" />} />
            <Route path="/bikes" element={<VehicleList type="bike" />} />
            <Route path="/bicycles" element={<VehicleList type="bicycle" />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h3>About Us</h3>
              <p>We provide the best vehicle rental services with a wide range of options to choose from.</p>
            </div>
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul className="footer-links">
                <li><Link to="/cars">Cars</Link></li>
                <li><Link to="/bikes">Bikes</Link></li>
                <li><Link to="/bicycles">Bicycles</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Contact</h3>
              <p>
                Email: info@vehiclerental.com<br />
                Phone: +1 234 567 8900
              </p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Vehicle Rental Management. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
