import React, { useRef, useState } from 'react';
import SEO from './SEO';

const GAME_SRC = 'https://app-526977.games.s3.yandex.net/526977/t7m0ggteem5nv7m996jg2rbbo5wqy5pe/index.html?clid=11165832&sdk=%2Fsdk%2F_%2Fv2.12571c36cd12ca98b1bd.js#origin=https%3A%2F%2Fplayhop.com&app-id=526977&device-type=desktop';
const DIRECT_PLAY_URL = 'https://www.yad.com/Build-A-Ring-Farm';

const cropGuide = [
  {
    title: 'Carrots',
    tier: 'Starter',
    note: 'Fast cycles help you unlock the first ring upgrades quickly.'
  },
  {
    title: 'Corn',
    tier: 'Growth',
    note: 'Good mid-game value when you need steady income for expansion.'
  },
  {
    title: 'Mushrooms',
    tier: 'Efficiency',
    note: 'Useful once automation starts to matter more than raw tapping.'
  },
  {
    title: 'Pumpkins',
    tier: 'Profit',
    note: 'Prioritize these when upgrade costs begin to scale hard.'
  }
];

const BuildARingFarm = () => {
  const [showGame, setShowGame] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const gameContainerRef = useRef(null);

  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  const handleWebFullscreen = () => {
    if (!gameContainerRef.current) return;

    if (!isFullscreen) {
      gameContainerRef.current.style.height = '100vh';
      gameContainerRef.current.style.position = 'fixed';
      gameContainerRef.current.style.top = '0';
      gameContainerRef.current.style.left = '0';
      gameContainerRef.current.style.zIndex = '1000';
      gameContainerRef.current.style.borderRadius = '0';
      setIsFullscreen(true);
    } else {
      gameContainerRef.current.style.height = '70vh';
      gameContainerRef.current.style.position = 'relative';
      gameContainerRef.current.style.top = 'auto';
      gameContainerRef.current.style.left = 'auto';
      gameContainerRef.current.style.zIndex = 'auto';
      gameContainerRef.current.style.borderRadius = '8px';
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
    <div className="game-page build-ring-farm-page">
      <SEO
        title="Build A Ring Farm - Play Online Farm Incremental Game"
        description="Play Build A Ring Farm online for free. Grow crops in circular fields, unlock seeds, upgrade ring farms, follow seed tips, and check the latest code guide."
        keywords="Build A Ring Farm, Build A Ring Farm codes, Build A Ring Farm seeds, online farm incremental game, ring farm simulator"
      />

      <div className="game-header">
        <h1>Build A Ring Farm - Online Farm Incremental Game</h1>
        <p className="game-description-header">
          <strong>Build A Ring Farm</strong> is a high-demand online farming incremental game built around circular fields, crop income, seed unlocks, and constant upgrades. Play the embedded browser version below, then use this page as a quick guide for codes, seeds, and efficient ring farm progression.
        </p>
        <div className="game-actions">
          <button onClick={() => setShowGame(true)} className="btn primary">
            Play Build A Ring Farm Now
          </button>
          <a href={DIRECT_PLAY_URL} target="_blank" rel="noopener noreferrer nofollow" className="btn secondary">
            Open Playable Source
          </a>
        </div>
      </div>

      <div className="game-section">
        {!showGame ? (
          <div className="game-placeholder build-ring-farm-preview">
            <div className="preview-container" onClick={() => setShowGame(true)}>
              <img
                src="/images/build-a-ring-farm.jpg"
                alt="Build A Ring Farm game preview"
                className="preview-img"
              />
              <div className="preview-overlay">
                <div className="play-hint">
                  <span className="play-icon">Play</span>
                  <span className="play-text">Click to start farming</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="game-container build-ring-farm-container" ref={gameContainerRef}>
            {!iframeLoaded && (
              <div className="loading-placeholder">
                <div className="loading-spinner"></div>
                <div className="loading-text">Loading Build A Ring Farm...</div>
              </div>
            )}
            <iframe
              title="Build A Ring Farm playable online game"
              src={GAME_SRC}
              allowFullScreen
              frameBorder="0"
              allow="autoplay; fullscreen; gamepad; clipboard-read; clipboard-write"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-downloads allow-presentation allow-modals allow-pointer-lock"
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={handleIframeLoad}
              style={{
                display: 'block',
                opacity: iframeLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease',
                width: '100%',
                height: '70vh',
                border: 'none',
                borderRadius: isFullscreen ? '0' : '8px'
              }}
            />
            <div className="game-controls">
              <button onClick={handleWebFullscreen} className="control-btn" title="Web Fullscreen">
                {isFullscreen ? 'Exit' : 'Full'}
              </button>
              <button onClick={handleBrowserFullscreen} className="control-btn" title="Browser Fullscreen">
                View
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="seo-content-section">
        <h2>Build A Ring Farm Codes and Seed Guide</h2>
        <p>
          <strong>Build A Ring Farm</strong> is trending because it combines online farm idle growth with upgrade loops that are easy to search for: players want the best seeds, current codes, and the fastest way to grow the circular farm. This guide focuses on the browser version embedded above and the practical progression pattern that applies to ring farm simulator gameplay.
        </p>

        <h3>Current Build A Ring Farm Codes</h3>
        <p>
          There are no reliable public redeem codes confirmed inside this embedded web version right now. If a code button appears in a later update, check for rewards that improve early money, seeds, pets, or harvest speed. Avoid code lists that ask for login credentials or downloads; use only in-game redeem fields.
        </p>

        <h3>Best Seed and Crop Priority</h3>
        <div className="build-ring-farm-crop-grid">
          {cropGuide.map((crop) => (
            <div className="feature-card" key={crop.title}>
              <h4>{crop.title}</h4>
              <span className="farm-tier-badge">{crop.tier}</span>
              <p>{crop.note}</p>
            </div>
          ))}
        </div>

        <h3>How to Play Build A Ring Farm</h3>
        <ol>
          <li><strong>Move around the ring farm:</strong> Use WASD or arrow keys on desktop. On mobile, use the on-screen controls.</li>
          <li><strong>Plant and harvest crops:</strong> Fill open ring sections with crops, collect income, and keep production moving.</li>
          <li><strong>Upgrade early income first:</strong> Prioritize crop value and harvest speed before expensive cosmetic or late-ring upgrades.</li>
          <li><strong>Unlock better seeds:</strong> New crops help you scale faster as upgrade prices increase.</li>
          <li><strong>Expand the farm ring:</strong> Spend profits on new circular farmland once your current ring is producing steadily.</li>
        </ol>

        <h3>Upgrade Route for Fast Incremental Progress</h3>
        <div className="features-grid">
          <div className="feature-card">
            <h4>Early Game</h4>
            <p>Buy low-cost income upgrades, keep every ring sector planted, and avoid saving too long for upgrades that do not raise crop output.</p>
          </div>
          <div className="feature-card">
            <h4>Mid Game</h4>
            <p>Shift into seed unlocks and harvest efficiency. Better seeds beat small speed upgrades once the price curve starts climbing.</p>
          </div>
          <div className="feature-card">
            <h4>Late Game</h4>
            <p>Expand circular land only when the next ring can pay itself back. Balance new space with automation and high-value crops.</p>
          </div>
        </div>

        <h3>Game Overview</h3>
        <div className="game-overview">
          <table className="game-details-table">
            <tbody>
              <tr><td><strong>Game</strong></td><td>Build A Ring Farm</td></tr>
              <tr><td><strong>Playable Build</strong></td><td>Radial Farm 360 web build</td></tr>
              <tr><td><strong>Genre</strong></td><td>Farm simulator, idle incremental, upgrade game</td></tr>
              <tr><td><strong>Controls</strong></td><td>WASD or arrow keys, mouse camera, touch controls on mobile</td></tr>
              <tr><td><strong>Platform</strong></td><td>Web browser, desktop and mobile</td></tr>
              <tr><td><strong>Guide Focus</strong></td><td>Codes, seeds, crop priority, farm expansion strategy</td></tr>
            </tbody>
          </table>
        </div>

        <h3>Frequently Asked Questions</h3>
        <div className="faq-item">
          <h4>Can I play Build A Ring Farm online for free?</h4>
          <p>Yes. The game can be played in the browser from this page with no download required. If the embedded frame fails on a browser, use the direct playable source button above.</p>
        </div>
        <div className="faq-item">
          <h4>Are there Build A Ring Farm codes?</h4>
          <p>No reliable redeem codes are confirmed for this embedded web build at the moment. This page is prepared for code-search traffic and can be updated quickly when working codes appear.</p>
        </div>
        <div className="faq-item">
          <h4>What seeds should I unlock first?</h4>
          <p>Start with fast crops for cash flow, then move into higher-value crops once harvest and income upgrades make each ring section productive.</p>
        </div>
        <div className="faq-item">
          <h4>Is Build A Ring Farm the same as a Roblox game?</h4>
          <p>The trend is connected to Roblox-style farm simulator searches, but the embedded page uses a playable browser farm game with similar circular farm, seed, and upgrade mechanics.</p>
        </div>
      </div>
    </div>
  );
};

export default BuildARingFarm;
