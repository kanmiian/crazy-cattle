import React from 'react';
import './About.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  const handlePlayNow = () => {
    navigate('/');
    // 给页面一点时间加载
    setTimeout(() => {
      const gameSection = document.getElementById('game');
      if (gameSection) {
        gameSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <section className="about-section">
      <h1>
        <span role="img" aria-label="cow">🐄</span> 
        Crazy Cattle 3D - Sheep Battle Royale
      </h1>
      
      <div className="about-content">
        <p>
          Welcome to Crazy Cattle 3D, the ultimate physics-based battle royale game where chaos, comedy, and cattle collide!
        </p>
        
        <p>
          Crazy Cattle 3D is a physics-driven browser battle royale that drops you into an explosive arena filled with rampaging cows, flying sheep, and unpredictable ragdoll action across three distinct maps (Ireland, Iceland, and New Zealand).
        </p>
        
        <div className="transparency-notice" style={{
          background: '#f8fafc',
          borderLeft: '4px solid #3b82f6',
          padding: '16px 20px',
          margin: '24px 0',
          borderRadius: '0 8px 8px 0',
          fontSize: '0.95rem',
          lineHeight: '1.6'
        }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: '#1e293b' }}>
            ℹ️ Transparency &amp; Attribution Notice
          </h3>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>cattlecrazy3d.com</strong> is an independent fan community, gameplay portal, and strategy guide site. We provide instant browser-based access, comprehensive map guides, and movement tutorials for fans worldwide.
          </p>
          <p style={{ margin: 0 }}>
            The original <em>Crazy Cattle 3D</em> was created by indie developer <strong>Anna Mayberry</strong>. The official desktop build and direct developer support are hosted on Anna Mayberry's official itch.io page: <a href="https://annamayberry.itch.io/crazy-cattle-3d" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'underline' }}>Anna Mayberry on itch.io</a>. We encourage all players who love the game to visit itch.io and support the original creator!
          </p>
        </div>

        <p>
          Our mission is to give players a clean, fast-loading, and responsive online hub to practice momentum jumps, learn hazard management across Ireland, Iceland, and New Zealand, and stay updated with the latest community tips and unblocked browser links.
        </p>
        
        <p className="cta-text">
          Start playing now and become the last crazy cow standing in the wildest multiplayer battlefield online!
        </p>
        
        <div className="about-cta">
          <button onClick={handlePlayNow} className="cta-button ">Play Now</button>
          <Link to="/faq" className="cta-button secondary">View FAQ</Link>
        </div>
      </div>
    </section>
  );
};

export default About; 