import React, { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import './index.css'

// 懒加载组件
const Content = lazy(() => import('./components/Content'))
const About = lazy(() => import('./components/About'))
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'))
const TermsOfService = lazy(() => import('./components/TermsOfService'))
const Contact = lazy(() => import('./components/Contact'))
const FAQ = lazy(() => import('./components/FAQ'))

// 加载占位符组件
const LoadingPlaceholder = () => (
  <div className="loading-placeholder">
    <img 
      src="/images/crazycattle-preview.webp" 
      alt="Crazy Cattle 3D Preview" 
      className="preview-img" 
      fetchpriority="high"
      decoding="async"
    />
    <p className="loading-text">Loading...</p>
  </div>
)

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
          <p>Experience the ultimate physics-based battle royale game where explosive sheep and cattle compete for survival across three unique environments. Crazy Cattle 3D offers an exciting multiplayer experience with unique gameplay mechanics, featuring both sheep and cattle characters in intense battles.</p>
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
    // 延迟加载结构化数据
    const loadStructuredData = () => {
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Crazy Cattle 3D - Sheep Battle Royale Game",
        "url": "https://crazycattle3d.com",
        "description": "Play as explosive sheep and cattle in this physics-based battle royale game. Master momentum and become the ultimate warrior in Crazy Cattle 3D.",
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
    };

    // 延迟 1 秒加载结构化数据
    const timer = setTimeout(loadStructuredData, 1000);
    return () => clearTimeout(timer);
  }, []);

  const MainContent = () => (
    <>
      <div id="top">
        <header className="hero">
          <h1>🐄 Crazy Cattle 3D - Sheep Battle Royale</h1>
          <p className="tagline">Experience the wildest sheep and cattle chaos simulator online! Play Crazy Cattle 3D now and join the ultimate physics-based battle royale where sheep and cattle compete for survival!</p>
          <div className="button-group">
            <button onClick={() => document.getElementById('game').scrollIntoView({ behavior: 'smooth' })} className="btn">Play Now</button>
            <button onClick={() => document.getElementById('download').scrollIntoView({ behavior: 'smooth' })} className="btn secondary">Download</button>
          </div>
        </header>
      </div>

      <section id="game" className="iframe-section">
        {!iframeLoaded && <LoadingPlaceholder />}
        <iframe
          src="./game/index.html"
          title="Crazy Cattle 3D - Sheep Battle Royale Game"
          allowFullScreen
          frameBorder="0"
          onLoad={() => setIframeLoaded(true)}
          style={{ display: iframeLoaded ? 'block' : 'none' }}
        ></iframe>
      </section>

      <section id="download" className="download-section">
        <h2>⬇️ Download Crazy Cattle 3D - Sheep Battle Royale</h2>
        <p>This exciting sheep and cattle battle royale game is also available for offline play. Click below to download Crazy Cattle 3D from itch.io:</p>
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
        <Suspense fallback={<LoadingPlaceholder />}>
          <Content />
        </Suspense>
      </main>
    </>
  );

  return (
    <Router>
      <div className="container">
        <Navigation />
        <Suspense fallback={<LoadingPlaceholder />}>
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}
