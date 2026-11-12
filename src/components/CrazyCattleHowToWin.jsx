import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from './SEO';

const GAME_SRC = 'https://crazycattle3d.io/game/crazycattle3d/v11/';

const winFaqs = [
  {
    q: 'What is the most effective collision angle to knock opponents out?',
    a: 'Striking at a 45-degree flank angle delivers maximum rotational torque to an opponent ragdoll, flipping them upside down and preventing traction recovery. Avoid head-on collisions, which produce equal mutual recoil.'
  },
  {
    q: 'How does momentum scale in Crazy Cattle 3D?',
    a: 'Collision power depends on the differential speed between you and your target. Downhill slides convert gravitational potential into kinetic force, allowing smaller sheep to overpower larger packs.'
  },
  {
    q: 'How should I position myself during the final circle?',
    a: 'Anchor yourself in the absolute center of the remaining ring. Keep your back facing away from the edge, and bait the final opponent into an overextended charge before sidestepping.'
  },
  {
    q: 'What is the number one cause of player eliminations?',
    a: 'Overcharging off the map edge. Players frequently activate full boost toward a rival near the perimeter and fail to brake in time, carrying their own momentum off the cliff.'
  }
];

const CrazyCattleHowToWin = () => {
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
      mainEntity: winFaqs.map((f) => ({
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
    script.id = 'faq-howtowin-jsonld';
    script.text = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      document.getElementById('faq-howtowin-jsonld')?.remove();
    };
  }, []);

  return (
    <div className="game-page how-to-win-page">
      <SEO
        title="Crazy Cattle 3D How to Win - Pro Strategy, Collision Angles & Tips (2026)"
        description="Master how to win Crazy Cattle 3D! Pro tactics on 45-degree flank collisions, momentum scaling, final circle positioning, and avoiding common elimination traps."
        keywords="Crazy Cattle 3D how to win, how to win crazy cattle, crazy cattle 3d tips, crazy cattle pro strategy, sheep battle royale guide"
      />

      <div className="game-header">
        <p className="hot-game-kicker" style={{ color: '#16a34a', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem' }}>
          Pro Strategy &bull; Tactics &bull; Updated 2026
        </p>
        <h1>🏆 Crazy Cattle 3D How to Win: Pro Tactics &amp; Collision Meta</h1>
        <p className="game-description-header">
          Winning in Crazy Cattle 3D isn't about blind button smashing—it's about manipulating ragdoll physics, angles, and momentum. Learn how top-tier players consistently achieve 1st place across Ireland, Iceland, and New Zealand.
        </p>
        <div className="game-actions">
          <button onClick={() => setShowGame(true)} className="btn primary">
            <span>🎮</span> Test Winning Tactics Live
          </button>
          <Link to="/crazy-cattle-3d-how-to-play" className="btn secondary">
            <span>📖</span> Beginner Controls &amp; Basics
          </Link>
        </div>
      </div>

      <div className="game-section">
        {!showGame ? (
          <div className="game-placeholder">
            <div className="preview-container" onClick={() => setShowGame(true)}>
              <img
                src="/images/crazycattle-preview.webp"
                alt="Crazy Cattle 3D How to Win Practice Preview"
                className="preview-img"
              />
              <div className="preview-overlay">
                <div className="play-hint">
                  <span className="play-icon">▶️</span>
                  <span className="play-text">Click to Test Winning Strategies</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="game-container" ref={gameContainerRef}>
            {!iframeLoaded && (
              <div className="loading-placeholder">
                <div className="loading-overlay">
                  <div className="loading-text">Loading Championship Arena...</div>
                </div>
              </div>
            )}
            <iframe
              title="Crazy Cattle 3D How to Win Practice Arena"
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
        <h2>1. The Physics Meta: Collision Timing &amp; Angles</h2>
        <div className="features-grid" style={{ marginBottom: '2rem' }}>
          <div className="feature-card">
            <h4>📐 The 45-Degree Flank Strike</h4>
            <p>Hitting an opponent sheep dead center creates equal recoil, pushing you both backwards. Striking their hip or shoulder at a 45-degree angle spins their axis, sending them careening uncontrollably while preserving your forward balance.</p>
          </div>
          <div className="feature-card">
            <h4>⛷️ Slope Momentum Multiplier</h4>
            <p>Every meter of downhill run translates to higher mass impulse during impact. Never engage someone situated higher up the slope than you; retreat slightly to draw them down, then counter-strike when they reach the bottom.</p>
          </div>
          <div className="feature-card">
            <h4>🛑 The Sudden Brake Tap</h4>
            <p>Tap the <code>S</code> key a fraction of a second before colliding if your target is already skidding near a cliff. The subtle deceleration keeps your sheep safely on the grass while rival momentum carries them into the abyss.</p>
          </div>
        </div>

        <h2>2. Phased Game Plan: Early, Mid &amp; Late Game Strategy</h2>
        
        <h3>🌱 Early Game (100% to 60% Players Remaining)</h3>
        <p>
          <strong>Rule: Play the Observer.</strong> Your goal in the first 45 seconds is zero damage taken. Position yourself on a tranquil hill overlooking the crowd. AI bots naturally chase the closest moving object; allow them to collide and thin out their own ranks without risking your placement.
        </p>

        <h3>⚔️ Mid Game (60% to 20% Players Remaining)</h3>
        <p>
          <strong>Rule: Perimeter Flanking.</strong> As the field clears, locate isolated bots stuck on map edges or rocky outcroppings. Build downhill momentum and strike from behind. Avoid long linear chases across open plains where a third party can flank you.
        </p>

        <h3>👑 Late Game &amp; The Final Circle (Top 3 Showdown)</h3>
        <p>
          <strong>Rule: Center Anchor &amp; The Matador Dodge.</strong> As the ring shrinks to its absolute minimum, rush to the center and stop. Do not sprint around aimlessly. When the remaining rival winds up their charge directly at you, sidestep with <code>A</code> or <code>D</code> at the very last moment. Their own forward velocity will carry them off the cliff!
        </p>

        <h2>3. Top 3 Fatal Mistakes to Avoid (Common Pitfalls)</h2>
        <ol style={{ lineHeight: 1.9, fontSize: '1.02rem', paddingLeft: '1.5rem', marginBottom: '2.5rem' }}>
          <li>
            <strong>Mistake 1: Getting Sandwiched:</strong> Engaging two opponents simultaneously is a death sentence. If two sheep are locked in combat, stay 10 meters away until one is knocked out, then pounce on the recovering survivor.
          </li>
          <li>
            <strong>Mistake 2: Overcharging Off the Map:</strong> The #1 reason experienced players lose is overconfidence near edges. Always reserve enough braking distance when charging near a cliff drop-off.
          </li>
          <li>
            <strong>Mistake 3: Greedily Chasing Runaways:</strong> If a targeted sheep bounces away down an incline, let them go. Chasing them down puts you at a severe height and momentum disadvantage against other players looking down on you.
          </li>
        </ol>

        <h2>4. Frequently Asked Questions About Winning Matches</h2>
        <div className="faq-list" style={{ marginBottom: '2.5rem' }}>
          {winFaqs.map((f) => (
            <div className="faq-item" key={f.q} style={{ marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#1e293b', margin: '0 0 6px 0' }}>{f.q}</h3>
              <p style={{ margin: 0, color: '#475569', lineHeight: 1.6 }}>{f.a}</p>
            </div>
          ))}
        </div>

        <div className="hub-backlink-card" style={{
          padding: '1.5rem',
          background: '#f0fdf4',
          borderRadius: '10px',
          border: '1px solid #bbf7d0'
        }}>
          <h3 style={{ margin: '0 0 8px 0', color: '#166534' }}>
            Looking for Basic Controls or Unblocked Browser Access?
          </h3>
          <p style={{ margin: '0 0 14px 0', fontSize: '0.96rem', color: '#14532d' }}>
            Need a refresher on basic movement keys? Read our full breakdown on <Link to="/crazy-cattle-3d-how-to-play" style={{ color: '#16a34a', fontWeight: 700 }}>how to play Crazy Cattle 3D</Link> or jump into our unblocked school portal.
          </p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Link to="/crazy-cattle-3d-how-to-play" className="btn primary" style={{ padding: '8px 16px', fontSize: '0.9rem', background: '#16a34a' }}>
              🎮 How to Play Guide
            </Link>
            <Link to="/crazy-cattle-3d-unblocked" className="btn secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
              🔓 Play Unblocked
            </Link>
            <Link to="/crazy-cattle-3d-online" className="btn secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
              🌐 Play Online Free
            </Link>
            <Link to="/crazy-cattle-3d-guide" className="btn secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
              🗺️ 3 Maps Strategy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrazyCattleHowToWin;
