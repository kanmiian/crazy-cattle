import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import './index.css'
import Content from './components/Content'
import About from './components/About'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsOfService from './components/TermsOfService'
import Contact from './components/Contact'
import FAQ from './components/FAQ'

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
      } else {
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
    const element = document.getElementById(sectionId);
    if (element) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="footer-nav">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Crazy Cattle 3D</h3>
          <p>Experience the ultimate physics-based battle royale game where explosive sheep compete for survival across three unique environments. Crazy Cattle 3D offers an exciting multiplayer experience with unique gameplay mechanics.</p>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <div className="footer-links">
            <button onClick={() => scrollToSection('game')} className="footer-link">Play Now</button>
            <button onClick={() => scrollToSection('features')} className="footer-link">Features</button>
            <button onClick={() => scrollToSection('how-to-play')} className="footer-link">How to Play</button>
            <button onClick={() => scrollToSection('requirements')} className="footer-link">Requirements</button>
            <button onClick={() => scrollToSection('tips')} className="footer-link">Tips</button>
          </div>
        </div>

        <div className="footer-section">
          <h3>Info</h3>
          <div className="footer-links">
            <Link to="/about" className="footer-link">About</Link>
            <Link to="/contact" className="footer-link">Contact</Link>
            <Link to="/faq" className="footer-link">FAQ</Link>
            <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link>
            <Link to="/terms-of-service" className="footer-link">Terms of Service</Link>
          </div>
        </div>

        <div className="footer-section">
          <h3>Friends</h3>
          <div className="footer-links">
            <a href="https://www.online-guitartuner.com/" target="_blank" rel="noopener noreferrer nofollow" className="footer-link">Online Guitar Tuner</a>
            <a href="https://animalbrainrot.com/" target="_blank" rel="noopener noreferrer nofollow" className="footer-link">AI Brainrot Animals</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 Crazy Cattle 3D. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default function App() {
  const [iframeLoaded, setIframeLoaded] = useState(false)

  useEffect(() => {
    // Add structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Crazy Cattle 3D",
      "url": "https://crazycattle3d.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://crazycattle3d.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const MainContent = () => (
    <>
      <div id="top">
        <header className="hero">
          <h1>🐄 Crazy Cattle 3D</h1>
          <p className="tagline">Experience the wildest cow chaos simulator online! Play Crazy Cattle 3D now and join the ultimate physics-based battle royale!</p>
          <div className="button-group">
            <button onClick={() => document.getElementById('game').scrollIntoView({ behavior: 'smooth' })} className="btn">Play Now</button>
            <button onClick={() => document.getElementById('download').scrollIntoView({ behavior: 'smooth' })} className="btn secondary">Download</button>
          </div>
        </header>
      </div>

      <section id="game" className="iframe-section">
        {!iframeLoaded && (
          <div className="loading-placeholder">
            <img src="/images/crazycattle-preview.webp" alt="Crazy Cattle 3D Preview" className="preview-img" loading="lazy" />
            <p className="loading-text">Loading Crazy Cattle 3D...</p>
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
        <p>This game is also available for offline play. Click below to download Crazy Cattle 3D from itch.io:</p>
        <a
          href="https://4nn4t4t.itch.io/crazycattle3d"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="btn download-link"
        >
          Go to Itch.io to Download
        </a>
      </section>

      <main>
        <Content />
      </main>
    </>
  );

  return (
    <Router>
      <div className="container">
        <Navigation />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
