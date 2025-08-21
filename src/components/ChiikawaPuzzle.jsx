import React, { useState } from 'react';
import SEO from './SEO';

const ChiikawaPuzzle = () => {
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
        title="Chiikawa Puzzle (チイカワパズル) - Adorable Character Puzzle Game"
        description="Play Chiikawa Puzzle, a delightful puzzle game featuring the beloved Chiikawa characters. Solve challenging puzzles with cute graphics and engaging gameplay!"
        keywords="chiikawa puzzle, チイカワパズル, chiikawa game, puzzle game, cute puzzle, character puzzle, chiikawa characters"
      />
      
      <div className="game-header">
        <h1>🧩 Chiikawa Puzzle (チイカワパズル) - Adorable Character Adventure</h1>
        <p className="game-description">
          Welcome to the charming world of Chiikawa Puzzle, where adorable characters meet brain-teasing challenges! This delightful puzzle game brings the beloved Chiikawa universe to life through engaging gameplay that combines cute graphics with strategic thinking. Whether you're a longtime fan of the Chiikawa series or discovering these lovable characters for the first time, this puzzle adventure offers hours of entertainment and mental stimulation.
        </p>
      </div>

      <div className="game-section">
        {!showGame ? (
          <div className="game-placeholder">
            <img
              src="/images/chiikawa-puzzle-game.jpg"
              alt="Chiikawa Puzzle Game Preview"
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
                <img
                  src="/images/chiikawa-puzzle-game.jpg"
                  alt="Chiikawa Puzzle Game Preview"
                  className="preview-img"
                />
                <div className="loading-overlay">
                  <div className="loading-text">Loading Game...</div>
                </div>
              </div>
            )}
            <iframe
              title="Chiikawa Puzzle Game"
              src="https://html-classic.itch.zone/html/14669242/index.html"
              allowFullScreen
              frameBorder="0"
              allow="cross-origin-isolated; shared-storage; fullscreen"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-downloads allow-presentation allow-modals"
              referrerPolicy="origin"
              onLoad={handleIframeLoad}
              style={{
                display: 'block',
                opacity: iframeLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease'
              }}
            ></iframe>
            <div className="game-controls">
              <button onClick={handleWebFullscreen} className="control-btn" title="Web Fullscreen">
                {isFullscreen ? '⤓' : '⤢'}
              </button>
              <button onClick={handleBrowserFullscreen} className="control-btn" title="Browser Fullscreen">
                🖥️
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="game-info">
        <div className="info-section">
          <h2>🎮 Game Features</h2>
          <p>
            Chiikawa Puzzle offers a unique blend of adorable aesthetics and challenging gameplay that appeals to players of all ages. The game features beautifully crafted puzzles that showcase the distinctive art style of the Chiikawa universe, with each level presenting new challenges that require both logical thinking and creative problem-solving skills.
          </p>
          <p>
            The puzzle mechanics are designed to be intuitive yet engaging, allowing players to quickly understand the basic rules while discovering deeper strategic elements as they progress. The game's difficulty curve is carefully balanced to provide a satisfying experience for both casual players and puzzle enthusiasts, ensuring that everyone can enjoy the charming world of Chiikawa while being appropriately challenged.
          </p>
        </div>

        <div className="info-section">
          <h2>🎯 How to Play</h2>
          <p>
            Chiikawa Puzzle combines traditional puzzle-solving elements with the unique charm of the Chiikawa characters. Players must strategically arrange and match puzzle pieces to complete various challenges, with each level introducing new mechanics and obstacles that keep the gameplay fresh and exciting. The intuitive controls make it easy to pick up and play, while the increasing complexity ensures long-term engagement.
          </p>
          <p>
            Success in Chiikawa Puzzle requires a combination of spatial awareness, pattern recognition, and strategic planning. Players must carefully consider their moves and anticipate how their actions will affect the overall puzzle layout. The game rewards both quick thinking and patient analysis, making it accessible to different play styles and skill levels.
          </p>
        </div>

        <div className="info-section">
          <h2>🌟 Why Play Chiikawa Puzzle?</h2>
          <p>
            Beyond its engaging gameplay, Chiikawa Puzzle offers a delightful escape into a world filled with cute characters and positive vibes. The game's charming aesthetic and relaxing atmosphere make it perfect for unwinding after a long day, while the challenging puzzles provide mental stimulation and a sense of accomplishment. Whether you're a fan of the Chiikawa series or simply enjoy well-crafted puzzle games, this title delivers a complete and satisfying gaming experience.
          </p>
          <p>
            The game's accessibility and universal appeal make it an excellent choice for family gaming sessions, while its depth and complexity ensure that even experienced puzzle players will find plenty to enjoy. With its combination of adorable characters, engaging mechanics, and polished presentation, Chiikawa Puzzle stands out as a must-play title for anyone who appreciates quality puzzle games with heart and personality.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChiikawaPuzzle; 