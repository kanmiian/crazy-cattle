import React, { useState, useEffect, lazy, Suspense, useCallback, useMemo, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import './index.css'
import SEO from './components/SEO'
import CheeseChompers from './components/CheeseChompers'

// 懒加载组件
const Content = lazy(() => import('./components/Content'))
const About = lazy(() => import('./components/About'))
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'))
const TermsOfService = lazy(() => import('./components/TermsOfService'))
const Contact = lazy(() => import('./components/Contact'))
const FAQ = lazy(() => import('./components/FAQ'))

// 加载占位符组件
const LoadingPlaceholder = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  useEffect(() => {
    // 预加载图片
    const img = new Image();
    img.src = '/images/crazycattle-preview.webp';
    img.onload = () => {
      setImageLoaded(true);
      // 延迟移除占位符，确保平滑过渡
      setTimeout(() => setShowPlaceholder(false), 100);
    };
  }, []);

  return (
    <div className="loading-placeholder">
      <div className="image-container">
        {showPlaceholder && (
          <div className="image-placeholder" style={{ backgroundImage: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)' }} />
        )}
        {imageLoaded && (
          <img
            src="/images/crazycattle-preview.webp"
            alt="Crazy Cattle 3D Preview"
            className="preview-img"
            style={{ opacity: showPlaceholder ? 0 : 1 }}
            loading="eager"
            decoding="async"
          />
        )}
      </div>
      <p className="loading-text">Loading...</p>
    </div>
  );
};

// 使用 IntersectionObserver 优化滚动
const useIntersectionObserver = (callback, options = {}) => {
  const observerRef = useRef(null);
  const elementsRef = useRef(new Map());

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const handler = elementsRef.current.get(element);
          if (handler) {
            // 使用 requestAnimationFrame 优化回调执行
            requestAnimationFrame(() => {
              handler(element);
            });
          }
        }
      });
    }, {
      ...options,
      // 使用 rootMargin 提前触发回调
      rootMargin: '50px 0px'
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [callback, options]);

  const observe = useCallback((element, handler) => {
    if (element && observerRef.current) {
      elementsRef.current.set(element, handler);
      observerRef.current.observe(element);
    }
  }, []);

  const unobserve = useCallback((element) => {
    if (element && observerRef.current) {
      elementsRef.current.delete(element);
      observerRef.current.unobserve(element);
    }
  }, []);

  return { observe, unobserve };
};

// 使用防抖优化事件处理
const useDebounce = (callback, delay) => {
  const timeoutRef = useRef(null);

  return useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
};

