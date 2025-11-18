import React, { useState, useRef, useEffect } from 'react';
import SEO from './SEO';

const CluesBySam = () => {
  // State Management
  const [showGame, setShowGame] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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
        gameContainerRef.current.style.width = '100vw';
        gameContainerRef.current.style.position = 'fixed';
        gameContainerRef.current.style.top = '0';
        gameContainerRef.current.style.left = '0';
        gameContainerRef.current.style.zIndex = '1000';
        gameContainerRef.current.style.margin = '0';
        gameContainerRef.current.style.borderRadius = '0';
        setIsFullscreen(true);
      } else {
        const height = isMobile ? '85vh' : '600px';
        gameContainerRef.current.style.height = height;
        gameContainerRef.current.style.width = '100%';
        gameContainerRef.current.style.position = 'relative';
        gameContainerRef.current.style.top = 'auto';
        gameContainerRef.current.style.left = 'auto';
        gameContainerRef.current.style.zIndex = 'auto';
        gameContainerRef.current.style.margin = '0';
        gameContainerRef.current.style.borderRadius = isMobile ? '0' : '12px';
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

  // 响应式处理：监听窗口大小变化
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile(); // 初始检查
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // 更新iframe尺寸
  useEffect(() => {
    if (gameContainerRef.current && showGame) {
      const iframe = gameContainerRef.current.querySelector('iframe');
      if (iframe) {
        if (isMobile) {
          // 移动端：占满屏幕宽度和更多高度（竖屏游戏）
          iframe.style.height = isFullscreen ? '100vh' : '85vh';
          iframe.style.minHeight = '600px';
          iframe.style.width = '100%';
        } else {
          // 桌面端：和preview一样大，使用固定高度600px
          iframe.style.height = isFullscreen ? '100vh' : '600px';
          iframe.style.minHeight = '600px';
        }
      }
    }
  }, [showGame, isFullscreen, isMobile]);

  return (
    <div className="game-page clues-by-sam-page">
      <SEO 
        title="Clues by Sam - Free Daily Logic Puzzle Game | Play Online"
        description="Play Clues by Sam online for free! Solve daily logic puzzles where you figure out who is criminal and who is innocent. New puzzle every day at midnight New York time. Play Clues by Sam completely free - no download required!"
        keywords="clues by sam, daily clues, logic puzzle game, free puzzle game, online puzzle game, play clues by sam, daily logic puzzle, criminal innocent puzzle, sam clues game, free online puzzle"
      />
      
      <div className="game-header">
        <h1>🔍 Clues by Sam - Free Daily Logic Puzzle Game</h1>
        <p className="game-description-header">
          Challenge your logic skills with <strong>Clues by Sam</strong>, a daily puzzle game where you must figure out <strong>who is criminal</strong> and <strong>who is innocent</strong>. A new puzzle is released every day at midnight New York time. Play <strong>Clues by Sam online</strong> completely free - no download required! Use logical deduction to solve each puzzle without guessing!
        </p>
        <div className="game-actions">
          <button 
            onClick={() => setShowGame(true)} 
            className="btn primary"
          >
            <span>🔍</span> Play Clues by Sam Online Now
          </button>
        </div>
      </div>

      {/* Game Section */}
      <div className="game-section">
        {!showGame ? (
          <div className="game-placeholder">
            <div className="preview-container" onClick={() => setShowGame(true)}>
              <img
                src="/images/cluesbysam.jpg"
                alt="Clues by Sam Game Preview"
                className="preview-img"
              />
              <div className="preview-overlay">
                <div className="play-hint">
                  <span className="play-icon">▶️</span>
                  <span className="play-text">Click to Play Clues by Sam Online!</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="game-container clues-by-sam-container" ref={gameContainerRef}>
            {!iframeLoaded && (
              <div className="loading-placeholder">
                <div className="loading-overlay">
                  <div className="loading-text">Loading Clues by Sam Online Game...</div>
                </div>
              </div>
            )}
            <iframe
              title="Clues by Sam - Free Daily Logic Puzzle Game"
              src="https://cluesbysam.com/"
              allowFullScreen
              frameBorder="0"
              allow="fullscreen; autoplay; clipboard-read; clipboard-write; payment"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-downloads allow-presentation allow-modals allow-top-navigation allow-top-navigation-by-user-activation allow-pointer-lock"
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={handleIframeLoad}
              onError={() => {
                console.error('Failed to load iframe');
                setIframeLoaded(false);
              }}
              style={{
                display: 'block',
                opacity: iframeLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease',
                width: '100%',
                height: isMobile ? '85vh' : '600px',
                minHeight: isMobile ? '600px' : '600px',
                border: 'none',
                borderRadius: isMobile ? '0' : '12px'
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
        <h2>About Clues by Sam - The Daily Logic Puzzle Game</h2>
        <p>
          Welcome to <strong>Clues by Sam</strong>, a captivating daily logic puzzle game that challenges your deductive reasoning skills. In this <strong>free online puzzle game</strong>, you're presented with a grid of suspects and must use logical clues to determine <strong>who is criminal</strong> and <strong>who is innocent</strong>. Each day at midnight New York time, a brand new puzzle is released, keeping the game fresh and exciting. Play <strong>Clues by Sam online</strong> completely free - no downloads, no registration, and no hidden costs!
        </p>

        <h3>Clues by Sam Gameplay and Rules</h3>
        <p>
          <strong>Clues by Sam</strong> is a logic puzzle game where your goal is simple yet challenging: figure out which suspects are criminals and which are innocent. The game features a grid layout (typically 4x5 or similar) with suspects arranged in rows and columns. Each suspect has a name, profession, and location on the grid. You'll receive various clues that help you deduce the truth about each person.
        </p>

        <h3>How to Play Clues by Sam Online</h3>
        <ol>
          <li><strong>Read the Clues Carefully:</strong> Each puzzle provides multiple clues about the relationships, positions, and characteristics of the suspects. Pay attention to details like "neighbors," "between," "connected," and other spatial relationships.</li>
          <li><strong>Use Logical Deduction:</strong> The game prevents guessing - you can only make choices when you have logical evidence. Work through the clues systematically to eliminate possibilities.</li>
          <li><strong>Tap to Mark Suspects:</strong> Tap on a suspect to mark them as either innocent or criminal. If your logic is correct, they might reveal a new clue to help you solve the rest of the puzzle.</li>
          <li><strong>Use Corner Tags:</strong> Tap the top right corner of each card to add color tags, helping you track your deductions and test hypothetical scenarios.</li>
          <li><strong>Complete the Puzzle:</strong> Once you've correctly identified all criminals and innocents, you've solved the puzzle! Share your result and see how your time compares to others.</li>
        </ol>

        <h3>Clues by Sam Game Features</h3>
        <div className="features-grid">
          <div className="feature-card">
            <h4>🔍 Daily Puzzles</h4>
            <p>A new puzzle is released every day at midnight New York time, ensuring you always have fresh content to challenge your logic skills in this <strong>free online puzzle game</strong>.</p>
          </div>
          <div className="feature-card">
            <h4>🧩 Logic-Based Gameplay</h4>
            <p>No guessing allowed! Every choice must be based on logical deduction. The game ensures you can always find the next logical step, even when it seems impossible.</p>
          </div>
          <div className="feature-card">
            <h4>📱 Mobile & Desktop Support</h4>
            <p>Play <strong>Clues by Sam online</strong> on any device - optimized for both mobile phones and desktop computers. The game adapts to your screen size for the best experience.</p>
          </div>
          <div className="feature-card">
            <h4>🏷️ Color Tagging System</h4>
            <p>Use corner tags to organize your thoughts and track different deduction paths. Right-click anywhere on a card to cycle through tag colors.</p>
          </div>
          <div className="feature-card">
            <h4>💡 Hint System</h4>
            <p>If you get stuck, use the hint button to get guidance. The first hint shows which clues to focus on, and the second reveals which suspects you can identify.</p>
          </div>
          <div className="feature-card">
            <h4>📊 Share Your Results</h4>
            <p>Share your completion time and results with others. Compare your solving speed and see how you stack up against other players.</p>
          </div>
        </div>

        <h3>Clues by Sam Terminology Guide</h3>
        <p>
          Understanding the terminology is crucial for solving puzzles in <strong>Clues by Sam</strong>:
        </p>
        <ul>
          <li><strong>Neighbors:</strong> Always include diagonal neighbors. One person can have up to 8 neighbors.</li>
          <li><strong>In between:</strong> Means the persons between two suspects, not including the two themselves.</li>
          <li><strong>Connected:</strong> A chain of orthogonal adjacency (horizontal or vertical, not diagonal).</li>
          <li><strong>Rows:</strong> Go sideways and are numbered 1, 2, 3, 4, 5.</li>
          <li><strong>Columns:</strong> Go up and down and are lettered A, B, C, D.</li>
          <li><strong>All:</strong> Always means there's at least one (doesn't necessarily mean more than one).</li>
          <li><strong>Common neighbors:</strong> Those who are neighbors of both persons (doesn't include the persons themselves).</li>
        </ul>

        <h3>Game Overview</h3>
        <div className="game-overview">
          <table className="game-details-table">
            <tr><td><strong>Developer</strong></td><td>Sam (Ad Artis Oy)</td></tr>
            <tr><td><strong>Release Date</strong></td><td>2025</td></tr>
            <tr><td><strong>Genre</strong></td><td>Logic Puzzle, Deduction Game</td></tr>
            <tr><td><strong>Game Modes</strong></td><td>Daily puzzle mode</td></tr>
            <tr><td><strong>Controls</strong></td><td>Mouse/touch to interact with suspects</td></tr>
            <tr><td><strong>Platform</strong></td><td>Web browser (mobile and desktop)</td></tr>
            <tr><td><strong>Puzzle Frequency</strong></td><td>New puzzle daily at midnight NY time</td></tr>
          </table>
        </div>

        <h3>Frequently Asked Questions (FAQ)</h3>
        <div className="faq-item">
          <h4>Is Clues by Sam free to play online?</h4>
          <p>Yes, absolutely! <strong>Clues by Sam</strong> is a completely free <strong>online puzzle game</strong>. You can play directly in your browser with no downloads, hidden costs, or registration required. Play <strong>Clues by Sam online</strong> at cluesbysam.com completely free!</p>
        </div>
        <div className="faq-item">
          <h4>What is Clues by Sam and how does it work?</h4>
          <p><strong>Clues by Sam</strong> is a daily logic puzzle game where you must figure out which suspects are criminals and which are innocent. You're given a grid of suspects with various clues about their relationships, positions, and characteristics. Using logical deduction, you mark each suspect as criminal or innocent. The game prevents guessing - you can only make choices when you have logical evidence.</p>
        </div>
        <div className="faq-item">
          <h4>How do I play Clues by Sam online?</h4>
          <p>Simply read the clues carefully and use logical deduction to determine who is criminal and who is innocent. Tap on a suspect to mark them. If your logic is correct, they might reveal a new clue. Use corner tags to track your deductions. The game ensures there's always a logical next step - you never need to guess!</p>
        </div>
        <div className="faq-item">
          <h4>When are new puzzles released?</h4>
          <p>A new puzzle is released every day at midnight New York time. This ensures you always have fresh content to challenge your logic skills in this <strong>free online puzzle game</strong>.</p>
        </div>
        <div className="faq-item">
          <h4>Can I play Clues by Sam on my mobile device?</h4>
          <p>Yes! <strong>Clues by Sam</strong> is fully optimized for both desktop and mobile browsers, ensuring you can enjoy this <strong>online puzzle game</strong> anywhere, anytime. The interface adapts to your screen size for the best experience.</p>
        </div>
        <div className="faq-item">
          <h4>What makes Clues by Sam different from other puzzle games?</h4>
          <p><strong>Clues by Sam</strong> is unique because it combines daily puzzle releases with strict logic-based gameplay. Unlike other puzzle games, you cannot guess - every choice must be based on logical deduction. The game ensures there's always a logical next step, making it a true test of your reasoning skills.</p>
        </div>
        <div className="faq-item">
          <h4>Do I need to create an account to play Clues by Sam online?</h4>
          <p>No account required! You can start playing <strong>Clues by Sam</strong> immediately in your browser. The <strong>online</strong> game saves your progress automatically, so you can continue your puzzle-solving adventure anytime.</p>
        </div>
        <div className="faq-item">
          <h4>What if I get stuck on a puzzle?</h4>
          <p>If you get stuck, use the hint button below the grid. The first press reveals which clues you should be looking at, and the second press reveals which suspects you can identify. You can also ask for help on Bluesky or r/CluesBySamHelp, or share your scenario using the "Share scenario" button.</p>
        </div>
      </div>
    </div>
  );
};

export default CluesBySam;

