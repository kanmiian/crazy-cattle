import React, { useState } from 'react'
import './index.css'
import About from './components/About'

export default function App() {
  const [iframeLoaded, setIframeLoaded] = useState(false)

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="container">
      <nav className="main-nav">
        <div className="nav-content">
          <div className="logo">🐄 Crazy Cattle 3D</div>
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

      <header className="hero">
        <h1>🐄 Crazy Cattle 3D</h1>
        <p className="tagline">Experience the wildest cow chaos simulator online!</p>
        <div className="button-group">
          <button onClick={() => scrollToSection('game')} className="btn">Play Now</button>
          <button onClick={() => scrollToSection('download')} className="btn secondary">Download</button>
        </div>
      </header>

      <section id="game" className="iframe-section">
        {!iframeLoaded && (
          <div className="loading-placeholder">
            <img src="/images/crazycattle-preview.jpg" alt="Crazy Cattle Preview" className="preview-img" />
            <p className="loading-text">Loading Game...</p>
          </div>
        )}

        <iframe
          src="https://cattle-crazy-game.vercel.app/
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

      <footer>
        <p>© 2024 Crazy Cattle 3D. All rights reserved.</p>
      </footer>
    </div>
  )
}
