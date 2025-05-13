import React, { useState } from 'react';
import SEO from './SEO';

const CrazyChicken = () => {
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
        title="Crazy Chicken 3D - Wild Physics-Based Chicken Battle Game"
        description="Play Crazy Chicken 3D, a physics-based battle game where chickens compete in wild environments. Experience explosive action and hilarious physics!"
        keywords="crazy chicken, crazy chicken 3d, crazy game, chicken battle game, physics game, battle royale game"
      />
      
      <div className="game-header">
        <h1>🐔 Crazy Chicken 3D - Wild Physics Battle</h1>
        <p className="game-description">
          Step into the wild world of Crazy Chicken 3D, where physics meets chaos in this hilarious battle royale game! Control your chicken warrior in intense battles, using momentum and strategy to outmaneuver opponents. With its unique physics-based gameplay and crazy game mechanics, every match is an unpredictable adventure. Whether you're bouncing off walls or executing perfect combos, Crazy Chicken 3D delivers non-stop entertainment and challenge!
        </p>
      </div>

      <div className="game-section">
        {!showGame ? (
          <div className="game-placeholder">
            <img
              src="/images/chicken.png"
              alt="Crazy Chicken 3D Preview"
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
                  src="/images/crazychicken.webp"
                  alt="Crazy Chicken 3D Preview"
                  className="preview-img"
                />
                <div className="loading-overlay">
                  <div className="loading-text">Loading Game...</div>
                </div>
              </div>
            )}
            <iframe
              title="Crazy Chicken 3D Game"
              src="https://html-classic.itch.zone/html/13448030/crazychicken%20web%20port/index.html"
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
                ⛶
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="game-info">
        <h2>How to Play Crazy Chicken 3D</h2>
        <div className="game-instructions">
          <div className="instruction-item">
            <h3>Master the Controls</h3>
            <ul>
              <li>Use WASD or arrow keys to move your crazy chicken</li>
              <li>Space bar to jump and perform special moves</li>
              <li>Collect power-ups to enhance your chicken's abilities</li>
              <li>Use the environment to your advantage in this crazy game</li>
              <li>Master the physics to become the ultimate chicken warrior</li>
            </ul>
          </div>
          <div className="instruction-item">
            <h3>Game Features</h3>
            <ul>
              <li>Intense physics-based battle royale gameplay</li>
              <li>Multiple crazy game modes to choose from</li>
              <li>Unique chicken characters with special abilities</li>
              <li>Dynamic environments that change the battle</li>
              <li>Power-ups and special items to collect</li>
              <li>Regular updates with new content and features</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="game-tips">
        <h2>Pro Tips for Crazy Chicken Success</h2>
        <div className="tips-container">
          <div className="tip-item">
            <h3>Master the Physics</h3>
            <p>In this crazy game, understanding the physics is crucial for success. Learn how your chicken moves and interacts with the environment. Use momentum to your advantage and watch out for unexpected bounces. The more you understand the physics in Crazy Chicken 3D, the better you'll perform in battles!</p>
          </div>
          <div className="tip-item">
            <h3>Strategic Movement</h3>
            <p>Don't just run around randomly in this crazy game. Plan your movements and use the environment strategically. Look for high ground, use obstacles for cover, and create opportunities to surprise your opponents. In Crazy Chicken 3D, smart movement can be the difference between victory and defeat!</p>
          </div>
          <div className="tip-item">
            <h3>Power-up Management</h3>
            <p>Power-ups are essential in this crazy game. Learn which power-ups are most effective in different situations and manage them wisely. Don't waste powerful items on weak opponents, and always be ready to use them at the right moment. In Crazy Chicken 3D, proper power-up usage can turn the tide of battle!</p>
          </div>
          <div className="tip-item">
            <h3>Advanced Techniques</h3>
            <p>Take your Crazy Chicken 3D skills to the next level by mastering advanced techniques. Learn to chain moves together, use the environment for complex strategies, and develop your own unique playstyle. Remember, in this crazy game, creativity and skill go hand in hand!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrazyChicken; 