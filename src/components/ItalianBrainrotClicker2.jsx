import React, { useState, useRef } from 'react';
import SEO from './SEO';

const ItalianBrainrotClicker2 = () => {
  const [showGame, setShowGame] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const gameContainerRef = useRef(null);

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
        title="Italian Brainrot Clicker 2 - Unblocked Game | Play Online"
        description="Play Italian Brainrot Clicker 2 unblocked - The sequel to the popular Italian-themed clicker game. Click, upgrade, and unlock new content in this addictive idle game."
        canonicalUrl="https://cattlecrazy3d.com/italian-brainrot-clicker-2"
      />
      
      <div className="game-page">
        <header className="game-header">
          <h1>Italian Brainrot Clicker 2</h1>
          <p className="game-tagline">The Ultimate Italian-Themed Clicker Adventure - Unblocked Version</p>
        </header>

        <section className="game-container-section">
          {!showGame ? (
            <div className="game-placeholder">
              <img
                src="/images/italian-brainrot-click2.png"
                alt="Italian Brainrot Clicker 2 Preview"
                className="preview-img"
              />
              <button onClick={() => setShowGame(true)} className="play-button">
                <span>▶️</span> Play Italian Brainrot Clicker 2
              </button>
            </div>
          ) : (
            <div className="game-container" ref={gameContainerRef}>
              {!iframeLoaded && (
                <div className="loading-placeholder">
                  <img
                    src="/images/italian-brainrot-click2.png"
                    alt="Italian Brainrot Clicker 2 Preview"
                    className="preview-img"
                  />
                  <div className="loading-overlay">
                    <div className="loading-text">Loading Game...</div>
                  </div>
                </div>
              )}
              <iframe
                title="Italian Brainrot Clicker 2 - Unblocked Clicker Game"
                src="https://game.azgame.io/italian-brainrot-clicker-2/"
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
        </section>


        <section className="game-description">
          <div className="description-content">
            <h2>About Italian Brainrot Clicker 2</h2>
            <p>Welcome to Italian Brainrot Clicker 2, the highly anticipated sequel to the popular Italian-themed clicker game! This unblocked version brings you all the fun without restrictions. Click your way through various Italian-themed upgrades, unlock new content, and become the ultimate Italian clicker master!</p>
            
            <h3>Game Features:</h3>
            <ul>
              <li>🎮 Enhanced clicking mechanics and progression system</li>
              <li>🍕 New Italian-themed upgrades and achievements</li>
              <li>🌟 Improved graphics and animations</li>
              <li>🏆 More challenging goals and rewards</li>
              <li>💫 Unblocked gameplay for unlimited fun</li>
            </ul>

            <h3>How to Play:</h3>
            <ol>
              <li>Click the main button to earn points</li>
              <li>Use your points to purchase upgrades</li>
              <li>Unlock new Italian-themed content</li>
              <li>Compete with friends for high scores</li>
              <li>Enjoy the unblocked version anytime, anywhere!</li>
            </ol>
          </div>
        </section>

        <section className="game-tips">
          <h2>Tips & Strategies</h2>
          <div className="tips-content">
            <div className="tip-card">
              <h3>🎯 Beginner Tips</h3>
              <ul>
                <li>Focus on upgrading your click power first</li>
                <li>Save points for important upgrades</li>
                <li>Check achievements for bonus rewards</li>
              </ul>
            </div>
            <div className="tip-card">
              <h3>⚡ Advanced Strategies</h3>
              <ul>
                <li>Balance between active and passive income</li>
                <li>Plan your upgrade path efficiently</li>
                <li>Use multipliers strategically</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ItalianBrainrotClicker2; 