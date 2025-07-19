import React, { useState } from 'react';
import SEO from './SEO';

const ColdplayCanoodle = () => {
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
        title="Coldplay Canoodle - Play the Ultimate Kiss Cam Game Online"
        description="Experience the magic of Coldplay Canoodle, the ultimate kiss cam game where you match couples and create romantic moments. Play this addictive Coldplay-themed kissing game now!"
        keywords="coldplay canoodle, kiss cam game, coldplay game, canoodle game, kissing game, coldplay kiss cam, canoodle online, coldplay kissing game"
      />
      
      <div className="game-header">
        <h1>💋 Coldplay Canoodle - The Ultimate Kiss Cam Game</h1>
        <p className="game-description">
          Welcome to Coldplay Canoodle, the most romantic and addictive kiss cam game inspired by the legendary band Coldplay! This unique kissing game combines the magic of Coldplay's music with the excitement of a kiss cam experience, creating an unforgettable gaming adventure. In Coldplay Canoodle, you'll find yourself immersed in a world where love and music collide, as you help couples share intimate moments under the spotlight. The game features stunning visuals, smooth animations, and an engaging gameplay mechanic that will keep you coming back for more. Whether you're a die-hard Coldplay fan or simply love romantic games, Coldplay Canoodle offers an experience like no other. The kiss cam mechanic adds an extra layer of excitement, making every moment feel special and memorable. Get ready to experience the perfect blend of romance, music, and gaming in this extraordinary Coldplay Canoodle adventure!
        </p>
      </div>

      <div className="game-section">
        {!showGame ? (
          <div className="game-placeholder">
            <img
              src="/images/coldplay-canoodle.png"
              alt="Coldplay Canoodle Kiss Cam Game Preview"
              className="preview-img"
            />
            <button onClick={() => setShowGame(true)} className="play-button">
              <span>💋</span> Play Coldplay Canoodle
            </button>
          </div>
        ) : (
          <div className="game-container" ref={gameContainerRef}>
            {!iframeLoaded && (
              <div className="loading-placeholder">
                <img
                  src="/images/coldplay-canoodle.png"
                  alt="Coldplay Canoodle Kiss Cam Game Preview"
                  className="preview-img"
                />
                <div className="loading-overlay">
                  <div className="loading-text">Loading Coldplay Canoodle...</div>
                </div>
              </div>
            )}
            <iframe
              title="Coldplay Canoodle Kiss Cam Game"
              src="https://coldplay-canoodle.pages.dev/"
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
        <h2>How to Play Coldplay Canoodle</h2>
        <div className="game-instructions">
          <div className="instruction-item">
            <h3>Master the Kiss Cam Mechanics</h3>
            <ul>
              <li>Use your mouse or touch controls to interact with the kiss cam interface</li>
              <li>Click on couples to activate the kiss cam and capture romantic moments</li>
              <li>Time your interactions perfectly to maximize your score in this Coldplay-themed game</li>
              <li>Watch for special Coldplay-inspired moments that appear throughout the game</li>
              <li>Collect bonus points by creating the most romantic kiss cam moments</li>
            </ul>
          </div>
          <div className="instruction-item">
            <h3>Coldplay Canoodle Features</h3>
            <ul>
              <li>Immersive Coldplay-themed graphics and animations that bring the kiss cam to life</li>
              <li>Multiple levels with increasing difficulty and romantic challenges</li>
              <li>Special Coldplay music integration that enhances the kissing game experience</li>
              <li>Responsive design that works perfectly on all devices</li>
              <li>No download required - play Coldplay Canoodle instantly in your browser</li>
              <li>Regular updates with new kiss cam scenarios and Coldplay content</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="game-tips">
        <h2>Pro Tips for Coldplay Canoodle Success</h2>
        <div className="tips-container">
          <div className="tip-item">
            <h3>Perfect Your Kiss Cam Timing</h3>
            <p>In Coldplay Canoodle, timing is everything when it comes to the kiss cam! Watch for the perfect moment to activate the kiss cam and capture those romantic moments. The game rewards players who can read the mood and create the most memorable kiss cam experiences. Remember, in this Coldplay-themed kissing game, every interaction counts towards your final score. Practice your timing to become a master of the kiss cam mechanics!</p>
          </div>
          <div className="tip-item">
            <h3>Master the Coldplay Atmosphere</h3>
            <p>Understanding the Coldplay aesthetic is key to success in this canoodle game. The game incorporates elements from Coldplay's romantic music and creates an atmosphere perfect for kiss cam moments. Pay attention to the visual cues and musical elements that enhance the kissing game experience. Whether you're a longtime Coldplay fan or new to their music, the game's atmosphere will draw you into the romantic world of Coldplay Canoodle!</p>
          </div>
          <div className="tip-item">
            <h3>Advanced Kiss Cam Strategies</h3>
            <p>Take your Coldplay Canoodle skills to the next level with advanced kiss cam strategies. Study the patterns of romantic moments and develop a consistent approach to capturing them. Pay attention to the different types of couples and their unique characteristics in this kissing game. Remember that in Coldplay Canoodle, every kiss cam moment is an opportunity to create something special. With practice and dedication, you can become a true master of this romantic Coldplay-themed game!</p>
          </div>
          <div className="tip-item">
            <h3>Romance and Music Combined</h3>
            <p>Coldplay Canoodle perfectly combines the romance of kiss cam moments with the emotional power of Coldplay's music. The game creates an immersive experience where every interaction feels meaningful and romantic. Whether you're playing for the first time or returning for another session, the combination of kiss cam mechanics and Coldplay's atmospheric music creates a unique gaming experience. Embrace the romantic atmosphere and let the music guide your kiss cam interactions in this extraordinary Coldplay Canoodle adventure!</p>
          </div>
        </div>
      </div>

      <div className="game-faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <h3>Is Coldplay Canoodle free to play?</h3>
          <p>Yes, Coldplay Canoodle is completely free to play in your web browser. No download or installation required - just click and start playing this romantic kiss cam game!</p>
        </div>
        <div className="faq-item">
          <h3>What makes Coldplay Canoodle unique?</h3>
          <p>Coldplay Canoodle combines the excitement of kiss cam mechanics with the romantic atmosphere of Coldplay's music, creating a unique gaming experience that's both entertaining and emotionally engaging.</p>
        </div>
        <div className="faq-item">
          <h3>Can I play Coldplay Canoodle on mobile?</h3>
          <p>Absolutely! Coldplay Canoodle is fully optimized for mobile devices, so you can enjoy this romantic kiss cam game anywhere, anytime.</p>
        </div>
        <div className="faq-item">
          <h3>How do I get the best score in Coldplay Canoodle?</h3>
          <p>Focus on timing your kiss cam interactions perfectly, pay attention to the romantic atmosphere, and practice regularly to master the game's mechanics and achieve the highest scores.</p>
        </div>
      </div>
    </div>
  );
};

export default ColdplayCanoodle; 