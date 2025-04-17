import React, { useState } from 'react'
import './index.css'

export default function App() {
  const [iframeLoaded, setIframeLoaded] = useState(false)

  return (
    <div className="container">
      <header className="hero">
        <h1>🐄 Crazy Cattle 3D</h1>
        <p className="tagline">Experience the wildest cow chaos simulator online!</p>
        <div className="button-group">
          <a href="#game" className="btn">Play Now</a>
          <a href="#download" className="btn secondary">Download</a>
        </div>
      </header>

      <section id="game" className="iframe-section">
        {!iframeLoaded && (
          <div className="loading-placeholder">
            <img src="/images/crazycattle-preview.jpg" alt="Crazy Cattle Preview" className="preview-img" />
            <p className="loading-text">Loading Game...</p>
          </div>
        )}

        <iframe
          src="https://crazy-cattle3d.org/game/crazycattle3d/"
          title="Crazy Cattle 3D Game"
          allowFullScreen
          frameBorder="0"
          onLoad={() => setIframeLoaded(true)}
          style={{ display: iframeLoaded ? 'block' : 'none' }}
        ></iframe>
      </section>

      <section className="about">
        <h2>🎮 About the Game</h2>
        <p>
          Welcome to <strong>Crazy Cattle 3D</strong>, the ultimate chaos simulator where you take control of a wild cow and cause mayhem across the farm!
        </p>
        <ul>
          <li>🚀 Fast-paced 3D cow action</li>
          <li>🏆 Fun for all ages</li>
          <li>🌍 Play directly in your browser</li>
          <li>📱 Mobile-friendly & no downloads needed</li>
        </ul>
      </section>

      <section id="download" className="download-section">
        <h2>⬇️ Download Crazy Cattle 3D</h2>
        <p>This game is also available for offline play. Click below to download from itch.io:</p>
        <a
          href="https://4nn4t4t.itch.io/crazycattle3d"
          target="_blank"
          rel="noopener noreferrer"
          className="btn download-link"
        >
          Go to Itch.io to Download
        </a>
      </section>
    </div>
  )
}
