import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className="about-section">
      <h2>About Crazy Cattle 3D</h2>
      
      <div id="what-is">
        <h3>What is Crazy Cattle 3D?</h3>
        <p>
          Crazy Cattle 3D is an exhilarating battle royale game that puts you in control of explosive sheep 
          competing for survival across three unique environments. Unlike traditional battle royale games, 
          Crazy Cattle 3D focuses on physics-based gameplay, where success comes from mastering momentum, 
          collision, and strategic positioning.
        </p>
      </div>

      <div id="features">
        <h3>Game Features</h3>
        <div className="features-grid">
          <div className="feature-card">
            <h4>Revolutionary Physics System</h4>
            <p>
              Experience a groundbreaking physics engine designed specifically for authentic sheep movement. 
              Each collision and interaction creates unpredictable and hilarious moments as you navigate 
              through diverse terrain.
            </p>
          </div>

          <div className="feature-card">
            <h4>Three Unique Environments</h4>
            <p>
              Battle across three meticulously crafted maps:
              <ul>
                <li>Ireland: Rolling hills perfect for momentum-based attacks</li>
                <li>Iceland: Volcanic landscape with strategic hazard zones</li>
                <li>New Zealand: Mountainous terrain offering vertical gameplay</li>
              </ul>
            </p>
          </div>

          <div className="feature-card">
            <h4>Skill-Based Combat</h4>
            <p>
              Master the art of sheep combat through:
              <ul>
                <li>Perfect timing for explosive collisions</li>
                <li>Strategic use of terrain features</li>
                <li>Advanced movement techniques</li>
                <li>Environmental awareness</li>
              </ul>
            </p>
          </div>
        </div>
      </div>

      <div id="how-to-play">
        <h3>How to Play</h3>
        <div className="how-to-play">
          <p>
            Getting started is simple:
          </p>
          <ul>
            <li>Use WASD keys for movement</li>
            <li>Mouse to control direction</li>
            <li>Spacebar to activate special abilities</li>
            <li>Build momentum by moving downhill</li>
            <li>Time your collisions perfectly to eliminate opponents</li>
          </ul>
        </div>
      </div>

      <div id="game-modes">
        <h3>Game Modes</h3>
        <div className="game-modes">
          <div className="mode-card">
            <h4>Battle Royale</h4>
            <p>
              Compete against other players in intense survival matches. Be the last sheep standing 
              as the play area gradually shrinks, forcing exciting confrontations.
            </p>
          </div>

          <div className="mode-card">
            <h4>Practice Mode</h4>
            <p>
              Perfect your skills in a safe environment. Learn advanced techniques and master the 
              physics system without the pressure of competition.
            </p>
          </div>
        </div>
      </div>

      <div id="requirements">
        <h3>System Requirements</h3>
        <div className="requirements">
          <ul>
            <li>Modern web browser (Chrome, Firefox, Safari, or Edge)</li>
            <li>Stable internet connection</li>
            <li>Keyboard and mouse</li>
            <li>Minimum 4GB RAM</li>
            <li>Graphics card with WebGL support</li>
          </ul>
        </div>
      </div>

      <div id="tips">
        <h3>Tips for Success</h3>
        <div className="tips">
          <ul>
            <li>Learn to use momentum to your advantage</li>
            <li>Study map layouts and identify strategic positions</li>
            <li>Practice timing your explosive abilities</li>
            <li>Watch and learn from experienced players</li>
            <li>Stay aware of the shrinking play area</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About; 