import React, { useState } from 'react';
import SEO from './SEO';

const ItalianBrainrot = () => {
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
        title="Italian Brainrot - Merge Fellas Italian Brainrot Characters"
        description="Play the viral Italian Brainrot game featuring hilarious Italian Brainrot characters like Bombardiro Crocodillo. Merge Italian Brainrot characters!"
        keywords=""
      />
      
      <div className="game-header">
        <h1>🇮🇹 Italian Brainrot - Merge Fellas</h1>
        <p className="game-description">
          Dive into the absurd world of Italian Brainrot in this hilarious merging puzzle game! Combine iconic Italian Brainrot characters and discover increasingly bizarre and entertaining combinations.
        </p>
      </div>

      <div className="game-section">
        {!showGame ? (
          <div className="game-placeholder">
            <img
              src="/images/italian-brainrot.webp"
              alt="Italian Brainrot Game Preview"
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
                  src="/images/italian-brainrot.webp"
                  alt="Italian Brainrot Game Preview"
                  className="preview-img"
                />
                <div className="loading-overlay">
                  <div className="loading-text">Loading Game...</div>
                </div>
              </div>
            )}
            <iframe
              title="Italian Brainrot Game"
              src="https://game-iframe.qizhilu.org/merge-fellas/index.html"
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
        <h2>What is Italian Brainrot?</h2>
        <div className="brainrot-description">
          <p>
            Italian Brainrot is an internet phenomenon featuring bizarre, AI-generated characters with Italian-sounding names and catchphrases that have taken social media by storm. The term "Italian Brainrot" refers to the absurd and often nonsensical nature of these characters and their sounds, which somehow manage to be both confusing and addictively entertaining.
          </p>
          <p>
            At the center of this cultural sensation are iconic Italian Brainrot characters like <strong>Bombardiro Crocodillo</strong>, a purple crocodile known for its distinctive "BOMBARDIRO!" cry, and <strong>Tralalero Tralala</strong>, a whimsical character with a catchy melodic tune. These Italian Brainrot characters, along with others like Piccione Macchina and Bombombini Gusini, have spawned countless memes, remixes, and fan creations across the internet.
          </p>
          <p>
            This game, Merge Fellas Italian Brainrot, combines the viral Italian Brainrot characters with engaging merge puzzle mechanics. Players start with basic Italian Brainrot characters and combine similar ones to create increasingly bizarre and powerful combinations. With strategic merging, you'll discover rare Italian Brainrot character combinations and fill your collection with the most absurd creations!
          </p>
        </div>
      </div>

      <div className="game-instructions">
        <div className="instructions-header">
          <h2>How to Play<br />Italian Brainrot<br />Merge Fellas</h2>
        </div>
        <div className="instructions-box-grid">
          <div className="instruction-item top-left">
            <h3>1. Merge Similar Characters</h3>
            <p>Drag and drop identical Italian Brainrot characters together to merge them into more advanced characters. Each combination reveals a new, more bizarre Italian Brainrot creation!</p>
          </div>
          <div className="instruction-item top-right">
            <h3>2. Manage Your Board</h3>
            <p>Space management is crucial in Merge Fellas Italian Brainrot. Plan your merges carefully to keep your board from filling up with too many unmatched Italian Brainrot characters.</p>
          </div>
          <div className="instruction-item bottom-left">
            <h3>3. Discover Rare Combinations</h3>
            <p>Experiment with different merging sequences to discover rare and powerful Italian Brainrot character combinations. Some legendary Italian Brainrot characters only appear through specific merging paths!</p>
          </div>
          <div className="instruction-item bottom-right">
            <h3>4. Complete Your Collection</h3>
            <p>Try to discover all possible Italian Brainrot characters to complete your collection. There are over 50 unique Italian Brainrot characters to find!</p>
          </div>
        </div>
      </div>
      
      <div className="learn-more">
        <h2>Discover More About Italian Brainrot</h2>
        <p>Want to explore the full universe of Italian Brainrot characters beyond the game? Visit <a href="https://animalbrainrot.com/" target="_blank" rel="noopener noreferrer">AI Brainrot Animals</a> to discover all 40+ Italian Brainrot species, hear their authentic sounds, and learn about the bizarre lore behind each character. From Bombardiro Crocodillo to Tralalero Tralala, dive deeper into the cultural phenomenon that's taking the internet by storm!</p>
      </div>

      <div className="game-features">
        <h2>Italian Brainrot Game Features</h2>
        <div className="instructions-grid">
          <div className="instruction-item">
            <h3>Authentic Characters</h3>
            <p>Meet all your favorite Italian Brainrot characters, including the iconic Bombardiro Crocodillo, melodic Tralalero Tralala, and many more. Each Italian Brainrot character comes with its own unique design and personality.</p>
          </div>
          <div className="instruction-item">
            <h3>Strategic Gameplay</h3>
            <p>The merge mechanics in Italian Brainrot offer simple yet deep gameplay. As you progress, you'll need to develop more complex strategies to manage your space and create the most powerful Italian Brainrot character combinations.</p>
          </div>
          <div className="instruction-item">
            <h3>Regular Updates</h3>
            <p>New Italian Brainrot characters are added regularly, bringing fresh content and challenges to keep you engaged. The Italian Brainrot universe keeps expanding with more absurd and entertaining characters!</p>
          </div>
          <div className="instruction-item">
            <h3>Community Connection</h3>
            <p>Join the global Italian Brainrot community! Share your rare discoveries, compete with friends, and stay updated on the latest Italian Brainrot character memes and trends.</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ItalianBrainrot; 