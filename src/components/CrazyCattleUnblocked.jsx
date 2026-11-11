import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from './SEO';

const GAME_SRC = 'https://crazycattle3d.io/game/crazycattle3d/v11/';

const CrazyCattleUnblocked = () => {
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
    <div className="game-page unblocked-page">
      <SEO
        title="Crazy Cattle 3D Unblocked - Play Free at School & Work (2026)"
        description="Play Crazy Cattle 3D unblocked online for free! Enjoy the physics battle royale on school Chromebooks and restricted networks without downloads or installation."
        keywords="Crazy Cattle 3D Unblocked, Crazy Cattle Unblocked, Crazy Cattle 3D at school, crazy cattle unblocked 76, crazy cattle unblocked 66, physics battle royale unblocked"
      />

      <div className="game-header">
        <h1>🔓 Crazy Cattle 3D Unblocked – Play Free at School &amp; Work</h1>
        <p className="game-description-header">
          Welcome to the dedicated unblocked portal for <strong>Crazy Cattle 3D</strong>. Designed for school Chromebooks, library devices, and restricted office networks, this version bypasses software installation hurdles using lightweight, sandboxed WebGL directly in your web browser. Jump into the explosive sheep arena anytime, anywhere!
        </p>
        <div className="game-actions">
          <button onClick={() => setShowGame(true)} className="btn primary">
            <span>🎮</span> Play Crazy Cattle 3D Unblocked
          </button>
          <Link to="/crazy-cattle-3d-guide" className="btn secondary">
            <span>📖</span> Read Strategy Guide
          </Link>
        </div>
      </div>

      <div className="game-section">
        {!showGame ? (
          <div className="game-placeholder">
            <div className="preview-container" onClick={() => setShowGame(true)}>
              <img
                src="/images/crazycattle-preview.webp"
                alt="Crazy Cattle 3D Unblocked Game Preview"
                className="preview-img"
              />
              <div className="preview-overlay">
                <div className="play-hint">
                  <span className="play-icon">▶️</span>
                  <span className="play-text">Click to Play Unblocked Online</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="game-container" ref={gameContainerRef}>
            {!iframeLoaded && (
              <div className="loading-placeholder">
                <div className="loading-overlay">
                  <div className="loading-text">Loading Unblocked WebGL Build...</div>
                </div>
              </div>
            )}
            <iframe
              title="Crazy Cattle 3D Unblocked Game"
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
        <h2>Why Is Crazy Cattle 3D Unblocked So Popular?</h2>
        <p>
          Students and casual gamers often face strict web filters, firewall restrictions, and administrative locks that prevent installing standalone game clients (.exe or .dmg). <strong>Crazy Cattle 3D Unblocked</strong> solves this issue by compiling the full 3D physics simulation into pure client-side HTML5 canvas and WebGL shaders. As long as your browser can render modern 3D graphics, you can launch straight into the chaos without touching system files or needing administrative rights.
        </p>

        <h3>Key Features of the Unblocked Edition</h3>
        <div className="features-grid">
          <div className="feature-card">
            <h4>🛡️ Firewall &amp; Chromebook Friendly</h4>
            <p>Runs cleanly via standard HTTPS (Port 443) protocol, making it accessible on school Wi-Fi, classroom Chromebooks, and campus networks without triggering proxy blocks.</p>
          </div>
          <div className="feature-card">
            <h4>⚡ Zero Download, Zero Setup</h4>
            <p>No extensions, Flash emulators, or .zip extracts necessary. Just open the page, press Play, and battle inside your browser window.</p>
          </div>
          <div className="feature-card">
            <h4>🗺️ Complete 3-Map Roster</h4>
            <p>Access Ireland, Iceland, and New Zealand with all ragdoll collision physics, dynamic hills, and hazard zones intact.</p>
          </div>
        </div>

        <h3>Tips for Playing Smoothly on School Laptops</h3>
        <ol>
          <li><strong>Close background browser tabs:</strong> Chromebooks with 4GB RAM benefit significantly from freeing up memory before launching 3D WebGL scenes.</li>
          <li><strong>Use Fullscreen Mode:</strong> Click the browser fullscreen button (⛶) to prevent accidental mouse pointer escapes during intense turning maneuvers.</li>
          <li><strong>Turn On Hardware Acceleration:</strong> Check your browser settings to confirm graphics acceleration is enabled for maximum frames-per-second (FPS).</li>
        </ol>

        <h3>Frequently Asked Questions About Unblocked Play</h3>
        <div className="faq-item">
          <h4>Is this unblocked version safe?</h4>
          <p>Yes. It operates in a secure web sandbox with zero file downloads or intrusive scripts. Your personal device and local files remain completely untouched.</p>
        </div>
        <div className="faq-item">
          <h4>Why does it say unblocked?</h4>
          <p>Unblocked gaming refers to web-based titles designed to load without executable downloads or blocked ports, serving students looking for engaging breaks during study sessions.</p>
        </div>

        <div className="cluster-internal-links" style={{
          marginTop: '2rem',
          padding: '1.25rem',
          background: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <h4>Related Crazy Cattle 3D Pages</h4>
          <ul style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', listStyle: 'none', padding: 0, margin: '0.5rem 0 0 0' }}>
            <li><Link to="/" style={{ color: '#2563eb', fontWeight: 600 }}>Home</Link></li>
            <li><Link to="/crazy-cattle-3d-online" style={{ color: '#2563eb', fontWeight: 600 }}>Play Online Free</Link></li>
            <li><Link to="/crazy-cattle-3d-guide" style={{ color: '#2563eb', fontWeight: 600 }}>Strategy &amp; Maps Guide</Link></li>
            <li><Link to="/crazy-cattle-3d-download" style={{ color: '#2563eb', fontWeight: 600 }}>PC Download Info</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CrazyCattleUnblocked;
