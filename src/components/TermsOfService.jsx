import React from 'react';
import './TermsOfService.css';

const TermsOfService = () => {
  return (
    <div className="legal-page">
      <h1>
        <span role="img" aria-label="scroll">📜</span>
        Terms of Service
      </h1>
      <div className="legal-content">
        <section>
          <h2>
            <span role="img" aria-label="check mark">✅</span> 
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing and playing Crazy Cattle 3D, you accept and agree to be bound by the terms and provision 
            of this agreement. If you do not agree to abide by the above, please do not use this game.
          </p>
        </section>

        <section>
          <h2>
            <span role="img" aria-label="key">🔑</span> 
            2. Game License
          </h2>
          <p>
            Crazy Cattle 3D is provided for personal, non-commercial use only. You may not:
          </p>
          <ul>
            <li>Modify, copy, or create derivative works of the game</li>
            <li>Reverse engineer or decompile the game</li>
            <li>Remove or alter any proprietary notices or labels</li>
            <li>Use the game for any commercial purpose</li>
          </ul>
        </section>

        <section>
          <h2>
            <span role="img" aria-label="people">👥</span> 
            3. User Conduct
          </h2>
          <p>When using Crazy Cattle 3D, you agree to:</p>
          <ul>
            <li>Play fairly and not use any cheats or exploits</li>
            <li>Respect other players and maintain appropriate behavior</li>
            <li>Not engage in any activity that disrupts the game experience</li>
            <li>Not attempt to gain unauthorized access to the game or its servers</li>
          </ul>
        </section>

        <section>
          <h2>
            <span role="img" aria-label="copyright">©️</span> 
            4. Intellectual Property
          </h2>
          <p>
            All content, features, and functionality of Crazy Cattle 3D, including but not limited to text, 
            graphics, logos, icons, images, and software, are owned by us and are protected by international 
            copyright, trademark, and other intellectual property laws.
          </p>
        </section>

        <section>
          <h2>5. Disclaimer</h2>
          <p>
            Crazy Cattle 3D is provided "as is" without any warranties, expressed or implied. We do not 
            guarantee that the game will be error-free or uninterrupted.
          </p>
        </section>

        <section>
          <h2>6. Limitation of Liability</h2>
          <p>
            In no event shall we be liable for any indirect, incidental, special, consequential, or punitive 
            damages arising out of or relating to your use of Crazy Cattle 3D.
          </p>
        </section>

        <section>
          <h2>7. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will notify users of any material changes 
            by posting the new terms on this page.
          </p>
        </section>

        <section>
          <h2>8. Contact Information</h2>
          <p>
            For any questions about these Terms of Service, please contact us at:
            <br />
            Email: <a href="mailto:support@crazycattle3d.com">support@crazycattle3d.com</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService; 