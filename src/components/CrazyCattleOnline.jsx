import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from './SEO';

const GAME_SRC = 'https://crazycattle3d.io/game/crazycattle3d/v11/';

const CrazyCattleOnline = () => {
  const [showGame, setShowGame] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const gameContainerRef = useRef(null);

  const handleIframeLoad = () => setIframeLoaded(true);

  const handleWebFullscreen = () => {
    if (!gameContainerRef.current) return;
    if (!isFullscreen) {
      gameContainerRef.current.style.height = '100vh';
      gameContainerRef.current.style.position = 'fixed';
      gameContainerRef.current.style.top = '0';
      gameContainerRef.current.style.left = '0';
      gameContainerRef.current.style.zIndex = '1000';
      setIsFullscreen(true);
    } else {
      gameContainerRef.current.style.height = '70vh';
      gameContainerRef.current.style.position = 'relative';
      gameContainerRef.current.style.top = 'auto';
      gameContainerRef.current.style.left = 'auto';
      gameContainerRef.current.style.zIndex = 'auto';
      setIsFullscreen(false);
    }
  };

  const handleBrowserFullscreen = () => {
    if (!document.fullscreenElement) {
      gameContainerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="game-page online-page">
      <SEO
        title="Crazy Cattle 3D Online - Play Free Browser Game (2026)"
        description="Play Crazy Cattle 3D online directly in your browser. Fast WebGL loading, zero downloads, and responsive physics battle royale action on PC and Mac."
        keywords="Crazy Cattle 3D Online, Play Crazy Cattle 3D Online, Crazy Cattle free online, browser battle royale, sheep battle game"
      />

      <div className="game-header">
        <h1>🌐 Crazy Cattle 3D Online – Free Browser Battle Royale</h1>
        <p className="game-description-header">
          Experience <strong>Crazy Cattle 3D Online</strong> without downloading a single byte of executable software. Compete against an unpredictable flock of AI sheep across lush Irish hills, hazardous Icelandic craters, and steep New Zealand ridges directly in Chrome, Firefox, Safari, or Edge.
        </p>
        <div className="game-actions">
          <button onClick={() => setShowGame(true)} className="btn primary">
            <span>▶️</span> Launch Game Online
          </button>
          <Link to="/crazy-cattle-3d-unblocked" className="btn secondary">
            <span>🔓</span> Unblocked Mode
          </Link>
        </div>
      </div>

      <div className="game-section">
        {!showGame ? (
          <div className="game-placeholder">
            <div className="preview-container" onClick={() => setShowGame(true)}>
              <img
                src="/images/crazycattle-preview.webp"
                alt="Crazy Cattle 3D Online Game Preview"
                className="preview-img"
              />
              <div className="preview-overlay">
                <div className="play-hint">
                  <span className="play-icon">▶️</span>
                  <span className="play-text">Click to Play Online Instantly</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="game-container" ref={gameContainerRef}>
            {!iframeLoaded && (
              <div className="loading-placeholder">
                <div className="loading-overlay">
                  <div className="loading-text">Spinning up WebGL Canvas...</div>
                </div>
              </div>
            )}
            <iframe
              title="Crazy Cattle 3D Online Free"
              src={GAME_SRC}
              allowFullScreen
              frameBorder="0"
              allow="cross-origin-isolated; shared-storage; fullscreen"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-downloads allow-presentation allow-modals"
              referrerPolicy="origin"
              onLoad={handleIframeLoad}
              style={{
                display: 'block',
                opacity: iframeLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease',
                width: '100%',
                height: '70vh',
                border: 'none',
                borderRadius: '12px'
              }}
            />
            <div className="game-controls">
              <button onClick={handleWebFullscreen} className="control-btn" title="Web Fullscreen">
                {isFullscreen ? '⤓' : '⤢'}
              </button>
              <button onClick={handleBrowserFullscreen} className="control-btn" title="Browser Fullscreen">
                ⛶
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="seo-content-section">
        <h2>What Makes the Online Browser Experience Unique?</h2>
        <p>
          Unlike heavy desktop battle royales requiring 50GB downloads and powerful gaming rigs, <strong>Crazy Cattle 3D Online</strong> is engineered for instant accessibility. Built on lightweight 3D engines and WebGL technology, it streams terrain geometry and physics parameters dynamically into your browser's RAM, giving you 60 FPS gameplay in seconds.
        </p>

        <h3>Core Online Mechanics</h3>
        <ul>
          <li><strong>Momentum Mechanics:</strong> Gravity and velocity dictate the force of every strike. Sliding down grassy hills converts potential energy into kinetic destruction.</li>
          <li><strong>Instant Re-matching:</strong> If knocked out of bounds, restart a fresh round within 2 seconds. No waiting in 5-minute lobby queues.</li>
          <li><strong>Zero Latency Physics:</strong> Because the physics calculations run client-side on your local hardware, your ramming inputs feel snappy with zero netcode delay.</li>
        </ul>

        <h3>Browser Compatibility Matrix</h3>
        <div className="game-overview">
          <table className="game-details-table">
            <tbody>
              <tr><td><strong>Google Chrome</strong></td><td>Fully supported (Recommended for best WebGL rendering)</td></tr>
              <tr><td><strong>Microsoft Edge</strong></td><td>Fully supported (Hardware acceleration on by default)</td></tr>
              <tr><td><strong>Mozilla Firefox</strong></td><td>Supported (Ensure WebGL2 is enabled in about:config)</td></tr>
              <tr><td><strong>Apple Safari (macOS)</strong></td><td>Supported on Safari 15+</td></tr>
              <tr><td><strong>Mobile Browsers</strong></td><td>Supported with touch controls; desktop controls recommended</td></tr>
            </tbody>
          </table>
        </div>

        <div className="cluster-internal-links" style={{
          marginTop: '2rem',
          padding: '1.25rem',
          background: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <h4>Quick Navigation</h4>
          <ul style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', listStyle: 'none', padding: 0, margin: '0.5rem 0 0 0' }}>
            <li><Link to="/" style={{ color: '#2563eb', fontWeight: 600 }}>Crazy Cattle 3D Home</Link></li>
            <li><Link to="/crazy-cattle-3d-unblocked" style={{ color: '#2563eb', fontWeight: 600 }}>Unblocked School Mode</Link></li>
            <li><Link to="/crazy-cattle-3d-guide" style={{ color: '#2563eb', fontWeight: 600 }}>Strategy &amp; Map Guide</Link></li>
            <li><Link to="/crazy-cattle-3d-download" style={{ color: '#2563eb', fontWeight: 600 }}>Offline PC Download</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CrazyCattleOnline;