const handleBookmark = () => {
  try {
    // IE browser
    if (window.external && 'AddFavorite' in window.external) {
      window.external.AddFavorite(window.location.href, document.title);
      return;
    }

    // Firefox legacy
    if (window.sidebar && window.sidebar.addPanel) {
      window.sidebar.addPanel(document.title, window.location.href, "");
      return;
    }

    // Modern browsers (requires user interaction)
    const shortcutHint = navigator.platform.includes('Mac')
      ? 'Command/Cmd + D'
      : 'Ctrl + D';

    // Try to trigger via floating element (preserve user interaction context)
    const btn = document.createElement('button');
    btn.style.position = 'fixed';
    btn.style.opacity = '0';
    btn.addEventListener('click', () => {
      try {
        // Create visible temporary link (some browsers require element in DOM)
        const link = document.createElement('a');
        link.href = window.location.href;
        link.textContent = document.title;
        document.body.appendChild(link);

        // Try to trigger browser default behavior
        const range = document.createRange();
        range.selectNode(link);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);

        // Remove element
        setTimeout(() => {
          document.body.removeChild(link);
          window.getSelection().removeAllRanges();
        }, 100);
      } catch (error) {
        console.error('Bookmark fallback failed:', error);
      }
    });

    document.body.appendChild(btn);
    btn.click();
    document.body.removeChild(btn);

    // If page title hasn't changed after 500ms (trigger failed), show hint
    setTimeout(() => {
      if (document.title === document.title) {
        alert(`Please use browser shortcut ${shortcutHint} to bookmark this page`);
      }
    }, 500);

  } catch (error) {
    console.error('Bookmark error:', error);
    alert('Failed to bookmark. Please use browser menu to add bookmark manually');
  }
};

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      // 等待页面加载完成后再滚动
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="main-nav">
      <div className="nav-content">
        <Link to="/" className="logo" onClick={(e) => { e.preventDefault(); scrollToSection('top'); }}>
          <span className="logo-main">🐄 Crazy Cattle 3D</span>
          <span className="logo-sub">- Sheep Battle Royale</span>
        </Link>
        <div className="nav-container">
          <div className="nav-main-links">
            <button onClick={() => scrollToSection('game')} className="nav-link">🎮 Play Now</button>
            <button onClick={() => scrollToSection('download')} className="nav-link">⬇️ Download</button>
            <button onClick={() => scrollToSection('what-is')} className="nav-link">ℹ️ What is</button>
            <button onClick={() => scrollToSection('features')} className="nav-link">✨ Features</button>
            <button onClick={() => scrollToSection('how-to-play')} className="nav-link">🎯 How to Play</button>
            <button onClick={() => scrollToSection('requirements')} className="nav-link">⚙️ Requirements</button>
          </div>
          <div className="nav-secondary-links">
            <Link to="/cheese-chompers" className="nav-link secondary">🧀 Cheese Chompers</Link>
          </div>
          <button onClick={handleBookmark} className="nav-link bookmark-btn" title="Bookmark this page">🔖</button>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      // 等待页面加载完成后再滚动
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="footer-nav">
      <div className="footer-content">
        <div className="footer-section">
          <h3>🐄 Crazy Cattle 3D</h3>
          <p>Experience the ultimate physics-based battle royale game where explosive sheep and cattle compete for survival across three unique environments.</p>
        </div>

        <div className="footer-section">
          <h3>⚡ Quick Links</h3>
          <div className="footer-links">
            <button onClick={() => scrollToSection('game')} className="footer-link">🎮 Play Now</button>
            <button onClick={() => scrollToSection('features')} className="footer-link">✨ Features</button>
            <button onClick={() => scrollToSection('how-to-play')} className="footer-link">🎯 How to Play</button>
            <button onClick={() => scrollToSection('requirements')} className="footer-link">⚙️ Requirements</button>
          </div>
        </div>

        <div className="footer-section">
          <h3>ℹ️ Info</h3>
          <div className="footer-links">
            <Link to="/about" className="footer-link">About</Link>
            <Link to="/contact" className="footer-link">Contact</Link>
            <Link to="/faq" className="footer-link">FAQ</Link>
            <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link>
            <Link to="/terms-of-service" className="footer-link">Terms of Service</Link>
          </div>
        </div>

        <div className="footer-section">
          <h3>🤝 Friends</h3>
          <div className="footer-links">
            <a href="https://www.online-guitartuner.com/" target="_blank" rel="noopener noreferrer nofollow" className="footer-link">Online Guitar Tuner</a>
            <a href="https://animalbrainrot.com/" target="_blank" rel="noopener noreferrer nofollow" className="footer-link">AI Brainrot Animals</a>
            <a href="https://braingames.quest/" target="_blank" rel="noopener noreferrer nofollow" className="footer-link">Brain Games</a>
            <a href="https://bibleforu.info/" target="_blank" rel="noopener noreferrer nofollow" className="footer-link">Daily Bible</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 Crazy Cattle 3D. All rights reserved.</p>
      </div>
    </footer>
  );
};

// 使用 Web Worker 处理复杂计算
const createWorker = (fn) => {
  const blob = new Blob([`(${fn.toString()})()`], { type: 'application/javascript' });
  return new Worker(URL.createObjectURL(blob));
};

// 使用 Web Worker 处理滚动计算
const scrollWorker = createWorker(() => {
  self.onmessage = (e) => {
    const { element, options } = e.data;
    const rect = element.getBoundingClientRect();
    const scrollOptions = {
      top: rect.top + window.pageYOffset,
      left: rect.left + window.pageXOffset,
      behavior: 'smooth'
    };
    self.postMessage(scrollOptions);
  };
});

const AppContent = () => {
  const location = useLocation();
  const baseUrl = 'https://cattlecrazy3d.com';

  useEffect(() => {
    // 移除现有的 canonical 链接
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }

    // 创建新的 canonical 链接
    const canonicalUrl = location.pathname === '/' ? baseUrl : `${baseUrl}${location.pathname}`;
    const link = document.createElement('link');
    link.rel = 'canonical';
    link.href = canonicalUrl;
    document.head.appendChild(link);

    // 清理函数
    return () => {
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    };
  }, [location.pathname]);

  return (
    <>
      <SEO />
      <Navigation />
      <Suspense fallback={<LoadingPlaceholder />}>
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cheese-chompers" element={<CheeseChompers />} />
        </Routes>
      </Suspense>
      <Footer />
      {/* 悬浮的添加收藏按钮 */}
      <div className="floating-bookmark" onClick={handleBookmark}>
        <span>🔖</span>
        <span>Add to Bookmarks</span>
      </div>
    </>
  );
};

