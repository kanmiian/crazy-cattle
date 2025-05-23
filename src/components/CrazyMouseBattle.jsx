import React, { useState, useRef, useEffect } from 'react';
import SEO from './SEO';

const CrazyMouseBattle = () => {
  const [showGame, setShowGame] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const gameContainerRef = useRef(null);
  const previewImageRef = useRef(null);

  // Preload game image
  useEffect(() => {
    const img = new Image();
    img.src = "/images/crazy-mouse-battle.webp";
  }, []);

  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  const handleWebFullscreen = () => {
    if (gameContainerRef.current) {
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
    <>
      <SEO 
        title="Crazy Mouse Battle - Arena Combat Game | Play Online"
        description="Play Crazy Mouse Battle free! Join fast-paced arena battles between wild mice. Outsmart opponents, master combat skills, and become the ultimate mouse champion!"
        canonicalUrl="https://cattlecrazy3d.com/crazy-mouse-battle"
      />
      
      <div className="game-page">
        <header className="game-header">
          <h1>Crazy Mouse Battle Arena</h1>
          <p className="game-tagline">Fast-Paced Wild Mouse Combat Adventure</p>
        </header>

        <section className="game-container-section">
          {!showGame ? (
            <div className="game-placeholder">
              <img
                ref={previewImageRef}
                src="/images/crazy-mouse-battle.png"
                alt="Crazy Mouse Battle Game Preview"
                className="preview-img"
                loading="eager"
                fetchpriority="high"
              />
              <button onClick={() => setShowGame(true)} className="play-button">
                <span>▶️</span> Play Crazy Mouse Battle
              </button>
            </div>
          ) : (
            <div className="game-container" ref={gameContainerRef}>
              {!iframeLoaded && (
                <div className="loading-placeholder">
                  <img
                    src="/images/crazy-mouse-battle.webp"
                    alt="Crazy Mouse Battle Game Preview"
                    className="preview-img"
                    loading="eager"
                  />
                  <div className="loading-overlay">
                    <div className="loading-text">Loading Crazy Mouse Battle...</div>
                  </div>
                </div>
              )}
              <iframe
                title="Crazy Mouse Battle - Arena Combat Game"
                src="https://1games.io/game/crazy-mouse-battle/"
                width="1280"
                height="720"
                allowFullScreen
                frameBorder="0"
                scrolling="none"
                allow="cross-origin-isolated; shared-storage; fullscreen"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-downloads allow-presentation allow-modals"
                referrerPolicy="origin"
                onLoad={handleIframeLoad}
                loading="lazy"
                style={{
                  display: 'block',
                  opacity: iframeLoaded ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                  width: '100%',
                  height: '100%'
                }}
              ></iframe>
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
        </section>

        <section className="game-description">
          <div className="description-content">
            <h2>About Crazy Mouse Battle</h2>
            <p>Welcome to Crazy Mouse Battle, the ultimate arena combat game featuring wild mice in intense battles! Join fast-paced arena battles where you'll control wild mice warriors in epic combat scenarios. In this thrilling crazy mouse battle adventure, you'll need to outsmart opponents, master advanced combat skills, and prove yourself as the ultimate mouse champion in the most exciting crazy mouse battle arena!</p>
            
            <h3>Crazy Mouse Battle Game Features:</h3>
            <ul>
              <li>🐭 Epic crazy mouse battle arena with intense combat mechanics</li>
              <li>⚔️ Fast-paced crazy mouse battle gameplay with dynamic controls</li>
              <li>🏆 Strategic crazy mouse battle system with skill progression</li>
              <li>💥 Multiple crazy mouse battle modes and environments</li>
              <li>🎮 Smooth crazy mouse battle controls optimized for all devices</li>
              <li>🌟 Competitive crazy mouse battle ranking and achievements</li>
            </ul>

            <h3>How to Play Crazy Mouse Battle:</h3>
            <ol>
              <li>Enter the crazy mouse battle arena and select your warrior</li>
              <li>Master the crazy mouse battle combat controls and mechanics</li>
              <li>Develop winning crazy mouse battle strategies against opponents</li>
              <li>Execute perfect crazy mouse battle combos and special moves</li>
              <li>Climb the crazy mouse battle leaderboards and rankings</li>
              <li>Become the legendary crazy mouse battle champion!</li>
            </ol>
          </div>
        </section>

        <section className="game-tips">
          <h2>Crazy Mouse Battle Tips & Strategies</h2>
          <div className="tips-content">
            <div className="tip-card">
              <h3>🐭 Combat Mastery Tips</h3>
              <ul>
                <li>Master crazy mouse battle timing for perfect attacks</li>
                <li>Learn crazy mouse battle combo sequences for maximum damage</li>
                <li>Practice crazy mouse battle defensive maneuvers and blocks</li>
                <li>Utilize crazy mouse battle environment advantages</li>
              </ul>
            </div>
            <div className="tip-card">
              <h3>⚡ Advanced Battle Strategies</h3>
              <ul>
                <li>Study opponent patterns in crazy mouse battle matches</li>
                <li>Perfect your crazy mouse battle movement and positioning</li>
                <li>Master crazy mouse battle special abilities and power-ups</li>
                <li>Develop unique crazy mouse battle fighting styles</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="game-faq">
          <h2>Crazy Mouse Battle FAQ</h2>
          <div className="faq-content">
            <div className="faq-item">
              <h3>What is Crazy Mouse Battle?</h3>
              <p>Crazy Mouse Battle is an exciting arena combat game where players control wild mice warriors in fast-paced battles. The game features intense crazy mouse battle scenarios with strategic combat, skill-based gameplay, and competitive arena matches designed to test your combat skills and tactical thinking.</p>
            </div>
            <div className="faq-item">
              <h3>How do I master Crazy Mouse Battle combat?</h3>
              <p>To excel in Crazy Mouse Battle, focus on mastering the timing of attacks, blocks, and combos. Practice different crazy mouse battle strategies, learn to read opponent movements, and perfect your positioning in the arena. Regular practice and studying advanced crazy mouse battle techniques will help you become a champion.</p>
            </div>
            <div className="faq-item">
              <h3>What makes Crazy Mouse Battle unique?</h3>
              <p>Crazy Mouse Battle stands out with its fast-paced arena combat featuring wild mice warriors. The game combines strategic thinking with quick reflexes, offering unique crazy mouse battle mechanics, diverse fighting styles, and competitive gameplay that keeps players engaged and challenged.</p>
            </div>
            <div className="faq-item">
              <h3>Can I play Crazy Mouse Battle on mobile devices?</h3>
              <p>Yes! Crazy Mouse Battle is fully optimized for mobile gameplay. The responsive design ensures that crazy mouse battle controls work seamlessly on touch devices, allowing you to enjoy intense arena battles anywhere with intuitive mobile-friendly combat mechanics.</p>
            </div>
            <div className="faq-item">
              <h3>Are there different game modes in Crazy Mouse Battle?</h3>
              <p>Crazy Mouse Battle offers various gameplay modes including single-player arena challenges, multiplayer battles, tournament modes, and practice sessions. Each mode provides unique crazy mouse battle experiences with different objectives and difficulty levels to master.</p>
            </div>
            <div className="faq-item">
              <h3>How do I improve my Crazy Mouse Battle ranking?</h3>
              <p>To climb the crazy mouse battle rankings, focus on winning consecutive matches, mastering advanced combat techniques, and completing daily challenges. Consistent performance in crazy mouse battle tournaments and maintaining high win rates will boost your ranking and unlock exclusive rewards.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CrazyMouseBattle; 