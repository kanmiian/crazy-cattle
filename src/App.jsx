import React, { useState, useEffect, lazy, Suspense, useCallback, useMemo } from 'react'
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

  // 使用 useCallback 和防抖优化滚动函数
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    if (location.pathname !== '/') {
      navigate('/');
      // 使用 requestAnimationFrame 优化滚动
      requestAnimationFrame(() => {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      });
    } else {
      requestAnimationFrame(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }, [location.pathname, navigate]);

  // 使用 useMemo 优化按钮点击处理函数
  const handleNavClick = useMemo(() => ({
    game: () => scrollToSection('game'),
    download: () => scrollToSection('download'),
    whatIs: () => scrollToSection('what-is'),
    features: () => scrollToSection('features'),
    howToPlay: () => scrollToSection('how-to-play'),
    requirements: () => scrollToSection('requirements'),
    tips: () => scrollToSection('tips')
  }), [scrollToSection]);

  return (
    <nav className="main-nav">
      <div className="nav-content">
        <Link to="/" className="logo" onClick={(e) => { e.preventDefault(); scrollToSection('top'); }}>🐄 Crazy Cattle 3D - Sheep Battle Royale</Link>
        <div className="nav-links">
          <button onClick={handleNavClick.game} className="nav-link">Play Now</button>
          <button onClick={handleNavClick.download} className="nav-link">Download</button>
          <button onClick={handleNavClick.whatIs} className="nav-link">What is</button>
          <button onClick={handleNavClick.features} className="nav-link">Features</button>
          <button onClick={handleNavClick.howToPlay} className="nav-link">How to Play</button>
          <button onClick={handleNavClick.requirements} className="nav-link">Requirements</button>
          <button onClick={handleNavClick.tips} className="nav-link">Tips</button>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 使用 useCallback 和防抖优化滚动函数
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    if (location.pathname !== '/') {
      navigate('/');
      requestAnimationFrame(() => {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      });
    } else {
      requestAnimationFrame(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }, [location.pathname, navigate]);

  // 使用 useMemo 优化按钮点击处理函数
  const handleFooterClick = useMemo(() => ({
    game: () => scrollToSection('game'),
    features: () => scrollToSection('features'),
    howToPlay: () => scrollToSection('how-to-play'),
    requirements: () => scrollToSection('requirements'),
    tips: () => scrollToSection('tips')
  }), [scrollToSection]);

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
            <button onClick={handleFooterClick.game} className="footer-link">Play Now</button>
            <button onClick={handleFooterClick.features} className="footer-link">Features</button>
            <button onClick={handleFooterClick.howToPlay} className="footer-link">How to Play</button>
            <button onClick={handleFooterClick.requirements} className="footer-link">Requirements</button>
            <button onClick={handleFooterClick.tips} className="footer-link">Tips</button>
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

  // 使用 useCallback 优化 iframe 加载处理函数
  const handleIframeLoad = useCallback(() => {
    setIframeLoaded(true);
  }, []);

  // 使用 useCallback 优化滚动处理函数
  const handleScrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      requestAnimationFrame(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }, []);

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

    // 使用 requestIdleCallback 延迟加载结构化数据
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadStructuredData);
    } else {
      setTimeout(loadStructuredData, 1000);
    }
  }, []);

  const MainContent = () => (
    <>
      <div id="top">
        <header className="hero">
          <h1>🐄 Crazy Cattle 3D - Sheep Battle Royale</h1>
          <p className="tagline">Experience the wildest sheep and cattle chaos simulator online! Play Crazy Cattle 3D now and join the ultimate physics-based battle royale where sheep and cattle compete for survival!</p>
          <div className="button-group">
            <button onClick={() => handleScrollToSection('game')} className="btn">Play Now</button>
            <button onClick={() => handleScrollToSection('download')} className="btn secondary">Download</button>
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
          onLoad={handleIframeLoad}
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
