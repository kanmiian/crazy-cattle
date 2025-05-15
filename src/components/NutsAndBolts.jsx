import React, { useState } from 'react';
import SEO from './SEO';

const NutsAndBolts = () => {
  const [showGame, setShowGame] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const gameContainerRef = React.useRef(null);

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
    <div className="game-page">
      <SEO 
        title="Nuts and Bolts - Addictive Screwing Puzzle Game"
        description="Play Nuts and Bolts, the ultimate bolt and nut matching puzzle game! Test your skills by matching the right nuts with bolts in this engaging mechanical adventure！"
        keywords="nuts and bolts game, bolt and nut puzzle, mechanical puzzle game, screwing puzzle, matching nuts and bolts"
      />
      
      <div className="game-header">
        <h1>🔩 Nuts and Bolts - Screwing Puzzle Game</h1>
        <p className="game-description">
          Challenge yourself in this addictive bolt and nut matching puzzle game! Match the correct nuts with bolts, master the art of mechanical assembly, and solve increasingly complex puzzles.
        </p>
      </div>

      <div className="game-section">
        {!showGame ? (
          <div className="game-placeholder">
            <img
              src="/images/nuts-bolts-unscrew-puzzle.avif"
              alt="Nuts and Bolts Game Preview"
              className="preview-img"
            />
            <button onClick={() => setShowGame(true)} className="play-button">
              <span>▶️</span> Play Game
            </button>
          </div>
        ) : (
          <div className="game-container" ref={gameContainerRef}>
            {!iframeLoaded && (
              <div className="loading-placeholder">
                <div className="loading-spinner"></div>
                <div className="loading-text">Loading Game...</div>
              </div>
            )}
            <iframe
              title="Nuts and Bolts Game"
              src="https://kdata1.com/2024/09/nuts-and-bolts-screwing/"
              allowFullScreen
              frameBorder="0"
              onLoad={handleIframeLoad}
              style={{
                display: 'block',
                opacity: iframeLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease'
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

      <div className="game-info">
        <h2>About Nuts and Bolts</h2>
        <div className="game-description">
          <p>
            Nuts and Bolts is an engaging puzzle game that challenges players to match the correct nuts with their corresponding bolts. In this mechanical-themed puzzle adventure, you'll need to carefully examine each bolt and nut pair to ensure they fit perfectly together.
          </p>
          <p>
            As you progress through the levels, you'll encounter increasingly complex bolt and nut combinations, requiring keen attention to detail and strategic thinking. The game combines the satisfaction of mechanical assembly with brain-teasing puzzle elements.
          </p>
          <p>
            Whether you're a puzzle enthusiast or just looking for a unique gaming experience, Nuts and Bolts offers an addictive challenge that will keep you engaged for hours. Test your mechanical intuition and problem-solving skills in this innovative bolt and nut matching game!
          </p>
        </div>
      </div>

      <div className="game-instructions">
        <div className="instructions-header">
          <h2>How to Play<br />Nuts and Bolts</h2>
        </div>
        <div className="instructions-box-grid">
          <div className="instruction-item top-left">
            <h3>1. Examine the Parts</h3>
            <p>Carefully inspect each bolt and nut to understand their unique characteristics. Different nuts and bolts have varying sizes and thread patterns that must match perfectly.</p>
          </div>
          <div className="instruction-item top-right">
            <h3>2. Match and Screw</h3>
            <p>Find matching bolt and nut pairs and screw them together. Pay attention to the thread direction and size to ensure a proper fit.</p>
          </div>
          <div className="instruction-item bottom-left">
            <h3>3. Complete Sets</h3>
            <p>Work efficiently to complete all bolt and nut combinations within the time limit. Each successful match brings you closer to completing the level.</p>
          </div>
          <div className="instruction-item bottom-right">
            <h3>4. Master Challenges</h3>
            <p>Progress through increasingly difficult levels featuring more complex nuts and bolts patterns and time constraints.</p>
          </div>
        </div>
      </div>

      <div className="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <h3>What makes Nuts and Bolts unique?</h3>
          <p>Nuts and Bolts combines mechanical assembly concepts with puzzle-solving mechanics, creating a unique gaming experience. Each bolt and nut combination presents its own challenge, requiring both logical thinking and attention to detail.</p>
        </div>
        <div className="faq-item">
          <h3>Is Nuts and Bolts free to play?</h3>
          <p>Yes! Nuts and Bolts is completely free to play in your web browser. No download or installation required - just start matching those nuts and bolts!</p>
        </div>
        <div className="faq-item">
          <h3>Can I play on mobile devices?</h3>
          <p>Yes, Nuts and Bolts is optimized for both desktop and mobile devices. The intuitive controls make it easy to match nuts and bolts on any screen size.</p>
        </div>
        <div className="faq-item">
          <h3>How many levels are there?</h3>
          <p>The game features numerous challenging levels, each introducing new bolt and nut patterns and increasing difficulty. Regular updates add even more puzzles to solve!</p>
        </div>
      </div>

      <div className="game-features">
        <h2>Game Features</h2>
        <div className="instructions-grid">
          <div className="instruction-item">
            <h3>Intuitive Controls</h3>
            <p>Simple yet engaging controls make matching nuts and bolts a satisfying experience. The realistic screwing mechanics add to the immersion.</p>
          </div>
          <div className="instruction-item">
            <h3>Progressive Difficulty</h3>
            <p>Start with simple bolt and nut matches and work your way up to complex mechanical puzzles that will test your skills.</p>
          </div>
          <div className="instruction-item">
            <h3>Time Challenges</h3>
            <p>Race against the clock to complete bolt and nut combinations, adding an exciting element of pressure to the puzzle-solving.</p>
          </div>
          <div className="instruction-item">
            <h3>Achievement System</h3>
            <p>Unlock achievements and track your progress as you become a master of matching nuts and bolts in this mechanical puzzle adventure.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutsAndBolts; 