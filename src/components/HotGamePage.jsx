import React, { useEffect, useRef, useState } from 'react';
import SEO from './SEO';

const BASE_URL = 'https://cattlecrazy3d.com';

const HotGamePage = ({ game }) => {
  const [showGame, setShowGame] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const gameContainerRef = useRef(null);

  useEffect(() => {
    if (!game) return undefined;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Game',
      name: game.title,
      url: `${BASE_URL}${game.path}`,
      image: `${BASE_URL}${game.image}`,
      description: game.seoDescription,
      gamePlatform: 'Web browser',
      genre: game.details?.[1]?.[1] || 'Browser game',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock'
      }
    });
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [game]);

  if (!game) {
    return null;
  }

  const isExternalPlayOnly = game.externalPlayOnly || !game.embedUrl;
  const playableLinks = game.playableLinks || [
    { label: `Play ${game.title}`, url: game.sourceUrl }
  ];

  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  const handleWebFullscreen = () => {
    if (!gameContainerRef.current) return;

    if (!isFullscreen) {
      gameContainerRef.current.style.height = '100vh';
      gameContainerRef.current.style.position = 'fixed';
      gameContainerRef.current.style.top = '0';
      gameContainerRef.current.style.left = '0';
      gameContainerRef.current.style.zIndex = '1000';
      gameContainerRef.current.style.borderRadius = '0';
      setIsFullscreen(true);
    } else {
      gameContainerRef.current.style.height = '70vh';
      gameContainerRef.current.style.position = 'relative';
      gameContainerRef.current.style.top = 'auto';
      gameContainerRef.current.style.left = 'auto';
      gameContainerRef.current.style.zIndex = 'auto';
      gameContainerRef.current.style.borderRadius = '8px';
      setIsFullscreen(false);
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
    <div className={`game-page hot-game-page hot-game-page-${game.slug}`}>
      <SEO
        title={game.seoTitle}
        description={game.seoDescription}
        keywords={game.keywords}
      />

      <div className="game-header hot-game-header">
        <p className="hot-game-kicker">{game.trendLabel}</p>
        <h1>{game.pageTitle}</h1>
        <p className="game-description-header">{game.description}</p>
        <div className="hot-game-meta">
          <span>{game.sourceStatus}</span>
          <span>{game.sourceName} source</span>
          <span>Free browser play</span>
        </div>
        <div className="game-actions">
          <button onClick={() => setShowGame(true)} className="btn primary">
            {isExternalPlayOnly ? (game.externalPlayCta || `Get ${game.title} Play Link`) : game.playCta}
          </button>
          <a href={game.sourceUrl} target="_blank" rel="noopener noreferrer nofollow" className="btn secondary">
            Open Official Source
          </a>
        </div>
      </div>

      <div className="game-section">
        {!showGame ? (
          <div className="game-placeholder hot-game-preview">
            <div className="preview-container" onClick={() => setShowGame(true)}>
              <img
                src={game.image}
                alt={`${game.title} game preview`}
                className="preview-img"
              />
              <div className="preview-overlay">
                <div className="play-hint">
                  <span className="play-icon">{isExternalPlayOnly ? 'Open' : 'Play'}</span>
                  <span className="play-text">
                    {isExternalPlayOnly ? `Click for ${game.title} play links` : `Click to start ${game.title}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : isExternalPlayOnly ? (
          <div className="external-play-panel">
            <img
              src={game.image}
              alt={`${game.title} playable source`}
              className="external-play-image"
            />
            <div className="external-play-content">
              <h2>{game.title} Playable Links</h2>
              <p>
                {game.externalPlayReason || 'This game currently blocks third-party iframe play, so use a verified playable source instead.'}
              </p>
              <div className="external-play-actions">
                {playableLinks.map((link) => (
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="btn primary"
                    key={link.url}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="game-container hot-game-container" ref={gameContainerRef}>
            {!iframeLoaded && (
              <div className="loading-placeholder">
                <div className="loading-spinner"></div>
                <div className="loading-text">Loading {game.title}...</div>
              </div>
            )}
            <iframe
              title={`${game.title} playable online game`}
              src={game.embedUrl}
              allowFullScreen
              frameBorder="0"
              allow="autoplay; fullscreen; gamepad; clipboard-read; clipboard-write"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-downloads allow-presentation allow-modals allow-pointer-lock"
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={handleIframeLoad}
              style={{
                display: 'block',
                opacity: iframeLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease',
                width: '100%',
                height: '70vh',
                border: 'none',
                borderRadius: isFullscreen ? '0' : '8px'
              }}
            />
            <div className="game-controls">
              <button onClick={handleWebFullscreen} className="control-btn" title="Web Fullscreen">
                {isFullscreen ? 'Exit' : 'Full'}
              </button>
              <button onClick={handleBrowserFullscreen} className="control-btn" title="Browser Fullscreen">
                View
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="seo-content-section hot-game-content">
        <h2>{game.guideTitle}</h2>
        <p>{game.intro}</p>
        <p>{game.guideIntro}</p>

        <h3>Quick Play Route</h3>
        <ol>
          {game.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>

        <h3>Why This Game Is Recommended</h3>
        <div className="features-grid hot-game-reason-grid">
          {game.recommendationCards.map((card) => (
            <div className="feature-card" key={card.title}>
              <h4>{card.title}</h4>
              <p>{card.text}</p>
            </div>
          ))}
        </div>

        <h3>Game Overview</h3>
        <div className="game-overview">
          <table className="game-details-table">
            <tbody>
              {game.details.map(([label, value]) => (
                <tr key={label}>
                  <td><strong>{label}</strong></td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3>Frequently Asked Questions</h3>
        {game.faqs.map((faq) => (
          <div className="faq-item" key={faq.question}>
            <h4>{faq.question}</h4>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotGamePage;
