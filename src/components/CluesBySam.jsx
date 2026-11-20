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

    checkMobile();
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
          iframe.style.height = isFullscreen ? '100vh' : '85vh';
          iframe.style.minHeight = '600px';
          iframe.style.width = '100%';
        } else {
          iframe.style.height = isFullscreen ? '100vh' : '600px';
          iframe.style.minHeight = '600px';
        }
      }
    }
  }, [showGame, isFullscreen, isMobile]);

  return (
    <div className="game-page clues-by-sam-page" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
      <SEO 
        title="Clues by Sam – Play Free Online + Full Answers & Walkthrough"
        description="Play Clues by Sam online for free! Daily logic deduction walkthrough, clue puzzle answers, rules, and strategies to identify criminals and innocents without guessing."
        keywords="clues by sam, clues by sam answers, clues by sam today, daily logic puzzle, deduction game, play clues by sam online, free logic grid puzzle"
      />
      
      <header className="game-header" style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2.2rem', color: '#1e293b', marginBottom: '0.5rem' }}>Clues by Sam</h1>
        <p className="game-description-header" style={{ fontSize: '1.1rem', color: '#475569', lineHeight: '1.6' }}>
          Play <strong>Clues by Sam online</strong> for free! Solve daily logic deduction grids where you determine who is criminal and who is innocent. Master positional clues, row and column quotas, and corner tagging to solve every daily puzzle without guessing.
        </p>
        <div className="game-actions" style={{ marginTop: '1rem' }}>
          <button 
            onClick={() => setShowGame(true)} 
            className="btn primary"
          >
            <span>🔍</span> Play Clues by Sam Online Now
          </button>
        </div>
      </header>

      {/* Game Section */}
      <div className="game-section" style={{ marginBottom: '2rem' }}>
        {!showGame ? (
          <div className="game-placeholder">
            <div className="preview-container" onClick={() => setShowGame(true)} style={{ cursor: 'pointer', position: 'relative' }}>
              <img
                src="/images/cluesbysam.jpg"
                alt="Clues by Sam Game Preview"
                className="preview-img"
                style={{ width: '100%', maxHeight: '540px', objectFit: 'cover', borderRadius: '12px' }}
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
              title="Clues by Sam - Daily Deductive Logic Puzzle"
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

      {/* Structured SEO Guide Section: 6 Complete Paragraphs */}
      <article className="seo-content-section" style={{ lineHeight: '1.75', color: '#334155' }}>
        
        {/* Section 1: 什么是 Clues by Sam */}
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.6rem', color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.4rem', marginBottom: '1rem' }}>
            What is Clues by Sam? Daily Logic Puzzle &amp; Deductive Rules
          </h2>
          <p>
            <strong>Clues by Sam</strong> is an engaging daily deductive logic puzzle game created by independent developer Sam under Ad Artis Oy. Released every day precisely at midnight Eastern Time (00:00 New York time), the game presents players worldwide with a fresh, handcrafted grid of suspects, each featuring an illustrated portrait, full name, profession, and unique grid position.
          </p>
          <p>
            The overarching objective is both simple to grasp and deeply intellectual: you must evaluate all available testimonies to determine which suspects are <strong>Criminal</strong> and which are <strong>Innocent</strong>. Unlike casual word games or trivia quizzes that rely on guesswork, trial-and-error, or vocabulary breadth, Clues by Sam is governed entirely by mathematical and formal logic determinism. Every single daily puzzle is procedurally and manually verified to ensure that a continuous, non-branching deduction path exists from the very first clue to the fully solved board. Zero guesswork or leap of faith is ever required to solve the grid.
          </p>
        </section>

        {/* Section 2: 怎么玩 */}
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.6rem', color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.4rem', marginBottom: '1rem' }}>
            How to Play: Interface Layout, Input Controls &amp; Color Feedback
          </h2>
          <p>
            The playfield consists of twenty suspect portrait cards arranged across a structured grid—typically four columns lettered A through D and five rows numbered 1 through 5, giving each character a distinct coordinate like A1, B3, or D5.
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li><strong>Marking Suspects:</strong> Click or tap a suspect card to toggle their status between <em>Innocent</em> (marked with a clean green badge) and <em>Criminal</em> (marked with a prominent red badge). When you accurately deduce and lock in a suspect, that person's testimony card flips open to reveal crucial new evidence regarding other suspects on the board.</li>
            <li><strong>Corner Color Tagging System:</strong> Right-click on any card on desktop or tap the top-right corner tag icon on touchscreens to cycle through helper colors (yellow, blue, purple, orange). These non-permanent notes let you test hypothetical chains (such as 'Assume suspect B2 is guilty—what happens to Row 2?').</li>
            <li><strong>Error Prevention &amp; Logic Guards:</strong> If an action directly contradicts an established clue or violates mathematical parity, the interface prevents contradictory locks, preserving the integrity of your deduction path.</li>
            <li><strong>Daily Reset Schedule:</strong> Puzzles update every calendar day at 00:00 EST / EDT (midnight New York time). Your current solving progress is automatically cached in your browser's local storage, allowing you to pause, step away, and resume your deduction anytime without losing your place.</li>
          </ul>
        </section>

        {/* Section 3: 常见谜题类型与解题套路 */}
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.6rem', color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.4rem', marginBottom: '1rem' }}>
            Common Puzzle Types &amp; Core Deductive Patterns
          </h2>
          <p>
            Mastering Clues by Sam requires understanding the exact language and spatial terminology used in the clues:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.15rem', color: '#1e293b', marginTop: 0 }}>1. Positional &amp; Spatial Clues</h3>
              <p style={{ margin: 0, fontSize: '0.95rem', color: '#475569' }}>
                <strong>Neighbors:</strong> Crucially, 'neighbors' always includes horizontal, vertical, AND diagonal adjacent cards. Corner cells have 3 neighbors, edges have 5, and center cards have 8. <strong>In Between:</strong> Suspects situated directly between two targets along the same row or column, excluding the endpoints. <strong>Connected:</strong> Continuous chains linked strictly by orthogonal adjacency (horizontal or vertical).
              </p>
            </div>
            <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.15rem', color: '#1e293b', marginTop: 0 }}>2. Numerical &amp; Row/Column Quotas</h3>
              <p style={{ margin: 0, fontSize: '0.95rem', color: '#475569' }}>
                Clues stating 'Row 3 contains exactly 2 criminals' or 'Column B has more innocents than Column D' establish rigid boundaries. Cross-referencing these totals against confirmed cards lets you apply the Pigeonhole Principle to resolve remaining slots immediately.
              </p>
            </div>
            <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.15rem', color: '#1e293b', marginTop: 0 }}>3. Suspect Attributes &amp; Names</h3>
              <p style={{ margin: 0, fontSize: '0.95rem', color: '#475569' }}>
                Testimonies frequently refer to name spelling patterns ('All suspects whose names start with M are innocent'), occupational roles ('Both doctors are criminals'), or visual traits (glasses, hats). Always scan character labels carefully.
              </p>
            </div>
            <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.15rem', color: '#1e293b', marginTop: 0 }}>4. Logical Elimination (Indirect Proof)</h3>
              <p style={{ margin: 0, fontSize: '0.95rem', color: '#475569' }}>
                When direct deductions stall, apply <em>reductio ad absurdum</em>: assume a suspect is Innocent. If that hypothesis forces a row to exceed its allowed criminal quota, the assumption is false and the suspect must be Criminal.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: 今日谜题思路与过关技巧 */}
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.6rem', color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.4rem', marginBottom: '1rem' }}>
            Daily Walkthrough Strategy: 5 Proven Solving Tips
          </h2>
          <p>
            Experienced players rely on five systematic principles to solve daily boards smoothly without ever getting stuck:
          </p>
          <ol style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
            <li>
              <strong>Prioritize Boundary Edges and Corners:</strong> Center cards have 8 neighbors, creating high complexity. Corners have only 3 neighbors and edges have 5. Any clue stating 'All neighbors of corner card A1 are innocent' immediately locks down 3 suspects with zero ambiguity.
            </li>
            <li>
              <strong>Lock Down Row and Column Quotas:</strong> Always audit row and column totals after every confirmed card. If Row 2 requires exactly 2 criminals and you have confirmed 2, every other suspect in Row 2 must instantly be marked Innocent.
            </li>
            <li>
              <strong>Deploy Corner Tags for Binary Bifurcations:</strong> When a clue states 'Exactly one of Alice and Bob is guilty,' tag Alice yellow and Bob orange. Trace the deductive ripple effects; frequently, one branch triggers an instant quota contradiction, proving the alternative branch immediately.
            </li>
            <li>
              <strong>Respect Strict Mathematical Quantifiers:</strong> Remember that 'All' implies at least one subject exists, 'In between' never includes the boundaries, and 'At most one' includes zero. Reading quantifiers with absolute literal precision avoids fatal false assumptions.
            </li>
            <li>
              <strong>Trace Newly Unlocked Testimonies Immediately:</strong> Each correctly identified suspect reveals their hidden testimony. Novice players often stall because they keep re-reading old static clues. Always check newly revealed testimonies first—they provide the intended next link in the deduction chain.
            </li>
          </ol>
        </section>

        {/* Section 5: 常见问题 FAQ */}
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.6rem', color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.4rem', marginBottom: '1rem' }}>
            Frequently Asked Questions (FAQ)
          </h2>
          <div className="faq-list">
            <div style={{ marginBottom: '1.25rem', background: '#f8fafc', padding: '1.25rem', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '1.15rem', color: '#1e293b', marginTop: 0 }}>Can I play past daily puzzles or archive levels?</h3>
              <p style={{ margin: 0, color: '#475569' }}>
                Yes! Clues by Sam features an integrated archive calendar accessible directly within the game interface. You can access and solve previous daily puzzles from past weeks and months, allowing newcomers to practice and regular players to catch up on missed days.
              </p>
            </div>
            <div style={{ marginBottom: '1.25rem', background: '#f8fafc', padding: '1.25rem', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '1.15rem', color: '#1e293b', marginTop: 0 }}>Is there a hint limit or score penalty?</h3>
              <p style={{ margin: 0, color: '#475569' }}>
                The game includes a progressive two-stage hint system: Stage 1 highlights the specific clue or testimony you should focus on, and Stage 2 reveals the exact suspect you can deduce next. Hints are designed as friendly educational aids and do not lock you out of puzzle completion.
              </p>
            </div>
            <div style={{ marginBottom: '1.25rem', background: '#f8fafc', padding: '1.25rem', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '1.15rem', color: '#1e293b', marginTop: 0 }}>How does Clues by Sam run on mobile devices?</h3>
              <p style={{ margin: 0, color: '#475569' }}>
                Clues by Sam is natively optimized for mobile touchscreens (iOS Safari, Android Chrome). Simply tap cards to mark status, tap the card corner to access note tags, and pinch to zoom on smaller screens. No app store download or installation is required.
              </p>
            </div>
            <div style={{ marginBottom: '1.25rem', background: '#f8fafc', padding: '1.25rem', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '1.15rem', color: '#1e293b', marginTop: 0 }}>How is Clues by Sam different from Wordle or NYT Connections?</h3>
              <p style={{ margin: 0, color: '#475569' }}>
                While Wordle tests vocabulary through 5-letter frequency guessing and Connections tests categorical associations, Clues by Sam is a pure spatial-deduction logic grid game (comparable to Minesweeper logic meets classic Einstein riddle grids). It requires logical deduction, quantifier analysis, and spatial reasoning rather than vocabulary trivia.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: 版本更新与社群动态 */}
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.6rem', color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.4rem', marginBottom: '1rem' }}>
            Version Updates &amp; Active Community Culture
          </h2>
          <p>
            Since its launch, Clues by Sam has received notable community-focused improvements:
          </p>
          <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
            <li><strong>Archive &amp; Historical Calendar:</strong> Full calendar integration allows players to browse and replay any past daily puzzle with comprehensive local save preservation.</li>
            <li><strong>High-Contrast Dark Mode &amp; Mobile Hitboxes:</strong> Designed to prevent eye strain during late-night solving sessions and provide larger, responsive touch targets on mobile devices.</li>
            <li><strong>Spoiler-Free Share Grids &amp; Reddit Community:</strong> Players can export emoji deduction matrices to share completion times without spoiling solutions. An active solver community on Reddit (<code>r/CluesBySamHelp</code>) and Bluesky exchanges daily walkthrough strategies and hints.</li>
          </ul>
        </section>

        {/* Subtle, non-intrusive footer backlink per user instruction */}
        <footer style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
          <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>
            Looking for more browser fun? Try <a href="/" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'underline' }}>Crazy Cattle 3D</a> – our free physics battle royale.
          </p>
        </footer>

      </article>
    </div>
  );
};

export default CluesBySam;
