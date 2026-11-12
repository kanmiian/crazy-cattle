import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from './SEO';

const GAME_SRC = 'https://crazycattle3d.io/game/crazycattle3d/v11/';

const faqs = [
  {
    q: 'What is the main objective in Crazy Cattle 3D?',
    a: 'Your sole objective is to be the last animal standing in the arena by ramming rival sheep off the map while keeping yourself inside the shrinking boundary.'
  },
  {
    q: 'What are the keyboard controls for Crazy Cattle 3D on PC?',
    a: 'Use WASD or the Arrow Keys to steer and accelerate, press Spacebar for an explosive momentum charge/jump, and use your mouse to look around and line up collision angles.'
  },
  {
    q: 'How do touch controls work on mobile devices?',
    a: 'On smartphones and tablets, drag the virtual on-screen thumbstick on the left to move, tap the sprint button on the right to charge, and swipe the right screen area to adjust your camera.'
  },
  {
    q: 'What should beginners do in the first 60 seconds of a match?',
    a: 'Immediately steer away from the center spawn cluster to the perimeter, use downhill slopes to build safe momentum, and wait for initial bot eliminations before engaging.'
  }
];

const CrazyCattleHowToPlay = () => {
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

  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.a
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faq-howtoplay-jsonld';
    script.text = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      document.getElementById('faq-howtoplay-jsonld')?.remove();
    };
  }, []);

  return (
    <div className="game-page how-to-play-page">
      <SEO
        title="Crazy Cattle 3D How to Play - Beginner Guide & Controls (2026)"
        description="Learn how to play Crazy Cattle 3D! Step-by-step beginner guide covering PC & mobile controls, the 4-phase match loop, and crucial first 60 seconds survival."
        keywords="Crazy Cattle 3D how to play, how to play crazy cattle, crazy cattle 3d controls, crazy cattle beginner guide, sheep battle royale tutorial"
      />

      <div className="game-header">
        <p className="hot-game-kicker" style={{ color: '#2563eb', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem' }}>
          Beginner Mastery Guide &bull; Updated 2026
        </p>
        <h1>🎮 Crazy Cattle 3D How to Play: Complete Beginner Walkthrough</h1>
        <p className="game-description-header">
          <strong>The Game Objective in One Sentence:</strong> Outlast every competitor and be the last sheep standing by knocking rival animals off the edge before the shrinking arena boundary claims you.
        </p>
        <div className="game-actions">
          <button onClick={() => setShowGame(true)} className="btn primary">
            <span>▶️</span> Practice Live Arena
          </button>
          <Link to="/crazy-cattle-3d-how-to-win" className="btn secondary">
            <span>🏆</span> Read How to Win Strategy
          </Link>
        </div>
      </div>

      <div className="game-section">
        {!showGame ? (
          <div className="game-placeholder">
            <div className="preview-container" onClick={() => setShowGame(true)}>
              <img
                src="/images/crazycattle-preview.webp"
                alt="Crazy Cattle 3D How to Play Practice Preview"
                className="preview-img"
              />
              <div className="preview-overlay">
                <div className="play-hint">
                  <span className="play-icon">▶️</span>
                  <span className="play-text">Click to Play &amp; Test Controls</span>
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
              title="Crazy Cattle 3D How to Play Practice Session"
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
        <h2>1. Core Controls: Desktop Keyboard vs. Mobile Touch</h2>
        <div className="game-overview" style={{ marginBottom: '2rem' }}>
          <table className="game-details-table">
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '10px 14px' }}>Action</th>
                <th style={{ textAlign: 'left', padding: '10px 14px' }}>Desktop Keybind (PC / Mac)</th>
                <th style={{ textAlign: 'left', padding: '10px 14px' }}>Mobile Touch Control</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Steering &amp; Movement</strong></td>
                <td><code>W, A, S, D</code> or <code>Arrow Keys</code></td>
                <td>Virtual joystick on bottom-left screen</td>
              </tr>
              <tr>
                <td><strong>Explosive Ram / Charge</strong></td>
                <td><code>Spacebar</code> (Tap for boost, hold to charge)</td>
                <td>Right action button with lightning/ram icon</td>
              </tr>
              <tr>
                <td><strong>Camera Orientation</strong></td>
                <td>Mouse look / crosshair movement</td>
                <td>Swipe across the right half of the display</td>
              </tr>
              <tr>
                <td><strong>Braking &amp; Edge Stop</strong></td>
                <td><code>S</code> key (Reverse momentum dampener)</td>
                <td>Pull thumbstick backwards immediately</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>2. A Full Match in 4 Distinct Stages</h2>
        <div className="features-grid" style={{ marginBottom: '2rem' }}>
          <div className="feature-card">
            <h4>🏁 Stage 1: Spawn &amp; Dispersal (0-15s)</h4>
            <p>12-16 sheep spawn closely together. Do not attack immediately. Turn 90 degrees outward and move to free space before other sheep push you around.</p>
          </div>
          <div className="feature-card">
            <h4>🌾 Stage 2: Momentum Farming (15-60s)</h4>
            <p>Use hills and downward slopes to build maximum speed. Gain momentum while letting aggressive bot rivals eliminate each other on the perimeter.</p>
          </div>
          <div className="feature-card">
            <h4>⚠️ Stage 3: Ring Compression (60-120s)</h4>
            <p>The safe playable arena boundary begins to shrink. Relocate toward the central high ground early so you aren't caught off guard by hazard zones.</p>
          </div>
          <div className="feature-card">
            <h4>🏆 Stage 4: Sudden-Death Showdown (120s+)</h4>
            <p>Only 2-3 sheep remain in a tiny circle. Victory comes down to angle timing. Wait for the rival to charge, dodge sideways, and counter-strike!</p>
          </div>
        </div>

        <h2>3. What to Do in Your First 60 Seconds: Beginner Checklist</h2>
        <ol style={{ lineHeight: 1.9, fontSize: '1.02rem', paddingLeft: '1.5rem', marginBottom: '2.5rem' }}>
          <li><strong>Step 1: Avoid the Center Meat-Grinder:</strong> Over 40% of first-time players die within 10 seconds because they sprint directly into the central pile-up. Always flank outward.</li>
          <li><strong>Step 2: Locate Downhill Angles:</strong> Find an elevated ridge in Ireland, Iceland, or New Zealand. Physics momentum scales exponentially when charging down a slope.</li>
          <li><strong>Step 3: Keep Your Camera Centered on Rivals:</strong> Never let enemies leave your field of view. A blindside hit from behind sends your ragdoll flying off the arena.</li>
          <li><strong>Step 4: Pick Off Isolated Stragglers:</strong> Hunt sheep that are already stuck near an edge or recovering from a collision. High-impact flank hits guarantee safe knockouts.</li>
        </ol>

        <h2>4. Frequently Asked Questions</h2>
        <div className="faq-list" style={{ marginBottom: '2.5rem' }}>
          {faqs.map((f) => (
            <div className="faq-item" key={f.q} style={{ marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#1e293b', margin: '0 0 6px 0' }}>{f.q}</h3>
              <p style={{ margin: 0, color: '#475569', lineHeight: 1.6 }}>{f.a}</p>
            </div>
          ))}
        </div>

        <div className="hub-backlink-card" style={{
          padding: '1.5rem',
          background: '#eff6ff',
          borderRadius: '10px',
          border: '1px solid #bfdbfe'
        }}>
          <h3 style={{ margin: '0 0 8px 0', color: '#1e40af' }}>
            Ready to Take 1st Place? Master Advanced Tactics!
          </h3>
          <p style={{ margin: '0 0 14px 0', fontSize: '0.96rem', color: '#1e3a8a' }}>
            Now that you understand the controls and match flow, check out our companion guide on <Link to="/crazy-cattle-3d-how-to-win" style={{ color: '#2563eb', fontWeight: 700 }}>how to win Crazy Cattle 3D</Link> with pro collision angles and endgame circle tricks.
          </p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Link to="/crazy-cattle-3d-how-to-win" className="btn primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
              🏆 How to Win Guide
            </Link>
            <Link to="/crazy-cattle-3d-unblocked" className="btn secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
              🔓 Play Unblocked
            </Link>
            <Link to="/crazy-cattle-3d-online" className="btn secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
              🌐 Play Online Free
            </Link>
            <Link to="/" className="btn secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
              🐄 Crazy Cattle 3D Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrazyCattleHowToPlay;
