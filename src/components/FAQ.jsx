import React from 'react';
import './FAQ.css';

const FAQ = () => {
  return (
    <div className="faq-page">
      <h1>Frequently Asked Questions</h1>
      <div className="faq-content">
        <section className="faq-section">
          <h2>Game Basics</h2>
          <div className="faq-item">
            <h3>What is Crazy Cattle 3D?</h3>
            <p>Crazy Cattle 3D is a free-to-play browser-based physics battle royale game where players control cows in a chaotic arena. The game combines humor, strategy, and physics-based gameplay in a unique multiplayer experience.</p>
          </div>
          <div className="faq-item">
            <h3>Is the game really free to play?</h3>
            <p>Yes! Crazy Cattle 3D is completely free to play. There are no hidden costs, no pay-to-win mechanics, and no advertisements. We believe in providing a pure gaming experience for all players.</p>
          </div>
          <div className="faq-item">
            <h3>What are the system requirements?</h3>
            <p>The game is designed to run smoothly on most modern browsers. We recommend using Chrome, Firefox, or Edge with a stable internet connection. The game uses WebGL for 3D graphics, so your browser needs to support it.</p>
          </div>
        </section>

        <section className="faq-section">
          <h2>Gameplay</h2>
          <div className="faq-item">
            <h3>How do I play the game?</h3>
            <p>Use WASD or arrow keys to move your cow, and the spacebar to jump. Click to attack other players. The goal is to be the last cow standing in the arena. Each match typically lasts 3-5 minutes.</p>
          </div>
          <div className="faq-item">
            <h3>Are there different game modes?</h3>
            <p>Yes! We offer several game modes including Classic Battle Royale, Team Deathmatch, and special event modes that rotate weekly. Each mode offers unique gameplay experiences and rewards.</p>
          </div>
          <div className="faq-item">
            <h3>Can I play with friends?</h3>
            <p>Absolutely! You can create or join private matches with friends using the room code system. We also have a party system that allows you to queue together for public matches.</p>
          </div>
        </section>

        <section className="faq-section">
          <h2>Technical Support</h2>
          <div className="faq-item">
            <h3>What should I do if the game isn't loading?</h3>
            <p>First, try refreshing your browser. If the problem persists, clear your browser cache and cookies. Make sure you have a stable internet connection and that your browser is up to date.</p>
          </div>
          <div className="faq-item">
            <h3>How do I report bugs or issues?</h3>
            <p>You can report bugs through our Discord community or by using the in-game feedback system. We actively monitor and address player reports to improve the game experience.</p>
          </div>
          <div className="faq-item">
            <h3>Will the game be available on mobile devices?</h3>
            <p>We're currently working on a mobile version of Crazy Cattle 3D. While we don't have a specific release date yet, we're committed to bringing the game to mobile platforms in the future.</p>
          </div>
        </section>

        <section className="faq-section">
          <h2>Community & Support</h2>
          <div className="faq-item">
            <h3>How can I join the community?</h3>
            <p>Join our Discord server to connect with other players, participate in community events, and stay updated on game news and updates. You can also follow us on social media for the latest announcements.</p>
          </div>
          <div className="faq-item">
            <h3>How often is the game updated?</h3>
            <p>We release regular updates every two weeks, including new features, balance changes, and bug fixes. Major content updates typically occur every 2-3 months.</p>
          </div>
          <div className="faq-item">
            <h3>How can I provide feedback or suggestions?</h3>
            <p>We welcome player feedback! You can share your ideas and suggestions through our Discord server, the in-game feedback system, or our community forums. Your input helps shape the future of Crazy Cattle 3D.</p>
          </div>
        </section>
        
        {/* 底部快速导航 */}
        <div className="faq-quick-nav">
          <h3>Quick Navigation</h3>
          <ul>
            <li><a href="#game-basics">Game Basics</a></li>
            <li><a href="#gameplay">Gameplay</a></li>
            <li><a href="#technical-support">Technical Support</a></li>
            <li><a href="#community-support">Community & Support</a></li>
            <li><a href="/about">About the Game</a></li>
            <li><a href="/terms">Terms of Service</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 