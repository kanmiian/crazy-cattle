import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className="about-section">
      <h2>About Crazy Cattle 3D - A Wild Physics Battle Royale Game</h2>
      
      <div className="about-content">
        <p>
          Welcome to Crazy Cattle 3D, the ultimate physics-based battle royale game where chaos, comedy, and cattle collide!
        </p>
        
        <p>
          Crazy Cattle 3D is a free 3D multiplayer browser game that drops you into an explosive arena filled with rampaging cows, flying sheep, and unpredictable action. Whether you're a casual gamer or a hardcore player looking for fun and fast-paced competition, Crazy Cattle 3D offers a unique and unforgettable experience right in your browser—no downloads, no ads, no hassle.
        </p>
        
        <p>
          This game was born from a love of creative chaos and the thrill of competitive survival games. Our mission is to build a game that combines cartoonish physics, fast action, and hilarious multiplayer showdowns, while staying completely free-to-play and ad-free.
        </p>
        
        <p>
          Behind Crazy Cattle 3D is a passionate team of indie developers dedicated to delivering fresh content, seasonal events, and ongoing improvements based on your feedback.
        </p>
        
        <p className="cta-text">
          Start playing now and become the last crazy cow standing in the wildest multiplayer battlefield online!
        </p>
        
        <div className="about-cta">
          <a href="/play" className="cta-button">Play Now</a>
          <a href="/faq" className="cta-button secondary">View FAQ</a>
        </div>
      </div>
    </section>
  );
};

export default About; 