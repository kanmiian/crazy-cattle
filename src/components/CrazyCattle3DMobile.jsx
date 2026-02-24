import React, { useState, useRef } from 'react';

const GAME_SRC = 'https://crazycattle3dgithub.io/game/crazy-cattle-3d-mobile/';

const CrazyCattle3DMobile = () => {
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
    <div className="game-page">
      <div className="game-header">
        <h1>🐄 Crazy Cattle 3D Mobile – Sheep Battle Royale (Mobile Version)</h1>
        <p className="game-description-header">
          <strong>Crazy Cattle 3D Mobile</strong> is the <strong>mobile version</strong> of Crazy Cattle 3D, adapted from the original <strong>PC version</strong>. Play the same physics-based sheep and cattle battle royale on your phone or tablet—touch-optimized controls, same chaotic arenas. This <strong>mobile game</strong> is free to play in your browser; no download required.
        </p>
        <div className="game-actions">
          <button
            onClick={() => setShowGame(true)}
            className="btn primary"
          >
            <span>🎮</span> Play Crazy Cattle 3D Mobile Now
          </button>
        </div>
      </div>

      <div className="game-section">
        {!showGame ? (
          <div className="game-placeholder">
            <div className="preview-container" onClick={() => setShowGame(true)}>
              <img
                src="/images/crazycattle-preview.webp"
                alt="Crazy Cattle 3D Mobile Game Preview"
                className="preview-img"
              />
              <div className="preview-overlay">
                <div className="play-hint">
                  <span className="play-icon">▶️</span>
                  <span className="play-text">Click to Play Crazy Cattle 3D Mobile</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="game-container" ref={gameContainerRef}>
            {!iframeLoaded && (
              <div className="loading-placeholder">
                <div className="loading-overlay">
                  <div className="loading-text">Loading Crazy Cattle 3D Mobile...</div>
                </div>
              </div>
            )}
            <iframe
              title="Crazy Cattle 3D Mobile - Sheep Battle Royale Mobile Game"
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
        <h2>About Crazy Cattle 3D Mobile – Mobile Version of the PC Game</h2>
        <p>
          <strong>Crazy Cattle 3D Mobile</strong> is the <strong>mobile version</strong> of the popular <strong>Crazy Cattle 3D</strong> sheep battle royale game. It was adapted from the <strong>PC version</strong> for phones and tablets, so you get the same explosive sheep and cattle chaos, physics-based battles, and last-animal-standing action in a <strong>mobile game</strong> format. Play <strong>Crazy Cattle 3D mobile</strong> free in your browser—no app download needed.
        </p>

        <h3>What Is Crazy Cattle 3D Mobile?</h3>
        <p>
          <strong>Crazy Cattle 3D Mobile</strong> is the same core game as the <strong>Crazy Cattle 3D PC version</strong>, rebuilt for touch screens and small screens. The <strong>mobile version</strong> keeps the physics-based battle royale, sheep and cattle mayhem, and multiple arenas, with controls and UI adjusted for <strong>mobile</strong> play. If you already know the <strong>PC game</strong>, this is that experience in a <strong>mobile game</strong>.
        </p>

        <h3>How to Play Crazy Cattle 3D Mobile</h3>
        <ol>
          <li><strong>Open the game:</strong> Click “Play Crazy Cattle 3D Mobile” above. The <strong>mobile version</strong> loads in your browser.</li>
          <li><strong>Use touch controls:</strong> Move and attack using on-screen controls designed for <strong>mobile</strong>.</li>
          <li><strong>Survive and win:</strong> Same rules as the <strong>PC version</strong>—use physics and momentum to be the last sheep or cattle standing.</li>
        </ol>

        <h3>PC Version vs Mobile Version</h3>
        <p>
          The <strong>Crazy Cattle 3D PC version</strong> is playable on desktop with keyboard/mouse. <strong>Crazy Cattle 3D Mobile</strong> is the same game adapted for <strong>mobile</strong>: touch controls, responsive layout, and play-anywhere in the browser. Both are free; the <strong>mobile game</strong> is ideal for playing on the go.
        </p>

        <h3>Frequently Asked Questions</h3>
        <div className="faq-item">
          <h4>Is Crazy Cattle 3D Mobile free?</h4>
          <p>Yes. <strong>Crazy Cattle 3D Mobile</strong> is free to play in your browser. No download or account required. It is the <strong>mobile version</strong> of the <strong>PC game</strong> Crazy Cattle 3D.</p>
        </div>
        <div className="faq-item">
          <h4>What is the difference between Crazy Cattle 3D PC and Mobile?</h4>
          <p>The <strong>PC version</strong> is for desktop; the <strong>mobile version</strong> is adapted from the PC game for phones and tablets with touch controls and a <strong>mobile</strong>-friendly layout. Gameplay is the same—physics-based sheep and cattle battle royale.</p>
        </div>
        <div className="faq-item">
          <h4>Can I play Crazy Cattle 3D Mobile on desktop?</h4>
          <p>Yes. You can open the <strong>Crazy Cattle 3D mobile</strong> page on a PC; the game runs in the browser. For the full desktop experience, use the main site’s <strong>PC version</strong> of Crazy Cattle 3D.</p>
        </div>
      </div>
    </div>
  );
};

export default CrazyCattle3DMobile;
