import React, { useState, useRef, useEffect } from 'react';
import SEO from './SEO';

const LoveMoney = () => {
  // State Management
  const [showGame, setShowGame] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const gameContainerRef = useRef(null);

  // Handle iframe load completion
  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  // Handle web fullscreen toggle
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

  // Handle browser fullscreen
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
        title="LoveMoney - Free Online Money Game | Play LoveMoney Online"
        description="Play LoveMoney online for free! Experience the ultimate online money game where you collect, manage, and grow your virtual wealth. Play LoveMoney completely free - no download required!"
        keywords="lovemoney, love money game, online money game, free money game, play lovemoney online, money collection game, virtual wealth game, online lovemoney"
      />
      
      <div className="game-header">
        <h1>💰 LoveMoney - Free Online Clicker RPG Game</h1>
        <p className="game-description-header">
          Experience the ultimate <strong>online clicker RPG</strong> inspired by BloodMoney! <strong>LoveMoney</strong> is a deceptively sweet <strong>online</strong> game where you click to earn money for your life-saving operation. Play <strong>LoveMoney online</strong> completely free - no download required! Will you risk it all to earn $25,000 as fast as possible, or take the slow, moral road? The choice is yours in this twisted <strong>online</strong> adventure!
        </p>
        <div className="game-actions">
          <button 
            onClick={() => setShowGame(true)} 
            className="btn primary"
          >
            <span>💰</span> Play LoveMoney Online Now
          </button>
        </div>
      </div>

      {/* Game Section */}
      <div className="game-section">
        {!showGame ? (
          <div className="game-placeholder">
            <div className="preview-container" onClick={() => setShowGame(true)}>
              <img
                src="/images/lovemoney.jpg"
                alt="LoveMoney Game Preview"
                className="preview-img"
              />
              <div className="preview-overlay">
                <div className="play-hint">
                  <span className="play-icon">▶️</span>
                  <span className="play-text">Click to Play LoveMoney Online!</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="game-container" ref={gameContainerRef}>
            {!iframeLoaded && (
              <div className="loading-placeholder">
                <div className="loading-overlay">
                  <div className="loading-text">Loading LoveMoney Online Game...</div>
                </div>
              </div>
            )}
            <iframe
              title="LoveMoney - Free Online Money Game"
              src="https://lovemoneygame.io/game/lovemoney-game/"
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

      {/* SEO Content Section */}
      <div className="seo-content-section">
        <h2>About LoveMoney - The Twisted Online Clicker RPG</h2>
        <p>
          Welcome to the twisted world of <strong>LoveMoney</strong>, a deceptively sweet <strong>online clicker RPG</strong> inspired by BloodMoney that blends fast-paced money-making mechanics with unexpected moral and romantic choices. This isn't just another <strong>online</strong> game; it's a psychological journey where you take on the role of someone who needs $25,000 to cover a life-saving medical bill. With no money and no options, hopelessness sets in until you meet Harvey, who offers you a way to earn cash fast: click him to earn money. Each click and item you buy can push boundaries - will you risk it all to earn $25,000 as fast as possible, or take the slow, moral road and play it safe? Play <strong>LoveMoney online</strong> completely free and find out how far you will go!
        </p>

        <h3>LoveMoney Gameplay and Storyline</h3>
        <p>
          <strong>LoveMoney</strong> is a twisted clicker-style RPG fangame spin-off that challenges your moral compass. Your ultimate goal is simple: earn enough money by clicking and interacting with Harvey. It's easy to play, yet the challenge lies in your choice. How far will you push your limits to get the cash? Will you lose yourself chasing the lure of money? The game features pixel art charm with retro visuals, enhanced by a cute and intimate aesthetic that makes the moral dilemmas even more compelling.
        </p>

        <h3>How to Play LoveMoney Online</h3>
        <ol>
          <li><strong>Meet Harvey and Start Earning:</strong> Earn your first cash by simple clicks—1 click equals 1 dollar. Keep clicking until you've earned enough to unlock items from the in-game shop.</li>
          <li><strong>Hit the Shop and Buy Items:</strong> As you earn more, new tools become available. The first one is a "feather" that costs $100 yet gives you $2 per click. Later items are increasingly expensive but allow you to rack up earnings fast.</li>
          <li><strong>Face the Moral Dilemma:</strong> You will earn more with every item you buy, but be careful—they also impact your relationship with Harvey. His expressions, dialogue, and affection shift based on your choices.</li>
          <li><strong>Choose Your Path:</strong> Push the limit for fast money, or protect your soul and morale. It's your decision!</li>
          <li><strong>Reach the Endings:</strong> The game ends when you earn $25,000, but there are multiple endings depending on your moral choices throughout the <strong>online</strong> adventure.</li>
        </ol>

        <h3>LoveMoney Game Features</h3>
        <div className="features-grid">
          <div className="feature-card">
            <h4>💰 Clicker Mechanics</h4>
            <p>Simple yet addictive clicking gameplay where each click earns you money. Start with $1 per click and upgrade your earnings through strategic item purchases in this <strong>online</strong> adventure.</p>
          </div>
          <div className="feature-card">
            <h4>💕 Moral Romance System</h4>
            <p>Interact with Harvey through pet, kiss, touch, and more intimate interactions driven by mouse clicks. Your choices affect Harvey's expressions, dialogue, and affection in this twisted <strong>online</strong> experience.</p>
          </div>
          <div className="feature-card">
            <h4>🎭 Multiple Endings</h4>
            <p>Experience different story outcomes based on your moral choices. Will Harvey cheat on his wife because of your decisions, or will you stay within moral boundaries? The choice is yours in this <strong>online</strong> game.</p>
          </div>
        </div>

        <h3>Game Overview</h3>
        <div className="game-overview">
          <table className="game-details-table">
            <tr><td><strong>Developer</strong></td><td>Buwu</td></tr>
            <tr><td><strong>Release Date</strong></td><td>September 1st, 2025</td></tr>
            <tr><td><strong>Genre</strong></td><td>Visual Novel, Clicker RPG</td></tr>
            <tr><td><strong>Game Modes</strong></td><td>Single-player story mode</td></tr>
            <tr><td><strong>Controls</strong></td><td>Mouse clicks to interact with Harvey</td></tr>
            <tr><td><strong>Graphics</strong></td><td>Pixel art with retro visuals and intimate aesthetic</td></tr>
          </table>
        </div>

        <h3>Frequently Asked Questions (FAQ)</h3>
        <div className="faq-item">
          <h4>Is LoveMoney free to play online?</h4>
          <p>Yes, absolutely! <strong>LoveMoney</strong> is a completely free <strong>online clicker RPG</strong>. You can play directly in your browser with no downloads, hidden costs, or registration required. Play <strong>LoveMoney online</strong> at lovemoneygame.io completely free and unblocked!</p>
        </div>
        <div className="faq-item">
          <h4>What is LoveMoney and how does it work?</h4>
          <p><strong>LoveMoney</strong> is a twisted clicker-style RPG inspired by BloodMoney. You play as someone who needs $25,000 for a life-saving medical bill. Meet Harvey, who offers you a way to earn cash fast by clicking him. Each click earns you money, and you can buy items to increase your earnings per click. However, your choices affect your relationship with Harvey and lead to different endings.</p>
        </div>
        <div className="faq-item">
          <h4>How do I play LoveMoney online?</h4>
          <p>Simply click on Harvey to earn money - start with $1 per click. Use your earnings to buy items from the shop that increase your money per click. The first item is a "feather" costing $100 that gives you $2 per click. Be careful though - your choices affect Harvey's expressions, dialogue, and affection. The game ends when you reach $25,000, but there are multiple endings based on your moral choices.</p>
        </div>
        <div className="faq-item">
          <h4>What are the different endings in LoveMoney?</h4>
          <p>There are at least 2 possible endings in <strong>LoveMoney</strong>. In one ending, Harvey cheats on his wife because of your choices, revealing the cost of temptation. In the other ending, you stay within moral boundaries, refusing to cross the line. The ending depends on whether you buy the last item and how far you're willing to push moral boundaries for money.</p>
        </div>
        <div className="faq-item">
          <h4>Can I play LoveMoney on my mobile device?</h4>
          <p>Yes! <strong>LoveMoney</strong> is optimized for both desktop and mobile browsers, ensuring you can enjoy this <strong>online clicker RPG</strong> anywhere, anytime. The game features pixel art graphics that work well on all devices.</p>
        </div>
        <div className="faq-item">
          <h4>What makes LoveMoney different from other online games?</h4>
          <p><strong>LoveMoney</strong> is unique because it combines clicker mechanics with moral dilemmas and romantic choices. Unlike other <strong>online</strong> games, <strong>LoveMoney</strong> challenges your moral compass while providing addictive clicking gameplay. It's a psychological journey that asks: how far will you go for money?</p>
        </div>
        <div className="faq-item">
          <h4>Do I need to create an account to play LoveMoney online?</h4>
          <p>No account required! You can start playing <strong>LoveMoney</strong> immediately in your browser. The <strong>online</strong> game saves your progress automatically, so you can continue your twisted adventure anytime.</p>
        </div>
        <div className="faq-item">
          <h4>What is the objective of LoveMoney?</h4>
          <p>The main objective is to earn $25,000 by clicking and interacting with Harvey. However, the real challenge is moral: will you take the fast road and push boundaries for quick money, or take the slow, moral road and play it safe? Your choices determine not just your earnings, but also your relationship with Harvey and the game's ending.</p>
        </div>
      </div>
    </div>
  );
};

export default LoveMoney;
