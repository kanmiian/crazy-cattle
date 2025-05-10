import React from 'react';
import './Content.css';
import './About.css';

const About = () => {
  return (
    <section className="about-section">
      <h2>📘 About Crazy Cattle 3D</h2>
      
      <div id="what-is">
        <h3><span role="img" aria-label="magnifying glass">🔍</span> What is Crazy Cattle 3D?</h3>
        <p>
          Crazy Cattle 3D is an exhilarating battle royale game that puts you in control of explosive sheep 
          competing for survival across three unique environments. Unlike traditional battle royale games, 
          Crazy Cattle 3D focuses on physics-based gameplay, where success comes from mastering momentum, 
          collision, and strategic positioning.
        </p>
        <p>
          In this unique gaming experience, you'll find yourself in a world where physics reigns supreme. 
          Every movement, collision, and interaction is governed by a sophisticated physics engine that 
          creates unpredictable and hilarious moments. The game combines the strategic depth of battle 
          royale with the chaotic fun of physics-based gameplay, creating an experience that's both 
          challenging and entertaining.
        </p>
        <p>
          What sets Crazy Cattle 3D apart is its focus on skill-based combat rather than weapon collection 
          or resource management. Your success depends entirely on your ability to master the game's unique 
          movement system and understand the physics of momentum and collision. This pure approach to 
          competitive gaming has attracted players seeking an authentic challenge and genuine improvement 
          in their skills.
        </p>
      </div>

      <div id="features">
        <h3>
          <span role="img" aria-label="sparkles">✨</span> 
          Game Features
        </h3>
        <div className="features-grid">
          <div className="feature-card">
            <h4>
              <span role="img" aria-label="atom">⚛️</span> 
              Revolutionary Physics System
            </h4>
            <p>
              Experience a groundbreaking physics engine designed specifically for authentic sheep movement. 
              Each collision and interaction creates unpredictable and hilarious moments as you navigate 
              through diverse terrain.
            </p>
            <p>
              The physics system in Crazy Cattle 3D is more than just a gimmick – it's the core of the 
              gameplay. Every slope, bump, and collision affects your momentum and trajectory, creating 
              countless possibilities for creative strategies. Master the art of using physics to your 
              advantage, and you'll discover new ways to outmaneuver your opponents.
            </p>
          </div>

          <div className="feature-card">
            <h4>
              <span role="img" aria-label="world map">🗺️</span> 
              Three Unique Environments
            </h4>
            <p>
              Battle across three meticulously crafted maps, each offering distinct gameplay experiences:
            </p>
            <ul>
              <li><strong>Ireland:</strong> Rolling hills perfect for momentum-based attacks. Use the 
              natural terrain to build up speed and launch devastating assaults on your opponents. The 
              varied elevation creates perfect opportunities for aerial attacks and strategic positioning.</li>
              <li><strong>Iceland:</strong> Volcanic landscape with strategic hazard zones. Navigate 
              carefully through the treacherous terrain while using the hazardous areas to trap unsuspecting 
              opponents. The volcanic features add an extra layer of strategy to your battles.</li>
              <li><strong>New Zealand:</strong> Mountainous terrain offering vertical gameplay. Master 
              the art of vertical combat as you battle across steep slopes and rocky outcrops. The 
              challenging terrain rewards skilled players who can maintain control in difficult conditions.</li>
            </ul>
          </div>

          <div className="feature-card">
            <h4>
              <span role="img" aria-label="target">🎯</span> 
              Skill-Based Combat
            </h4>
            <p>
              Master the art of sheep combat through a combination of timing, strategy, and physics 
              understanding. The game rewards skill development and strategic thinking while maintaining 
              its comedic undertones.
            </p>
            <p>
              Key combat elements include:
            </p>
            <ul>
              <li><strong>Perfect Timing:</strong> Time your explosive collisions perfectly to maximize 
              impact and send opponents flying off the map.</li>
              <li><strong>Strategic Positioning:</strong> Use the terrain to gain advantages and create 
              defensive positions.</li>
              <li><strong>Momentum Mastery:</strong> Learn to build and maintain momentum for powerful 
              attacks and quick escapes.</li>
              <li><strong>Environmental Awareness:</strong> Stay alert to hazards and opportunities in 
              your surroundings.</li>
            </ul>
          </div>
        </div>
      </div>

      <div id="how-to-play">
        <h3>
          <span role="img" aria-label="joystick">🕹️</span> 
          How to Play
        </h3>
        <div className="how-to-play">
          <p>
            Getting started with Crazy Cattle 3D is simple, but mastering the game requires practice and 
            skill development. Here's what you need to know:
          </p>
          <ul>
            <li><strong>Movement Controls:</strong> Use WASD keys for movement, with W and S controlling 
            forward and backward motion, and A and D for strafing left and right.</li>
            <li><strong>Direction Control:</strong> Use your mouse to control the direction your sheep 
            is facing, allowing for precise aiming and movement.</li>
            <li><strong>Special Abilities:</strong> Press the spacebar to activate your sheep's explosive 
            collision ability, which must be timed perfectly for maximum effectiveness.</li>
            <li><strong>Momentum Building:</strong> Gain speed by moving downhill, then use that momentum 
            to launch attacks or escape dangerous situations.</li>
            <li><strong>Collision Timing:</strong> The physics system rewards precision timing – hitting 
            opponents at the right angle can send them flying off the map, while poor timing might leave 
            you vulnerable to counterattacks.</li>
          </ul>
          <p>
            A successful strategy often involves a combination of patience and opportunistic aggression. 
            Early in matches, focus on survival and positioning rather than eliminations. Learn the map 
            layouts to identify advantage points and hazard zones. As the play area shrinks, be prepared 
            to engage more aggressively with remaining opponents.
          </p>
        </div>
      </div>

      <div id="game-modes">
        <h3>
          <span role="img" aria-label="game die">🎲</span> 
          Game Modes
        </h3>
        <div className="game-modes">
          <div className="mode-card">
            <h4>🏆 Battle Royale</h4>
            <p>
              Compete against other players in intense survival matches. Be the last sheep standing 
              as the play area gradually shrinks, forcing exciting confrontations.
            </p>
            <p>
              The battle royale mode features a gradually shrinking play area, forcing confrontations 
              as matches progress. This creates an excellent pacing that builds tension throughout each 
              game, ensuring that Crazy Cattle 3D delivers consistent excitement from start to finish.
            </p>
            <p>
              What sets the battle royale mode apart is its perfect balance of chaos and skill. New 
              players can enjoy the unpredictable nature of sheep-based combat, while veterans develop 
              advanced strategies and techniques to dominate the field. Each session provides a complete 
              and satisfying gameplay experience in about 30 minutes.
            </p>
          </div>

          <div className="mode-card">
            <h4>🏋️ Practice Mode</h4>
            <p>
              Perfect your skills in a safe environment. Learn advanced techniques and master the 
              physics system without the pressure of competition.
            </p>
            <p>
              Practice mode allows you to experiment with different strategies and techniques without 
              the risk of losing a competitive match. Use this mode to familiarize yourself with the 
              maps, test the physics system, and develop your movement skills.
            </p>
            <p>
              The practice environment includes training dummies and obstacle courses designed to help 
              you master specific aspects of the game, from basic movement to advanced combat techniques.
            </p>
          </div>
        </div>
      </div>

      <div id="requirements">
        <h3>
          <span role="img" aria-label="gear">⚙️</span> 
          System Requirements
        </h3>
        <div className="requirements">
          <p>
            Crazy Cattle 3D is designed to run smoothly on most modern computers. Here are the recommended 
            specifications:
          </p>
          <ul>
            <li><strong>Browser:</strong> Modern web browser (Chrome, Firefox, Safari, or Edge) with 
            WebGL support</li>
            <li><strong>Internet Connection:</strong> Stable connection for online play</li>
            <li><strong>Input Devices:</strong> Keyboard and mouse for optimal control</li>
            <li><strong>RAM:</strong> Minimum 4GB RAM recommended</li>
            <li><strong>Graphics:</strong> Graphics card with WebGL support</li>
            <li><strong>Processor:</strong> Dual-core processor or better</li>
            <li><strong>Storage:</strong> Minimal storage required for browser cache</li>
          </ul>
          <p>
            For the best experience, we recommend using a computer with at least 8GB RAM and a dedicated 
            graphics card. The game is optimized for desktop play and may not perform optimally on mobile 
            devices.
          </p>
        </div>
      </div>

      <div id="tips">
        <h3>
          <span role="img" aria-label="light bulb">💡</span> 
          Tips for Success
        </h3>
        <div className="tips">
          <p>
            Mastering Crazy Cattle 3D takes time and practice. Here are some tips to help you improve 
            your gameplay:
          </p>
          <ul>
            <li><strong>Momentum is Key:</strong> Learn to use momentum to your advantage. Build up speed 
            on downhill sections to launch powerful attacks or make quick escapes.</li>
            <li><strong>Map Knowledge:</strong> Study map layouts and identify strategic positions. Knowing 
            the terrain is crucial for survival and success.</li>
            <li><strong>Timing Matters:</strong> Practice timing your explosive abilities perfectly. A 
            well-timed collision can eliminate an opponent instantly.</li>
            <li><strong>Learn from Others:</strong> Watch and learn from experienced players. Observe 
            their movement patterns and timing of collisions.</li>
            <li><strong>Stay Aware:</strong> Keep an eye on the shrinking play area and plan your 
            movements accordingly. Being caught outside the safe zone can be fatal.</li>
            <li><strong>Patience Pays:</strong> Sometimes the best strategy is to wait and observe. Let 
            other players eliminate each other before engaging.</li>
            <li><strong>Practice Regularly:</strong> Consistent practice is the key to improvement. Spend 
            time in practice mode to refine your skills.</li>
          </ul>
          <p>
            Remember that in Crazy Cattle 3D, victory often comes not to the most aggressive sheep, but 
            to the most strategic one. Develop your skills, learn from your mistakes, and gradually you'll 
            see your performance improve.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About; 