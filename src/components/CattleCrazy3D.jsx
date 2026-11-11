import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from './SEO';

const GAME_SRC = 'https://crazycattle3d.io/game/crazycattle3d/v11/';

const CattleCrazy3D = () => {
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
    <div className="game-page cattle-crazy-page">
      <SEO
        title="Cattle Crazy 3D - Play Online & Domain Guide (cattlecrazy3d.com)"
        description="Searching for Cattle Crazy 3D? Play the viral physics battle royale online free. Understand the differences between cattlecrazy3d.com and other mirror sites."
        keywords="Cattle Crazy 3D, cattle crazy, cattlecrazy3d, crazycattle3d.com, cattle crazy game, sheep physics battle royale"
      />

      <div className="game-header">
        <h1>🐄 Cattle Crazy 3D – Play Online &amp; Official Fan Hub</h1>
        <p className="game-description-header">
          Did you search for <strong>Cattle Crazy 3D</strong> instead of Crazy Cattle 3D? You're in the right place! Whether you remember it as Cattle Crazy or Crazy Cattle, launch directly into the physics battle royale below or learn how to distinguish genuine community portals from unofficial clone mirrors.
        </p>
        <div className="game-actions">
          <button onClick={() => setShowGame(true)} className="btn primary">
            <span>🎮</span> Play Cattle Crazy 3D
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
                alt="Cattle Crazy 3D Gameplay Preview"
                className="preview-img"
              />
              <div className="preview-overlay">
                <div className="play-hint">
                  <span className="play-icon">▶️</span>
                  <span className="play-text">Click to Play Now</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="game-container" ref={gameContainerRef}>
            {!iframeLoaded && (
              <div className="loading-placeholder">
                <div className="loading-overlay">
                  <div className="loading-text">Loading Cattle Crazy 3D Arena...</div>
                </div>
              </div>
            )}
            <iframe
              title="Cattle Crazy 3D Playable Web Arena"
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
        <h2>"Cattle Crazy 3D" vs. "Crazy Cattle 3D": Clearing the Confusion</h2>
        <p>
          Many players type <strong>"Cattle Crazy 3D"</strong> into Google and Bing because the phrase naturally emphasizes the animals before their chaotic behavior. The official original title created by indie developer <strong>Anna Mayberry</strong> is <em>Crazy Cattle 3D</em>. Regardless of word order, both terms refer to the exact same beloved indie physics simulation where players control energetic sheep bumping rivals off scenic cliff edges.
        </p>

        <div className="transparency-notice" style={{
          background: '#f8fafc',
          borderLeft: '4px solid #3b82f6',
          padding: '16px 20px',
          margin: '2rem 0',
          borderRadius: '0 8px 8px 0'
        }}>
          <h3 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>
            🌐 Understanding Domains: cattlecrazy3d.com vs. crazycattle3d.com
          </h3>
          <p style={{ margin: '0 0 8px 0' }}>
            As the game went viral on TikTok, YouTube, and Discord, various web domains emerged across search engines:
          </p>
          <ul style={{ margin: '0 0 8px 0', paddingLeft: '1.25rem' }}>
            <li><strong>cattlecrazy3d.com (This Website):</strong> An independent, optimized fan portal dedicated to fast unblocked browser play, comprehensive level walkthroughs, hardware optimization guides, and honest developer attribution.</li>
            <li><strong>crazycattle3d.com &amp; mirror domains:</strong> Alternative third-party fan mirrors and aggregators hosting embedded frames across the web.</li>
            <li><strong>annamayberry.itch.io:</strong> The genuine creator's primary distribution page where the official original standalone PC version is hosted.</li>
          </ul>
          <p style={{ margin: 0 }}>
            We recommend bookmarking <strong>cattlecrazy3d.com</strong> for fast access, and visiting the itch.io developer page if you want to support Anna Mayberry directly!
          </p>
        </div>

        <h3>Why Play Here?</h3>
        <div className="features-grid">
          <div className="feature-card">
            <h4>⚡ Ultra-Fast WebGL Loading</h4>
            <p>Our server architecture serves modern compressed assets, ensuring rapid boot times even on slow school or cellular connections.</p>
          </div>
          <div className="feature-card">
            <h4>📖 Authoritative Tactics</h4>
            <p>Read in-depth guides covering all three maps (Ireland, Iceland, and New Zealand) to maximize your win rate.</p>
          </div>
          <div className="feature-card">
            <h4>🔒 Privacy &amp; Security</h4>
            <p>We do not ask for signups, credit cards, or executable downloads. Your web browser runs in a clean, isolated sandbox.</p>
          </div>
        </div>

        <div className="cluster-internal-links" style={{
          marginTop: '2rem',
          padding: '1.25rem',
          background: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <h4>Explore Crazy Cattle 3D Features</h4>
          <ul style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', listStyle: 'none', padding: 0, margin: '0.5rem 0 0 0' }}>
            <li><Link to="/" style={{ color: '#2563eb', fontWeight: 600 }}>Home</Link></li>
            <li><Link to="/crazy-cattle-3d-unblocked" style={{ color: '#2563eb', fontWeight: 600 }}>Unblocked Portal</Link></li>
            <li><Link to="/crazy-cattle-3d-guide" style={{ color: '#2563eb', fontWeight: 600 }}>Map Strategy Guide</Link></li>
            <li><Link to="/crazy-cattle-3d-online" style={{ color: '#2563eb', fontWeight: 600 }}>Play Online</Link></li>
            <li><Link to="/crazy-cattle-3d-download" style={{ color: '#2563eb', fontWeight: 600 }}>Download PC Version</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CattleCrazy3D;
