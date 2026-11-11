import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from './SEO';

const GAME_SRC = 'https://crazycattle3d.io/game/crazycattle3d/v11/';

const CrazyCattleGuide = () => {
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
    <div className="game-page guide-page">
      <SEO
        title="Crazy Cattle 3D Strategy Guide - Controls, Maps & Pro Tips"
        description="Master Crazy Cattle 3D with our comprehensive guide! Detailed breakdown of Ireland, Iceland, and New Zealand maps, physics controls, and winning combat tactics."
        keywords="Crazy Cattle 3D Guide, Crazy Cattle 3D tips, Crazy Cattle controls, Crazy Cattle 3D maps, Ireland map crazy cattle, Iceland map crazy cattle, New Zealand map crazy cattle"
      />

      <div className="game-header">
        <h1>📖 Crazy Cattle 3D Strategy Guide: Maps, Controls &amp; Tactics</h1>
        <p className="game-description-header">
          Welcome to the ultimate mastery guide for <strong>Crazy Cattle 3D</strong>. In this physics-driven battle royale, chaotic button mashing won't get you to the victory screen. Learn how angular momentum, terrain gradients, and arena hazard manipulation can turn you from an easy knockout into the apex sheep!
        </p>
        <div className="game-actions">
          <button onClick={() => setShowGame(true)} className="btn primary">
            <span>🎮</span> Practice in Live Game
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
                alt="Crazy Cattle 3D Strategy Practice Preview"
                className="preview-img"
              />
              <div className="preview-overlay">
                <div className="play-hint">
                  <span className="play-icon">▶️</span>
                  <span className="play-text">Launch Practice Arena</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="game-container" ref={gameContainerRef}>
            {!iframeLoaded && (
              <div className="loading-placeholder">
                <div className="loading-overlay">
                  <div className="loading-text">Loading Practice Session...</div>
                </div>
              </div>
            )}
            <iframe
              title="Crazy Cattle 3D Practice Session"
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
        <h2>1. Complete Controls &amp; Physics Mechanics</h2>
        <div className="game-overview">
          <table className="game-details-table">
            <tbody>
              <tr><td><strong>W / Up Arrow</strong></td><td>Accelerate forward and build linear velocity.</td></tr>
              <tr><td><strong>S / Down Arrow</strong></td><td>Brake / reverse momentum; useful for tight cliff-edge recoveries.</td></tr>
              <tr><td><strong>A / D or Left / Right</strong></td><td>Steer left and right; combine with high forward speed for power drifts.</td></tr>
              <tr><td><strong>Spacebar</strong></td><td>Explosive charge / jump impact; boosts forward impulse drastically.</td></tr>
              <tr><td><strong>Mouse Look</strong></td><td>Adjust your perspective to spot incoming flank attacks from AI bots.</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          <strong>The Golden Rule of Momentum:</strong> Collision impulse is determined by the differential velocity between two colliding bodies. Running head-on into an opponent going at equal speed produces mutual recoil; hitting an opponent from a high-speed downhill charge or broadsiding them from the flank delivers an overwhelming kinetic knockout!
        </p>

        <h2>2. Deep Dive: The Three Battleground Maps</h2>

        <div className="features-grid">
          <div className="feature-card">
            <h4>🌿 Map 1: Ireland – The Rolling Grasslands</h4>
            <p><strong>Terrain:</strong> Gentle slopes, expansive pastures, and soft green crests.</p>
            <p><strong>Best Tactics:</strong> Use the natural waves of the landscape like ski ramps. Climb to hill peaks, locate a clump of brawling AI sheep in the valley, and dive bomb downhill with Spacebar to scatter them across the map.</p>
            <p><strong>Danger:</strong> Low hazard density means matches take longer. Don't waste your momentum running up steep inclines when rivals are chasing.</p>
          </div>

          <div className="feature-card">
            <h4>🌋 Map 2: Iceland – The Volcanic Crags</h4>
            <p><strong>Terrain:</strong> Jagged black basalt cliffs, slippery slopes, and immediate abyss drop-offs.</p>
            <p><strong>Best Tactics:</strong> Hold the center plateau. When AI bots sprint toward you in straight lines, wait until the final fraction of a second, then sharp-turn left or right (The "Matador" technique). Their forward momentum will carry them straight into the void.</p>
            <p><strong>Danger:</strong> Bumping into rock outcroppings can deflect you backwards off the edge.</p>
          </div>

          <div className="feature-card">
            <h4>🏔️ Map 3: New Zealand – Alpine Peaks</h4>
            <p><strong>Terrain:</strong> Extreme verticality, narrow mountain passes, and precipitous rocky ridges.</p>
            <p><strong>Best Tactics:</strong> Master vertical recovery bounces. If hit into mid-air, keep holding opposite direction keys to stabilize your center of gravity before landing. Guard the narrow mountain ridges to sweep rivals down into the ravines.</p>
            <p><strong>Danger:</strong> High-altitude ragdoll bounces can trigger chain reactions if you collide with falling rubble.</p>
          </div>
        </div>

        <h2>3. Pro Survival Tips &amp; Battle Royale Meta</h2>
        <ol>
          <li><strong>Never Engage in the Early Scramble:</strong> At the round start, 10+ AI sheep spawn within close proximity and immediately collide into a chaotic pile. Stay on the outer perimeter, allow 4-6 bots to eliminate each other, then pick off the survivors.</li>
          <li><strong>Baiting Over Charging:</strong> Rather than chasing retreating sheep across flat ground, position yourself near an incline or perimeter. AI sheep pathing prioritizes heading straight toward you, making them predictable targets for redirection.</li>
          <li><strong>Angled Flank Strikes:</strong> Striking a target sheep at a 45-degree angle spins their ragdoll model, preventing them from regaining traction. Direct head-to-head bumps often rebound both players equally.</li>
          <li><strong>Recovery Braking:</strong> When pushed toward a map boundary, immediately hold <strong>S</strong> and steer parallel to the border rather than trying to reverse straight backwards.</li>
        </ol>

        <div className="cluster-internal-links" style={{
          marginTop: '2rem',
          padding: '1.25rem',
          background: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <h4>Related Pages &amp; Modes</h4>
          <ul style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', listStyle: 'none', padding: 0, margin: '0.5rem 0 0 0' }}>
            <li><Link to="/" style={{ color: '#2563eb', fontWeight: 600 }}>Home</Link></li>
            <li><Link to="/crazy-cattle-3d-unblocked" style={{ color: '#2563eb', fontWeight: 600 }}>Play Unblocked</Link></li>
            <li><Link to="/crazy-cattle-3d-online" style={{ color: '#2563eb', fontWeight: 600 }}>Play Online Free</Link></li>
            <li><Link to="/crazy-cattle-3d-download" style={{ color: '#2563eb', fontWeight: 600 }}>Official PC Download</Link></li>
            <li><Link to="/faq" style={{ color: '#2563eb', fontWeight: 600 }}>FAQ &amp; Hardware Tips</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CrazyCattleGuide;
