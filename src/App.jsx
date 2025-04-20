import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import './index.css'
import About from './components/About'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsOfService from './components/TermsOfService'

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      // 等待导航完成后滚动
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="main-nav">
      <div className="nav-content">
        <Link to="/" className="logo" onClick={(e) => { e.preventDefault(); scrollToSection('top'); }}>🐄 Crazy Cattle 3D</Link>
        <div className="nav-links">
          <button onClick={() => scrollToSection('game')} className="nav-link">Play Now</button>
          <button onClick={() => scrollToSection('download')} className="nav-link">Download</button>
          <button onClick={() => scrollToSection('what-is')} className="nav-link">What is</button>
          <button onClick={() => scrollToSection('features')} className="nav-link">Features</button>
          <button onClick={() => scrollToSection('how-to-play')} className="nav-link">How to Play</button>
          <button onClick={() => scrollToSection('game-modes')} className="nav-link">Game Modes</button>
          <button onClick={() => scrollToSection('requirements')} className="nav-link">Requirements</button>
          <button onClick={() => scrollToSection('tips')} className="nav-link">Tips</button>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="footer-nav">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Crazy Cattle 3D</h3>
          <p>Experience the ultimate physics-based battle royale game where explosive sheep compete for survival across three unique environments.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <div className="footer-links">
            <button onClick={() => scrollToSection('game')} className="footer-link">Play Now</button>
            <button onClick={() => scrollToSection('what-is')} className="footer-link">What is</button>
            <button onClick={() => scrollToSection('features')} className="footer-link">Features</button>
            <button onClick={() => scrollToSection('how-to-play')} className="footer-link">How to Play</button>
            <button onClick={() => scrollToSection('game-modes')} className="footer-link">Game Modes</button>
            <button onClick={() => scrollToSection('requirements')} className="footer-link">Requirements</button>
            <button onClick={() => scrollToSection('tips')} className="footer-link">Tips</button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Crazy Cattle 3D. All rights reserved.</p>
        <div className="footer-legal">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <span>|</span>
          <Link to="/terms-of-service">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [iframeLoaded, setIframeLoaded] = useState(false)

  const MainContent = () => (
    <>
      <div id="top">
        <header className="hero">
          <h1>🐄 Crazy Cattle 3D</h1>
          <p className="tagline">Experience the wildest cow chaos simulator online!</p>
          <div className="button-group">
            <button onClick={() => document.getElementById('game').scrollIntoView({ behavior: 'smooth' })} className="btn">Play Now</button>
            <button onClick={() => document.getElementById('download').scrollIntoView({ behavior: 'smooth' })} className="btn secondary">Download</button>
          </div>
        </header>
      </div>

      <section id="game" className="iframe-section">
        {!iframeLoaded && (
          <div className="loading-placeholder">
            <img src="/images/crazycattle-preview.jpg" alt="Crazy Cattle Preview" className="preview-img" />
            <p className="loading-text">Loading Game...</p>
          </div>
        )}

        <iframe
          src="./game/index.html"
          title="Crazy Cattle 3D Game"
          allowFullScreen
          frameBorder="0"
          onLoad={() => setIframeLoaded(true)}
          style={{ display: iframeLoaded ? 'block' : 'none' }}
        ></iframe>
      </section>

      <section id="download" className="download-section">
        <h2>⬇️ Download Crazy Cattle 3D</h2>
        <p>This game is also available for offline play. Click below to download from itch.io:</p>
        <a
          href="https://4nn4t4t.itch.io/crazycattle3d"
          target="_blank"
          rel="noopener noreferrer"
          className="btn download-link"
        >
          Go to Itch.io to Download
        </a>
      </section>

      <main>
        <About />
      </main>
    </>
  );

  return (
    <Router>
      <div className="container">
        <Navigation />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}
