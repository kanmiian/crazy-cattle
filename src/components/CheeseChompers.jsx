import React, { useState, useEffect } from 'react';
import SEO from './SEO';

const CheeseChompers = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "VideoGame",
      "name": "Cheese Chompers 3D",
      "description": "Play Cheese Chompers 3D, an exciting 3D platformer where you control a hungry mouse collecting cheese while avoiding obstacles. Experience smooth controls, challenging levels, and addictive gameplay.",
      "genre": ["Platformer", "3D Game", "Adventure"],
      "gamePlatform": "Web Browser",
      "applicationCategory": "Game",
      "url": "https://cattlecrazy3d.com/cheese-chompers"
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="cheese-chompers-page">
      <SEO 
        title="Cheese Chompers - Free Online 3D Mouse Game | Collect Cheese & Complete Levels"
        description="Play Cheese Chompers online! Guide your mouse through exciting 3D levels, collect cheese, and avoid obstacles in this addictive platformer game. Free to play, no download required."
      />

      <header className="game-header">
        <h1>Cheese Chompers 3D</h1>
        <p className="game-description">
          Welcome to Cheese Chompers 3D, an exciting 3D platformer where you control a hungry mouse on a mission to collect delicious cheese! Navigate through challenging levels, avoid obstacles, and become the ultimate cheese collector.
        </p>
      </header>

      <section className="game-container">
        <div className="game-preview">
          <img 
            src="/images/cheese-chompers-3d-game.webp"
            alt="Cheese Chompers 3D Game Preview" 
            className="preview-image"
          />
          <div className="play-overlay">
            <a 
              href="https://html-classic.itch.zone/html/13500521/CheeseChompers3DWeb/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="play-button"
            >
              Play Now
            </a>
          </div>
        </div>
      </section>

      <section className="game-features">
        <h2>Game Features</h2>
        <ul>
          <li>Intuitive 3D controls for smooth gameplay</li>
          <li>Multiple challenging levels to master</li>
          <li>Collect cheese to earn points</li>
          <li>Avoid obstacles and enemies</li>
          <li>Progressive difficulty curve</li>
          <li>Responsive design for all devices</li>
        </ul>
      </section>

      <section className="how-to-play">
        <h2>How to Play</h2>
        <p>
          Use the arrow keys or WASD to move your mouse character. Collect as much cheese as possible while avoiding obstacles and enemies. Each level presents new challenges and requires quick reflexes and strategic thinking. The more cheese you collect, the higher your score!
        </p>
      </section>

      <section className="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <h3>Is Cheese Chompers 3D free to play?</h3>
          <p>Yes, Cheese Chompers 3D is completely free to play in your web browser. No download or installation required!</p>
        </div>
        <div className="faq-item">
          <h3>What are the system requirements?</h3>
          <p>The game runs smoothly on most modern web browsers. We recommend using Chrome, Firefox, or Edge for the best experience.</p>
        </div>
        <div className="faq-item">
          <h3>Can I play on mobile devices?</h3>
          <p>Yes, Cheese Chompers 3D is optimized for both desktop and mobile devices. The controls automatically adapt to your device.</p>
        </div>
        <div className="faq-item">
          <h3>How do I save my progress?</h3>
          <p>Your progress is automatically saved in your browser's local storage. You can continue from where you left off when you return to the game.</p>
        </div>
      </section>

      <section className="game-tips">
        <h2>Tips & Strategies</h2>
        <ul>
          <li>Take your time to plan your route through each level</li>
          <li>Watch out for moving obstacles and time your movements</li>
          <li>Collect power-ups when available to gain advantages</li>
          <li>Practice makes perfect - don't give up if you fail a level</li>
          <li>Look for secret paths that might contain bonus cheese</li>
        </ul>
      </section>
    </div>
  );
};

export default CheeseChompers; 