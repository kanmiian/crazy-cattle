import React, { useState, useRef, useEffect } from 'react';
import SEO from './SEO'; // 确保 SEO 组件存在

const StealABrainrot = () => {
  // --- State Management ---
  // 仅保留需要的状态，移除了 iframe 和旧版弹窗相关的状态
  const [showCharactersModal, setShowCharactersModal] = useState(false); // 控制角色信息模态框
  const [showPopupModal, setShowPopupModal] = useState(false); // 控制“游戏已在新窗口打开”的提示

  // Ref 用于引用弹出的游戏窗口
  const popupWindowRef = useRef(null);
  const checkIntervalRef = useRef(null);

  // 页面卸载时清理定时器
  useEffect(() => {
    return () => {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
    };
  }, []);

  /**
   * @description 核心功能：在新窗口中打开游戏
   * 使用 window.open()，可以绕过 iframe 的跨域安全限制。
   */
  const openGamePopup = () => {
    const gameUrl = "https://www.gameflare.com/embed/roblox-steal-a-brainrot/";
    
    // 计算最佳窗口尺寸（屏幕的80%）
    const width = Math.min(1200, Math.floor(window.screen.width * 0.8));
    const height = Math.min(800, Math.floor(window.screen.height * 0.8));
    const left = Math.floor((window.screen.width - width) / 2);
    const top = Math.floor((window.screen.height - height) / 2);
    
    // 窗口特性配置，用于最佳游戏体验
    const popupFeatures = `
      width=${width},
      height=${height},
      left=${left},
      top=${top},
      resizable=yes,
      scrollbars=no,
      toolbar=no,
      menubar=no,
      location=no,
      status=no
    `.replace(/\s+/g, '');
    
    // 如果之前已经打开了一个窗口，先将其关闭
    if (popupWindowRef.current && !popupWindowRef.current.closed) {
      popupWindowRef.current.close();
    }
    
    try {
      // 打开游戏窗口
      popupWindowRef.current = window.open(gameUrl, 'StealABrainrotGame', popupFeatures);
      
      if (popupWindowRef.current) {
        popupWindowRef.current.focus();
        setShowPopupModal(true);
        
        // 开始监控窗口状态
        startWindowMonitoring();
      } else {
        // 弹窗被阻止
        alert('您的浏览器阻止了弹出窗口。请允许本站弹出窗口以开始游戏。');
      }
    } catch (error) {
      console.error('Failed to open game window:', error);
      alert('无法启动游戏。请重试或检查您的网络连接。');
    }
  };

  // 开始监控游戏窗口状态
  const startWindowMonitoring = () => {
    if (checkIntervalRef.current) {
      clearInterval(checkIntervalRef.current);
    }
    
    checkIntervalRef.current = setInterval(() => {
      if (popupWindowRef.current && popupWindowRef.current.closed) {
        // 游戏窗口已关闭，用户回来了
        clearInterval(checkIntervalRef.current);
        setShowPopupModal(false);
        showWelcomeBackMessage();
      }
    }, 1000);
  };

  // 显示欢迎回来消息
  const showWelcomeBackMessage = () => {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #4CAF50;
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      z-index: 1002;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      font-weight: bold;
    `;
    notification.textContent = '🎮 Welcome back! How was the game?';
    document.body.appendChild(notification);
    
    // 4秒后移除通知
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 4000);
  };

  // 关闭"游戏已在新窗口打开"的提示框，并同时关闭游戏窗口
  const closePopupModal = () => {
    setShowPopupModal(false);
    if (popupWindowRef.current && !popupWindowRef.current.closed) {
      popupWindowRef.current.close();
    }
    if (checkIntervalRef.current) {
      clearInterval(checkIntervalRef.current);
    }
  };

  // 角色数据
  const characters = [
    { name: "Noobini Pizzanini", rarity: "Common", description: "The foundation of your collection" },
    { name: "Lirili Larila", rarity: "Common", description: "A steady income stream character" },
    { name: "Tim Cheese", rarity: "Common", description: "Essential for new players" },
    { name: "Bombardiro Crocodillo", rarity: "Mythic", description: "A game-altering acquisition" },
    { name: "Tralalero Tralala", rarity: "Brainrot God", description: "Elite and formidable force" },
    { name: "Piccione Macchina", rarity: "Brainrot God", description: "Exceptionally rare and powerful" },
    { name: "La Vacca Saturno Saturnita", rarity: "Secret", description: "The absolute pinnacle of the game" },
    { name: "Strawberry Elephant", rarity: "OG", description: "The rarest of them all" }
  ];

  return (
    <div className="game-page">
      <SEO 
        title="Steal a Brainrot - Free Online Brainrot Game Play"
        description="Play Steal a Brainrot free online! Collect rare Brainrot characters, steal from other players, and build your ultimate Brainrot collection. Free to play Brainrot game with no download required."
        keywords="steal a brainrot, brainrot game, free brainrot game, online brainrot, brainrot characters, brainrot collection, brainrot steal game, play brainrot online"
      />
      
      <div className="game-header">
        <h1>🧠 Steal a Brainrot - Free Online Game</h1>
        <p className="game-description-header">
          Experience the ultimate <strong>Brainrot</strong> collection game! <strong>Steal a Brainrot</strong> is a free online game where you collect rare <strong>Brainrot</strong> characters, steal from other players, and build your ultimate <strong>Brainrot</strong> empire. Play <strong>Steal a Brainrot</strong> completely free - no download required!
        </p>
        <div className="game-actions">
          <button 
            onClick={() => setShowCharactersModal(true)} 
            className="btn secondary"
          >
            <span>👥</span> View Brainrot Characters
          </button>
        </div>
      </div>

      {/* --- 游戏启动区域 --- */}
      <div className="game-section">
        <div className="game-placeholder">
          {/* 修改这里：onClick 直接调用 openGamePopup */}
          <div className="preview-container" onClick={openGamePopup}>
            <img
              src="/images/steal-a-brainrot.png"
              alt="Steal a Brainrot Game Preview"
              className="preview-img"
            />
            <div className="preview-overlay">
              <div className="play-hint">
                <span className="play-icon">▶️</span>
                <span className="play-text">Click to Play Now!</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- 新增的SEO内容区域 --- */}
      <div className="seo-content-section">
        <h2>About Steal a Brainrot</h2>
        <p>
          Welcome to the chaotic and hilarious universe of <strong>Steal a Brainrot</strong>. This isn't just a game; it's a test of your strategic genius and your nerve. The core objective is to amass the most powerful collection of <em>Brainrot characters</em>. Each character possesses unique abilities and rarity, making your collection a true reflection of your skill. You'll need to generate in-game currency, manage your resources, and decide the perfect moment to 'steal' a prized <strong>Brainrot</strong> from an unsuspecting rival. It's a free-to-play browser game that guarantees endless fun and intense competition.
        </p>

        <h3>How to Play</h3>
        <ol>
          <li><strong>Start Your Collection:</strong> Begin with common <strong>Brainrot</strong> characters and start generating resources.</li>
          <li><strong>Upgrade and Expand:</strong> Use your earnings to acquire rarer and more powerful <strong>Brainrot</strong> units.</li>
          <li><strong>Execute the Steal:</strong> Target other players and strategically steal their most valuable <strong>Brainrot</strong> characters to add to your own collection.</li>
          <li><strong>Defend Your Assets:</strong> Be aware! Other players will try to steal from you. Set up your defenses and protect your hard-earned <strong>Brainrot</strong> army.</li>
          <li><strong>Dominate the Leaderboard:</strong> The player with the most impressive and valuable <strong>Brainrot</strong> collection reigns supreme.</li>
        </ol>

        <h3>Brainrot Character Rarity Guide</h3>
        <p>
          Understanding the rarity of each <strong>Brainrot</strong> is key to victory. The rarer the character, the more powerful and valuable they are. Here’s a breakdown of the rarity tiers you'll encounter in the <strong>Steal a Brainrot</strong> game:
        </p>
        <div className="rarity-grid">
          {characters.map((char, index) => (
            <div key={index} className="rarity-card">
              <h4>{char.name}</h4>
              <span className={`rarity-badge ${char.rarity.toLowerCase().replace(' ', '-')}`}>{char.rarity}</span>
              <p>{char.description}</p>
            </div>
          ))}
        </div>

        <h3>Frequently Asked Questions (FAQ)</h3>
        <div className="faq-item">
          <h4>Is Steal a Brainrot free to play?</h4>
          <p>Yes, absolutely! <strong>Steal a Brainrot</strong> is a completely free online game. You can play directly in your browser with no downloads or hidden costs.</p>
        </div>
        <div className="faq-item">
          <h4>What is a 'Brainrot' in this game?</h4>
          <p>In <strong>Steal a Brainrot</strong>, a 'Brainrot' refers to the collectible characters in the game. Each <strong>Brainrot</strong> character has a unique design, rarity, and value, forming the core of the game's collection and stealing mechanics.</p>
        </div>
        <div className="faq-item">
          <h4>Can I play Steal a Brainrot on my mobile phone?</h4>
          <p>The game is optimized for desktop browsers to ensure the best experience. While it may run on some mobile browsers, we recommend playing on a PC or laptop for full functionality.</p>
        </div>
      </div>

      {/* --- 修复后的角色信息模态框 --- */}
      {showCharactersModal && (
        <div className="characters-modal-overlay">
          <div className="characters-modal-content">
            <button onClick={() => setShowCharactersModal(false)} className="modal-close-btn">✕</button>
            <h2>Meet the Brainrot Characters</h2>
            <div className="characters-list">
              {characters.map((char, index) => (
                <div key={index} className="character-item">
                  <h3>{char.name}</h3>
                  <span className={`rarity-badge ${char.rarity.toLowerCase().replace(' ', '-')}`}>{char.rarity}</span>
                  <p>{char.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- 游戏弹出提示 --- */}
      {showPopupModal && (
        <div className="popup-modal-overlay">
          <div className="popup-modal-content">
            <h3>Game Launched!</h3>
            <p>Your game has opened in a new window. If you don't see it, please check your browser tabs.</p>
            <button onClick={closePopupModal} className="btn primary">Close This & End Game</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StealABrainrot;