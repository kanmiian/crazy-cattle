import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from './SEO';

const GAME_SRC = '/game/index.html';

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
    const howToSchema = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How to Play Crazy Cattle 3D: Beginner to Winner Walkthrough',
      description: 'Step-by-step walkthrough on how to play Crazy Cattle 3D, covering early spawn cover, speed momentum scaling, ramming collision timing, and endgame circle survival.',
      totalTime: 'PT3M',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Early Game: Find Cover & Evacuate Spawn Pack (开局找掩体)',
          text: 'Upon spawning, immediately turn 90 degrees outward to clear the central meat-grinder. Locate natural terrain ridges or boulder covers to avoid being shoved off the edge in the opening 10 seconds.',
          url: 'https://cattlecrazy3d.com/crazy-cattle-3d-how-to-play#step-1'
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Mid Game: Farm Momentum & Gather Speed on Slopes (吃道具成长与坡道聚势)',
          text: 'Traverse elevated ridges to build momentum. Harness downhill gravitational velocity across Ireland, Iceland, and New Zealand to power up collision knockback force while rival AI sheep thin out.',
          url: 'https://cattlecrazy3d.com/crazy-cattle-3d-how-to-play#step-2'
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Attack Timing: Execute 45-Degree Flank Ramming Strikes (把握冲撞时机)',
          text: 'Avoid head-on impacts. Line up your camera crosshair and time your explosive Spacebar ram to strike enemies at a 45-degree angle or from the rear while they are disoriented near boundary cliffs.',
          url: 'https://cattlecrazy3d.com/crazy-cattle-3d-how-to-play#step-3'
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Endgame: Final Circle Center Positioning & Sidestep Counter (决赛圈核心走位)',
          text: 'As the boundary compresses into sudden-death, secure the dead center high ground. When the final surviving rival charges you, tap A or D to sidestep at the last second, allowing their own forward momentum to propel them into the void.',
          url: 'https://cattlecrazy3d.com/crazy-cattle-3d-how-to-play#step-4'
        }
      ]
    };

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

    const scriptHowTo = document.createElement('script');
    scriptHowTo.type = 'application/ld+json';
    scriptHowTo.id = 'howto-howtoplay-jsonld';
    scriptHowTo.text = JSON.stringify(howToSchema);
    document.head.appendChild(scriptHowTo);

    const scriptFaq = document.createElement('script');
    scriptFaq.type = 'application/ld+json';
    scriptFaq.id = 'faq-howtoplay-jsonld';
    scriptFaq.text = JSON.stringify(faqSchema);
    document.head.appendChild(scriptFaq);

    return () => {
      document.getElementById('howto-howtoplay-jsonld')?.remove();
      document.getElementById('faq-howtoplay-jsonld')?.remove();
    };
  }, []);

  return (
    <div className="game-page how-to-play-page">
      <SEO
        title="How to Play Crazy Cattle 3D – Controls & First Match Walkthrough"
        description="Learn how to play Crazy Cattle 3D! Step-by-step beginner walkthrough covering PC & mobile controls, the 4-phase match loop, and crucial first 60 seconds survival."
        keywords="How to play crazy cattle 3d, crazy cattle 3d controls, crazy cattle first match walkthrough, beginner guide sheep game, match loop"
      />

      <div className="game-header">
        <p className="hot-game-kicker" style={{ color: '#2563eb', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem' }}>
          Beginner Mastery Guide &bull; Updated 2026
        </p>
        <h1>🎮 How to Play Crazy Cattle 3D: Controls &amp; First Match Walkthrough</h1>
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
              allow="cross-origin-isolated; fullscreen; autoplay"
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

        <h2>3. Match Walkthrough: 4 Core Survival Steps</h2>
        <ol style={{ lineHeight: 1.9, fontSize: '1.02rem', paddingLeft: '1.5rem', marginBottom: '2.5rem' }}>
          <li id="step-1"><strong>Step 1: Early Game: Find Cover &amp; Evacuate Spawn Pack (开局找掩体):</strong> Over 40% of first-time players die within 10 seconds in the central pile-up. Immediately turn 90 degrees outward upon spawning, locate boundary rocks or terrain ridges, and seek temporary cover before bots converge.</li>
          <li id="step-2"><strong>Step 2: Mid Game: Farm Momentum &amp; Gather Speed on Slopes (吃道具成长与坡道聚势):</strong> Traverse elevated ridges across Ireland, Iceland, and New Zealand to accumulate speed. Use downward momentum to amplify your sheep's collision kinetic energy while remaining cautious of edge drops.</li>
          <li id="step-3"><strong>Step 3: Attack Timing: Execute 45-Degree Flank Ramming Strikes (把握冲撞时机):</strong> Never engage in head-on collisions. Time your Spacebar charge to strike opponents at an oblique 45-degree angle or from behind while they recover from previous clashes.</li>
          <li id="step-4"><strong>Step 4: Endgame: Final Circle Center Positioning &amp; Sidestep Counter (决赛圈核心走位):</strong> When the shrinking safe boundary forces surviving sheep into close quarters, hold the dead center high ground. When the last enemy charges, tap A or D to dodge aside at the final moment, letting their momentum plunge them off the edge.</li>
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
