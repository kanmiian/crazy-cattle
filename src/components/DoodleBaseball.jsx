import React, { useState } from 'react';
import SEO from './SEO';

const DoodleBaseball = () => {
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
        title="Doodle Baseball - Play Google's Classic Baseball Game"
        description="Play Doodle Baseball, Google's classic baseball game. Experience the fun of hitting home runs and playing baseball in this nostalgic Google Doodle game."
        keywords="baseball google, google doodle, doodle baseball, baseball game, google baseball game"
      />
      
      <div className="game-header">
        <h1>⚾ Doodle Baseball - Google's Classic Baseball Game</h1>
        <p className="game-description">
          Experience the timeless charm of Google's Doodle Baseball game, a beloved classic that has captured the hearts of baseball fans worldwide! This iconic Google Doodle game brings the excitement of America's favorite pastime to your browser, combining simple yet addictive gameplay with nostalgic charm. Whether you're a baseball enthusiast or a casual gamer, Doodle Baseball offers an engaging experience that celebrates the spirit of the sport. Step up to the plate, grab your virtual bat, and see how many home runs you can hit in this delightful Google Doodle baseball adventure!
        </p>
      </div>

      <div className="game-section">
        {!showGame ? (
          <div className="game-placeholder">
            <img
              src="/images/doodle.webp"
              alt="Doodle Baseball Preview"
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
                  src="/images/doodle.webp"
                  alt="Doodle Baseball Preview"
                  className="preview-img"
                />
                <div className="loading-overlay">
                  <div className="loading-text">Loading Game...</div>
                </div>
              </div>
            )}
            <iframe
              title="Doodle Baseball Game"
              src="https://1games.io/game/doodle-baseball/"
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
        <h2>How to Play Doodle Baseball</h2>
        <div className="game-instructions">
          <div className="instruction-item">
            <h3>Master the Controls</h3>
            <ul>
              <li>Click and hold to aim your bat - precision is key in this Google Doodle baseball game</li>
              <li>Release at the perfect moment to hit the ball - timing is everything!</li>
              <li>Adjust your power by holding longer - find the sweet spot for maximum impact</li>
              <li>Hit home runs to score points and climb the leaderboard</li>
              <li>Practice your swing to master the art of baseball in this classic Google Doodle</li>
            </ul>
          </div>
          <div className="instruction-item">
            <h3>Game Features</h3>
            <ul>
              <li>Authentic Google Doodle baseball gameplay that's easy to learn but challenging to master</li>
              <li>Classic baseball mechanics with a modern twist</li>
              <li>Perfect for quick gaming sessions or extended play</li>
              <li>No download required - play instantly in your browser</li>
              <li>Works seamlessly on both desktop and mobile devices</li>
              <li>Regular updates and improvements to enhance your baseball gaming experience</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="game-tips">
        <h2>Pro Tips for Doodle Baseball Success</h2>
        <div className="tips-container">
          <div className="tip-item">
            <h3>Perfect Your Timing</h3>
            <p>In this Google Doodle baseball game, timing is everything! Wait for the perfect moment to hit the ball. The longer you hold, the more power you'll generate, but timing is crucial for accuracy. Watch the ball's trajectory carefully and release at the optimal moment to achieve maximum distance. Remember, in Doodle Baseball, a well-timed hit can mean the difference between a single and a home run!</p>
          </div>
          <div className="tip-item">
            <h3>Master the Angles</h3>
            <p>Understanding ball trajectory is key to success in Google's Doodle Baseball. Adjust your hitting angle to control the ball's path. A higher angle will result in a higher arc, while a lower angle will keep the ball closer to the ground. Experiment with different angles to find the perfect combination for various situations. Whether you're aiming for the fences or trying to place the ball strategically, mastering angles in this Google Doodle baseball game will significantly improve your performance!</p>
          </div>
          <div className="tip-item">
            <h3>Power vs. Control</h3>
            <p>Finding the right balance between power and control is essential in Doodle Baseball. While powerful hits can result in impressive home runs, sometimes a well-placed hit is more valuable. Learn to read the game situation and adjust your strategy accordingly. In this Google Doodle baseball game, smart players know when to go for power and when to focus on precision. Practice different hitting techniques to become a versatile player in the Google Doodle baseball arena!</p>
          </div>
          <div className="tip-item">
            <h3>Advanced Strategies</h3>
            <p>Take your Google Doodle baseball skills to the next level with advanced strategies. Study the ball's movement patterns and develop a consistent hitting rhythm. Pay attention to the wind conditions and adjust your aim accordingly. Remember that in Doodle Baseball, every hit counts, and smart players know how to maximize their scoring opportunities. With practice and dedication, you can become a true master of this classic Google Doodle baseball game!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoodleBaseball; 