const MainContent = () => {
  // 添加必要的状态变量
  const [showGame, setShowGame] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const gameContainerRef = useRef(null);

  // 处理 iframe 加载完成的回调
  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  // 处理滚动到指定区域的函数
  const handleScrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 处理网页全屏
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

  // 处理浏览器全屏
  const handleBrowserFullscreen = () => {
    if (!document.fullscreenElement) {
      gameContainerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const isProduction = process.env.NODE_ENV === 'production'
  const gameSrc = 'https://crazycattle3d.io/game/crazycattle3d/v11/';
//     ? 'https://cattle-crazy-game.vercel.app/'
//     : './game/index.html';

  return (
    <>
      <div id="top">
        <header className="hero">
          <h1>
            <span role="img" aria-label="cow">🐄</span> 
            Crazy Cattle 3D - Sheep Battle Royale
          </h1>
          <p className="tagline">Experience the wildest sheep and cattle chaos simulator online! Play Crazy Cattle 3D now and join the ultimate physics-based battle royale where sheep and cattle compete for survival!</p>
          <div className="button-group">
            <button onClick={() => handleScrollToSection('game')} className="btn">
              <span>🎮</span> Play Now
            </button>
            <button onClick={() => handleScrollToSection('download')} className="btn secondary">
              <span>⬇️</span> Download
            </button>
            <button onClick={() => window.open('https://ko-fi.com/ashing', '_blank')} className="btn kofi">
              <span>☕️</span> Support on Ko-fi
            </button>
          </div>
        </header>
      </div>

      <section id="game" className="iframe-section">
        {!showGame ? (
          <div className="game-placeholder">
            <img
              src="/images/crazycattle-preview.webp"
              alt="Crazy Cattle 3D Preview"
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
                  src="/images/crazycattle-preview.webp"
                  alt="Crazy Cattle 3D Preview"
                  className="preview-img"
                />
                <div className="loading-overlay">
                  <div className="loading-text">Loading Game...</div>
                </div>
              </div>
            )}
            <iframe
              title="Crazy Cattle 3D - Sheep Battle Royale Game"
              src={gameSrc}
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

      <section className="best-result-section">
        <div className="best-result-container">
          <div className="best-result-content">
            <h2>🏆 Join the Champions!</h2>
            <p>Experience the thrill of victory in Crazy Cattle 3D! Our players have achieved amazing feats - now it's your turn to make history!</p>
            <div className="best-result-image">
              <img
                src="/images/best-result.png"
                alt="Best Game Results"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="best-result-cta">
              <button onClick={() => handleScrollToSection('game')} className="btn">
                <span>🎮</span> Play Now and Beat the Record!
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="download" className="download-section">
        <h2>
          <span role="img" aria-label="download">⬇️</span> 
          Download Crazy Cattle 3D - Sheep Battle Royale
        </h2>
        <p>This exciting sheep and cattle battle royale game is also available for offline play. Click below to download Crazy Cattle 3D from itch.io:</p>
        <div className="download-buttons">
        <a
          href="https://4nn4t4t.itch.io/crazycattle3d"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="download-link"
        >
          <span>🎮</span> Go to Itch.io to Download
        </a>
        <a
          href="https://ko-fi.com/ashing"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="download-link"
        >
          <span>☕️</span> Support on Ko-fi
        </a>
      </div>
      </section>

      <main>
        <Suspense fallback={<LoadingPlaceholder />}>
          <Content />
        </Suspense>
      </main>
    </>
  );
};

export default function App() {
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [showGame, setShowGame] = useState(false)
  const { observe } = useIntersectionObserver((element) => {
    element.scrollIntoView({ behavior: 'smooth' });
  }, { threshold: 0.5 });

  // 使用 useCallback 优化 iframe 加载处理函数
  const handleIframeLoad = useCallback(() => {
    requestAnimationFrame(() => {
      setIframeLoaded(true);
    });
  }, []);

  // 使用 useCallback 优化滚动处理函数
  const handleScrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      observe(element, () => {
        element.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }, [observe]);

  // 延迟加载第三方脚本
  useEffect(() => {
    const loadThirdPartyScripts = () => {
      // 使用 Promise 处理脚本加载
      const loadScript = (src, async = true) => {
        return new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = src;
          script.async = async;
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
      };
    };

    loadThirdPartyScripts();
    
    // 加载 Inter 字体
    const loadGoogleFonts = () => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap';
      document.head.appendChild(link);
    };
    
    loadGoogleFonts();
  }, []);

  useEffect(() => {
    // 延迟加载结构化数据
    const loadStructuredData = () => {
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Crazy Cattle 3D - Sheep Battle Royale Game",
        "url": "https://cattlecrazy3d.com/",
        "description": "Play as explosive sheep and cattle in this physics-based battle royale game. Master momentum and become the ultimate warrior in Crazy Cattle 3D.",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://cattlecrazy3d.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    };

    // 使用 requestIdleCallback 延迟加载结构化数据
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadStructuredData);
    } else {
      setTimeout(loadStructuredData, 1000);
    }
  }, []);

  return (
    <Router>
      <SEO />
      <div className="container">
        <AppContent />
      </div>
    </Router>
  );
}